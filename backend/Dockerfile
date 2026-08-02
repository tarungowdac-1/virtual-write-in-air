FROM python:3.10-slim

# Install system dependencies including Tesseract OCR engine and OpenCV libraries
RUN apt-get update && apt-get install -y \
    tesseract-ocr \
    libtesseract-dev \
    ffmpeg \
    smpeg-dev \
    libgl1-mesa-glx \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /app

# Copy requirements and install dependencies
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy application code
COPY . .

# Expose port
EXPOSE 5000

# Start production server with Gunicorn
CMD ["gunicorn", "--bind", "0.0.0.0:5000", "app:app"]