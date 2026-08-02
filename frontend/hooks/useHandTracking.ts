"use client";

import { useState } from "react";
import { isPinching } from "../lib/mediapipe";

export interface Point {
  x: number;
  y: number;
}

export function useHandTracking() {
  const [isDrawing, setIsDrawing] = useState<boolean>(false);
  const [cursorPos, setCursorPos] = useState<Point | null>(null);
  const [handDetected, setHandDetected] = useState<boolean>(false);

  const processLandmarks = (landmarks: any[], width: number, height: number) => {
    if (!landmarks || landmarks.length === 0) {
      setHandDetected(false);
      setCursorPos(null);
      return;
    }

    setHandDetected(true);
    const hand = landmarks[0];

    const indexTip = hand[8];
    const thumbTip = hand[4];

    if (indexTip && thumbTip) {
      // Check pinch condition
      const pinching = isPinching(indexTip, thumbTip);
      setIsDrawing(pinching);

      // Invert X coordinate due to camera mirroring
      setCursorPos({
        x: (1 - indexTip.x) * width,
        y: indexTip.y * height,
      });
    }
  };

  return {
    isDrawing,
    cursorPos,
    handDetected,
    processLandmarks,
  };
}