
import React, { useEffect, useRef, useState, useMemo } from 'react';
import { NavLink } from 'react-router-dom';
import { Section, Button, Icon } from '../components/UI';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// --- Interactive Data Matrix Component ---
const InteractiveGrid: React.FC = () => {
  const [mousePos, setMousePos] = useState({ x: -1000, y: -1000 });
  const [pulsingDots, setPulsingDots] = useState<number[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Responsive Grid State
  const [gridConfig, setGridConfig] = useState({ rows: 12, cols: 12, gap: 28 });

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
         // Mobile/Tablet: Smaller grid
         setGridConfig({ rows: 9, cols: 9, gap: 24 });
      } else {
         // Desktop: Standard grid
         setGridConfig({ rows: 12, cols: 12, gap: 28 });
      }
    };
    
    handleResize(); // Init
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const { rows, cols, gap } = gridConfig;
  const dotRadius = 2;

  useEffect(() => {
    const interval = setInterval(() => {
      const count = Math.floor(Math.random() * 3) + 1;
      const newPulsing = Array.from({ length: count }, () => 
        Math.floor(Math.random() * (rows * cols))
      );
      setPulsingDots(newPulsing);
      setTimeout(() => setPulsingDots([]), 1000);
    }, 2500);
    return () => clearInterval(interval);
  }, [rows, cols]);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    setMousePos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  const handleMouseLeave = () => {
    setMousePos({ x: -1000, y: -1000 });
  };

  const dots = useMemo(() => {
    const grid = [];
    for (let i = 0; i < rows; i++) {
      for (let j = 0; j < cols; j++) {
        const index = i * cols + j;
        const cx = j * gap + gap / 2;
        const cy = i * gap + gap / 2;
        const dx = cx - mousePos.x;
        const dy = cy - mousePos.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const isHovered = dist < 120;
        const isPulsing = pulsingDots.includes(index);
        const scale = isHovered ? 1.8 - (dist / 120) * 0.8 : isPulsing ? 1.5 : 1;
        const opacity = isHovered ? 1 : isPulsing ? 0.8 : 0.15;
        const fill = (isHovered || isPulsing) ? '#4F9CF9' : '#FFFFFF';

        grid.push(
          <circle
            key={`${i}-${j}`}
            cx={cx}
            cy={cy}
            r={dotRadius}
            fill={fill}
            style={{
              transition: 'all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
              transform: `scale(${scale})`,
              transformOrigin: `${cx}px ${cy}px`,
              opacity
            }}
          />
        );
      }
    }
    return grid;
  }, [mousePos, pulsingDots, rows, cols, gap]);

  return (
    <div 
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative w-fit mx-auto cursor-crosshair select-none"
      aria-hidden="true"
    >
      <svg width={cols * gap} height={rows * gap} viewBox={`0 0 ${cols * gap} ${rows * gap}`} className="overflow-visible">
        <defs>
          <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
            <feMerge>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>
        <g filter="url(#glow)">{dots}</g>
      </svg>
      <div className="absolute -top-4 -left-4 w-3 h-3 border-t border-l border-divider" />
      <div className="absolute -bottom-4 -right-4 w-3 h-3 border-b border-r border-divider" />
      <div className="absolute top-0 right-0 text-[10px] text-divider font-mono opacity-50 tracking-widest">SYS.O1</div>
    </div>
  );
};

export const Home: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Hero Animations
      gsap.from(".hero-content > *", {
        y: 30, opacity: 0, duration: 0.8, stagger: 0.1, ease: "power2.out", delay: 0.6
      });
      gsap.from(".hero-graphic", {
        opacity: 0, scale: 0.95, duration: 1.2, ease: "power2.out", delay: 0.8
      });

      // 2. Text Reveal (Scroll Scrub)
      const textElements = gsap.utils.toArray('.reveal-text-line');
      textElements.forEach((el: any) => {
        gsap.to(el, {
          backgroundPositionX: "0%",
          ease: "none",
          scrollTrigger: {
            trigger: el,
            start: "top 80%",
            end: "bottom 40%",
            scrub: 1,
          }
        });
      });

      // 3. Creative Process Vertical Timeline
      // Animate progress line
      gsap.to(".timeline-progress", {
        height: "100%",
        ease: "none",
        scrollTrigger: {
          trigger: timelineRef.current,
          start: "top center",
          end: "bottom center",
          scrub: 1,
        }
      });

      // Light up nodes
      const nodes = gsap.utils.toArray(".timeline-node");
      nodes.forEach((node: any) => {
        gsap.fromTo(node, 
          { backgroundColor: "#1A1A1A", borderColor: "#2A2A2A" },
          { 
            backgroundColor: "#4F9CF9", 
            borderColor: "#4F9CF9", 
            duration: 0.1,
            scrollTrigger: {
              trigger: node,
              start: "top 55%", // Trigger when node hits center-ish of viewport (aligned with line progress)
              toggleActions: "play reverse play reverse"
            }
          }
        );
        
        // Highlight text associated with node
        gsap.fromTo(node.closest(".timeline-step").querySelector(".step-content"),
          { opacity: 0.4 },
          { 
            opacity: 1, 
            duration: 0.3,
            scrollTrigger: {
              trigger: node,
              start: "top 55%",
              toggleActions: "play reverse play reverse"
            }
          }
        );
      });

      // 4. Staggered Fade Up for Vertical Sections
      gsap.utils.toArray('.fade-up-trigger').forEach((el: any) => {
        gsap.from(el, {
          y: 40,
          opacity: 0,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: el,
            start: "top 85%"
          }
        });
      });

    }, containerRef);

    return () => ctx.revert();
  }, []);

  const metrics = [
    { label: 'Traffic', icon: 'trending_up' },
    { label: 'Leads', icon: 'insights' },
    { label: 'Intent', icon: 'ads_click' },
    { label: 'Conversions', icon: 'swap_vert' },
    { label: 'Engagement', icon: 'favorite_border' },
  ];

  const processSteps = [
    {
      step: '01',
      title: 'Diagnose',
      desc: 'Deep dive technical audits to uncover leaks in the funnel. We don\'t guess; we inspect the code, the data, and the user behavior.',
      icon: 'radar'
    },
    {
      step: '02',
      title: 'Architect',
      desc: 'Designing the growth system. Mapping user journeys, segmentation logic, and automation workflows that operate while you sleep.',
      icon: 'architecture'
    },
    {
      step: '03',
      title: 'Deploy',
      desc: 'Execution with precision. Launching campaigns, shipping landing pages, and integrating toolstacks without breaking production.',
      icon: 'rocket_launch'
    },
    {
      step: '04',
      title: 'Scale',
      desc: 'Iterative optimization. Using feedback loops to compound results, turning linear growth into exponential revenue.',
      icon: 'all_inclusive'
    }
  ];

  return (
    <div ref={containerRef} className="pt-[72px] overflow-hidden">
      
      {/* 1. HERO SECTION */}
      <Section className="min-h-[90vh] flex items-center">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 w-full items-center">
          <div className="hero-content flex flex-col justify-center order-2 lg:order-1">
            <h1 className="text-4xl lg:text-7xl font-semibold leading-[1.2] lg:leading-[1.1] text-white mb-8">
              Marketing that performs like code,<br className="hidden xl:block" />
              delivers like clockwork.
            </h1>
            <p className="text-lg lg:text-xl text-text-secondary max-w-[600px] mb-8 leading-relaxed">
              Funnel-first growth built for niche B2B, ERP, SaaS 
              & brands that demand results.
            </p>
            <div className="flex flex-wrap gap-3 mb-10">
              {metrics.map((m) => (
                <div key={m.label} className="flex items-center gap-2 px-3 py-1.5 border border-divider rounded-full bg-secondary/30 backdrop-blur-sm">
                  <Icon name={m.icon} className="text-accent text-sm" />
                  <span className="text-xs lg:text-sm text-text-secondary">{m.label}</span>
                </div>
              ))}
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <NavLink to="/work">
                <Button variant="primary">View My Work <span className="ml-2">→</span></Button>
              </NavLink>
            </div>
          </div>
          <div className="hero-graphic order-1 lg:order-2 flex justify-center lg:justify-end items-center h-full min-h-[300px] lg:min-h-auto">
            <InteractiveGrid />
          </div>
        </div>
      </Section>

      {/* 2. TEXT REVEAL SECTION (Vertical Scroll) */}
      <Section className="min-h-[80vh] flex flex-col justify-center">
        <div className="max-w-4xl mx-auto space-y-4">
          <p className="font-mono text-accent mb-6 opacity-80">// THE PHILOSOPHY</p>
          {["In a world of noise,", "clarity converts.", "I don't just run ads;", "I build ecosystems where", "every click has a destination", "and every user has a purpose."].map((line, i) => (
            <h2 
              key={i}
              className="reveal-text-line text-3xl md:text-5xl lg:text-6xl font-semibold leading-tight bg-clip-text text-transparent bg-gradient-to-r from-white via-white to-text-tertiary/20 bg-[length:200%_100%] bg-[100%_0] select-none"
            >
              {line}
            </h2>
          ))}
        </div>
      </Section>

      {/* 3. CREATIVE PROCESS TIMELINE (Responsive Vertical) */}
      <Section className="py-24 relative">
         <div className="text-center mb-16 fade-up-trigger">
            <span className="font-mono text-accent block mb-4">// THE SYSTEM</span>
            <h2 className="text-3xl lg:text-5xl font-semibold text-white">From Audit to Automation</h2>
         </div>

         <div ref={timelineRef} className="relative max-w-4xl mx-auto">
            {/* Central/Side Spine Line */}
            <div className="absolute left-6 lg:left-1/2 top-0 bottom-0 w-[1px] bg-divider transform lg:-translate-x-1/2">
               {/* Progress Line */}
               <div className="timeline-progress w-full bg-accent h-0 shadow-[0_0_10px_#4F9CF9]" />
            </div>

            <div className="flex flex-col gap-20 lg:gap-32 relative z-10">
               {processSteps.map((step, i) => (
                  <div key={i} className={`timeline-step flex flex-col lg:flex-row items-start lg:items-center gap-8 lg:gap-20 ${i % 2 !== 0 ? 'lg:flex-row-reverse' : ''}`}>
                     
                     {/* Text Content */}
                     <div className="step-content flex-1 lg:text-right w-full pl-16 lg:pl-0 opacity-40 transition-opacity duration-500">
                        <div className={`flex flex-col ${i % 2 !== 0 ? 'lg:items-start lg:text-left' : 'lg:items-end lg:text-right'}`}>
                           <span className="text-5xl font-mono text-divider/40 font-bold mb-4 block">{step.step}</span>
                           <h3 className="text-2xl text-white font-medium mb-3 flex items-center gap-3">
                              <span className="lg:hidden text-accent"><Icon name={step.icon} /></span>
                              {step.title}
                           </h3>
                           <p className="text-text-secondary leading-relaxed max-w-sm">{step.desc}</p>
                        </div>
                     </div>

                     {/* Center Node */}
                     <div className="absolute left-6 lg:left-1/2 w-4 h-4 rounded-full bg-secondary border border-divider transform -translate-x-1/2 mt-1.5 lg:mt-0 timeline-node shadow-2xl z-20 transition-colors duration-300">
                         {/* Pulse effect when active could be added here via CSS or GSAP */}
                     </div>

                     {/* Icon/Graphic Side */}
                     <div className="flex-1 hidden lg:flex items-center justify-start opacity-20">
                        <Icon name={step.icon} className={`text-8xl text-white ${i % 2 !== 0 ? 'ml-auto' : 'mr-auto'}`} />
                     </div>
                  </div>
               ))}
            </div>
         </div>
      </Section>

      {/* 4. WORK TEASER */}
      <Section className="py-24 lg:py-32 relative z-10 bg-primary border-b border-divider/50">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="fade-up-trigger">
            <span className="font-mono text-accent mb-4 block">// RECENT WORK</span>
            <h2 className="text-4xl lg:text-5xl font-semibold text-white mb-6">
              Projects that moved <br/>
              <span className="text-text-secondary">the needle.</span>
            </h2>
            <p className="text-lg text-text-secondary mb-8 leading-relaxed">
              A selection of campaigns, audits, and growth strategies executed for B2B, ERP, and FMCG clients.
            </p>
            <NavLink to="/work">
              <Button variant="secondary">View Work <span className="ml-2">→</span></Button>
            </NavLink>
          </div>
          
          <div className="fade-up-trigger relative p-8 border border-divider bg-secondary/30">
            <div className="absolute -top-4 -right-4 text-6xl text-divider/20 font-bold font-mono">20+</div>
            <ul className="space-y-6">
              <li className="flex items-center justify-between border-b border-divider/50 pb-4">
                <span className="text-xl text-white">Oracle-ERP</span>
                <span className="text-accent font-mono text-sm">Lead Gen</span>
              </li>
              <li className="flex items-center justify-between border-b border-divider/50 pb-4">
                <span className="text-xl text-white">Rozella Hardware</span>
                <span className="text-accent font-mono text-sm">B2B Growth</span>
              </li>
              <li className="flex items-center justify-between border-b border-divider/50 pb-4">
                <span className="text-xl text-white">Supreme Surgico</span>
                <span className="text-accent font-mono text-sm">Global Catalog</span>
              </li>
            </ul>
          </div>
        </div>
      </Section>

      {/* 5. FINAL CTA (Portfolio Vibe) */}
      <Section className="min-h-[50vh] flex flex-col items-center justify-center py-24 lg:py-32 fade-up-trigger relative overflow-hidden">
        {/* Subtle gradient background for fluidity */}
        <div className="absolute inset-0 bg-gradient-to-b from-primary via-secondary/20 to-primary pointer-events-none" />
        
        <div className="relative z-10 flex flex-col items-center text-center">
          <h2 className="text-4xl lg:text-7xl font-semibold text-white mb-8 tracking-tight max-w-4xl">
            Interested in my <span className="text-accent">process?</span>
          </h2>
          <p className="text-xl text-text-secondary mb-12 max-w-2xl leading-relaxed">
            I'm currently available for full-time roles and high-impact projects. 
            Let's discuss how I can contribute to your growth team.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 w-full sm:w-auto">
             <NavLink to="/contact" className="w-full sm:w-auto">
               <Button variant="primary" className="h-14 px-10 text-lg w-full sm:w-auto justify-center">Let's Connect</Button>
             </NavLink>
             <a href="#" className="w-full sm:w-auto" onClick={(e) => e.preventDefault()}>
                <Button variant="secondary" className="h-14 px-10 text-lg w-full sm:w-auto justify-center" icon="download">Download Resume</Button>
             </a>
          </div>
        </div>
      </Section>

    </div>
  );
};
