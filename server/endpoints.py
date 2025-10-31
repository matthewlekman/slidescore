import sys
sys.path.append('/Users/tom/Developer/GitHub/slidescore/server')

from flask import Flask, request, jsonify, send_from_directory
from werkzeug.utils import secure_filename
from pptxAnalyser import SlideAnalyzer
import os
import uuid

app = Flask(__name__)

# Configuration
UPLOAD_FOLDER = 'uploads'
ALLOWED_EXTENSIONS = {'pptx'}
MAX_FILE_SIZE = 100 * 1024 * 1024  # 100MB

os.makedirs(UPLOAD_FOLDER, exist_ok=True)
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER
app.config['MAX_CONTENT_LENGTH'] = MAX_FILE_SIZE

def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

@app.route('/')
def index():
    return jsonify({
        'service': 'SlideScore API',
        'endpoints': {
            'analyze': 'POST /api/analyze (upload .pptx file)'
        }
    })

@app.route('/api/analyse', methods=['POST'])
def analyze():
    # Check if file present
    if 'ppt' not in request.files:
        return jsonify({'error': 'No file uploaded'}), 400
    
    file = request.files['ppt']
    
    if file.filename == '':
        return jsonify({'error': 'No file selected'}), 400
    
    if not allowed_file(file.filename):
        return jsonify({'error': 'Only .pptx files are supported'}), 400
    
    try:
        # Save with unique filename
        unique_id = str(uuid.uuid4())
        filename = f"{unique_id}_{secure_filename(file.filename)}"
        filepath = os.path.join(app.config['UPLOAD_FOLDER'], filename)
        file.save(filepath)
        
        # Analyze
        analyzer = SlideAnalyzer(filepath, file.filename.split('.')[0])
        report = analyzer.analyze()
        
        # Cleanup
        os.remove(filepath)
        
        return jsonify({
            'success': True,
            'report': report
        })
    
    except Exception as e:
        # Cleanup on error
        if os.path.exists(filepath):
            os.remove(filepath)
        
        return jsonify({
            'success': False,
            'error': str(e)
        }), 500

# CORS support (for frontend)
@app.after_request
def after_request(response):
    response.headers.add('Access-Control-Allow-Origin', '*')
    response.headers.add('Access-Control-Allow-Headers', 'Content-Type')
    response.headers.add('Access-Control-Allow-Methods', 'POST, OPTIONS')
    return response

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=8000)