class OCRModelWrapper:
    """
    Wrapper class for model initialization and extensibility (e.g. PyTorch / ONNX / Tesseract).
    """
    def __init__(self):
        self.is_ready = True

    def predict(self, image):
        from ocr import extract_text_from_image
        return extract_text_from_image(image)

model_instance = OCRModelWrapper()