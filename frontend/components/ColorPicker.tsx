"use client";

import React from "react";
import { COLOR_PALETTE } from "../lib/constants";

interface ColorPickerProps {
  currentColor: string;
  onSelectColor: (color: string) => void;
}

export const ColorPicker: React.FC<ColorPickerProps> = ({ currentColor, onSelectColor }) => {
  return (
    <div className="flex items-center gap-2">
      {COLOR_PALETTE.map((hex) => (
        <button
          key={hex}
          onClick={() => onSelectColor(hex)}
          className={`w-7 h-7 rounded-full border-2 transition ${
            currentColor === hex ? "scale-110 border-blue-500 shadow-md" : "border-gray-300 dark:border-gray-600"
          }`}
          style={{ backgroundColor: hex }}
          title={hex}
        />
      ))}
    </div>
  );
};