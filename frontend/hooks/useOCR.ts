"use client";

import { useState } from "react";
import { processOCR } from "../lib/api";

export function useOCR() {
  const [extractedText, setExtractedText] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const triggerOCR = async (canvas: HTMLCanvasElement | null) => {
    if (!canvas) return;

    setIsLoading(true);
    setError(null);

    try {
      const imageBase64 = canvas.toDataURL("image/png");
      const text = await processOCR(imageBase64);
      setExtractedText(text);
    } catch (err: any) {
      setError("Failed to recognize text. Please make sure backend is active.");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    extractedText,
    isLoading,
    error,
    triggerOCR,
    setExtractedText,
  };
}