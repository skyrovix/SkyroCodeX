"use client";

import React from "react";

interface AiOrbProps {
  size?: "sm" | "md" | "lg";
  className?: string;
}

export function AiOrb({ size = "md", className = "" }: AiOrbProps) {
  const sizeMap = {
    sm: {
      outer: "h-4 w-4",
      glow: "blur-[4px] inset-[-2px]",
      shadow: "0 0 8px rgba(56, 189, 248, 0.75), 0 0 14px rgba(99, 102, 241, 0.4)",
    },
    md: {
      outer: "h-5 w-5 sm:h-6 sm:w-6",
      glow: "blur-[6px] inset-[-3px]",
      shadow: "0 0 12px rgba(56, 189, 248, 0.85), 0 0 20px rgba(99, 102, 241, 0.5)",
    },
    lg: {
      outer: "h-7 w-7 sm:h-8 sm:w-8",
      glow: "blur-[8px] inset-[-4px]",
      shadow: "0 0 16px rgba(56, 189, 248, 0.9), 0 0 26px rgba(99, 102, 241, 0.6)",
    },
  };

  const current = sizeMap[size];

  return (
    <div
      className={`relative inline-flex items-center justify-center shrink-0 select-none ${current.outer} ${className}`}
      title="Skyro AI Engine (Active)"
    >
      {/* Outer Diffuse Iridescent Aura (Soft Cyan / Azure Glow matching screenshot) */}
      <div
        className={`absolute rounded-full bg-gradient-to-tr from-cyan-400 via-sky-400 to-indigo-500 opacity-80 animate-pulse ${current.glow}`}
      />

      {/* Secondary Soft Ambient Halo */}
      <div
        className={`absolute rounded-full bg-cyan-300/40 blur-[3px] inset-[-1px]`}
      />

      {/* 3D Iridescent Pearl Sphere matching Image 4 (media_1795148606435_cf675c77.png) */}
      <div
        className="relative h-full w-full rounded-full transition-transform hover:scale-110 duration-300"
        style={{
          background:
            "radial-gradient(circle at 35% 28%, #ffffff 0%, #cffafe 16%, #7dd3fc 36%, #38bdf8 55%, #6366f1 78%, #4338ca 100%)",
          boxShadow: `inset -1.5px -1.5px 3.5px rgba(15, 23, 42, 0.5), inset 1.5px 1.5px 3px rgba(255, 255, 255, 0.95), ${current.shadow}`,
        }}
      >
        {/* Specular Glint Reflection */}
        <div
          className="absolute top-[16%] left-[22%] h-[32%] w-[32%] rounded-full opacity-90 pointer-events-none"
          style={{
            background:
              "radial-gradient(circle at 40% 40%, rgba(255,255,255,1) 0%, rgba(255,255,255,0.7) 45%, rgba(255,255,255,0) 80%)",
          }}
        />

        {/* Lower Subtle Rim Highlight for 3D curvature */}
        <div
          className="absolute bottom-[8%] right-[12%] h-[24%] w-[24%] rounded-full opacity-45 pointer-events-none"
          style={{
            background:
              "radial-gradient(circle, rgba(165, 243, 252, 0.9) 0%, rgba(99, 102, 241, 0) 80%)",
          }}
        />
      </div>
    </div>
  );
}
