import useInView from '../hooks/useInView.js';

export default function Reveal({ as: Tag = 'div', delay = 0, className = '', children, ...rest }) {
  const [ref, inView] = useInView();
  const style = { transitionDelay: `${delay}ms` };
  return (
    <Tag
      ref={ref}
      style={style}
      className={`will-change-transform transition-all duration-[900ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${
        inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      } ${className}`}
      {...rest}
    >
      {children}
    </Tag>
  );
}
