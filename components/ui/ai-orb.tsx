"use client";

import React, { useState, useEffect } from "react";
import { Orb } from "orb-ui";

export interface AiOrbProps {
  size?: "sm" | "md" | "lg" | "xl";
  state?: "idle" | "thinking" | "speaking" | "listening";
  className?: string;
  animated?: boolean;
}

export function AiOrb({
  size = "md",
  state = "idle",
  className = "",
  animated = true,
}: AiOrbProps) {
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  const sizeConfig = {
    sm: {
      box: "h-4 w-4",
      px: 16,
      scale: 0.125,
      glow: "blur-[3px] inset-[-2px]",
      shadow: "0 0 10px rgba(56, 189, 248, 0.8), 0 0 18px rgba(14, 165, 233, 0.45)",
    },
    md: {
      box: "h-5 w-5 sm:h-6 sm:w-6",
      px: 24,
      scale: 0.182,
      glow: "blur-[6px] inset-[-3px]",
      shadow: "0 0 14px rgba(56, 189, 248, 0.9), 0 0 24px rgba(14, 165, 233, 0.55)",
    },
    lg: {
      box: "h-8 w-8",
      px: 32,
      scale: 0.245,
      glow: "blur-[8px] inset-[-4px]",
      shadow: "0 0 20px rgba(56, 189, 248, 0.95), 0 0 32px rgba(14, 165, 233, 0.65)",
    },
    xl: {
      box: "h-16 w-16",
      px: 64,
      scale: 0.485,
      glow: "blur-[14px] inset-[-8px]",
      shadow: "0 0 32px rgba(56, 189, 248, 1), 0 0 52px rgba(14, 165, 233, 0.75)",
    },
  };

  const current = sizeConfig[size] || sizeConfig.md;
  const isThinking = state === "thinking";
  const isListening = state === "listening";

  return (
    <div
      className={`relative inline-flex items-center justify-center shrink-0 select-none ${current.box} ${className}`}
      title={`Skyro AI Agent Engine (${state})`}
    >
      {/* 1. Outer Soft Cyan Halo Glow matching screenshot */}
      <div
        className={`absolute rounded-full transition-all duration-300 pointer-events-none ${current.glow} ${
          isThinking
            ? "bg-gradient-to-tr from-cyan-400 via-sky-300 to-orange-400 opacity-95 animate-ping"
            : isListening
            ? "bg-gradient-to-tr from-red-400 via-cyan-400 to-sky-400 opacity-90 animate-pulse"
            : "bg-gradient-to-tr from-cyan-400 via-sky-400 to-blue-500 opacity-85 animate-pulse"
        }`}
      />

      {/* 2. Secondary Diffuse Ambient Blue Aura */}
      <div
        className="absolute rounded-full bg-cyan-300/40 blur-[4px] inset-[-1.5px] pointer-events-none"
      />

      {/* 3. 3D Iridescent Sphere / Orb-UI Container */}
      <div
        className="relative h-full w-full rounded-full overflow-hidden flex items-center justify-center shadow-lg transition-transform hover:scale-110 duration-200"
        style={{
          boxShadow: `inset -1.5px -1.5px 3.5px rgba(15, 23, 42, 0.6), inset 1.5px 1.5px 3px rgba(255, 255, 255, 0.95), ${current.shadow}`,
          background:
            "radial-gradient(circle at 35% 28%, #ffffff 0%, #cffafe 18%, #7dd3fc 38%, #38bdf8 58%, #2563eb 82%, #1e40af 100%)",
        }}
      >
        {/* Living Animated Canvas from orb-ui when mounted */}
        {hasMounted && animated && (
          <div
            className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-60 mix-blend-overlay"
            style={{
              width: "132px",
              height: "132px",
              transform: `scale(${current.scale * 1.05})`,
              transformOrigin: "center center",
            }}
          >
            <Orb
              state={state}
              theme="radial"
              aria-hidden="true"
            />
          </div>
        )}

        {/* 4. Specular Glint Highlight (Glossy Pearl Finish) */}
        <div
          className="absolute top-[14%] left-[20%] h-[34%] w-[34%] rounded-full opacity-90 pointer-events-none"
          style={{
            background:
              "radial-gradient(circle at 40% 40%, rgba(255,255,255,1) 0%, rgba(255,255,255,0.7) 45%, rgba(255,255,255,0) 80%)",
          }}
        />

        {/* 5. Lower Rim Refraction */}
        <div
          className="absolute bottom-[8%] right-[10%] h-[26%] w-[26%] rounded-full opacity-50 pointer-events-none"
          style={{
            background:
              "radial-gradient(circle, rgba(165, 243, 252, 0.9) 0%, rgba(37, 99, 235, 0) 80%)",
          }}
        />
      </div>
    </div>
  );
}
