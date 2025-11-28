
import React, { useEffect } from 'react';
import { Section, Icon } from '../components/UI';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const About: React.FC = () => {
  useEffect(() => {
    // Initial Reveal with delay for shutter
    gsap.from(".reveal-anim-main", {
      y: 20,
      opacity: 0,
      duration: 0.6,
      stagger: 0.05,
      ease: "power2.out",
      delay: 0.6 
    });

    gsap.from(".reveal-anim-scroll", {
      scrollTrigger: {
        trigger: ".reveal-anim-scroll",
        start: "top 90%",
      },
      y: 20,
      opacity: 0,
      duration: 0.6,
      stagger: 0.05,
      ease: "power2.out"
    });
  }, []);

  return (
    <div className="pt-[72px]">
      
      {/* Intro Section - Asymmetric Grid */}
      <Section className="!py-12 lg:!py-20 reveal-anim-main">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          
          {/* Column 1: Image (4 cols) */}
          <div className="lg:col-span-4 lg:sticky lg:top-24">
            <div className="relative aspect-square bg-secondary border border-divider overflow-hidden group">
              <img 
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&q=80" 
                alt="Mihir Tale" 
                className="w-full h-full object-cover transition-all duration-700 ease-out grayscale group-hover:grayscale-0 scale-100 group-hover:scale-105 opacity-90 group-hover:opacity-100" 
              />
              <div 
                className="absolute inset-0 pointer-events-none mix-blend-overlay opacity-50 transition-opacity duration-700 group-hover:opacity-20"
                style={{
                  backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 250 250' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`
                }}
              />
              <div className="absolute inset-0 bg-primary/20 pointer-events-none transition-opacity duration-700 group-hover:opacity-0" />
            </div>
          </div>

          {/* Column 2: Content (8 cols) */}
          <div className="lg:col-span-8 flex flex-col gap-8">
            <div>
              <h1 className="text-4xl lg:text-5xl font-semibold text-white mb-4">Hey, I'm Mihir.</h1>
              
              {/* Technical Sub-line (formerly Bio Chip) */}
              <div className="flex flex-wrap gap-x-4 gap-y-2 text-sm text-text-tertiary font-mono border-l-2 border-accent pl-4">
                <span>Marketing Specialist</span>
                <span className="text-divider">/</span>
                <span>SaaS × ERP × CRO</span>
                <span className="text-divider">/</span>
                <span>Mock Brand Creator</span>
                <span className="text-divider">/</span>
                <span>Full-stack Campaign POV</span>
              </div>
            </div>

            <p className="text-lg text-text-secondary leading-relaxed max-w-2xl">
              MBA-backed Marketing Specialist focused on crafting <strong className="text-white font-normal">funnel-first campaigns</strong>, 
              driving <strong className="text-white font-normal">high-intent traffic</strong>, and scaling conversions in 
              B2B SaaS, Oracle Cloud ERP, Audit/GRC, and FMCG mock brands.
            </p>

            {/* Compact Experience Grid */}
            <div className="mt-4 pt-8 border-t border-divider">
              <span className="text-xs font-mono text-text-tertiary uppercase tracking-widest mb-6 block">Experience Snapshot</span>
              <div className="grid md:grid-cols-2 gap-x-8 gap-y-4">
                {[
                  "Oracle-ERP SEO + Webinar Pop-ups",
                  "Promo Campaign Narratives for SaaS",
                  "Hyperlocal Rural Segmentation",
                  "Brand & Packaging Mockups (FMCG)",
                  "Ongoing client support & UX Optimization"
                ].map((item, idx) => (
                  <div key={idx} className="flex gap-3 items-start text-base text-text-secondary">
                    <Icon name="check_circle_outline" className="text-accent text-lg mt-0.5 shrink-0" />
                    <span className="leading-snug">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* Pillars Section - Swiss Grid Layout (Tighter, Connected) */}
      <Section className="!py-0 reveal-anim-scroll">
        <div className="border border-divider bg-secondary/5">
          <div className="grid grid-cols-1 lg:grid-cols-3 divide-y lg:divide-y-0 lg:divide-x divide-divider">
            
            {/* Cell 1 */}
            <div className="p-8 lg:p-10 group hover:bg-secondary transition-colors duration-300">
              <div className="flex items-center justify-between mb-6">
                <Icon name="autorenew" className="text-accent text-3xl" />
                <span className="text-xs font-mono text-text-tertiary opacity-0 group-hover:opacity-100 transition-opacity">01</span>
              </div>
              <h3 className="text-xl text-white mb-3 font-medium">Growth Loops</h3>
              <p className="text-text-secondary text-sm leading-relaxed">
                Building revenue engines that scale beyond single campaigns.
              </p>
            </div>

            {/* Cell 2 */}
            <div className="p-8 lg:p-10 group hover:bg-secondary transition-colors duration-300">
              <div className="flex items-center justify-between mb-6">
                <Icon name="analytics" className="text-accent text-3xl" />
                <span className="text-xs font-mono text-text-tertiary opacity-0 group-hover:opacity-100 transition-opacity">02</span>
              </div>
              <h3 className="text-xl text-white mb-3 font-medium">Data Discipline</h3>
              <p className="text-text-secondary text-sm leading-relaxed">
                Decisions backed by dashboards, segmentation, and measurable outcomes.
              </p>
            </div>

            {/* Cell 3 */}
            <div className="p-8 lg:p-10 group hover:bg-secondary transition-colors duration-300">
              <div className="flex items-center justify-between mb-6">
                <Icon name="auto_awesome" className="text-accent text-3xl" />
                <span className="text-xs font-mono text-text-tertiary opacity-0 group-hover:opacity-100 transition-opacity">03</span>
              </div>
              <h3 className="text-xl text-white mb-3 font-medium">Creative Chaos</h3>
              <p className="text-text-secondary text-sm leading-relaxed">
                Stories that grab attention, funnels that convert it.
              </p>
            </div>

          </div>
        </div>
      </Section>

      {/* Promise Callout - Typographic Break */}
      <Section className="!py-16 reveal-anim-scroll">
        <div className="flex flex-col items-center text-center">
          <Icon name="verified" className="text-accent text-2xl mb-6" />
          <h2 className="text-2xl lg:text-3xl text-white font-medium max-w-2xl leading-tight">
            "If it leaks, breaks, or looks average — I optimize it until it converts."
          </h2>
        </div>
      </Section>

    </div>
  );
};
