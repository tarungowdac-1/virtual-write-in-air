from model import model_instance
from utils import decode_base64_image

def run_inference(base64_str: str) -> str:
    """
    Pipeline handler: Base64 string -> Image Object -> OCR Model -> Text Result.
    """
    image = decode_base64_image(base64_str)
    extracted_text = model_instance.predict(image)
    return extracted_text