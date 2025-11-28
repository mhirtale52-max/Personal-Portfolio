
import React, { useEffect } from 'react';
import { HashRouter, Routes, Route, useLocation } from 'react-router-dom';
import { Navigation } from './components/Navigation';
import { PageTransition } from './components/PageTransition';
import { Home } from './pages/Home';
import { About } from './pages/About';
import { Work } from './pages/Work';
import { Skills } from './pages/Skills';
import { Contact } from './pages/Contact';

// Scroll to top helper
const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

const AnimatedRoutes = () => {
  const location = useLocation();
  
  return (
    <>
      <PageTransition key={location.pathname} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/work" element={<Work />} />
        <Route path="/skills" element={<Skills />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </>
  );
};

const App: React.FC = () => {
  return (
    <HashRouter>
      <ScrollToTop />
      <div className="bg-primary min-h-screen text-text-primary font-sans selection:bg-accent selection:text-white">
        <Navigation />
        <main>
          <AnimatedRoutes />
        </main>
        
        {/* Simple Footer */}
        <footer className="py-12 text-center text-text-tertiary text-sm border-t border-divider mt-20">
          <p>© {new Date().getFullYear()} Mihir Tale. Built for performance.</p>
        </footer>
      </div>
    </HashRouter>
  );
};

export default App;
