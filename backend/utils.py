import base64
import io
import re
import numpy as np
from PIL import Image

def decode_base64_image(base64_string: str) -> Image.Image:
    """
    Decodes a Base64 string from the frontend into a PIL Image.
    """
    # Strip data URL prefix if present (e.g., 'data:image/png;base64,')
    image_data = re.sub(r"^data:image/.+;base64,", "", base64_string)
    decoded = base64.b64decode(image_data)
    image = Image.open(io.BytesIO(decoded))
    return image

def preprocess_image_for_ocr(pil_image: Image.Image) -> np.ndarray:
    """
    Converts image to grayscale, applies thresholding to clean noise for OCR.
    """
    # Convert PIL Image to OpenCV numpy array
    open_cv_image = np.array(pil_image.convert("RGB"))
    open_cv_image = open_cv_image[:, :, ::-1].copy()  # RGB to BGR

    # Convert to grayscale
    gray = cv2_grayscale(open_cv_image)

    # Invert colors if canvas background is transparent/dark
    # Standard OCR works best with black text on white background
    inverted = 255 - gray

    return inverted

def cv2_grayscale(image_bgr: np.ndarray) -> np.ndarray:
    import cv2
    return cv2.cvtColor(image_bgr, cv2.COLOR_BGR2GRAY)