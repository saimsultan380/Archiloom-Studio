"use client";

import { motion, useReducedMotion } from "framer-motion";

export function SteppedBlocks({
  on = "light",
  animate = false,
  size = 8,
  className,
}: {
  on?: "light" | "dark";
  animate?: boolean;
  size?: number;
  className?: string;
}) {
  const reduce = useReducedMotion();
  const gap = Math.round(size * 0.55);
  const third = on === "dark" ? "#FFFFFF" : "#1D1D1D";
  const cells = [
    { color: "#7ED957", x: 0, y: (size + gap) * 2 },
    { color: "#FFC857", x: size + gap, y: size + gap },
    { color: third, x: (size + gap) * 2, y: 0 },
  ];
  const dim = (size + gap) * 2 + size;
  const graphic = (
    <svg width={dim} height={dim} viewBox={`0 0 ${dim} ${dim}`} aria-hidden className={className}>
      {cells.map((cell) => (
        <rect key={`${cell.color}-${cell.x}`} x={cell.x} y={cell.y} width={size} height={size} fill={cell.color} />
      ))}
    </svg>
  );

  if (!animate || reduce) return graphic;

  return (
    <motion.div
      initial={{ opacity: 0, x: -16 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "0px 0px -10% 0px" }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
    >
      {graphic}
    </motion.div>
  );
}
