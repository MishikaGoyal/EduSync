import pdfplumber
import re
import os
import json

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

# Define regex patterns for extraction
PATTERNS = {
    "UDISE CODE": r"UDISE CODE\s*:\s*(\d{2}\s+\d{2}\s+\d{2}\s+\d{2}\s+\d{3})",
    "School Name": r"School Name\s*:\s*(.+)",
    "State": r"State\s+([A-Za-z\s]+)",
    "School Category": r"School Category\s*(\d+)",
    "School Management": r"School Management\s*(\d+)",
    "School Type": r"School Type\s*(\d+)",
    "Grade Configuration": r"Lowest & Highest Class\s*(\d+)\s*-\s*(\d+)",
    "Is Special School for CWSN": r"Is Special School for CWSN\?\s*(\d+)-",
    "Year of Establishment": r"Year of Establishment\s*(\d{4})",
    "Boundary Wall": r"Boundary wall\s*(\d+)",
    "Total Class Rooms": r"Total Class Rooms\s*(\d+)",
    "Library Available": r"Library Availability\s*(\d+)",
    "Separate Room for HM": r"Separate Room for HM\s*(\d+)",
    "Drinking Water Available": r"Drinking Water Available\s*(\d+)",
    "Playground Available": r"Playground Available\s*(\d+)",
    "Electricity Availability": r"Electricity Availability\s*(\d+)",
    "Total Teachers": r"Total\s*(\d+)\s*",
    "Total Washrooms": r"Total\(Excluding CWSN\)\s*(\d+)\s*(\d+)",
    "Func. CWSN Friendly": r"Func\. CWSN Friendly\s*(\d+)\s+(\d+)",
    "Total Students": r'G\.Tot.*\s(\d+)(?:\s|$)'
}

def extract_data_from_text(text):
    """Extract data from text using predefined patterns."""
    extracted_data = {}
    for key, pattern in PATTERNS.items():
        match = re.search(pattern, text)
        if match:
            if key == "Grade Configuration":
                extracted_data[key] = (int(match.group(1)), int(match.group(2)))
            elif key == "Total Washrooms":
                extracted_data[key] = (int(match.group(1)), int(match.group(2)))
            elif key == "Func. CWSN Friendly":
                boys, girls = int(match.group(1)), int(match.group(2))
                extracted_data[key] = 1 if boys + girls > 0 else 0
            elif key == "Is Special School for CWSN":
                extracted_data[key] = 1 if match.group(1).strip() == "1" else 2
            else:
                extracted_data[key] = match.group(1).strip()
    return extracted_data

def extract_school_data(pdf_file):
    """Extract all required data from a school PDF."""
    extracted_data = {}
    try:
        with pdfplumber.open(pdf_file) as pdf:
            text = ""
            for page in pdf.pages:
                text += page.extract_text() if page.extract_text() else ""

            # Extract data from text
            extracted_data.update(extract_data_from_text(text))
            
            # Extract state information (from lines)
            text_lines = text.split("\n")
            extracted_data["State"] = next(
                (state for line in text_lines for state in VALID_STATES if state.lower() in line.lower()),
                None
            )
    except Exception as e:
        print(f"Error processing file {pdf_file}: {e}")

    return extracted_data

def process_school_pdfs(folder_path, output_json_path):
    """Process all PDF files in the folder and save extracted data to a JSON file."""
    if not os.path.isdir(folder_path):
        raise FileNotFoundError(f"The folder path '{folder_path}' does not exist.")

    all_school_data = []

    for filename in os.listdir(folder_path):
        if filename.endswith(".pdf"):
            pdf_file_path = os.path.join(folder_path, filename)
            try:
                school_data = extract_school_data(pdf_file_path)
                all_school_data.append(school_data)
            except Exception as e:
                print(f"Error processing file {filename}: {e}")

    try:
        with open(output_json_path, "w") as json_file:
            json.dump(all_school_data, json_file, indent=4)
        print(f"Data successfully extracted and saved to {output_json_path}")
    except Exception as e:
        print(f"Error saving data to JSON file: {e}")

# Input folder and output file paths
folder_path = "C:/Users/PRATHAM/OneDrive/Desktop/School Downloads"
output_json_path = "./schools_data.json"

# Run the process
process_school_pdfs(folder_path, output_json_path)
