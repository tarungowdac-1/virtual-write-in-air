"use client";

import React from "react";
import { exportCanvasAsPNG, exportTextAsTXT } from "../lib/export";
import { Download, FileText } from "lucide-react";

interface ExportMenuProps {
  canvasRef: React.RefObject<HTMLCanvasElement | null>;
  text: string;
}

export const ExportMenu: React.FC<ExportMenuProps> = ({ canvasRef, text }) => {
  const handlePNGDownload = () => {
    if (canvasRef.current) {
      exportCanvasAsPNG(canvasRef.current);
    }
  };

  const handleTXTDownload = () => {
    if (text) {
      exportTextAsTXT(text);
    }
  };

  return (
    <div className="flex items-center gap-2">
      <button
        onClick={handlePNGDownload}
        className="flex items-center gap-1.5 px-3 py-1.5 text-sm bg-gray-100 dark:bg-slate-800 hover:bg-gray-200 dark:hover:bg-slate-700 rounded-md transition font-medium"
      >
        <Download className="w-4 h-4" /> Export Canvas
      </button>
      <button
        onClick={handleTXTDownload}
        disabled={!text}
        className="flex items-center gap-1.5 px-3 py-1.5 text-sm bg-gray-100 dark:bg-slate-800 hover:bg-gray-200 dark:hover:bg-slate-700 rounded-md transition font-medium disabled:opacity-40 disabled:cursor-not-allowed"
      >
        <FileText className="w-4 h-4" /> Export Text
      </button>
    </div>
  );
};