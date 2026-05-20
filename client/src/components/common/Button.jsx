import { cn } from '../../utils/helpers';

const variants = {
  primary: 'bg-primary-500 hover:bg-primary-600 text-white shadow-md glow-button',
  secondary: 'bg-eo-surface-container-high hover:bg-eo-surface-container-highest text-[var(--text-primary)] border border-eo-outline-variant',
  outline: 'border border-eo-outline-variant text-[var(--text-primary)] hover:bg-eo-surface-container-high',
  ghost: 'text-[var(--text-secondary)] hover:bg-eo-surface-container-high hover:text-[var(--text-primary)]',
  danger: 'bg-danger-500 hover:bg-danger-600 text-white',
  glow: 'bg-primary-500 text-white emerald-glow hover:scale-105 active:scale-95',
};

const sizes = {
  sm: 'px-3 py-1.5 text-sm',
  md: 'px-5 py-2.5 text-sm',
  lg: 'px-7 py-3.5 text-base',
  xl: 'px-8 py-4 text-base font-bold',
};

export default function Button({ children, variant = 'primary', size = 'md', className, loading, disabled, icon: Icon, ...props }) {
  return (
    <button
      className={cn(
        'inline-flex items-center justify-center gap-2 font-medium rounded-xl transition-all duration-300 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed',
        variants[variant], sizes[size], className
      )}
      disabled={disabled || loading}
      {...props}
    >
      {loading ? (
        <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"/><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/></svg>
      ) : Icon ? <Icon size={18} /> : null}
      {children}
    </button>
  );
}
