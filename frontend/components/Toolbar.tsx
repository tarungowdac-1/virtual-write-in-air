"use client";

import React from "react";
import { ColorPicker } from "./ColorPicker";
import { BrushSlider } from "./BrushSlider";
import { ExportMenu } from "./ExportMenu";
import { Trash2, ScanText } from "lucide-react";

interface ToolbarProps {
  color: string;
  setColor: (color: string) => void;
  brushSize: number;
  setBrushSize: (size: number) => void;
  onClear: () => void;
  onRunOCR: () => void;
  canvasRef: React.RefObject<HTMLCanvasElement | null>;
  ocrText: string;
  isLoadingOCR: boolean;
}

export const Toolbar: React.FC<ToolbarProps> = ({
  color,
  setColor,
  brushSize,
  setBrushSize,
  onClear,
  onRunOCR,
  canvasRef,
  ocrText,
  isLoadingOCR,
}) => {
  return (
    <div className="w-full bg-white dark:bg-slate-900 border border-gray-200 dark:border-gray-800 rounded-xl p-4 shadow-sm flex flex-wrap items-center justify-between gap-4">
      <div className="flex items-center gap-6">
        <ColorPicker currentColor={color} onSelectColor={setColor} />
        <BrushSlider brushSize={brushSize} onChange={setBrushSize} />
      </div>

      <div className="flex items-center gap-3">
        <button
          onClick={onClear}
          className="flex items-center gap-1.5 px-3 py-1.5 text-sm text-red-600 bg-red-50 dark:bg-red-950/40 hover:bg-red-100 dark:hover:bg-red-900/60 rounded-md transition font-medium"
        >
          <Trash2 className="w-4 h-4" /> Clear
        </button>

        <button
          onClick={onRunOCR}
          disabled={isLoadingOCR}
          className="flex items-center gap-1.5 px-4 py-1.5 text-sm text-white bg-blue-600 hover:bg-blue-700 rounded-md transition font-medium disabled:opacity-50"
        >
          <ScanText className="w-4 h-4" /> {isLoadingOCR ? "Recognizing..." : "Recognize Text"}
        </button>

        <ExportMenu canvasRef={canvasRef} text={ocrText} />
      </div>
    </div>
  );
};