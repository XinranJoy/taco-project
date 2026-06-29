import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Section from './components/Section';

const BASE = import.meta.env.BASE_URL;

// ── Static data ────────────────────────────────────────────────────────────

const BIBTEX = `@article{liu2026taco,
  title={TACO: TActile World Model as a Self-COrrector for Scalable VLA Post-Training},
  author={Liu, Shengbang and Jia, Yueru and Yan, Yuyang and Liu, Jiaming and Zhang, Xinran and Feng, Qiuxuan and Guo, Yandong and Zhou, Shiji and Shi, Boxin and Zhang, Shanghang},
  journal={arXiv preprint},
  year={2026}
}`;

const CONTRIBUTIONS = [
  {
    title: 'Tactile-Aware World Model',
    desc: 'TACO jointly models future video frames and force trajectories, allowing imagined rollouts to remain consistent with both visual motion and contact dynamics.',
    icon: 'fas fa-hand-paper',
  },
  {
    title: 'Recognize–Imagine–Label Loop',
    desc: 'TACO recognizes failure-adjacent contact states, imagines local visuo-tactile recoveries, and labels the corrective actions needed for policy improvement.',
    icon: 'fas fa-sync-alt',
  },
  {
    title: 'Knowledge-Insulated Post-Training',
    desc: 'TACO incorporates tactile corrective supervision without eroding pretrained visual-language priors by routing tactile learning to the action expert and using advantage-conditioned training.',
    icon: 'fas fa-shield-alt',
  },
];

const METHOD_STEPS = [
  {
    num: '01',
    title: 'Recognize',
    main: 'Find the moment where contact starts to go wrong.',
    caption: 'A unified progress-action model detects failure-adjacent states where task progress stalls or decreases.',
  },
  {
    num: '02',
    title: 'Imagine',
    main: 'Starting from the failure-adjacent state, the tactile-aware world model generates a local correction segment, including both future video frames and force trajectories.',
    caption: 'Imagine what a successful contact recovery should look and feel like.',
  },
  {
    num: '03',
    title: 'Label',
    main: 'The progress-action model labels the imagined segment with executable corrective actions and progress values.',
    caption: 'Turn imagined recovery into training supervision.',
  },
  {
    num: '04',
    title: 'Post-Train',
    main: 'The VLA policy is post-trained with real rollouts, demonstrations, and imagined corrections. Tactile learning is routed to the action expert while the pretrained VLM backbone is protected.',
    caption: 'Improve the robot without repeatedly asking humans to intervene.',
  },
];

const SUCCESS_ROLLOUTS = [
  { file: 'success_flower.mp4', title: 'Insert Flower' },
  { file: 'success_whiteboard.mp4', title: 'Wipe Whiteboard' },
  { file: 'success_bottle.mp4', title: 'Twist Bottle Cap' },
  { file: 'success_xylophone.mp4', title: 'Play Xylophone' },
  { file: 'success_bread.mp4', title: 'Toast Bread' },
  { file: 'success_hanoi.mp4', title: 'Move Hanoi Rings' },
];

const OOD_FLOWER = [
  { file: 'flower_pink.mp4', label: 'Pink' },
  { file: 'flower_yellow.mp4', label: 'Yellow' },
  { file: 'flower_flash.mp4', label: 'Flash' },
];

const OOD_WHITEBOARD = [
  { file: 'whiteboard.mp4', label: 'Whiteboard' },
  { file: 'whiteboard_position.mp4', label: 'Position' },
  { file: 'whiteboard_flash.mp4', label: 'Flash' },
];

const TABLE_COLS = [
  'Insert Flower',
  'Wipe Whiteboard',
  'Twist Bottle Cap',
  'Play Xylophone',
  'Toast Bread',
  'Move Hanoi Rings',
  'Ave',
];

type TableRow =
  | { type: 'group'; label: string }
  | {
      type: 'data';
      method: string;
      taco: boolean;
      values: [number, number][];
      boldFlags?: boolean[][];
    };

const TABLE_ROWS: TableRow[] = [
  {
    type: 'data',
    method: 'Base Policy',
    taco: false,
    values: [[0.50,250],[0.51,151],[0.45,131],[0.46,132],[0.30,183],[0.08,266],[0.38,185.5]],
  },
  { type: 'group', label: 'Iteration 1' },
  {
    type: 'data',
    method: 'Filtered BC',
    taco: false,
    values: [[0.55,274],[0.54,120],[0.50,62],[0.49,128],[0.32,189],[0.07,120],[0.41,148.8]],
  },
  {
    type: 'data',
    method: 'TACO (w/o KI)',
    taco: false,
    values: [[0.55,233],[0.33,100],[0.55,58],[0.58,144],[0.48,193],[0.42,201],[0.49,154.8]],
  },
  {
    type: 'data',
    method: 'TACO',
    taco: true,
    values: [[0.70,207],[0.55,95],[0.85,56],[0.63,115],[0.70,184],[0.51,194],[0.66,141.8]],
  },
  { type: 'group', label: 'Iteration 2' },
  {
    type: 'data',
    method: 'Filtered BC',
    taco: false,
    values: [[0.52,289],[0.57,133],[0.48,79],[0.51,125],[0.36,177],[0.11,130],[0.43,155.5]],
  },
  {
    type: 'data',
    method: 'TACO (w/o KI)',
    taco: false,
    values: [[0.62,223],[0.35,98],[0.65,51],[0.52,120],[0.51,191],[0.37,196],[0.50,146.5]],
    boldFlags: [[false,false],[false,false],[false,true],[false,false],[false,false],[false,false],[false,false]],
  },
  {
    type: 'data',
    method: 'TACO',
    taco: true,
    values: [[0.93,169],[0.65,87],[0.98,52],[0.78,97],[0.81,177],[0.79,184],[0.82,127.7]],
    boldFlags: [[true,true],[true,true],[true,false],[true,true],[true,true],[true,true],[true,true]],
  },
];

// ── Taco particle spawner ──────────────────────────────────────────────────

type TacoParticle = { id: number; x: number; y: number; src: string };

const TACO_IMGS = [
  `${BASE}assets/design/flash_taco.png`,
  `${BASE}assets/design/pink_taco.png`,
  `${BASE}assets/design/taco_whiteBG.png`,
];

const TacoSpawner: React.FC = () => {
  const [tacos, setTacos] = React.useState<TacoParticle[]>([]);
  const counter = React.useRef(0);

  React.useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      const target = e.target as Element;
      if (target.closest('a, button, input, textarea, video, iframe, select, [role="button"]')) return;
      const id = ++counter.current;
      const src = TACO_IMGS[Math.floor(Math.random() * TACO_IMGS.length)];
      setTacos(prev => [...prev, { id, x: e.clientX, y: e.clientY, src }]);
      setTimeout(() => setTacos(prev => prev.filter(t => t.id !== id)), 800);
    };
    document.addEventListener('click', handleClick);
    return () => document.removeEventListener('click', handleClick);
  }, []);

  return (
    <>
      {tacos.map(t => (
        <img
          key={t.id}
          src={t.src}
          className="taco-pop"
          style={{ left: t.x, top: t.y }}
          alt=""
          draggable={false}
        />
      ))}
    </>
  );
};

// ── Sub-components ─────────────────────────────────────────────────────────

const GlowArrow: React.FC<{ delayMs?: number }> = ({ delayMs = 0 }) => (
  <div
    className="flex justify-center py-1"
    style={{
      animation: 'arrowPulse 2s ease-in-out infinite',
      animationDelay: `${delayMs}ms`,
    }}
  >
    <svg width="28" height="42" viewBox="0 0 28 42" fill="none">
      <path
        d="M14 3 L14 36 M7 27 L14 39 L21 27"
        stroke="#8b5cf6"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  </div>
);

const AutoPlayVideo: React.FC<{ src: string; className?: string }> = ({ src, className = '' }) => {
  const videoRef = React.useRef<HTMLVideoElement>(null);

  React.useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          video.play().catch(() => {});
        } else {
          video.pause();
        }
      },
      { threshold: 0.4 }
    );
    observer.observe(video);
    return () => observer.disconnect();
  }, []);

  return (
    <video
      ref={videoRef}
      muted
      playsInline
      controls
      className={`w-full rounded-lg bg-black ${className}`}
      src={src}
    >
      <source src={src} type="video/mp4" />
    </video>
  );
};

const VideoCard: React.FC<{ src: string; title: string; small?: boolean }> = ({ src, title, small }) => {
  const videoRef = React.useRef<HTMLVideoElement>(null);

  React.useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          video.play().catch(() => {});
        } else {
          video.pause();
        }
      },
      { threshold: 0.3 }
    );
    observer.observe(video);
    return () => observer.disconnect();
  }, []);

  return (
    <div className="rounded-2xl overflow-hidden shadow-sm" style={{background:'rgba(255,255,255,0.10)',backdropFilter:'blur(10px)',WebkitBackdropFilter:'blur(10px)',border:'1px solid rgba(255,255,255,0.40)'}}>
      <video
        ref={videoRef}
        controls
        muted
        playsInline
        loop
        className={`w-full aspect-video object-cover bg-black`}
        src={src}
      >
        <source src={src} type="video/mp4" />
      </video>
      <p className={`px-3 py-2 text-center font-medium text-gray-700 ${small ? 'text-xs' : 'text-sm'}`}>{title}</p>
    </div>
  );
};

// ── Main App ───────────────────────────────────────────────────────────────

const App: React.FC = () => {
  return (
    <div className="min-h-screen font-sans text-gray-900">
      <TacoSpawner />
      <Navbar />

      <main>
        {/* ── 1. Hero ── */}
        <Hero />

        {/* ── 2. Main Video ── */}
        <Section id="video" fullWidth>
          <div className="aspect-video w-full rounded-lg overflow-hidden shadow-md">
            <iframe
              src="https://www.youtube.com/embed/bVZEjTBP0Rk?autoplay=1&mute=1&loop=1&playlist=bVZEjTBP0Rk"
              title="TACO Project Video"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="w-full h-full"
            />
          </div>
        </Section>

        {/* ── 3. Abstract ── */}
        <Section id="abstract" title="Abstract">
          <p className="text-justify leading-relaxed text-gray-700 text-base md:text-lg">
            Vision-Language-Action (VLA) models have shown promising generalization in robotic
            manipulation, but they still struggle with contact-rich tasks, where minor contact
            perturbations can cause unrecoverable failures that are hard to detect from vision alone.
            Since these failures are localized rather than task-level semantic errors, tactile-aware
            corrective post-training offers an efficient way to improve recovery. However, scaling
            such supervision through human intervention is costly. Recent works have explored world
            models to synthesize imagined rollouts for policy improvement, but vision-only world
            models may produce visually plausible yet contact-inconsistent trajectories. We therefore
            introduce <strong>TACO</strong>, a tactile-aware world-model-driven framework for scalable
            VLA post-training in contact-rich manipulation. Given real robot rollouts, TACO follows a{' '}
            <strong>Recognize&ndash;Imagine&ndash;Label</strong> loop with a tactile-aware world
            model: a unified progress-action model recognizes failure-adjacent states using progress
            estimates, a visuo-tactile generation model imagines local correction segments, and the
            progress-action model labels them with executable corrective actions. To incorporate
            tactile corrective supervision into VLA post-training, TACO combines
            knowledge-insulated tactile adaptation with advantage-conditioned training, enabling
            the policy to learn from imagined corrections without degrading pretrained
            visual-language priors. These components enable TACO to convert real-world failures into
            imagined visuo-tactile corrections for iterative VLA post-training. Experiments on
            real-world contact-rich manipulation tasks show that TACO achieves{' '}
            <strong>44% absolute success rate improvement</strong> over the base policy and{' '}
            <strong>32%</strong> over the policy without knowledge-insulated tactile adaptation.
          </p>
        </Section>

        {/* ── 4. Key Contributions ── */}
        <Section id="contributions" title="Key Contributions" fullWidth>
          <div className="grid grid-cols-3 gap-6">
            {CONTRIBUTIONS.map((c) => (
              <div key={c.title} className="flex flex-col items-center text-center p-6 rounded-2xl shadow-sm" style={{background:'rgba(255,255,255,0.10)',backdropFilter:'blur(10px)',WebkitBackdropFilter:'blur(10px)',border:'1px solid rgba(255,255,255,0.38)'}}>
                <div className="w-12 h-12 mb-4 rounded-xl bg-gradient-to-br from-brand-purple to-brand-cyan flex items-center justify-center text-white text-xl shadow-sm">
                  <i className={c.icon}></i>
                </div>
                <h3 className="font-bold text-gray-900 mb-2">{c.title}</h3>
                <p className="text-sm text-gray-600 leading-relaxed">{c.desc}</p>
              </div>
            ))}
          </div>
        </Section>

        {/* ── 5. Method ── */}
        <Section id="method" title="Method" fullWidth>
          {/* Pipeline figure */}
          <div className="text-center mb-10">
            <img
              src={`${BASE}assets/img/paper_img/pipeline_v5.png`}
              alt="TACO Pipeline"
              className="w-full max-w-5xl mx-auto rounded-lg"
            />
          </div>

          {/* 4 vertical steps with animated arrows */}
          <div className="flex flex-col items-center max-w-2xl mx-auto">
            {METHOD_STEPS.map((step, i) => (
              <React.Fragment key={step.num}>
                <div className="w-full rounded-xl p-5 shadow-sm" style={{background:'rgba(255,255,255,0.10)',backdropFilter:'blur(10px)',WebkitBackdropFilter:'blur(10px)',border:'1px solid rgba(255,255,255,0.38)'}}>
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-11 h-11 rounded-lg bg-gradient-to-br from-brand-purple to-brand-cyan flex items-center justify-center text-white font-bold text-sm shadow-sm">
                      {step.num}
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-900 text-base mb-1">{step.title}</h3>
                      <p className="text-sm text-gray-700 leading-relaxed">{step.main}</p>
                      {step.caption && (
                        <p className="mt-1.5 text-xs text-gray-400 italic">{step.caption}</p>
                      )}
                    </div>
                  </div>
                </div>
                {i < METHOD_STEPS.length - 1 && (
                  <GlowArrow delayMs={i * 600} />
                )}
              </React.Fragment>
            ))}
          </div>
        </Section>

        {/* ── 6. Results ── */}
        <Section id="results" title="Results" fullWidth>

          {/* Key stats — bubble layout */}
          <div className="flex flex-wrap items-center justify-center gap-4 mb-10">
            <div className="w-32 h-32 rounded-full flex flex-col items-center justify-center text-center p-3 mt-4 shadow-sm" style={{background:'rgba(255,255,255,0.12)',backdropFilter:'blur(10px)',WebkitBackdropFilter:'blur(10px)',border:'2px solid rgba(255,255,255,0.38)'}}>
              <div className="text-3xl font-bold text-gray-700">6</div>
              <div className="text-xs text-gray-500 leading-tight mt-1">Real-world tasks</div>
            </div>
            <div className="w-28 h-28 rounded-full flex flex-col items-center justify-center text-center p-3 -mt-2 shadow-sm" style={{background:'rgba(255,255,255,0.12)',backdropFilter:'blur(10px)',WebkitBackdropFilter:'blur(10px)',border:'2px solid rgba(255,255,255,0.38)'}}>
              <div className="text-2xl font-bold text-gray-600">+32%</div>
              <div className="text-xs text-gray-500 leading-tight mt-1">Over TACO (w/o KI)</div>
            </div>
            <div className="w-40 h-40 rounded-full flex flex-col items-center justify-center text-center p-3 shadow-md" style={{background:'rgba(224,246,255,0.22)',backdropFilter:'blur(10px)',WebkitBackdropFilter:'blur(10px)',border:'2px solid rgba(103,210,255,0.30)'}}>
              <div className="text-4xl font-bold text-brand-cyan">82%</div>
              <div className="text-xs text-gray-500 leading-tight mt-1">Avg. success rate (Iter 2)</div>
            </div>
            <div className="w-36 h-36 rounded-full flex flex-col items-center justify-center text-center p-3 mt-6 shadow-md" style={{background:'rgba(237,226,255,0.22)',backdropFilter:'blur(10px)',WebkitBackdropFilter:'blur(10px)',border:'2px solid rgba(167,139,250,0.30)'}}>
              <div className="text-3xl font-bold text-brand-purple">+44%</div>
              <div className="text-xs text-gray-500 leading-tight mt-1">Over base policy</div>
            </div>
            <div className="rounded-full flex flex-col items-center justify-center text-center p-4 -mt-3 shadow-sm" style={{width:'7.5rem',height:'7.5rem',background:'rgba(255,255,255,0.12)',backdropFilter:'blur(10px)',WebkitBackdropFilter:'blur(10px)',border:'2px solid rgba(255,255,255,0.38)'}}>
              <div className="text-xl font-bold text-gray-700">127.7</div>
              <div className="text-xs text-gray-500 leading-tight mt-1">vs 185.5 avg. steps</div>
            </div>
          </div>

          {/* Successful Rollouts */}
          <div className="mb-10">
            <h3 className="text-2xl font-bold text-gray-800 mb-5 text-center">Successful Rollouts</h3>
            <div className="grid grid-cols-3 gap-4">
              {SUCCESS_ROLLOUTS.map((v) => (
                <VideoCard
                  key={v.file}
                  src={`${BASE}assets/img/experiment_process/success_rollout/${v.file}`}
                  title={v.title}
                />
              ))}
            </div>
          </div>

          {/* Generalization */}
          <div className="mb-10">
            <h3 className="text-2xl font-bold text-gray-800 mb-5 text-center">Generalization Performance</h3>

            <div className="mb-5">
              <p className="text-sm font-medium text-gray-600 mb-3">Insert Flower</p>
              <div className="grid grid-cols-3 gap-3">
                {OOD_FLOWER.map((v) => (
                  <VideoCard
                    key={v.file}
                    small
                    src={`${BASE}assets/img/experiment_process/ood/${v.file}`}
                    title={v.label}
                  />
                ))}
              </div>
            </div>

            <div>
              <p className="text-sm font-medium text-gray-600 mb-3">Wipe Whiteboard</p>
              <div className="grid grid-cols-3 gap-3">
                {OOD_WHITEBOARD.map((v) => (
                  <VideoCard
                    key={v.file}
                    small
                    src={`${BASE}assets/img/experiment_process/ood/${v.file}`}
                    title={v.label}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Quantitative Table */}
          <div>
            <h3 className="text-base font-semibold text-gray-800 mb-4">Quantitative Results</h3>
            <p className="text-xs text-gray-500 mb-3">SR = Success Rate &nbsp;&middot;&nbsp; CS = Completion Steps (lower is better)</p>
            <div className="overflow-x-auto">
              <table className="w-full text-xs border-collapse">
                <thead>
                  <tr className="border-b border-white/30" style={{background:'rgba(255,255,255,0.16)'}}>
                    <th rowSpan={2} className="px-3 py-2 text-left border border-white/40 font-semibold text-gray-700 min-w-[110px]">
                      Method
                    </th>
                    {TABLE_COLS.map((col) => (
                      <th key={col} colSpan={2} className="px-2 py-2 text-center border border-white/40 font-semibold text-gray-700 whitespace-nowrap">
                        {col}
                      </th>
                    ))}
                  </tr>
                  <tr className="border-b border-white/25" style={{background:'rgba(255,255,255,0.10)'}}>
                    {TABLE_COLS.map((col) => (
                      <React.Fragment key={col}>
                        <th className="px-2 py-1 text-center border border-white/40 text-gray-500 font-normal">SR</th>
                        <th className="px-2 py-1 text-center border border-white/40 text-gray-500 font-normal">CS</th>
                      </React.Fragment>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {TABLE_ROWS.map((row, ri) => {
                    if (row.type === 'group') {
                      return (
                        <tr key={ri} style={{background:'rgba(255,255,255,0.10)'}}>
                          <td
                            colSpan={1 + TABLE_COLS.length * 2}
                            className="px-3 py-1.5 text-center text-gray-500 italic border border-white/40"
                          >
                            {row.label}
                          </td>
                        </tr>
                      );
                    }
                    return (
                      <tr
                        key={ri}
                        className={row.taco ? 'border-b border-violet-100/60' : 'border-b border-white/30'}
                        style={row.taco ? {background:'rgba(237,226,255,0.18)'} : undefined}
                      >
                        <td className={`px-3 py-2 border border-white/40 ${row.taco ? 'font-bold text-brand-purple' : 'text-gray-700'}`}>
                          {row.method}
                        </td>
                        {row.values.map(([sr, cs], ci) => {
                          const boldSR = row.boldFlags?.[ci]?.[0] ?? false;
                          const boldCS = row.boldFlags?.[ci]?.[1] ?? false;
                          return (
                            <React.Fragment key={ci}>
                              <td className={`px-2 py-2 text-center border border-white/40 ${boldSR ? 'font-bold text-gray-900' : 'text-gray-600'}`}>
                                {sr.toFixed(2)}
                              </td>
                              <td className={`px-2 py-2 text-center border border-white/40 ${boldCS ? 'font-bold text-gray-900' : 'text-gray-600'}`}>
                                {cs}
                              </td>
                            </React.Fragment>
                          );
                        })}
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
            {/* Action Distribution */}
            <div className="mt-8">
              <img
                src={`${BASE}assets/img/paper_img/action_distribution_v3.png`}
                alt="Action Distribution"
                className="w-full max-w-4xl mx-auto block rounded-lg"
              />
            </div>
          </div>
        </Section>

        {/* ── 7. Citation ── */}
        <Section id="bibtex" title="Citation">
          <div className="relative group">
            <pre className="p-6 rounded-xl overflow-x-auto text-sm text-gray-700 font-mono whitespace-pre" style={{background:'rgba(255,255,255,0.10)',backdropFilter:'blur(8px)',WebkitBackdropFilter:'blur(8px)',border:'1px solid rgba(255,255,255,0.38)'}}>
              {BIBTEX}
            </pre>
            <button
              className="absolute top-4 right-4 text-gray-600 px-3 py-1.5 rounded-md transition-colors text-xs font-medium" style={{background:'rgba(255,255,255,0.28)',border:'1px solid rgba(255,255,255,0.45)',backdropFilter:'blur(6px)',WebkitBackdropFilter:'blur(6px)'}}
              onClick={() => navigator.clipboard.writeText(BIBTEX)}
              title="Copy to Clipboard"
            >
              <i className="far fa-copy mr-1"></i>Copy
            </button>
          </div>
        </Section>
      </main>

      <footer className="border-t border-white/40 py-10 mt-8" style={{background:'rgba(255,255,255,0.20)',backdropFilter:'blur(10px)',WebkitBackdropFilter:'blur(10px)'}}>
        <div className="container mx-auto px-4 text-center">
          <p className="text-gray-500 text-sm">© {new Date().getFullYear()} TACO Project. All rights reserved.</p>
          <p className="text-gray-400 text-xs mt-2">
            TACO: TActile World Model as a Self-COrrector for Scalable VLA Post-Training
          </p>
        </div>
      </footer>
    </div>
  );
};

export default App;
