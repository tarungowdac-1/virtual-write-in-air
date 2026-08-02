"use client";

import React, { useRef, useEffect, useState } from "react";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import { Toolbar } from "../components/Toolbar";
import { OCRPanel } from "../components/OCRPanel";

export default function Home() {
  // UI and Engine States
  const [isCameraActive, setIsCameraActive] = useState(false);
  const [handDetected, setHandDetected] = useState(false);
  const [isDrawing, setIsDrawing] = useState(false);
  const [cursorPos, setCursorPos] = useState<{ x: number; y: number } | null>(null);
  const [extractedText, setExtractedText] = useState("");
  const [isLoadingOCR, setIsLoadingOCR] = useState(false);
  const [ocrError, setOcrError] = useState<string | null>(null);

  // Settings states
  const [color, setColor] = useState("#a855f7");
  const [brushSize, setBrushSize] = useState(4);

  // Core Refs
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const handLandmarkerRef = useRef<any>(null);
  const animationFrameIdRef = useRef<number | null>(null);
  const prevPosRef = useRef<{ x: number; y: number } | null>(null);

  // 1. Initialize the official Google MediaPipe Vision Hand Landmarker engine
  useEffect(() => {
    async function initMediaPipeVision() {
      try {
        const vision = await import("@mediapipe/tasks-vision");
        const { FilesetResolver, HandLandmarker } = vision;
        
        const wasmFileset = await FilesetResolver.forVisionTasks(
          "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@latest/wasm"
        );
        
        handLandmarkerRef.current = await HandLandmarker.createFromOptions(wasmFileset, {
          baseOptions: {
            modelAssetPath: "https://storage.googleapis.com/mediapipe-models/hand_landmarker/hand_landmarker/float16/1/hand_landmarker.task",
            delegate: "GPU"
          },
          runningMode: "VIDEO",
          numHands: 1
        });
        
        console.log("MediaPipe initialized successfully.");
      } catch (err) {
        console.error("Failed to boot core Vision tracking subsystem:", err);
      }
    }
    initMediaPipeVision();

    return () => {
      if (handLandmarkerRef.current) handLandmarkerRef.current.close();
      if (animationFrameIdRef.current) cancelAnimationFrame(animationFrameIdRef.current);
    };
  }, []);

  // 2. Hardware Webcam Stream Toggle
  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { width: 1280, height: 720 }
      });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        setIsCameraActive(true);
      }
    } catch (err) {
      console.error("Camera access error:", err);
    }
  };

  // 3. Real-Time Tracking Loop Handler
  useEffect(() => {
    if (!isCameraActive || !videoRef.current) return;

    const videoElement = videoRef.current;
    let lastVideoTime = -1;

    function predictFrame() {
      if (!videoElement || videoElement.paused || videoElement.ended || !handLandmarkerRef.current) {
        animationFrameIdRef.current = requestAnimationFrame(predictFrame);
        return;
      }

      if (videoElement.currentTime !== lastVideoTime) {
        lastVideoTime = videoElement.currentTime;
        const timestamp = performance.now();
        const detections = handLandmarkerRef.current.detectForVideo(videoElement, timestamp);
        
        if (detections && detections.landmarks && detections.landmarks.length > 0) {
          setHandDetected(true);
          const landmarks = detections.landmarks[0];
          
          // Index Finger Tip (Landmark 8) & Index Finger Pip Joint (Landmark 6)
          const indexTip = landmarks[8];
          const indexPip = landmarks[6];

          if (canvasRef.current) {
            const canvas = canvasRef.current;
            // Mirror coordinate positions for direct natural matching
            const x = (1 - indexTip.x) * canvas.width;
            const y = indexTip.y * canvas.height;
            setCursorPos({ x, y });

            // Writing Gesture rule: If index tip is higher than the pip joint, draw!
            const isWritingGesture = indexTip.y < indexPip.y;
            setIsDrawing(isWritingGesture);
          }
        } else {
          setHandDetected(false);
          setIsDrawing(false);
          setCursorPos(null);
        }
      }
      animationFrameIdRef.current = requestAnimationFrame(predictFrame);
    }

    animationFrameIdRef.current = requestAnimationFrame(predictFrame);
    return () => {
      if (animationFrameIdRef.current) cancelAnimationFrame(animationFrameIdRef.current);
    };
  }, [isCameraActive]);

  // 4. Continuous Line Canvas Renderer
  useEffect(() => {
    if (!canvasRef.current || !cursorPos) {
      prevPosRef.current = null;
      return;
    }

    if (isDrawing) {
      const ctx = canvasRef.current.getContext("2d");
      if (ctx) {
        ctx.strokeStyle = color;
        ctx.lineWidth = brushSize;
        ctx.lineCap = "round";
        ctx.lineJoin = "round";

        ctx.beginPath();
        if (prevPosRef.current) {
          ctx.moveTo(prevPosRef.current.x, prevPosRef.current.y);
          ctx.lineTo(cursorPos.x, cursorPos.y);
          ctx.stroke();
        }
        prevPosRef.current = cursorPos;
      }
    } else {
      prevPosRef.current = null;
    }
  }, [isDrawing, cursorPos, color, brushSize]);

  // Canvas Control Actions
  const clearCanvas = () => {
    if (canvasRef.current) {
      const ctx = canvasRef.current.getContext("2d");
      ctx?.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
    }
  };

  // 5. Connect directly to your Flask Server on port 5000
  const triggerOCR = async () => {
    if (!canvasRef.current) return;
    setIsLoadingOCR(true);
    setOcrError(null);

    try {
      const imageBase64 = canvasRef.current.toDataURL("image/png");
      const response = await fetch("http://127.0.0.1:5000/api/predict-ocr", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ image: imageBase64 })
      });

      if (!response.ok) throw new Error("Backend response error");
      const data = await response.json();
      setExtractedText(data.text || "");
    } catch (err: any) {
      setOcrError("Failed to reach processing backend.");
    } finally {
      setIsLoadingOCR(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 flex flex-col gap-6">
        <Toolbar
          color={color}
          setColor={setColor}
          brushSize={brushSize}
          setBrushSize={setBrushSize}
          onClear={clearCanvas}
          onRunOCR={triggerOCR}
          canvasRef={canvasRef}
          ocrText={extractedText}
          isLoadingOCR={isLoadingOCR}
        />

        <div className="relative w-full aspect-video max-h-[640px] bg-black rounded-xl overflow-hidden shadow-lg border border-gray-200 dark:border-gray-800">
          {/* Hardware Webcam Display Frame */}
          <video
            ref={videoRef}
            autoPlay
            playsInline
            muted
            className={`absolute inset-0 w-full h-full object-cover scale-x-[-1] ${isCameraActive ? "block" : "hidden"}`}
          />

          {/* Fallback Camera Start Layout Button */}
          {!isCameraActive && (
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 bg-slate-950 text-white">
              <p className="text-sm text-slate-400">Camera is currently inactive</p>
              <button onClick={startCamera} className="bg-purple-600 hover:bg-purple-700 px-4 py-2 rounded-lg text-sm font-medium">
                Start Tracking Feed
              </button>
            </div>
          )}

          {/* Electronic AI Whiteboard Overlay Canvas */}
          <canvas
            ref={canvasRef}
            width={1280}
            height={720}
            className="absolute inset-0 w-full h-full object-cover pointer-events-none z-10"
          />

          {/* Gesture Visual Tracker Cursor */}
          {cursorPos && (
            <div
              style={{
                left: `${(cursorPos.x / 1280) * 100}%`,
                top: `${(cursorPos.y / 720) * 100}%`,
                backgroundColor: color,
              }}
              className={`absolute w-4 h-4 rounded-full -translate-x-1/2 -translate-y-1/2 pointer-events-none z-20 shadow-md transition-transform duration-75 ${
                isDrawing ? "scale-125 ring-4 ring-white" : "scale-100 opacity-60"
              }`}
            />
          )}
        </div>

        {/* Display OCR Processing Errors or Output Panels */}
        <OCRPanel 
          text={extractedText} 
          error={ocrError} 
          isLoading={isLoadingOCR} 
        />
      </main>
      <Footer />
    </div>
  );
}
