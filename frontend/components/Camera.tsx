"use client";

import React from "react";

interface CameraProps {
  videoRef: React.RefObject<HTMLVideoElement | null>;
  isCameraActive: boolean;
  cameraError: string | null;
  startCamera: () => void;
}

export const Camera: React.FC<CameraProps> = ({
  videoRef,
  isCameraActive,
  cameraError,
  startCamera,
}) => {
  return (
    <div className="relative w-full h-full bg-black rounded-xl overflow-hidden flex items-center justify-center">
      <video
        ref={videoRef}
        className="w-full h-full object-cover mirror"
        playsInline
        muted
      />
      {!isCameraActive && (
        <div className="absolute inset-0 bg-slate-900/90 flex flex-col items-center justify-center p-4 text-center">
          {cameraError ? (
            <p className="text-red-400 text-sm mb-4">{cameraError}</p>
          ) : (
            <p className="text-gray-300 text-sm mb-4">Camera access is required for air writing gestures.</p>
          )}
          <button
            onClick={startCamera}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-medium text-sm"
          >
            Start Camera
          </button>
        </div>
      )}
    </div>
  );
};