# import pandas as pd
# from pymongo import MongoClient
# from sklearn.model_selection import train_test_split
# from sklearn.ensemble import RandomForestClassifier
# from sklearn.metrics import accuracy_score
# import joblib
# import PyPDF2
# import re
# from sklearn.naive_bayes import GaussianNB, MultinomialNB, BernoulliNB
# from sklearn.svm import SVC
# from sklearn.linear_model import LogisticRegression
# from sklearn.tree import DecisionTreeClassifier


# # MongoDB setup
# client = MongoClient('mongodb://localhost:27017/') 
# db = client['Data']
# collection = db['School']

# # Function to convert range strings to numeric values
# def convert_range_to_numeric(value):
#     """Converts a string representing a numeric range to its numeric equivalent.

#     Args:
#         value: The input value, either a string or a number.

#     Returns:
#         The converted numeric value if the input is a numeric range string,
#         otherwise the original value.
#     """

#     if isinstance(value, str) and value.isdigit():
#         return int(value)
#     elif isinstance(value, str) and '(' in value and ',' in value:
#         start, end = value.strip('()').split(',')
#         return (int(start) + int(end)) / 2
#     else:
#         return value

# # Step 3: Fetch Data from MongoDB and preprocess
# def fetch_data():
#     data = list(collection.find())
#     df = pd.DataFrame(data)
    
#     # Drop non-numeric and irrelevant columns
#     X = df[['State', 'School Category', 'Grade Configuration', 'Boundary Wall', 'Total Class Rooms', 
#             'Library Available', 'Separate Room for HM', 'Drinking Water Available', 'Playground Available', 
#             'Electricity Availability', 'Total Teachers', 'Total Washrooms']]
#     X = X.applymap(convert_range_to_numeric)
#     X['State'] = pd.get_dummies(X['State'])  
#     y = df['Result']

#     print(X,y)

#     return X, y

# # Step 4: Train Model
# def train_model(X, y, model):
#     X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.3, random_state=42) 
#     model.fit(X_train, y_train)

#     # Evaluate the model
#     y_pred = model.predict(X_test)
#     print(y_pred)
#     print("Model: ", model, "\n")
#     print(f"Accuracy: {accuracy_score(y_test, y_pred)}")
#     print('\n')

# # Main workflow
# if __name__ == "__main__":
#     X, y = fetch_data()
#     train_model(X, y, RandomForestClassifier())
#     train_model(X, y, GaussianNB())
#     train_model(X, y, MultinomialNB())  
#     train_model(X, y, BernoulliNB())       
#     train_model(X, y, LogisticRegression()) 
#     train_model(X, y, DecisionTreeClassifier()) 

import pandas as pd
from pymongo import MongoClient
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier
from sklearn.naive_bayes import GaussianNB, MultinomialNB, BernoulliNB
from sklearn.svm import SVC
from sklearn.linear_model import LogisticRegression
from sklearn.tree import DecisionTreeClassifier
from sklearn.metrics import accuracy_score
from sklearn.preprocessing import LabelEncoder
import joblib  # For model saving (optional)

# MongoDB setup
client = MongoClient('mongodb://localhost:27017/')
db = client['Data']
collection = db['School']

# Function to convert range strings to numeric values
def convert_range_to_numeric(value):
    """Converts a string representing a numeric range to its numeric equivalent.

    Args:
        value: The input value, either a string or a number.

    Returns:
        The converted numeric value if the input is a numeric range string,
        otherwise the original value.
    """

    if isinstance(value, str) and value.isdigit():
        return int(value)
    elif isinstance(value, str) and '(' in value and ',' in value:
        start, end = value.strip('()').split(',')
        return (int(start) + int(end)) / 2
    else:
        return value

# Step 3: Fetch Data from MongoDB and preprocess
def fetch_data():
    data = list(collection.find())
    df = pd.DataFrame(data)

    # Drop non-numeric and irrelevant columns (adjust based on your data)
    X = df[['School Category', 'Grade Configuration', 'Boundary Wall', 'Total Class Rooms',
            'Library Available', 'Separate Room for HM', 'Drinking Water Available', 'Playground Available',
            'Electricity Availability', 'Total Teachers', 'Total Washrooms']]
    X = X.applymap(convert_range_to_numeric)

    # Handle missing values (optional)
    X = X.fillna(method='ffill')  # Fill missing values with previous values
    # encoder = LabelEncoder()
    # X['State'] = encoder.fit_transform(X['State'])
    # One-hot encode categorical features
    y = df['Result']

    print(X.head())  # Print the first few rows to check data

    return X, y

# Step 4: Train Model
def train_model(X, y, model_name, model):
    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.3, random_state=42)
    model.fit(X_train, y_train)

    # Evaluate the model
    y_pred = model.predict(X_test)
    print(f"Predicted values for {model_name}:", y_pred[:5])  # Print first 5 predictions
    print(f"Model: {model_name}\n")
    print(f"Accuracy: {accuracy_score(y_test, y_pred)}")
    print('\n')

# Save the model (optional)
def save_model(model, filename):
    joblib.dump(model, filename)

# Main workflow
if __name__ == "__main__":
    X, y = fetch_data()

    models = [
        ("Random Forest", RandomForestClassifier(class_weight='balanced')),
        ("Gaussian Naive Bayes", GaussianNB()),
        ("Multinomial Naive Bayes", MultinomialNB()),
        ("Bernoulli Naive Bayes", BernoulliNB()),
        ("Logistic Regression", LogisticRegression()),
        ("Decision Tree Classifier", DecisionTreeClassifier())
    ]

    for model_name, model in models:
        train_model(X.copy(), y.copy(), model_name, model)

        # Save the model (uncomment to save)
        if(model_name == "Gaussian Naive Bayes"):
            save_model(model, f"{model_name}.pkl")