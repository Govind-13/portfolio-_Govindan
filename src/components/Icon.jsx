export default function Icon({ name, className = '', filled = false, style = {} }) {
  const merged = filled
    ? { ...style, fontVariationSettings: "'FILL' 1" }
    : style;
  return (
    <span className={`material-symbols-outlined ${className}`} data-icon={name} style={merged}>
      {name}
    </span>
  );
}
