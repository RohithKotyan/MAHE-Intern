import { cn } from '../../utils/helpers';

export default function Card({ children, className, hover = false, ...props }) {
  return (
    <div className={cn(
      'rounded-2xl border border-[var(--border-color)] bg-[var(--bg-card)] p-5 shadow-[var(--shadow-sm)]',
      hover && 'card-hover cursor-pointer',
      className
    )} {...props}>
      {children}
    </div>
  );
}
