import pandas as pd
import PyPDF2
import re
import google.generativeai as genai

# Function to convert range strings to numeric values
def convert_range_to_numeric(value):
    if isinstance(value, str) and '(' in value and ',' in value:
        start, end = value.strip('()').split(',')
        return (int(start) + int(end)) / 2 
    else:
        return value

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
    (grade_configuration not in [(1, 5), (1,8), (1, 10), (1, 12), (6,8), (6, 10), (6,12), (9,10), (9,12), (11, 12)] ) or
    (school_type == 3 and (total_washrooms[0] < 1 or total_washrooms[1] < 1)) or
    (boundary_wall != 1 )or
    (library_available != 1) or
    (drinking_water_available != 1)or
    (playground_available != 1 )or
    (electricity_availability != 1 )or
    (total_students >= total_classrooms * 50)):
        return "ODD"
    else:
        return "Standard"

def extract_data_from_pdf(pdf_path):
    with open(pdf_path, 'rb') as file:
        reader = PyPDF2.PdfReader(file)
        text = ''
        for page in reader.pages:
            text += page.extract_text()

    VALID_STATES = [
    "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh",
    "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jharkhand", "Karnataka",
    "Kerala", "Madhya Pradesh", "Maharashtra", "Manipur", "Meghalaya",
    "Mizoram", "Nagaland", "Odisha", "Punjab", "Rajasthan", "Sikkim",
    "Tamilnadu", "Telangana", "Tripura", "Uttar Pradesh", "Uttarakhand",
    "West Bengal", "Andaman and Nicobar Islands", "Chandigarh",
    "Dadra and Nagar Haveli and Daman and Diu", "Delhi", "Jammu and Kashmir",
    "Ladakh", "Lakshadweep", "Puducherry"
    ]

    patterns = {
        "UDISE CODE": r'UDISE CODE\s*:\s*(\d{2}\s+\d{2}\s+\d{2}\s+\d{2}\s+\d{3})',
        "School Name": r'School Name\s*:\s*(.+)',
        "State": r'State\s+([A-Za-z\s]+)',
        "School Category": r'School Category\s*(\d+)',  
        "School Management": r'School Management\s*(\d+)',
        "School Type": r'School Type\s*(\d+)',  
        "Grade Configuration": r'Lowest & Highest Class\s*(\d+)\s*-\s*(\d+)',  
        "Is Special School for CWSN": r"Is Special School for CWSN\?\s*(\d+)-",
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
        "Func. CWSN Friendly": r"Func\. CWSN Friendly\s*(\d+)\s+(\d+)",
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
            elif key == "Func. CWSN Friendly":
                boys, girls = f"({match.group(1)}, {match.group(2)})"
                parsed_data[key] = 1 if boys + girls > 0 else 0
            elif key == "Is Special School for CWSN":
                parsed_data[key] = 1 if match.group(1).strip() == "1" else 2
            else:
                parsed_data[key] = match.group(1)
    
    text_lines=text.split('\n')
    parsed_data["State"] = next(
                (state for line in text_lines for state in VALID_STATES if state.lower() in line.lower()),
                None
            )
    
    df = pd.DataFrame([parsed_data])

    # Apply the same conversion logic used in the training set
    df = df.map(convert_range_to_numeric)
    df = df.apply(pd.to_numeric, errors='coerce').fillna(0)
    print(df,"\n")
    print(parsed_data)

    return df, parsed_data

def reasons(record):
    total_teachers = int(record.get("Total_Teachers", 0))
    total_students = int(record.get("Total_Students", 0))
    separate_room_for_hm = int(record.get("Separate_Room_for_HM", 0))
    grade_configuration_str = record.get("Grade_Configuration", "(0,0)")
    grade_configuration = tuple(map(int, grade_configuration_str.strip("()").split(',')))
    school_type = int(record.get("School_Type", 0))
    total_washrooms_str = record.get("Total_Washrooms", "(0,0)")
    total_washrooms = tuple(map(int, total_washrooms_str.strip("()").split(',')))
    boundary_wall = int(record.get("Boundary_Wall", 0))
    library_available = int(record.get("Library_Available", 0))
    drinking_water_available = int(record.get("Drinking_Water_Available", 0))
    playground_available = int(record.get("Playground_Available", 0))
    electricity_availability = int(record.get("Electricity_Availability", 0))
    total_classrooms = int(record.get("Total_Class_Rooms", 0))

    lists=[]

    if (total_teachers * 40 < total_students):
        s= f'There should be 1 teacher per 40 students. You have {total_teachers} teachers and {total_students} students.'
        lists.append(s)
    if (separate_room_for_hm != 1 ):
        lists.append('There should be a seperate room for headmaster/headmistress.')
    if (grade_configuration not in [(1, 5), (1,8), (1, 10), (1, 12), (6,8), (6, 10), (6,12), (9,10), (9,12), (11, 12)] ):
        lists.append('Your school does not follow grade configuration norm.')
    if (school_type == 3 and (total_washrooms[0] < 1 or total_washrooms[1] < 1)) :
        s= f'There should be seperate washroom for boys and girls. You have {total_washrooms[0]} for boys and {total_washrooms[1]} for girls.'
        lists.append(s)
    if (boundary_wall != 1 ):
        lists.append('There should be a pucca boundary wall.')
    if (library_available != 1) :
        lists.append('There should be a library.')
    if (drinking_water_available != 1): 
        lists.append('Drinking Water should be available.')
    if (playground_available != 1 ):
        lists.append('There should be a playground.')
    if (electricity_availability != 1 ):
        lists.append('Electricity should be available.')
    if (total_students >= total_classrooms * 50):
        s=  f'Each class must accomodate maximum of 45 students. You have {total_students} students and only {total_classrooms} classrooms.'
        lists.append(s)
    if (len(lists)==0):
        lists.append('Your school is Standard Structure.')
    
    return lists

def severity_calculation(record):
    total_teachers = int(record.get("Total_Teachers", 0))
    total_students = int(record.get("Total_Students", 0))
    separate_room_for_hm = int(record.get("Separate_Room_for_HM", 0))
    grade_configuration_str = record.get("Grade_Configuration", "(0,0)")
    grade_configuration = tuple(map(int, grade_configuration_str.strip("()").split(',')))
    school_type = int(record.get("School_Type", 0))
    total_washrooms_str = record.get("Total_Washrooms", "(0,0)")
    total_washrooms = tuple(map(int, total_washrooms_str.strip("()").split(',')))
    boundary_wall = int(record.get("Boundary_Wall", 0))
    library_available = int(record.get("Library_Available", 0))
    drinking_water_available = int(record.get("Drinking_Water_Available", 0))
    playground_available = int(record.get("Playground_Available", 0))
    electricity_availability = int(record.get("Electricity_Availability", 0))
    total_classrooms = int(record.get("Total_Class_Rooms", 0))

    severity=0

    if (total_teachers * 40 < total_students):
        severity+=3
    if (separate_room_for_hm != 1 ):
        severity+=1
    if (grade_configuration not in [(1, 5), (1,8), (1, 10), (1, 12), (6,8), (6, 10), (6,12), (9,10), (9,12), (11, 12)] ):
        severity+=3
    if (school_type == 3 and (total_washrooms[0] < 1 or total_washrooms[1] < 1)) :
        severity+=2
    if (boundary_wall != 1 ):
        severity+=1
    if (library_available != 1) :
        severity+=1
    if (drinking_water_available != 1):
        severity+=2
    if (playground_available != 1 ):
        severity+=1
    if (electricity_availability != 1 ):
        severity+=2
    if (total_students >= total_classrooms * 50):
        severity+=3
    
    return severity

def removeSymbols(response):
    return response.strip().replace("*", '')

def gemini_pro_response(user_prompt):
    gemini_pro_model = genai.GenerativeModel("gemini-pro")
    response = gemini_pro_model.generate_content(user_prompt)
    return removeSymbols(response.text)