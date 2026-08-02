import { API_BASE_URL } from "./constants";

export async function processOCR(imageBase64: string): Promise<string> {
  try {
    const response = await fetch(`${API_BASE_URL}/predict-ocr`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ image: imageBase64 }),
    });

    if (!response.ok) {
      throw new Error(`OCR API failed with status ${response.status}`);
    }

    const data = await response.json();
    return data.text || "";
  } catch (error) {
    console.error("Error communicating with OCR API:", error);
    throw error;
  }
}