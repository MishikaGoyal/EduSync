import pandas as pd
from pymongo import MongoClient
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import accuracy_score
import joblib
import PyPDF2
import re

# MongoDB setup
client = MongoClient('mongodb://localhost:27017/') 
db = client['Data']
collection = db['School']

# Function to convert range strings to numeric values
def convert_range_to_numeric(value):
    if isinstance(value, str) and '(' in value and ',' in value:
        start, end = value.strip('()').split(',')
        return (int(start) + int(end)) / 2 
    else:
        return value

# Step 3: Fetch Data from MongoDB and preprocess
def fetch_data():
    data = list(collection.find())
    df = pd.DataFrame(data)
    
    # Drop non-numeric and irrelevant columns
    X = df.drop(columns=['Result', '_id', 'School Name', 'State', 'School Category', 'CWSN', 
                         'School Management', 'Year of Establishment', 'UDISE CODE'])
    
    # Apply conversion to all cells
    X = X.map(convert_range_to_numeric)

    # Convert all columns to numeric, replacing non-convertible values with NaN and then fill NaNs
    X = X.apply(pd.to_numeric, errors='coerce').fillna(0)

    # Convert 'Result' to a binary classification: 0 for 'odd' and 1 for 'standard'
    y = df['Result'].map({'odd': 0, 'standard': 1}).fillna(0)

    return X, y

# Step 4: Train Model
def train_model(X, y):
    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.3, random_state=42)
    model = RandomForestClassifier()
    model.fit(X_train, y_train)

    # Evaluate the model
    y_pred = model.predict(X_test)
    print(f"Accuracy: {accuracy_score(y_test, y_pred)}")

    joblib.dump(model, 'C:/Users/Hp/Desktop/Working/SIH 2024/AGNI/model/school_result_model.pkl')

def check_conditions(record):
    total_teachers = int(record.get("Total Teachers", 0))
    total_students = int(record.get("Total Students", 0))
    separate_room_for_hm = int(record.get("Separate Room for HM", 0))
    grade_configuration_str = record.get("Grade Configuration", "(0,0)")
    grade_configuration = tuple(map(int, grade_configuration_str.strip("()").split(',')))
    school_type = int(record.get("School Type", 0))
    total_washrooms_str = record.get("Total Washrooms", "(0,0)")
    total_washrooms = tuple(map(int, total_washrooms_str.strip("()").split(',')))
    boundary_wall = int(record.get("Boundary Wall", 0))
    library_available = int(record.get("Library Available", 0))
    drinking_water_available = int(record.get("Drinking Water Available", 0))
    playground_available = int(record.get("Playground Available", 0))
    electricity_availability = int(record.get("Electricity Availability", 0))
    total_classrooms = int(record.get("Total Class Rooms", 0))

    if ((total_teachers * 40 < total_students) or
    (separate_room_for_hm != 1 ) or
    (grade_configuration not in [(1, 5), (1, 10), (1, 12), (6, 10), (11, 12), (6,12)] ) or
    (school_type == 3 and (total_washrooms[0] < 1 or total_washrooms[1] < 1)) or
    (boundary_wall != 1 )or
    (library_available != 1) or
    (drinking_water_available != 1)or
    (playground_available != 1 )or
    (electricity_availability != 1 )or
    (total_classrooms < total_teachers)):
        return "ODD"
    else:
        return "Standard"

# Step 5: Extract data from PDF
def extract_data_from_pdf(pdf_path):
    with open(pdf_path, 'rb') as file:
        reader = PyPDF2.PdfReader(file)
        text = ''
        for page in reader.pages:
            text += page.extract_text()

    patterns = {
        "UDISE CODE": r'UDISE CODE\s*:\s*(\d{2}\s+\d{2}\s+\d{2}\s+\d{2}\s+\d{3})',
        "School Name": r'School Name\s*:\s*(.+)',
        "State": r'State\s+([A-Za-z]+)',
        "School Category": r'School Category\s*(\d+)',  
        "School Management": r'School Management\s*(\d+)',
        "School Type": r'School Type\s*(\d+)',  
        "Grade Configuration": r'Lowest & Highest Class\s*(\d+)\s*-\s*(\d+)',  
        "Year of Establishment": r'Year of Establishment\s*(\d{4})',
        "Boundary Wall": r'Boundary wall\s*(\d+)',
        "Total Class Rooms": r'Total Class Rooms\s*(\d+)',
        "Library Available": r'Library Availability\s*(\d+)',
        "Separate Room for HM": r'Separate Room for HM\s*(\d+)',
        "Drinking Water Available": r'Drinking Water Available\s*(\d+)',
        "Playground Available": r'Playground Available\s*(\d+)',
        "Electricity Availability": r'Electricity Availability\s*(\d+)',
        "Total Teachers": r'Total\s*(\d+)\s*',
        "Total Washrooms": r'Total\(Excluding CWSN\)\s*(\d+)\s*(\d+)',
        "CWSN": r'Cwsn*\s(\d+)(?:\s|$)',
        "Total Students": r'G\.Tot.*\s(\d+)(?:\s|$)'
    }

    parsed_data = {} 

    for key, pattern in patterns.items():
        match = re.search(pattern, text)
        if match:
            if key == "Grade Configuration":
                parsed_data["Grade Configuration"] = f"({match.group(1)},{match.group(2)})"
            elif key == "Total Washrooms":
                parsed_data["Total Washrooms"] = f"({match.group(1)},{match.group(2)})"
            else:
                parsed_data[key] = match.group(1)
    
    df = pd.DataFrame([parsed_data])

    # Apply the same conversion logic used in the training set
    df = df.map(convert_range_to_numeric)
    df = df.apply(pd.to_numeric, errors='coerce').fillna(0)

    return df, parsed_data


# Step 6: Predict and store in MongoDB
def predict_and_store(pdf_path):
    model = joblib.load('C:/Users/Hp/Desktop/Working/SIH 2024/AGNI/model/school_result_model.pkl')

    new_data, full_data = extract_data_from_pdf(pdf_path)

    relevant_columns = ['School Type', 'Grade Configuration', 'Boundary Wall', 'Total Class Rooms', 
                        'Library Available', 'Separate Room for HM', 'Drinking Water Available', 
                        'Playground Available', 'Electricity Availability', 'Total Teachers', 
                        'Total Washrooms', 'Total Students']
    
    # Select only relevant columns for prediction
    new_data = new_data[relevant_columns]

    check= check_conditions(full_data)
    predicted_result = model.predict(new_data)

    if check==predicted_result:
        full_data['Result'] = 'Standard' if predicted_result[0] == 1 else 'ODD'
    else:
        full_data['Result']=check

    # Insert all the data, including the prediction, into MongoDB
    db['predicted_results'].insert_one(full_data)

# Main workflow
if __name__ == "__main__":
    X, y = fetch_data()
    train_model(X, y)

    pdf_file = 'C:/Users/Hp/Desktop/Working/SIH 2024/AGNI/model/check.pdf'
    predict_and_store(pdf_file)