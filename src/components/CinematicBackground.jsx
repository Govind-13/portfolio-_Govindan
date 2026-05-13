export default function CinematicBackground({ shots, progress }) {
  const span = shots.length - 1;
  const pos = progress * span;
  return (
    <div className="fixed inset-0 z-0 overflow-hidden bg-background pointer-events-none">
      {shots.map((shot, i) => {
        const distance = Math.abs(pos - i);
        const opacity = Math.max(0, 1 - distance);
        const scale = 1.08 - Math.min(0.08, distance * 0.06);
        return (
          <img
            key={shot.src}
            src={shot.src}
            alt={shot.alt}
            className="absolute inset-0 w-full h-full object-cover will-change-[opacity,transform] transition-transform duration-[1200ms] ease-out"
            style={{
              opacity,
              transform: `scale(${scale})`,
            }}
          />
        );
      })}
      <div className="absolute inset-0 bg-gradient-to-b from-background/30 via-background/55 to-background/95" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(10,10,11,0.5)_70%,rgba(10,10,11,0.9)_100%)]" />
    </div>
  );
}
