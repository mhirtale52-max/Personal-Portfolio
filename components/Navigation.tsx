import React, { useState, useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { Icon } from './UI';
import { NavigationItem } from '../types';

const navItems: NavigationItem[] = [
  { label: 'Home', path: '/', icon: 'home' },
  { label: 'About', path: '/about', icon: 'person_outline' },
  { label: 'Work', path: '/work', icon: 'work_outline' },
  { label: 'Skills', path: '/skills', icon: 'psychology' },
  { label: 'Contact', path: '/contact', icon: 'mail_outline' },
];

export const Navigation: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  // Close mobile menu on route change
  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  return (
    <nav className="fixed top-0 w-full bg-primary border-b border-divider h-[72px] z-50 px-6 lg:px-8 flex items-center justify-between">
      {/* Logo */}
      <NavLink to="/" className="text-xl font-medium tracking-tight text-white hover:text-accent transition-colors">
        MT
      </NavLink>

      {/* Desktop Menu */}
      <div className="hidden md:flex gap-8 items-center">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `text-base transition-all duration-300 border-b-2 py-1 ${
                isActive 
                  ? 'text-white border-accent' 
                  : 'text-text-secondary border-transparent hover:text-white'
              }`
            }
          >
            {item.label}
          </NavLink>
        ))}
      </div>

      {/* Desktop CTA */}
      <div className="hidden md:block">
        <NavLink to="/contact">
          <button className="border border-accent text-accent px-6 h-10 text-sm font-medium transition-colors hover:bg-accent hover:text-white">
            Let's Connect
          </button>
        </NavLink>
      </div>

      {/* Mobile Menu Toggle */}
      <button 
        className="md:hidden text-text-secondary hover:text-white"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Toggle menu"
      >
        <Icon name={isOpen ? 'close' : 'menu'} className="text-3xl" />
      </button>

      {/* Mobile Menu Dropdown */}
      {isOpen && (
        <div className="absolute top-[72px] left-0 w-full bg-primary border-b border-divider p-6 flex flex-col gap-6 md:hidden animate-fade-in shadow-2xl">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `text-lg flex items-center gap-4 ${
                  isActive ? 'text-accent' : 'text-text-secondary'
                }`
              }
            >
              <Icon name={item.icon} />
              {item.label}
            </NavLink>
          ))}
          <NavLink to="/contact" className="w-full">
            <button className="w-full border border-accent text-accent py-3 font-medium">
              Let's Connect
            </button>
          </NavLink>
        </div>
      )}
    </nav>
  );
};