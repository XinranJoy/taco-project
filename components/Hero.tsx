import React from 'react';
import { Author, Affiliation, LinkButton } from '../types';

const AUTHORS: Author[] = [
  { name: "Shengbang Liu", url: "https://liushb9.github.io/",          affiliations: [1, 3], isEqualContribution: true },
  { name: "Yueru Jia",     url: "https://jiayueru.github.io/",         affiliations: [1, 2], isEqualContribution: true },
  { name: "Yuyang Yan",    url: "https://github.com/avx34/",           affiliations: [1],    isEqualContribution: true },
  { name: "Jiaming Liu",   url: "https://liujiaming1996.github.io/",   affiliations: [1],    isEqualContribution: true, isCorresponding: true },
  { name: "Xinran Zhang",  url: "https://github.com/XinranJoy",        affiliations: [1, 2] },
  { name: "Qiuxuan Feng",  url: "https://github.com/xuanxuanzzzii",    affiliations: [1] },
  { name: "Yandong Guo",   url: "https://scholar.google.com/citations?user=fWDoWsQAAAAJ&hl=en", affiliations: [2] },
  { name: "Shiji Zhou",    url: "https://arnoldshijizhou.github.io/",  affiliations: [4] },
  { name: "Boxin Shi",     url: "https://camera.pku.edu.cn/",          affiliations: [1] },
  { name: "Shanghang Zhang", url: "https://scholar.google.com/citations?user=voqw10cAAAAJ&hl=en", affiliations: [1] },
];

const AFFILIATIONS: Affiliation[] = [
  { id: 1, name: "State Key Laboratory of Multimedia Information Processing, School of Computer Science, Peking University" },
  { id: 2, name: "AI2 Robotics" },
  { id: 3, name: "Sun Yat-sen University" },
  { id: 4, name: "Beihang University" },
];

const LINKS: LinkButton[] = [
  { label: "Paper",   iconClass: "fas fa-file-pdf",    url: "", comingSoon: true },
  { label: "Code",    iconClass: "fab fa-github",       url: "https://github.com/liushb9/TACO" },
  { label: "Video",   iconClass: "fas fa-video",        url: "https://youtu.be/bVZEjTBP0Rk" },
  { label: "BibTeX",  iconClass: "fas fa-quote-right",  url: "#bibtex" },
];

const Hero: React.FC = () => {
  return (
    <section id="hero" className="pt-28 pb-16">
      <div className="container mx-auto px-4 max-w-5xl flex flex-col items-center text-center">

        {/* Title */}
        <div className="mb-8">
          <h1 className="mb-3">
            <img
              src="/assets/design/TACO_title.png"
              alt="TACO"
              className="h-36 md:h-48 w-auto mx-auto select-none"
              draggable={false}
              style={{
                filter: 'drop-shadow(0 0 36px rgba(140, 80, 255, 0.30))',
              }}
            />
          </h1>
          <p className="text-xl md:text-2xl font-semibold text-gray-800 max-w-4xl mx-auto leading-snug">
            TActile World Model as a Self-COrrector for Scalable VLA Post-Training
          </p>
          <p className="mt-4 text-base md:text-lg text-gray-600 max-w-3xl mx-auto">
            TACO is a tactile-aware world-model framework that turns real-world robot failures into imagined visuo-tactile corrections for scalable VLA post-training.
          </p>
        </div>

        {/* Authors glass card */}
        <div
          className="w-full max-w-4xl mb-6 rounded-2xl p-6"
          style={{
            background: 'rgba(255,255,255,0.10)',
            backdropFilter: 'blur(14px)',
            WebkitBackdropFilter: 'blur(14px)',
            border: '1px solid rgba(255,255,255,0.40)',
            boxShadow: '0 4px 28px rgba(130,80,210,0.06), inset 0 1px 0 rgba(255,255,255,0.45)',
          }}
        >
          {/* Author names */}
          <div className="flex flex-wrap justify-center gap-x-3 gap-y-1 text-base md:text-lg text-gray-700 mb-4">
            {AUTHORS.map((author, index) => (
              <span key={index} className="inline-flex items-start">
                {author.url ? (
                  <a
                    href={author.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-medium text-violet-600 hover:text-cyan-500 transition-colors hover:underline underline-offset-2"
                  >
                    {author.name}
                  </a>
                ) : (
                  <span className="font-medium">{author.name}</span>
                )}
                <sup className="text-xs text-violet-500 font-semibold ml-0.5 leading-none mt-0.5">
                  {author.affiliations.join(',')}
                  {author.isEqualContribution && '*'}
                  {author.isCorresponding && '†'}
                </sup>
                {index < AUTHORS.length - 1 && (
                  <span className="text-gray-400 ml-0.5">,</span>
                )}
              </span>
            ))}
          </div>

          {/* Affiliations */}
          <div className="text-sm text-gray-500">
            {AFFILIATIONS.map((aff, i) => (
              <span key={aff.id}>
                <sup className="text-violet-500 font-semibold mr-0.5">{aff.id}</sup>
                {aff.name}
                {i < AFFILIATIONS.length - 1 && (
                  <span className="mx-2 text-gray-300">·</span>
                )}
              </span>
            ))}
          </div>

          {/* Legend */}
          <div className="mt-2 text-xs text-gray-400 font-mono">
            *&thinsp;Equal Contribution &nbsp;&nbsp; †&thinsp;Project Lead, Corresponding Author
          </div>
        </div>

        {/* Buttons */}
        <div className="flex flex-wrap justify-center gap-3 mb-6">
          {LINKS.map((link, idx) =>
            link.comingSoon ? (
              <span
                key={idx}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-gray-400 text-sm font-medium cursor-not-allowed select-none"
                style={{
                  background: 'rgba(255,255,255,0.30)',
                  border: '1px solid rgba(255,255,255,0.50)',
                }}
                title="Coming Soon"
              >
                <i className={`${link.iconClass} text-sm`}></i>
                <span>{link.label}</span>
                <span className="text-xs bg-white/50 text-gray-400 rounded px-1.5 py-0.5">Soon</span>
              </span>
            ) : (
              <a
                key={idx}
                href={link.url}
                target={link.url.startsWith('#') ? '_self' : '_blank'}
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-violet-700 text-sm font-medium transition-all hover:-translate-y-0.5 hover:text-violet-900"
                style={{
                  background: 'rgba(255,255,255,0.65)',
                  backdropFilter: 'blur(8px)',
                  WebkitBackdropFilter: 'blur(8px)',
                  border: '1px solid rgba(167,139,250,0.45)',
                  boxShadow: '0 2px 12px rgba(130,80,210,0.10)',
                }}
              >
                <i className={`${link.iconClass} text-sm`}></i>
                <span>{link.label}</span>
              </a>
            )
          )}
        </div>

        {/* Keywords */}
        <div className="flex gap-2 justify-center">
          {['Robotic Manipulation', 'Tactile World Model'].map((kw) => (
            <span
              key={kw}
              className="text-xs px-3 py-1 rounded-full text-violet-600 font-medium"
              style={{
                background: 'rgba(255,255,255,0.55)',
                backdropFilter: 'blur(6px)',
                WebkitBackdropFilter: 'blur(6px)',
                border: '1px solid rgba(167,139,250,0.40)',
              }}
            >
              {kw}
            </span>
          ))}
        </div>

      </div>
    </section>
  );
};

export default Hero;
