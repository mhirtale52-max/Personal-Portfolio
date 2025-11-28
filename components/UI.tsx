import React from 'react';

// --- SECTION ---
interface SectionProps {
  children: React.ReactNode;
  className?: string;
  id?: string;
  noPadding?: boolean;
}

export const Section: React.FC<SectionProps> = ({ children, className = "", id, noPadding = false }) => {
  return (
    <section 
      id={id} 
      className={`
        ${noPadding ? '' : 'py-20 lg:py-30'} 
        px-6 lg:px-8 
        max-w-[1200px] mx-auto 
        ${className}
      `}
    >
      {children}
    </section>
  );
};

// --- BUTTON ---
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary';
  icon?: string;
}

export const Button: React.FC<ButtonProps> = ({ children, variant = 'primary', icon, className = "", ...props }) => {
  const baseStyles = "h-12 px-8 font-medium transition-all duration-300 flex items-center justify-center gap-2 active:scale-95 text-base";
  
  const variants = {
    primary: "bg-accent text-white hover:bg-opacity-90 border border-transparent",
    secondary: "bg-transparent border border-accent text-accent hover:bg-accent hover:text-white"
  };
  
  return (
    <button 
      className={`${baseStyles} ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
      {icon && <span className="material-symbols-outlined text-xl">{icon}</span>}
    </button>
  );
};

// --- CARD ---
interface CardProps {
  children: React.ReactNode;
  className?: string;
  hoverEffect?: boolean;
}

export const Card: React.FC<CardProps> = ({ children, className = "", hoverEffect = true }) => {
  return (
    <div className={`
      bg-secondary 
      border border-divider 
      p-6 lg:p-10 
      transition-all duration-300
      ${hoverEffect ? 'hover:border-accent hover:-translate-y-1' : ''}
      ${className}
    `}>
      {children}
    </div>
  );
};

// --- TAG/BADGE ---
interface BadgeProps {
  children: React.ReactNode;
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({ children, className = "" }) => {
  return (
    <span className={`
      inline-flex items-center
      border border-divider 
      px-4 py-2 
      rounded-full 
      text-sm text-text-secondary
      ${className}
    `}>
      {children}
    </span>
  );
};

// --- ICON ---
export const Icon: React.FC<{ name: string; className?: string }> = ({ name, className = "" }) => (
  <span className={`material-symbols-outlined select-none ${className}`}>
    {name}
  </span>
);