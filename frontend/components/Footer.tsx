"use client";

import React from "react";

export const Footer: React.FC = () => {
  return (
    <footer className="w-full py-4 px-6 border-t border-gray-200 dark:border-gray-800 bg-white dark:bg-slate-900 text-xs text-gray-500 dark:text-gray-400 flex flex-col sm:flex-row justify-between items-center gap-2">
      <p>© {new Date().getFullYear()} AirWrite AI. Powered by MediaPipe & Computer Vision.</p>
      <p>Pinch index finger & thumb to write in air.</p>
    </footer>
  );
};