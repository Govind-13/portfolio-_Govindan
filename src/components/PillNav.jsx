export default function PillNav({ sections, activeId, onJump }) {
  return (
    <header className="fixed top-4 md:top-6 left-1/2 -translate-x-1/2 z-50 w-[min(96vw,920px)]">
      <div className="glass-border bg-black/40 backdrop-blur-[24px] rounded-full px-3 md:px-4 py-2 flex items-center gap-2 md:gap-3 shadow-[0_8px_40px_rgba(0,0,0,0.55)]">
        <button
          type="button"
          onClick={() => onJump(sections[0].id)}
          className="font-display-lg-mobile text-[15px] md:text-[17px] tracking-tight px-3 py-1.5 rounded-full text-on-surface uppercase"
        >
          GR_Studio
        </button>
        <nav className="hidden md:flex items-center gap-1 flex-1 justify-center">
          {sections.map((s) => {
            const active = s.id === activeId;
            return (
              <button
                key={s.id}
                type="button"
                onClick={() => onJump(s.id)}
                className={`font-label-mono text-[11px] tracking-[0.18em] uppercase px-3.5 py-1.5 rounded-full transition-all duration-300 ${
                  active
                    ? 'bg-white text-black shadow-[0_0_18px_rgba(0,218,248,0.35)]'
                    : 'text-on-surface-variant hover:text-on-surface'
                }`}
              >
                {s.label}
              </button>
            );
          })}
        </nav>
        <button
          type="button"
          onClick={() => onJump(sections[sections.length - 1].id)}
          className="ml-auto md:ml-0 font-label-mono text-[11px] tracking-[0.18em] uppercase px-4 py-1.5 rounded-full bg-tertiary text-on-tertiary hover:neon-glow transition-all active:scale-95"
        >
          Get In Touch
        </button>
      </div>
    </header>
  );
}
