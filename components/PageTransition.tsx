
import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

export const PageTransition: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const tl = gsap.timeline();

    // Bars slide up to reveal content
    tl.to(".transition-bar", {
      height: "0%",
      duration: 0.6,
      stagger: 0.05,
      ease: "power3.inOut",
      delay: 0.2
    });

    // Optional: Fade out container pointer events slightly earlier
    tl.set(containerRef.current, { pointerEvents: "none" }, "-=0.4");

  }, { scope: containerRef });

  return (
    <div 
      ref={containerRef} 
      className="fixed inset-0 z-[100] flex pointer-events-auto w-full h-full"
    >
      {[...Array(5)].map((_, i) => (
        <div 
          key={i} 
          className="transition-bar relative flex-1 bg-secondary border-r border-divider last:border-r-0 h-full origin-top flex flex-col justify-end overflow-hidden"
        >
          {/* Decorative scanner line at bottom of each bar */}
          <div className="w-full h-[2px] bg-accent/50 shadow-[0_0_10px_#4F9CF9] mb-4 opacity-50" />
          
          {/* Subtle tech patterns */}
          <div className="absolute top-0 left-0 w-full h-full opacity-[0.03]" 
            style={{ 
              backgroundImage: 'linear-gradient(0deg, transparent 24%, rgba(255, 255, 255, .3) 25%, rgba(255, 255, 255, .3) 26%, transparent 27%, transparent 74%, rgba(255, 255, 255, .3) 75%, rgba(255, 255, 255, .3) 76%, transparent 77%, transparent), linear-gradient(90deg, transparent 24%, rgba(255, 255, 255, .3) 25%, rgba(255, 255, 255, .3) 26%, transparent 27%, transparent 74%, rgba(255, 255, 255, .3) 75%, rgba(255, 255, 255, .3) 76%, transparent 77%, transparent)',
              backgroundSize: '50px 50px'
            }} 
          />
        </div>
      ))}
    </div>
  );
};
