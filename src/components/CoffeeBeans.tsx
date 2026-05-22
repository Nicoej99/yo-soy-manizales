"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";

interface Bean {
  cx: number; cy: number; rx: number; ry: number; rot: number; opacity: number; floatY: number; floatDur: number; delay: number;
}

// Two preset layouts – "left" anchors to left edge, "right" to right edge
const PRESET: Record<"left" | "right" | "both", Bean[]> = {
  left: [
    { cx: 4,  cy: 18, rx: 9,  ry: 14, rot: -25, opacity: 0.09, floatY: -10, floatDur: 4.2, delay: 0 },
    { cx: 8,  cy: 52, rx: 7,  ry: 11, rot:  15, opacity: 0.07, floatY:  8,  floatDur: 5.0, delay: 0.6 },
    { cx: 3,  cy: 75, rx: 11, ry: 17, rot: -40, opacity: 0.08, floatY: -12, floatDur: 3.8, delay: 1.1 },
    { cx: 11, cy: 88, rx: 6,  ry: 9,  rot:  30, opacity: 0.06, floatY:  6,  floatDur: 4.6, delay: 0.3 },
  ],
  right: [
    { cx: 96, cy: 12, rx: 10, ry: 16, rot:  20, opacity: 0.09, floatY: -8,  floatDur: 4.5, delay: 0.2 },
    { cx: 92, cy: 40, rx: 7,  ry: 11, rot: -35, opacity: 0.07, floatY:  10, floatDur: 3.9, delay: 0.8 },
    { cx: 97, cy: 65, rx: 12, ry: 19, rot:  10, opacity: 0.08, floatY: -14, floatDur: 5.2, delay: 0.4 },
    { cx: 90, cy: 82, rx: 8,  ry: 12, rot: -20, opacity: 0.06, floatY:  7,  floatDur: 4.1, delay: 1.3 },
  ],
  both: [
    { cx: 4,  cy: 20, rx: 9,  ry: 14, rot: -25, opacity: 0.09, floatY: -10, floatDur: 4.2, delay: 0 },
    { cx: 7,  cy: 60, rx: 11, ry: 17, rot:  15, opacity: 0.07, floatY:  8,  floatDur: 5.0, delay: 0.6 },
    { cx: 3,  cy: 85, rx: 7,  ry: 11, rot: -40, opacity: 0.08, floatY: -9,  floatDur: 3.8, delay: 1.0 },
    { cx: 96, cy: 15, rx: 10, ry: 16, rot:  20, opacity: 0.09, floatY: -8,  floatDur: 4.5, delay: 0.3 },
    { cx: 93, cy: 45, rx: 8,  ry: 13, rot: -35, opacity: 0.07, floatY:  10, floatDur: 3.9, delay: 0.9 },
    { cx: 97, cy: 75, rx: 12, ry: 19, rot:  10, opacity: 0.08, floatY: -12, floatDur: 5.2, delay: 0.5 },
  ],
};

function Bean({ cx, cy, rx, ry, rot, opacity, floatY, floatDur, delay }: Bean) {
  const ref = useRef<SVGGElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    const anim = gsap.to(ref.current, {
      y: floatY,
      x: floatY > 0 ? 3 : -3,
      rotation: rot + (floatY > 0 ? 8 : -8),
      duration: floatDur,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
      delay,
      transformOrigin: "center center",
    });
    return () => { anim.kill(); };
  }, [floatY, floatDur, delay, rot]);

  return (
    <g ref={ref} transform={`translate(${cx}, ${cy}) rotate(${rot})`} opacity={opacity}>
      {/* Bean body */}
      <ellipse cx="0" cy="0" rx={rx} ry={ry} fill="currentColor" />
      {/* Center groove */}
      <line
        x1="0" y1={-ry * 0.72}
        x2="0" y2={ry * 0.72}
        stroke="var(--bg)"
        strokeWidth={rx * 0.22}
        strokeLinecap="round"
        opacity={0.55}
      />
    </g>
  );
}

export default function CoffeeBeans({
  variant = "both",
  className = "",
}: {
  variant?: "left" | "right" | "both";
  className?: string;
}) {
  const beans = PRESET[variant];
  return (
    <svg
      className={`absolute inset-0 w-full h-full pointer-events-none select-none ${className}`}
      viewBox="0 0 100 100"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
    >
      <g className="dark:text-[#7B4A1A] text-[#3D1E06]">
        {beans.map((b, i) => (
          <Bean key={i} {...b} />
        ))}
      </g>
    </svg>
  );
}
