import os
import re
import base64
import numpy as np
import cv2
from flask import Flask, request, jsonify
from flask_cors import CORS
import pytesseract
from PIL import Image
import io

# 1. Explicitly configure structural environment variables for Ubuntu Linux
os.environ['TESSDATA_PREFIX'] = '/usr/share/tesseract-ocr/5/tessdata' if os.path.exists('/usr/share/tesseract-ocr/5/tessdata') else '/usr/share/tesseract-ocr/tessdata'
pytesseract.pytesseract.tesseract_cmd = r'/usr/bin/tesseract'

app = Flask(__name__)
# Enable CORS for all routes so the Next.js dev server on port 3000 can fetch data
CORS(app, resources={r"/*": {"origins": "*"}})

# Ensure your route parses the safe /api prefix mapping from Next.js config rules
@app.route('/api/predict-ocr', methods=['POST'])
def predict_ocr():
    try:
        data = request.get_json()
        if not data or 'image' not in data:
            return jsonify({"error": "No image payload found"}), 400

        image_data = data['image']
        
        if "data:image" in image_data:
            image_data = re.sub(r'^data:image/.+;base64,', '', image_data)

        # Decode base64 stream string parameters safely
        img_bytes = base64.b64decode(image_data)
        img_pil = Image.open(io.BytesIO(img_bytes)).convert('RGB')
        
        # Preprocessing image matrix array configuration layers
        open_cv_image = np.array(img_pil)
        if open_cv_image.size == 0:
            return jsonify({"text": ""})

        gray = cv2.cvtColor(open_cv_image, cv2.COLOR_RGB2GRAY)
        _, thresh = cv2.threshold(gray, 127, 255, cv2.THRESH_BINARY_INV)

        # 2. Run parsing engine using explicit default safe fallback parameters configuration 
        extracted_text = pytesseract.image_to_string(thresh, config='--psm 6').strip()
        
        print(f"[OCR SUCCESS] Extracted string contents: '{extracted_text}'")
        return jsonify({"text": extracted_text})

    except Exception as e:
        print(f"[SERVER CRASH LOG] Exact exception traceback info: {str(e)}")
        return jsonify({"error": "Computation error", "details": str(e)}), 500

if __name__ == '__main__':
    # Starts the local development environment on port 5000
    app.run(host='127.0.0.1', port=5000, debug=True)
