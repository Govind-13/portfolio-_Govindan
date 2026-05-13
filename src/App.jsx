import { useEffect, useMemo, useRef, useState } from 'react';
import CinematicBackground from './components/CinematicBackground.jsx';
import Icon from './components/Icon.jsx';
import PillNav from './components/PillNav.jsx';
import Reveal from './components/Reveal.jsx';
import useScrollProgress from './hooks/useScrollProgress.js';
import { archiveProjects, heroBackground, projects } from './data.js';

const sections = [
  {
    id: 'home',
    label: 'Overview',
    eyebrow: 'Govindan R · Motion · Content · AI',
    shot: { src: heroBackground.src, alt: heroBackground.alt },
  },
  {
    id: 'process',
    label: 'Process',
    eyebrow: 'How the work gets made',
    shot: { src: projects[0].image, alt: projects[0].alt },
  },
  {
    id: 'work',
    label: 'Work',
    eyebrow: 'What I make',
    shot: { src: projects[1].image, alt: projects[1].alt },
  },
  {
    id: 'stack',
    label: 'Stack',
    eyebrow: 'Tools and capabilities',
    shot: { src: archiveProjects[0].image, alt: archiveProjects[0].alt },
  },
  {
    id: 'contact',
    label: 'Contact',
    eyebrow: 'Start a project',
    shot: { src: projects[3].image, alt: projects[3].alt },
  },
];

const processCards = [
  {
    icon: 'edit_note',
    title: 'Concept & Storyboard',
    body: 'Reference, structure, and rough layouts in Photoshop. Every video starts with a script and frame plan, not a blank canvas.',
  },
  {
    icon: 'animation',
    title: 'Motion Build',
    body: 'Vector and cell animation in Adobe Animate; compositing, kinetic type, and effects in After Effects.',
  },
  {
    icon: 'graphic_eq',
    title: 'Audio & Edit',
    body: 'Voiceover cleanup and sound design in Audacity and Sound Forge — timed to motion before final delivery.',
  },
  {
    icon: 'cloud_upload',
    title: 'Automate & Deliver',
    body: 'Python scripts handle batch renders, renaming, and metadata. Final cuts publish straight into the Edmingle LMS.',
  },
];

const workCards = [
  {
    icon: 'school',
    tag: 'E-Learning Modules',
    title: 'Course videos that hold attention.',
    body: 'Lesson explainers, course intros, and micro-lessons produced end-to-end for ed-tech and training teams.',
  },
  {
    icon: 'palette',
    tag: 'Brand & Identity',
    title: 'Graphics with a designer’s eye.',
    body: 'Photoshop-led brand collateral, social creatives, and presentation systems — clean, on-brief, on-deadline.',
  },
  {
    icon: 'smart_toy',
    tag: 'AI + Automation',
    title: 'Smarter pipelines, faster output.',
    body: 'ChatGPT for content drafts, n8n for workflow automation, Python scripts for the repetitive content-ops work.',
  },
];

const stackCards = [
  { value: 'Adobe', label: 'Animate, After Effects, Photoshop' },
  { value: 'Audacity', label: 'Audio editing & sound design' },
  { value: 'Python', label: 'Content + workflow automation' },
  { value: 'n8n + AI', label: 'ChatGPT, Google Labs, automation' },
];

export default function App() {
  const progress = useScrollProgress();
  const shots = useMemo(() => sections.map((s) => s.shot), []);
  const refs = useRef({});
  const [activeId, setActiveId] = useState(sections[0].id);

  useEffect(() => {
    const observers = sections.map((s) => {
      const node = refs.current[s.id];
      if (!node) return null;
      const io = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActiveId(s.id);
        },
        { rootMargin: '-45% 0px -45% 0px', threshold: 0 },
      );
      io.observe(node);
      return io;
    });
    return () => observers.forEach((io) => io && io.disconnect());
  }, []);

  const jump = (id) => {
    const node = refs.current[id];
    if (node) node.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const setRef = (id) => (el) => {
    refs.current[id] = el;
  };

  return (
    <div className="relative min-h-screen bg-background text-on-surface selection:bg-tertiary selection:text-on-tertiary">
      <CinematicBackground shots={shots} progress={progress} />
      <div
        className="fixed top-0 left-0 h-[2px] scroll-line z-[60] origin-left"
        style={{ width: `${progress * 100}%` }}
      />

      <PillNav sections={sections} activeId={activeId} onJump={jump} />

      <main className="relative z-10">
        {/* HERO */}
        <section
          id="home"
          ref={setRef('home')}
          className="min-h-screen flex flex-col items-center justify-center px-margin-mobile md:px-margin-desktop text-center pt-32 pb-24"
        >
          <Reveal>
            <span className="font-label-mono text-[11px] tracking-[0.32em] text-tertiary uppercase">
              {sections[0].eyebrow}
            </span>
          </Reveal>
          <Reveal delay={120}>
            <h1 className="font-display-lg-mobile md:font-display-lg text-display-lg-mobile md:text-display-lg uppercase tracking-tighter leading-[0.95] mt-6 max-w-5xl text-balance">
              Motion-led design
              <br />
              for digital learning.
            </h1>
          </Reveal>
          <Reveal delay={240}>
            <p className="font-body-lg text-body-lg text-on-surface-variant mt-8 max-w-2xl mx-auto">
              I'm Govindan R — a graphic designer and content administrator based in Chennai. I turn complex
              courses, brands, and product stories into polished motion, identity, and content systems for
              ed-tech and training teams.
            </p>
          </Reveal>
          <Reveal delay={360}>
            <div className="flex flex-col md:flex-row items-center justify-center gap-4 mt-10">
              <button
                type="button"
                onClick={() => jump('work')}
                className="bg-white text-black px-8 py-4 font-label-mono text-[11px] tracking-[0.22em] uppercase rounded-full hover:neon-glow transition-all active:scale-95"
              >
                See the Work
              </button>
              <button
                type="button"
                onClick={() => jump('contact')}
                className="glass-border bg-white/5 backdrop-blur-[20px] text-on-surface px-8 py-4 font-label-mono text-[11px] tracking-[0.22em] uppercase rounded-full hover:bg-white/10 transition-all active:scale-95"
              >
                Start a Project
              </button>
            </div>
          </Reveal>
          <Reveal delay={480}>
            <div className="mt-20 flex items-center gap-3 text-on-surface-variant/70">
              <span className="font-label-mono text-[10px] tracking-[0.3em] uppercase">Scroll</span>
              <div className="h-px w-16 bg-on-surface-variant/40" />
              <Icon name="south" className="text-base" />
            </div>
          </Reveal>
        </section>

        {/* PROCESS */}
        <section
          id="process"
          ref={setRef('process')}
          className="min-h-screen flex flex-col justify-center px-margin-mobile md:px-margin-desktop py-32"
        >
          <div className="max-w-container-max mx-auto w-full">
            <Reveal>
              <span className="font-label-mono text-[11px] tracking-[0.32em] text-tertiary uppercase">
                {sections[1].eyebrow}
              </span>
            </Reveal>
            <Reveal delay={120}>
              <h2 className="font-display-lg-mobile md:font-display-lg text-display-lg-mobile md:text-display-lg uppercase tracking-tighter leading-[0.95] mt-6 max-w-4xl">
                A studio of one.
                <br />
                Built for delivery.
              </h2>
            </Reveal>
            <Reveal delay={240}>
              <p className="font-body-lg text-body-lg text-on-surface-variant mt-6 max-w-2xl">
                Every stage — concept, motion, audio, and publishing — runs through one operator.
                That means tight feedback loops, lower review tax, and a consistent finish across the
                whole content library.
              </p>
            </Reveal>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-16">
              {processCards.map((card, i) => (
                <Reveal key={card.title} delay={150 + i * 90}>
                  <article className="glass-border bg-black/35 backdrop-blur-[18px] rounded-2xl p-7 md:p-8 h-full hover:bg-black/45 transition-colors group">
                    <div className="flex items-center gap-3 mb-5">
                      <span className="grid place-items-center h-9 w-9 rounded-full bg-tertiary/15 text-tertiary border border-tertiary/30">
                        <Icon name={card.icon} className="text-[20px]" />
                      </span>
                      <h3 className="font-label-mono text-[11px] tracking-[0.22em] uppercase text-on-surface">
                        {card.title}
                      </h3>
                    </div>
                    <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">
                      {card.body}
                    </p>
                  </article>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* WORK */}
        <section
          id="work"
          ref={setRef('work')}
          className="min-h-screen flex flex-col justify-center px-margin-mobile md:px-margin-desktop py-32"
        >
          <div className="max-w-container-max mx-auto w-full">
            <Reveal>
              <span className="font-label-mono text-[11px] tracking-[0.32em] text-tertiary uppercase">
                {sections[2].eyebrow}
              </span>
            </Reveal>
            <Reveal delay={120}>
              <h2 className="font-display-lg-mobile md:font-display-lg text-display-lg-mobile md:text-display-lg uppercase tracking-tighter leading-[0.95] mt-6">
                Three lanes I ship in.
              </h2>
            </Reveal>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mt-16">
              {workCards.map((card, i) => (
                <Reveal key={card.title} delay={150 + i * 110}>
                  <article className="glass-border bg-black/40 backdrop-blur-[18px] rounded-2xl p-7 h-full flex flex-col">
                    <span className="grid place-items-center h-9 w-9 rounded-full bg-secondary-container text-on-surface mb-6">
                      <Icon name={card.icon} className="text-[18px]" />
                    </span>
                    <span className="font-label-mono text-[10px] tracking-[0.24em] text-tertiary uppercase mb-3">
                      {card.tag}
                    </span>
                    <h3 className="font-headline-md text-[22px] leading-[1.15] mb-4">{card.title}</h3>
                    <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">
                      {card.body}
                    </p>
                  </article>
                </Reveal>
              ))}
            </div>

            <Reveal delay={520}>
              <a
                href="#contact"
                onClick={(e) => {
                  e.preventDefault();
                  jump('contact');
                }}
                className="inline-flex items-center gap-2 mt-10 font-label-mono text-[11px] tracking-[0.24em] uppercase text-on-surface-variant hover:text-tertiary border-b border-on-surface-variant/30 hover:border-tertiary pb-1 transition-colors"
              >
                Talk about a project
                <Icon name="north_east" className="text-base" />
              </a>
            </Reveal>
          </div>
        </section>

        {/* STACK */}
        <section
          id="stack"
          ref={setRef('stack')}
          className="min-h-screen flex flex-col justify-center px-margin-mobile md:px-margin-desktop py-32"
        >
          <div className="max-w-container-max mx-auto w-full">
            <Reveal>
              <span className="font-label-mono text-[11px] tracking-[0.32em] text-tertiary uppercase">
                {sections[3].eyebrow}
              </span>
            </Reveal>
            <Reveal delay={120}>
              <h2 className="font-display-lg-mobile md:font-display-lg text-display-lg-mobile md:text-display-lg uppercase tracking-tighter leading-[0.95] mt-6 max-w-4xl">
                The working stack.
              </h2>
            </Reveal>
            <Reveal delay={240}>
              <p className="font-body-lg text-body-lg text-on-surface-variant mt-6 max-w-2xl">
                3.5+ years in production at Promath Technology — running the content pipeline end to end
                across Adobe motion tools, audio editing, Python automation, and AI-augmented workflows.
              </p>
            </Reveal>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-5 mt-16">
              {stackCards.map((stat, i) => (
                <Reveal key={stat.label} delay={150 + i * 80}>
                  <div className="glass-border bg-black/35 backdrop-blur-[18px] rounded-2xl px-6 py-8">
                    <div className="font-display-lg-mobile text-[28px] md:text-[36px] leading-tight tracking-tight text-on-surface">
                      {stat.value}
                    </div>
                    <div className="font-label-mono text-[10px] tracking-[0.24em] uppercase text-on-surface-variant mt-4">
                      {stat.label}
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>

            <Reveal delay={520}>
              <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-5">
                <div className="glass-border bg-black/30 backdrop-blur-[18px] rounded-2xl p-6">
                  <div className="font-label-mono text-[10px] tracking-[0.24em] uppercase text-tertiary mb-3">
                    Current Role
                  </div>
                  <div className="font-headline-md text-[20px] leading-tight">
                    Graphic Designer &amp; Content Administrator
                  </div>
                  <div className="font-body-md text-sm text-on-surface-variant mt-2">
                    Promath Technology Pvt Ltd · T. Nagar, Chennai · June 2022 – Present
                  </div>
                </div>
                <div className="glass-border bg-black/30 backdrop-blur-[18px] rounded-2xl p-6">
                  <div className="font-label-mono text-[10px] tracking-[0.24em] uppercase text-tertiary mb-3">
                    Education
                  </div>
                  <div className="font-headline-md text-[20px] leading-tight">
                    B.Tech, Information Technology
                  </div>
                  <div className="font-body-md text-sm text-on-surface-variant mt-2">
                    Roever Engineering College · Anna University · 2014 · CGPA 6.92
                  </div>
                </div>
                <div className="glass-border bg-black/30 backdrop-blur-[18px] rounded-2xl p-6">
                  <div className="font-label-mono text-[10px] tracking-[0.24em] uppercase text-tertiary mb-3">
                    Also fluent in
                  </div>
                  <div className="font-headline-md text-[20px] leading-tight">
                    Code &amp; Languages
                  </div>
                  <div className="font-body-md text-sm text-on-surface-variant mt-2">
                    HTML · CSS · JavaScript · PHP · SQL · Tamil (Native) · English (Proficient)
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        {/* CONTACT / CTA */}
        <section
          id="contact"
          ref={setRef('contact')}
          className="min-h-screen flex flex-col items-center justify-center px-margin-mobile md:px-margin-desktop text-center py-32"
        >
          <Reveal>
            <span className="font-label-mono text-[11px] tracking-[0.32em] text-tertiary uppercase">
              {sections[4].eyebrow}
            </span>
          </Reveal>
          <Reveal delay={120}>
            <h2 className="font-display-lg-mobile md:font-display-lg text-display-lg-mobile md:text-display-lg uppercase tracking-tighter leading-[0.95] mt-6 max-w-4xl">
              Have a brief?
              <br />
              Let's build it.
            </h2>
          </Reveal>
          <Reveal delay={240}>
            <p className="font-body-lg text-body-lg text-on-surface-variant mt-8 max-w-xl mx-auto">
              Send the deadline, the audience, and the feeling you want them to walk away with. I'll come
              back with a treatment and a rough timeline within 48 hours.
            </p>
          </Reveal>
          <Reveal delay={360}>
            <div className="flex flex-col md:flex-row items-center justify-center gap-4 mt-12">
              <a
                href="mailto:govindan.ramu93@gmail.com"
                className="inline-flex items-center gap-3 bg-white text-black px-8 py-4 font-label-mono text-[11px] tracking-[0.22em] uppercase rounded-full hover:neon-glow transition-all active:scale-95"
              >
                Email Govindan
                <Icon name="mail" className="text-base" />
              </a>
              <a
                href="tel:+919626827280"
                className="inline-flex items-center gap-3 glass-border bg-white/5 backdrop-blur-[20px] text-on-surface px-8 py-4 font-label-mono text-[11px] tracking-[0.22em] uppercase rounded-full hover:bg-white/10 transition-all active:scale-95"
              >
                +91 96268 27280
                <Icon name="call" className="text-base" />
              </a>
            </div>
          </Reveal>
          <Reveal delay={480}>
            <div className="mt-16 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 font-label-mono text-[10px] tracking-[0.24em] uppercase text-on-surface-variant/70">
              <a className="hover:text-tertiary transition-colors" href="mailto:govindan.ramu93@gmail.com">
                govindan.ramu93@gmail.com
              </a>
              <span className="opacity-40">·</span>
              <a
                className="hover:text-tertiary transition-colors"
                href="https://www.linkedin.com/in/govindan-ramu"
                target="_blank"
                rel="noreferrer"
              >
                LinkedIn / Govindan Ramu
              </a>
              <span className="opacity-40">·</span>
              <span>Velur, Tamil Nadu</span>
            </div>
          </Reveal>
          <Reveal delay={600}>
            <p className="font-label-mono text-[10px] tracking-[0.24em] uppercase text-on-surface-variant/40 mt-10">
              © 2026 Govindan R · GR_STUDIO
            </p>
          </Reveal>
        </section>
      </main>
    </div>
  );
}
