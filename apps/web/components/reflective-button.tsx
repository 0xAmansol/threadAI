"use client";

import type React from "react";
import { useState, useCallback } from "react";
import { Button } from "@workspace/ui/components/button";

interface ReflectiveButtonProps extends React.ComponentProps<typeof Button> {
  children: React.ReactNode;
}

export function ReflectiveButton({
  children,
  className,
  ...props
}: ReflectiveButtonProps) {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      const rect = e.currentTarget.getBoundingClientRect();
      setPosition({
        x: ((e.clientX - rect.left) / rect.width) * 100,
        y: ((e.clientY - rect.top) / rect.height) * 100,
      });
    },
    []
  );

  return (
    <Button
      className={`relative group ${className}`}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      {...props}
    >
      <div
        className="absolute inset-[-1px] rounded-full pointer-events-none"
        style={{
          opacity: isHovering ? 1 : 0,
          background: "transparent",
          transition: "opacity 0.15s ease",
        }}
      >
        <div
          className="absolute inset-0 rounded-full"
          style={
            {
              background: "transparent",
              border: "1px solid rgba(45, 212, 191, 0.7)",
              clipPath: "inset(0px round 9999px)",
              maskImage:
                "radial-gradient(circle at var(--mouse-x) var(--mouse-y), black, transparent 100%)",
              WebkitMaskImage:
                "radial-gradient(circle at var(--mouse-x) var(--mouse-y), black, transparent 100%)",
              "--mouse-x": `${position.x}%`,
              "--mouse-y": `${position.y}%`,
            } as React.CSSProperties
          }
        />
      </div>
      {children}
    </Button>
  );
}
