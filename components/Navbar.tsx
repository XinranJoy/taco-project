import React, { useState, useEffect } from 'react';

const BASE = import.meta.env.BASE_URL;

const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Abstract', href: '#abstract' },
    { name: 'Contributions', href: '#contributions' },
    { name: 'Method', href: '#method' },
    { name: 'Results', href: '#results' },
    { name: 'BibTeX', href: '#bibtex' },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled ? 'py-3 border-b border-white/55 shadow-sm' : 'py-5 border-b border-white/20'
      }`}
      style={{
        background: isScrolled ? 'rgba(255,255,255,0.58)' : 'rgba(255,255,255,0.18)',
        backdropFilter: isScrolled ? 'blur(22px) saturate(180%)' : 'blur(10px) saturate(140%)',
        WebkitBackdropFilter: isScrolled ? 'blur(22px) saturate(180%)' : 'blur(10px) saturate(140%)',
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-full">
          {/* Logo */}
          <a href="#hero" className="flex-shrink-0 flex items-center gap-2 group">
            <img
              src={`${BASE}assets/design/taco_whiteBG.png`}
              alt=""
              className="h-9 w-auto transition-transform duration-200 group-hover:scale-110"
              draggable={false}
            />
            {/* TACO_logo: iridescent TACO wordmark (3.45:1 ratio) */}
            <img
              src={`${BASE}assets/design/TACO_logo.png`}
              alt="TACO"
              className="h-7 w-auto"
              draggable={false}
            />
          </a>

          {/* Desktop Nav */}
          <div className="hidden md:flex space-x-1">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-gray-600 hover:text-gray-900 hover:bg-white/60 px-4 py-2 rounded-full text-sm font-medium transition-all"
              >
                {link.name}
              </a>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
