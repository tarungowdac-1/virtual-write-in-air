# 🖊️ AirWrite AI

An interactive web application that enables users to write or draw in the air using hand gestures via a webcam. Built with Next.js, MediaPipe, Flask, and Tesseract OCR.

---

## 🌟 Features

* **Real-time Air Writing:** Detects finger landmarks to draw directly onto an HTML5 Canvas overlay.
* **Gesture Triggers:** Pinch index finger and thumb together to draw; release to hover/move cursor.
* **Optical Character Recognition (OCR):** Sends canvas snapshots to the Flask backend to extract handwritten text.
* **Export Capabilities:** Download your canvas as a PNG image or recognized text as a TXT file.
* **Theme Support:** Dark and Light mode support.

---

## 🛠️ Tech Stack

### Frontend
* **Framework:** Next.js (TypeScript)
* **Styling:** Tailwind CSS
* **Computer Vision:** MediaPipe Hands (`@mediapipe/hands`, `@mediapipe/camera_utils`)
* **Icons:** Lucide React

### Backend
* **Framework:** Flask (Python)
* **OCR Engine:** Tesseract OCR / PyTesseract
* **Image Processing:** OpenCV / Pillow
* **Production Server:** Gunicorn / Docker

---

## 🚀 Local Development Setup

### 1. Prerequisites
* Node.js v20+
* Python 3.10+
* Tesseract OCR installed locally (`sudo apt install tesseract-ocr` on Ubuntu/Mint)

---

### 2. Backend Setup

```bash
cd backend

# Create and activate virtual environment
python3 -m venv venv
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Start Flask development server
python3 app.py