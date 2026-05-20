import { cn } from '../../utils/helpers';

export default function Card({ children, hover = false, glow = false, className, ...props }) {
  return (
    <div
      className={cn(
        'rounded-2xl border border-eo-outline-variant/30 bg-[var(--bg-card)] p-6 transition-all duration-300',
        hover && 'glass-card',
        glow && 'emerald-glow',
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
