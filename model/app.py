from flask import Flask, request, jsonify
from werkzeug.utils import secure_filename
from flask_cors import CORS
import joblib
import os
import google.generativeai as genai
from dotenv import load_dotenv
from your_ml_script import extract_data_from_pdf, check_conditions, reasons, gemini_pro_response, severity_calculation

app = Flask(__name__)
CORS(app)

load_dotenv()
api_key = os.getenv("api_key")
genai.configure(api_key=api_key)

model = joblib.load('model/school_result_model.pkl')

app.config['UPLOAD_FOLDER'] = 'uploads/'

if not os.path.exists(app.config['UPLOAD_FOLDER']):
    os.makedirs(app.config['UPLOAD_FOLDER'])

@app.route('/predict', methods=['POST'])
def predict():
    if 'file' not in request.files:
        return jsonify({"error": "No file part"}), 400

    file = request.files['file']
    if file.filename == '':
        return jsonify({"error": "No selected file"}), 400

    # Save the file
    filename = secure_filename(file.filename)
    filepath = os.path.join(app.config['UPLOAD_FOLDER'], filename)
    file.save(filepath)

    new_data, full_data = extract_data_from_pdf(filepath)
    
    relevant_columns = ['School Type', 'Grade Configuration', 'Boundary Wall', 'Total Class Rooms', 
                        'Library Available', 'Separate Room for HM', 'Drinking Water Available', 
                        'Playground Available', 'Electricity Availability', 'Total Teachers', 
                        'Total Washrooms', 'Total Students']
    
    new_data = new_data[relevant_columns]

    check = check_conditions(full_data)
    sever= severity_calculation(full_data)
    full_data['Severity']=sever
    predicted_result = model.predict(new_data)

    if check == predicted_result:
        full_data['Result'] = 'Standard' if predicted_result[0] == 1 else 'ODD'
    else:
        full_data['Result'] = check

    print(full_data)

    return full_data

@app.route('/reasons', methods=['POST'])
def get_reasons():

    full_data = request.get_json()

    if not full_data:
        return jsonify({"error": "No data provided"}), 400
    
    reasons_output = reasons(full_data)
    return reasons_output

@app.route('/check', methods=['POST'])
def check_again():

    full_data = request.get_json()

    if not full_data:
        return jsonify({"error": "No data provided"}), 400
    
    result_output = check_conditions(full_data)
    return result_output

@app.route('/suggestions', methods=['GET','POST'])
def generate_guidance():
    full_data = request.get_json()

    reason = reasons(full_data)

    state=full_data['State']

    if not full_data:
        return jsonify({"error": "No data provided"}), 400

    prompt_header = f'''
    You are an AI assistant helping school principals in India align their schools with the Samagra Shiksha Framework and the New Education Policy (NEP), use data from these policies as well as other policies, and use correct data only.

    Objective: When provided with the reasons for being classified as an "odd" structure, generate a clear, actionable guidance message. The message should provide solutions based on government policies and statistics. If the school is standard, then just output that the school is standard.

    "Guidance Message Structure:"
    State specific Information: Identify {state} specific problems present in the state with climatic conditions, diasaster prone properties, of the state etc.,
    
    Action Plan:
    Immediate Actions: Suggest specific steps to align with Samagra Shiksha or NEP standards.
    Resource Use: Identify precise and correct government schemes or grants to standardize the school.

    Implementation:
    Stakeholder Involvement: Define roles for public, students, and school authorities in the school’s transformation, be precise about their roles.
    Resource Management: Properly guide the principal on accessing and using available grants for necessary changes.
    Timeline: Provide a clear timeline for immediate fixes and long-term improvements.

    Do not assume if information is not provided.
    '''

    prompt = prompt_header + f"\n\nReasons: {reason}"
    guidance_message = gemini_pro_response(prompt)
    

    return guidance_message

if __name__ == '__main__':
    app.run(debug=True)