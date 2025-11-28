
import React, { useRef } from 'react';
import { Section, Icon } from '../components/UI';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

// --- Types ---
interface SkillItem {
  name: string;
  icon: string;
  category: 'strategy' | 'channel' | 'tool';
  desc?: string;
}

// --- Data ---
const strategySkills: SkillItem[] = [
  { name: 'Funnel Architecture', icon: 'account_tree', category: 'strategy', desc: 'Designing end-to-end user journeys that convert.' },
  { name: 'Segmentation', icon: 'donut_large', category: 'strategy', desc: 'Hyper-targeting audiences for maximum relevance.' },
  { name: 'Revenue Loops', icon: 'all_inclusive', category: 'strategy', desc: 'Building sustainable growth engines.' },
];

const channelSkills: SkillItem[] = [
  { name: 'Technical SEO', icon: 'search', category: 'channel' },
  { name: 'Performance Ads', icon: 'ads_click', category: 'channel' },
  { name: 'Email Automation', icon: 'mark_email_read', category: 'channel' },
  { name: 'Landing Pages', icon: 'web', category: 'channel' },
];

const toolSkills: SkillItem[] = [
  { name: 'GA4', icon: 'insert_chart', category: 'tool' },
  { name: 'Search Console', icon: 'manage_search', category: 'tool' },
  { name: 'Screaming Frog', icon: 'pest_control', category: 'tool' },
  { name: 'Ahrefs', icon: 'analytics', category: 'tool' },
  { name: 'Figma', icon: 'palette', category: 'tool' },
  { name: 'HubSpot', icon: 'hub', category: 'tool' },
  { name: 'Looker Studio', icon: 'monitoring', category: 'tool' },
  { name: 'Zapier', icon: 'bolt', category: 'tool' },
  { name: 'WordPress', icon: 'wysiwyg', category: 'tool' },
  { name: 'HTML/CSS/JS', icon: 'code', category: 'tool' },
];

// --- Skill Card Component ---
const SkillCard: React.FC<{ item: SkillItem; className?: string }> = ({ item, className = "" }) => {
  return (
    <div className={`
      group relative overflow-hidden
      bg-secondary border border-divider
      hover:border-accent transition-colors duration-300
      flex flex-col
      ${className}
    `}>
      {/* Background Hover Effect */}
      <div className="absolute inset-0 bg-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
      
      {/* Scan Line Effect */}
      <div className="absolute top-0 left-[-100%] w-[50%] h-full bg-gradient-to-r from-transparent via-white/5 to-transparent skew-x-12 group-hover:left-[200%] transition-all duration-1000 ease-in-out" />

      <div className="relative z-10 p-6 flex flex-col h-full justify-between">
        <div>
          <div className="flex justify-between items-start mb-4">
            <Icon name={item.icon} className={`text-3xl ${item.category === 'strategy' ? 'text-accent' : 'text-text-secondary group-hover:text-white'}`} />
            {item.category === 'strategy' && <Icon name="north_east" className="text-divider group-hover:text-accent transition-colors text-lg" />}
          </div>
          <h3 className={`font-medium ${item.category === 'strategy' ? 'text-xl text-white' : 'text-lg text-text-secondary group-hover:text-white'} mb-2`}>
            {item.name}
          </h3>
        </div>
        
        {item.desc && (
          <p className="text-sm text-text-tertiary group-hover:text-text-secondary transition-colors leading-relaxed mt-2">
            {item.desc}
          </p>
        )}
        
        {/* Tech Decor */}
        <div className="absolute bottom-2 right-2 flex gap-1 opacity-0 group-hover:opacity-50 transition-opacity">
          <div className="w-1 h-1 bg-accent rounded-full" />
          <div className="w-1 h-1 bg-accent rounded-full" />
        </div>
      </div>
    </div>
  );
};

// --- Mini Badge Component ---
const ToolBadge: React.FC<{ item: SkillItem }> = ({ item }) => (
  <div className="
    group relative 
    bg-secondary border border-divider 
    px-4 py-3 
    flex items-center gap-3
    hover:border-accent/50 hover:bg-secondary/80
    transition-all duration-300
    cursor-default
  ">
    <Icon name={item.icon} className="text-text-tertiary group-hover:text-accent transition-colors text-lg" />
    <span className="text-sm text-text-secondary group-hover:text-white font-mono">{item.name}</span>
    
    {/* Corner bracket */}
    <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-accent opacity-0 group-hover:opacity-100 transition-opacity" />
  </div>
);

export const Skills: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    // Stagger reveal of all grid items
    gsap.from(".skill-item", {
      y: 30,
      opacity: 0,
      duration: 0.8,
      stagger: 0.05,
      ease: "power2.out",
      delay: 0.6 // Wait for transition shutter
    });
  }, { scope: containerRef });

  return (
    <div ref={containerRef} className="pt-[72px] min-h-screen">
      
      <Section className="mb-8">
        <h1 className="text-4xl lg:text-7xl font-semibold text-white mb-6 skill-item">
          Full-Stack <span className="text-accent">Marketer</span>
        </h1>
        <p className="text-xl text-text-secondary max-w-2xl skill-item">
          Bridging the gap between <span className="text-white">brand narrative</span>, <span className="text-white">technical execution</span>, and <span className="text-white">revenue operations</span>.
        </p>
      </Section>

      <Section className="!py-0">
        <div className="flex flex-col gap-8">
          
          {/* Row 1: Strategy (Bento Grid) */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
             <div className="lg:col-span-3 pb-2 border-b border-divider mb-2 skill-item">
               <span className="font-mono text-xs text-text-tertiary uppercase tracking-widest">// 01. Strategic Core</span>
             </div>
             {strategySkills.map((skill) => (
               <SkillCard key={skill.name} item={skill} className="skill-item min-h-[220px]" />
             ))}
          </div>

          {/* Row 2: Channels (Grid 2x2 on mobile, 4x1 on desktop) */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
            <div className="lg:col-span-4 pb-2 border-b border-divider mb-2 skill-item">
               <span className="font-mono text-xs text-text-tertiary uppercase tracking-widest">// 02. Growth Engine</span>
             </div>
             {channelSkills.map((skill) => (
               <SkillCard key={skill.name} item={skill} className="skill-item h-[160px]" />
             ))}
          </div>

          {/* Row 3: Tools (Dense Grid) */}
          <div className="mt-8">
            <div className="pb-2 border-b border-divider mb-6 skill-item">
               <span className="font-mono text-xs text-text-tertiary uppercase tracking-widest">// 03. The Arsenal</span>
             </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
              {toolSkills.map((skill) => (
                <div key={skill.name} className="skill-item">
                   <ToolBadge item={skill} />
                </div>
              ))}
            </div>
          </div>

        </div>
      </Section>

      {/* Footer Statement */}
      <Section className="mt-20 text-center skill-item">
        <div className="inline-flex items-center gap-4 px-6 py-3 rounded-full border border-divider bg-secondary/50 backdrop-blur-sm">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
          <span className="text-sm text-text-secondary">
            System Status: <span className="text-white font-medium">Ready to Deploy</span>
          </span>
        </div>
      </Section>

    </div>
  );
};
