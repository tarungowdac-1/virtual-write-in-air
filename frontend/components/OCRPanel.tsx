"use client";

import React from "react";
import { Copy, Check } from "lucide-react";

interface OCRPanelProps {
  text: string;
  isLoading: boolean;
  error: string | null;
}

export const OCRPanel: React.FC<OCRPanelProps> = ({ text, isLoading, error }) => {
  const [copied, setCopied] = React.useState(false);

  const handleCopy = () => {
    if (text) {
      navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="w-full bg-white dark:bg-slate-900 border border-gray-200 dark:border-gray-800 rounded-xl p-4 shadow-sm flex flex-col gap-2">
      <div className="flex justify-between items-center">
        <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-200">Recognized Output</h3>
        {text && (
          <button
            onClick={handleCopy}
            className="flex items-center gap-1 text-xs text-blue-600 dark:text-blue-400 hover:underline"
          >
            {copied ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
            {copied ? "Copied" : "Copy"}
          </button>
        )}
      </div>

      <div className="min-h-[100px] bg-gray-50 dark:bg-slate-950 p-3 rounded-md border border-gray-100 dark:border-gray-800 text-sm font-mono whitespace-pre-wrap">
        {isLoading && <span className="text-gray-400 italic">Processing drawing...</span>}
        {error && <span className="text-red-500">{error}</span>}
        {!isLoading && !error && (text || <span className="text-gray-400 italic">No recognized text yet. Draw something and click "Recognize Text".</span>)}
      </div>
    </div>
  );
};