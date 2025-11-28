
import React, { useRef, useState } from 'react';
import { Section, Icon } from '../components/UI';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

// --- Types ---
type ProjectType = 'website' | 'mock' | 'case-study';

interface ProjectData {
  id: string;
  client: string;
  category: string;
  outcome: string;
  tasks: string[];
  tags: string[];
  type: ProjectType;
}

// --- Data ---
const projects: ProjectData[] = [
  {
    id: 'samkit',
    client: 'Samkit',
    category: 'Oracle-ERP SEO & CRO',
    outcome: 'High-intent traffic & lead gen pipelines',
    tasks: ['On-page SEO + Speed Optimization', 'Intent capture for niche ERP buyers', '24/7 form + content support'],
    tags: ['SEO', 'B2B', 'ERP'],
    type: 'website'
  },
  {
    id: 'rozella',
    client: 'Rozella',
    category: 'Hardware Campaign',
    outcome: 'Brand positioning & catalog intent',
    tasks: ['Persona led storytelling scripts', 'Premium hardware B2B positioning', 'Engagement → Visit → Inquiry flow'],
    tags: ['Brand-Strategy', 'B2B', 'Copywriting'],
    type: 'website'
  },
  {
    id: 'jbc',
    client: 'JBC Naturals',
    category: 'Sustainable Coir Products',
    outcome: 'Eco-export market penetration',
    tasks: ['Green-tech narrative building', 'Export-focused SEO architecture', 'Conversion funnel for wholesalers'],
    tags: ['Sustainability', 'Export', 'SEO'],
    type: 'website'
  },
  {
    id: 'supreme',
    client: 'Supreme Surgico',
    category: 'Medical Equipment',
    outcome: 'Global B2B catalog indexing',
    tasks: ['Medical catalog taxonomy', 'Trust-signal optimization', 'Lead qualification flows'],
    tags: ['Healthcare', 'B2B', 'Catalog'],
    type: 'website'
  },
  {
    id: 'basil',
    client: 'Basil Real Estate',
    category: 'Real Estate Growth',
    outcome: 'Local SEO & Lead capture',
    tasks: ['Hyperlocal search dominance', 'High-converting landing pages', 'Automated lead nurturing'],
    tags: ['Real-Estate', 'Local-SEO', 'Lead-Gen'],
    type: 'website'
  },
  {
    id: 'olia',
    client: 'Olia Skincare',
    category: 'Mock Brand',
    outcome: 'Portfolio-first launch framing',
    tasks: ['Identity + Packaging + Email flows', 'Clear funnel storytelling design', 'Creative assets for youth aura'],
    tags: ['Branding', 'FMCG', 'Design'],
    type: 'mock'
  },
  {
    id: 'fizzify',
    client: 'Fizzify',
    category: 'Mock Brand',
    outcome: 'Mass engagement narrative',
    tasks: ['Brand + Ad storyboard + Copy', 'FMCG youth audience appeal', 'Campaign-ready asset funnel'],
    tags: ['Youth-Marketing', 'Ad-Copy', 'Design'],
    type: 'mock'
  }
];

// --- Spotlight Card Component ---
const SpotlightCard: React.FC<{ project: ProjectData; index: number }> = ({ project, index }) => {
  const divRef = useRef<HTMLDivElement>(null);
  const [isFocused, setIsFocused] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!divRef.current) return;
    const rect = divRef.current.getBoundingClientRect();
    setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  const getCtaText = (type: ProjectType) => {
    switch (type) {
      case 'website': return 'View Website';
      case 'mock': return 'View Mock Brand';
      case 'case-study': return 'Read Case Study';
      default: return 'View Project';
    }
  };

  const getCtaIcon = (type: ProjectType) => {
    switch (type) {
      case 'website': return 'public';
      case 'mock': return 'layers';
      case 'case-study': return 'description';
      default: return 'arrow_forward';
    }
  };

  return (
    <div
      ref={divRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsFocused(true)}
      onMouseLeave={() => setIsFocused(false)}
      className="project-card relative h-full bg-secondary overflow-hidden group rounded-sm"
    >
      {/* Spotlight Effect - Border */}
      <div
        className="pointer-events-none absolute -inset-px opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10"
        style={{
          background: `radial-gradient(600px circle at ${position.x}px ${position.y}px, rgba(79, 156, 249, 0.4), transparent 40%)`
        }}
      />
      
      {/* Spotlight Effect - Background Highlight */}
      <div
        className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-0"
        style={{
          background: `radial-gradient(800px circle at ${position.x}px ${position.y}px, rgba(79, 156, 249, 0.06), transparent 40%)`
        }}
      />

      {/* Content Container (Inner masking for border effect) */}
      <div className="relative h-full bg-[#151515] m-[1px] p-8 lg:p-10 flex flex-col z-20">
        
        {/* HUD Elements */}
        <div className="flex justify-between items-start mb-6 opacity-50 font-mono text-xs tracking-widest text-text-tertiary">
          <span>{`PRJ_${index < 9 ? '0' : ''}${index + 1}`}</span>
          <span className="group-hover:text-accent transition-colors">
            {project.type === 'website' ? 'LIVE_DEPLOY' : project.type === 'mock' ? 'MOCK_ENV' : 'CASE_FILE'}
          </span>
        </div>

        {/* Header */}
        <div className="mb-6">
          <h2 className="text-2xl lg:text-3xl font-bold text-white mb-2 group-hover:text-accent transition-colors duration-300">
            {project.client}
          </h2>
          <div className="text-sm font-mono text-text-secondary border-l border-accent/50 pl-3 mb-4">
            {project.category}
          </div>
          <p className="text-lg italic text-white/90">
            {project.outcome}
          </p>
        </div>

        {/* Tasks (Data List) */}
        <ul className="space-y-3 mb-8 flex-grow">
          {project.tasks.map((task, i) => (
            <li key={i} className="flex gap-3 text-text-secondary text-sm lg:text-base items-start">
              <span className="text-accent/50 mt-1.5 text-[10px] font-mono">{`0${i+1}`}</span>
              <span className="leading-relaxed">{task}</span>
            </li>
          ))}
        </ul>

        {/* Footer: Tags & CTA */}
        <div className="mt-auto border-t border-divider pt-6">
          <div className="flex flex-wrap gap-2 mb-6">
            {project.tags.map(tag => (
              <span key={tag} className="px-2 py-1 bg-primary/50 border border-divider text-[10px] uppercase tracking-wider text-text-secondary font-mono">
                {tag}
              </span>
            ))}
          </div>
          
          <button className="w-full group/btn relative overflow-hidden border border-accent/30 bg-accent/5 hover:bg-accent/10 transition-all duration-300 h-12 flex items-center justify-between px-6">
            <span className="font-mono text-sm text-accent tracking-wide uppercase font-bold">
              {getCtaText(project.type)}
            </span>
            <Icon name={getCtaIcon(project.type)} className="text-accent group-hover/btn:translate-x-1 transition-transform" />
            
            {/* Button corner accents */}
            <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-accent opacity-50" />
            <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-accent opacity-50" />
          </button>
        </div>

        {/* Card Decorative Corners */}
        <div className="absolute top-0 left-0 w-8 h-8 border-t border-l border-divider/50 pointer-events-none transition-colors group-hover:border-accent/30" />
        <div className="absolute bottom-0 right-0 w-8 h-8 border-b border-r border-divider/50 pointer-events-none transition-colors group-hover:border-accent/30" />
      </div>
    </div>
  );
};

export const Work: React.FC = () => {
  useGSAP(() => {
    // Initial Reveal with delay
    gsap.from(".header-anim > *", {
      y: 30,
      opacity: 0,
      duration: 0.8,
      stagger: 0.1,
      ease: "power2.out",
      delay: 0.6
    });

    gsap.from(".project-card", {
      y: 50,
      opacity: 0,
      duration: 0.8,
      stagger: 0.1,
      ease: "power2.out",
      scrollTrigger: {
        trigger: ".project-grid",
        start: "top 90%"
      }
    });
  });

  return (
    <div className="pt-[72px] pb-20">
      {/* Header */}
      <Section className="text-center relative header-anim">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[200px] bg-accent/5 blur-[100px] rounded-full pointer-events-none" />
        <h1 className="relative text-4xl lg:text-7xl font-semibold text-white mb-6 tracking-tight">
          System <span className="text-accent">Deployments</span>
        </h1>
        <p className="relative text-xl text-text-secondary max-w-2xl mx-auto font-light">
          Real-world metrics moved. Funnels optimized. <br className="hidden md:block"/>
          <span className="text-white">Live environments</span> and <span className="text-white">strategic simulations</span>.
        </p>
      </Section>

      {/* Grid */}
      <Section>
        <div className="project-grid grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {projects.map((p, index) => (
            <SpotlightCard key={p.id} project={p} index={index} />
          ))}
        </div>
      </Section>
    </div>
  );
};
