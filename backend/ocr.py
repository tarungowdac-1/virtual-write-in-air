import pytesseract
from PIL import Image
import numpy as np

def extract_text_from_image(image: Image.Image) -> str:
    """
    Runs Tesseract OCR on the incoming image and returns recognized text.
    """
    try:
        # Preprocess image to grayscale
        gray = image.convert("L")
        
        # Configure Tesseract options (Page Segmentation Mode 6: Assume a single uniform block of text)
        custom_config = r"--oem 3 --psm 6"
        text = pytesseract.image_to_string(gray, config=custom_config)
        
        return text.strip()
    except Exception as e:
        print(f"Error executing OCR: {e}")
        return ""