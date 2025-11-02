"use client";

import { useState, useRef, useEffect } from "react";
import useEmblaCarousel from "embla-carousel-react";
import AutoScroll from "embla-carousel-auto-scroll";
import type { Technology } from "@/lib/technologies-data";

interface TechnologyCarouselProps {
  technologies: Technology[];
}

interface MousePosition {
  x: number;
  y: number;
}

interface ElementPosition {
  x: number;
  y: number;
  width: number;
  height: number;
}

export function TechnologyCarousel({ technologies }: TechnologyCarouselProps) {
  const [globalMousePos, setGlobalMousePos] = useState<MousePosition | null>(null);
  const [elementPositions, setElementPositions] = useState<Record<string, ElementPosition>>({});
  const containerRef = useRef<HTMLDivElement>(null);
  const elementRefs = useRef<Record<string, HTMLDivElement | null>>({});

  const [emblaRef] = useEmblaCarousel(
    {
      loop: true,
      dragFree: true,
      align: "start",
    },
    [
      AutoScroll({
        speed: 0.5,
        stopOnInteraction: false,
        stopOnMouseEnter: false,
      })
    ]
  );

  // Triple the technologies for seamless infinite scroll
  const extendedTechnologies = [...technologies, ...technologies, ...technologies];

  // Update element positions periodically (for carousel movement)
  useEffect(() => {
    const updatePositions = () => {
      const newPositions: Record<string, ElementPosition> = {};
      Object.entries(elementRefs.current).forEach(([key, element]) => {
        if (element && containerRef.current) {
          const rect = element.getBoundingClientRect();
          const containerRect = containerRef.current.getBoundingClientRect();
          newPositions[key] = {
            x: rect.left - containerRect.left + rect.width / 2,
            y: rect.top - containerRect.top + rect.height / 2,
            width: rect.width,
            height: rect.height,
          };
        }
      });
      setElementPositions(newPositions);
    };

    updatePositions();
    const interval = setInterval(updatePositions, 100); // Update every 100ms for smooth carousel tracking

    return () => clearInterval(interval);
  }, []);

  const handleContainerMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    setGlobalMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  const handleContainerMouseLeave = () => {
    setGlobalMousePos(null);
  };

  const getGradientAngle = (elementPos: ElementPosition, mousePos: MousePosition): number => {
    const dx = mousePos.x - elementPos.x;
    const dy = mousePos.y - elementPos.y;
    const angle = Math.atan2(dy, dx) * (180 / Math.PI);
    return angle + 90; // Adjust so 0 degrees is at top
  };

  const getDistanceFromElement = (elementPos: ElementPosition, mousePos: MousePosition): number => {
    const dx = mousePos.x - elementPos.x;
    const dy = mousePos.y - elementPos.y;
    return Math.sqrt(dx * dx + dy * dy);
  };

  const shouldShowHover = (key: string): { show: boolean; angle: number; opacity: number } => {
    if (!globalMousePos || !elementPositions[key]) {
      return { show: false, angle: 0, opacity: 0 };
    }

    const elementPos = elementPositions[key];
    const distance = getDistanceFromElement(elementPos, globalMousePos);
    const maxDistance = 300; // Maximum distance for effect

    if (distance > maxDistance) {
      return { show: false, angle: 0, opacity: 0 };
    }

    const angle = getGradientAngle(elementPos, globalMousePos);
    const opacity = Math.max(0, 1 - distance / maxDistance);

    return { show: true, angle, opacity };
  };

  return (
    <div
      ref={containerRef}
      className="relative overflow-hidden cursor-grab active:cursor-grabbing"
      style={{
        maskImage: 'linear-gradient(to right, transparent, black 5%, black 95%, transparent)',
        WebkitMaskImage: 'linear-gradient(to right, transparent, black 5%, black 95%, transparent)',
      }}
      onMouseMove={handleContainerMouseMove}
      onMouseLeave={handleContainerMouseLeave}
    >
      <div ref={emblaRef}>
        <div className="flex gap-4">
          {extendedTechnologies.map((tech, idx) => {
            const key = `${tech.name}-${idx}`;
            const hoverState = shouldShowHover(key);

            return (
              <div
                key={key}
                ref={(el) => { elementRefs.current[key] = el; }}
                className="flex-none min-w-[160px]"
              >
                <div className="relative">
                  {/* Gradient border overlay - visible based on distance from cursor */}
                  {hoverState.show && (
                    <div
                      className="absolute inset-0 rounded-2xl transition-opacity duration-150 pointer-events-none"
                      style={{
                        background: `conic-gradient(
                          from ${hoverState.angle}deg at 50% 50%,
                          transparent 0deg,
                          ${tech.colorFrom} ${hoverState.angle - 30}deg,
                          ${tech.colorTo} ${hoverState.angle}deg,
                          ${tech.colorFrom} ${hoverState.angle + 30}deg,
                          transparent 60deg 360deg
                        )`,
                        padding: '2px',
                        mask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                        WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                        maskComposite: 'exclude',
                        WebkitMaskComposite: 'xor',
                        opacity: hoverState.opacity,
                      }}
                    />
                  )}

                  {/* Card content */}
                  <div
                    className="relative flex flex-col items-center justify-center p-6 rounded-2xl backdrop-blur-sm bg-white/10 dark:bg-black/10 border-2 border-gray-300/20 dark:border-gray-700/20 transition-all duration-300"
                  >
                    <div className="flex items-center justify-center w-16 h-16 mb-3">
                      <img
                        src={tech.icon}
                        alt={`${tech.name} logo`}
                        className="w-12 h-12 object-contain drop-shadow-lg"
                      />
                    </div>
                    <span className="text-sm font-semibold text-foreground text-center">
                      {tech.name}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
