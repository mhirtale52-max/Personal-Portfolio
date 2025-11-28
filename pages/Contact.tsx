
import React, { useRef } from 'react';
import { Section, Button, Icon } from '../components/UI';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

export const Contact: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    gsap.from(".contact-anim > *", {
      y: 30,
      opacity: 0,
      duration: 0.8,
      stagger: 0.1,
      ease: "power2.out",
      delay: 0.6 // Wait for shutter
    });
  }, { scope: containerRef });

  return (
    <div ref={containerRef} className="pt-[72px]">
      <Section className="text-center contact-anim">
        <h1 className="text-4xl lg:text-5xl font-semibold text-white">
          Let's build something that scales.
        </h1>
        <p className="text-xl text-text-secondary mt-4">
          Or fix something that doesn't.
        </p>
      </Section>

      <Section className="!pt-0 contact-anim">
        <div className="max-w-[600px] mx-auto">
          <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
            <div className="bg-secondary border border-divider p-4 focus-within:border-accent transition-colors">
              <label className="block text-sm text-text-secondary mb-2">Name</label>
              <input type="text" className="w-full bg-transparent text-white focus:outline-none" />
            </div>
            
            <div className="bg-secondary border border-divider p-4 focus-within:border-accent transition-colors">
              <label className="block text-sm text-text-secondary mb-2">Email</label>
              <input type="email" className="w-full bg-transparent text-white focus:outline-none" />
            </div>

            <div className="bg-secondary border border-divider p-4 focus-within:border-accent transition-colors">
              <label className="block text-sm text-text-secondary mb-2">Company/Role (optional)</label>
              <input type="text" className="w-full bg-transparent text-white focus:outline-none" />
            </div>

            <div className="bg-secondary border border-divider p-4 focus-within:border-accent transition-colors">
              <label className="block text-sm text-text-secondary mb-2">Project/Message</label>
              <textarea className="w-full bg-transparent text-white focus:outline-none min-h-[150px] resize-y"></textarea>
            </div>

            <p className="text-center text-sm text-text-tertiary italic">
              Forms break. Ideas don't. Drop a message anyway.
            </p>
          </form>

          <div className="flex flex-col sm:flex-row justify-center gap-4 mt-12">
            <Button variant="primary">Schedule Call <span className="ml-2">→</span></Button>
            <Button variant="secondary">Email me directly <span className="ml-2">↓</span></Button>
          </div>

          <div className="flex justify-center gap-8 mt-12 pt-12 border-t border-divider">
             {['LinkedIn', 'Behance', 'Dribbble', 'GitHub'].map(social => (
               <button key={social} className="group flex flex-col items-center gap-2">
                 <Icon name={social === 'LinkedIn' ? 'link' : social === 'GitHub' ? 'code' : 'palette'} className="text-text-secondary text-2xl group-hover:text-accent transition-colors group-hover:scale-110 duration-300" />
                 <span className="text-xs text-text-tertiary group-hover:text-white transition-colors">{social}</span>
               </button>
             ))}
          </div>
        </div>
      </Section>
    </div>
  );
};
