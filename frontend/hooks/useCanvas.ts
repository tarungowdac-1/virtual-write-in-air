"use client";

import { useRef, useState } from "react";
import { DEFAULT_CANVAS_CONFIG } from "../lib/constants";

export function useCanvas() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [color, setColor] = useState<string>(DEFAULT_CANVAS_CONFIG.strokeColor);
  const [brushSize, setBrushSize] = useState<number>(DEFAULT_CANVAS_CONFIG.strokeWidth);

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (ctx) {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
  };

  const drawLine = (
    from: { x: number; y: number },
    to: { x: number; y: number }
  ) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.strokeStyle = color;
    ctx.lineWidth = brushSize;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";

    ctx.beginPath();
    ctx.moveTo(from.x, from.y);
    ctx.lineTo(to.x, to.y);
    ctx.stroke();
  };

  return {
    canvasRef,
    color,
    setColor,
    brushSize,
    setBrushSize,
    clearCanvas,
    drawLine,
  };
}