"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { technologiesData } from "@/lib/technologies-data";
import { TechnologyCarousel } from "@/components/ui/technology-carousel";

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

export function Technologies() {
  const t = useTranslations("technologies");
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  // State to track which categories need carousels
  const [categoriesNeedCarousel, setCategoriesNeedCarousel] = useState<{
    [key: string]: boolean;
  }>({});

  // State to track global mouse position and element positions per category
  const [globalMousePositions, setGlobalMousePositions] = useState<Record<string, MousePosition | null>>({});
  const [elementPositions, setElementPositions] = useState<Record<string, Record<string, ElementPosition>>>({});
  const containerRefs = useRef<Record<string, HTMLDivElement | null>>({});
  const elementRefs = useRef<Record<string, Record<string, HTMLDivElement | null>>>({});

  const handleContainerMouseMove = (e: React.MouseEvent<HTMLDivElement>, categoryKey: string) => {
    const container = containerRefs.current[categoryKey];
    if (!container) return;
    const rect = container.getBoundingClientRect();
    setGlobalMousePositions(prev => ({
      ...prev,
      [categoryKey]: {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      }
    }));
  };

  const handleContainerMouseLeave = (categoryKey: string) => {
    setGlobalMousePositions(prev => ({
      ...prev,
      [categoryKey]: null,
    }));
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

  const shouldShowHover = (categoryKey: string, techKey: string): { show: boolean; angle: number; opacity: number } => {
    const mousePos = globalMousePositions[categoryKey];
    const elementPos = elementPositions[categoryKey]?.[techKey];

    if (!mousePos || !elementPos) {
      return { show: false, angle: 0, opacity: 0 };
    }

    const distance = getDistanceFromElement(elementPos, mousePos);
    const maxDistance = 300; // Maximum distance for effect

    if (distance > maxDistance) {
      return { show: false, angle: 0, opacity: 0 };
    }

    const angle = getGradientAngle(elementPos, mousePos);
    const opacity = Math.max(0, 1 - distance / maxDistance);

    return { show: true, angle, opacity };
  };

  // Update element positions when they change
  useEffect(() => {
    const updatePositions = () => {
      const newPositions: Record<string, Record<string, ElementPosition>> = {};

      Object.entries(elementRefs.current).forEach(([categoryKey, categoryRefs]) => {
        const container = containerRefs.current[categoryKey];
        if (!container) return;

        const containerRect = container.getBoundingClientRect();
        newPositions[categoryKey] = {};

        Object.entries(categoryRefs).forEach(([techKey, element]) => {
          if (element) {
            const rect = element.getBoundingClientRect();
            newPositions[categoryKey][techKey] = {
              x: rect.left - containerRect.left + rect.width / 2,
              y: rect.top - containerRect.top + rect.height / 2,
              width: rect.width,
              height: rect.height,
            };
          }
        });
      });

      setElementPositions(newPositions);
    };

    updatePositions();
    window.addEventListener('resize', updatePositions);

    return () => window.removeEventListener('resize', updatePositions);
  }, [categoriesNeedCarousel]);

  useEffect(() => {
    // Check if each category needs a carousel based on viewport width
    const checkCarouselNeeds = () => {
      const viewportWidth = window.innerWidth;
      const itemWidth = 160 + 16; // min-w-[160px] + gap-4
      const containerPadding = 32; // px-4 on both sides
      const availableWidth = viewportWidth - containerPadding * 2;

      const needsCarousel: { [key: string]: boolean } = {};

      technologiesData.forEach((category) => {
        const totalWidth = category.technologies.length * itemWidth;
        needsCarousel[category.key] = totalWidth > availableWidth;
      });

      setCategoriesNeedCarousel(needsCarousel);
    };

    checkCarouselNeeds();
    window.addEventListener("resize", checkCarouselNeeds);

    return () => window.removeEventListener("resize", checkCarouselNeeds);
  }, []);

  return (
    <section ref={ref} className="py-24 bg-muted/30">
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            {t("title")}
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            {t("subtitle")}
          </p>
        </motion.div>

        {/* Technologies Categories */}
        <div className="max-w-7xl mx-auto space-y-12">
          {technologiesData.map((category, catIndex) => (
            <motion.div
              key={category.key}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: catIndex * 0.1 }}
              className="space-y-6"
            >
              {/* Category Title */}
              <h3 className="text-2xl font-bold capitalize">
                {t(`categories.${category.key}`)}
              </h3>

              {/* Technologies Display - Carousel or Static Grid */}
              {categoriesNeedCarousel[category.key] ? (
                <TechnologyCarousel
                  technologies={category.technologies}
                />
              ) : (
                <div
                  ref={(el) => { containerRefs.current[category.key] = el; }}
                  className="flex flex-wrap gap-4"
                  onMouseMove={(e) => handleContainerMouseMove(e, category.key)}
                  onMouseLeave={() => handleContainerMouseLeave(category.key)}
                >
                  {category.technologies.map((tech) => {
                    const techKey = `${category.key}-${tech.name}`;
                    const hoverState = shouldShowHover(category.key, techKey);

                    // Initialize element refs for this category if needed
                    if (!elementRefs.current[category.key]) {
                      elementRefs.current[category.key] = {};
                    }

                    return (
                      <div
                        key={tech.name}
                        ref={(el) => {
                          if (!elementRefs.current[category.key]) {
                            elementRefs.current[category.key] = {};
                          }
                          elementRefs.current[category.key][techKey] = el;
                        }}
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
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
