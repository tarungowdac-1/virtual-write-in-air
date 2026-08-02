"use client";

import React from "react";

interface CanvasProps {
  canvasRef: React.RefObject<HTMLCanvasElement | null>;
  cursorPos: { x: number; y: number } | null;
  isDrawing: boolean;
}

export const Canvas: React.FC<CanvasProps> = ({ canvasRef, cursorPos, isDrawing }) => {
  return (
    <div className="relative w-full h-full pointer-events-none">
      <canvas
        ref={canvasRef}
        width={1280}
        height={720}
        className="w-full h-full absolute inset-0 rounded-xl"
      />
      {cursorPos && (
        <div
          className={`absolute w-5 h-5 -ml-2.5 -mt-2.5 rounded-full border-2 transition-transform ${
            isDrawing ? "bg-red-500/80 border-white scale-125" : "bg-blue-500/50 border-white"
          }`}
          style={{
            left: `${cursorPos.x}px`,
            top: `${cursorPos.y}px`,
          }}
        />
      )}
    </div>
  );
};