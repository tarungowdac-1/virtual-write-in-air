"use client";

import React from "react";

interface BrushSliderProps {
  brushSize: number;
  onChange: (size: number) => void;
}

export const BrushSlider: React.FC<BrushSliderProps> = ({ brushSize, onChange }) => {
  return (
    <div className="flex items-center gap-3">
      <span className="text-xs font-semibold text-gray-600 dark:text-gray-300">Size:</span>
      <input
        type="range"
        min="1"
        max="20"
        value={brushSize}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-24 h-2 bg-gray-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-blue-600"
      />
      <span className="text-xs text-gray-500 dark:text-gray-400 w-4">{brushSize}px</span>
    </div>
  );
};