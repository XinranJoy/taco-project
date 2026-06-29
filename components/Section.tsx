import React from 'react';

interface SectionProps {
  id?: string;
  title?: string;
  className?: string;
  children: React.ReactNode;
  fullWidth?: boolean;
}

const Section: React.FC<SectionProps> = ({ id, title, className = '', children, fullWidth = false }) => {
  return (
    <section id={id} className={`relative py-14 ${className}`}>
      <div className="container mx-auto px-4 max-w-5xl">
        {title && (
          <div className="mb-8 text-center">
            <h2 className="text-2xl md:text-3xl font-bold inline-block relative pb-3 text-gray-800">
              {title}
              <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-14 h-1 bg-gradient-to-r from-violet-400 via-cyan-300 to-pink-400 rounded-full"></span>
            </h2>
          </div>
        )}

        <div className="glass-card rounded-2xl overflow-hidden p-6 md:p-10">
          {children}
        </div>
      </div>
    </section>
  );
};

export default Section;
