import { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import { cn } from '../../utils/helpers';

export default function Input({ label, error, icon: Icon, materialIcon, type = 'text', className, ...props }) {
  const [showPassword, setShowPassword] = useState(false);
  const isPassword = type === 'password';
  const hasIcon = Icon || materialIcon;

  return (
    <div className="space-y-2">
      {label && (
        <label className="block text-xs font-medium text-[var(--text-secondary)] uppercase tracking-wider ml-1">
          {label}
        </label>
      )}
      <div className="relative group">
        {materialIcon && (
          <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-[var(--text-muted)] group-focus-within:text-primary-500 transition-colors text-xl">
            {materialIcon}
          </span>
        )}
        {Icon && !materialIcon && (
          <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[var(--text-muted)] group-focus-within:text-primary-500 transition-colors">
            <Icon size={18} />
          </div>
        )}
        <input
          type={isPassword && showPassword ? 'text' : type}
          className={cn(
            'w-full rounded-xl border border-eo-outline-variant/30 bg-eo-surface-container-low px-4 py-3 text-sm text-[var(--text-primary)] placeholder:text-[var(--text-muted)]/50 outline-none transition-all duration-200',
            'focus:border-primary-500 focus:ring-1 focus:ring-primary-500/20',
            hasIcon && 'pl-12',
            isPassword && 'pr-12',
            error && 'border-danger-500 focus:border-danger-500 focus:ring-danger-500/20',
            className
          )}
          {...props}
        />
        {isPassword && (
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[var(--text-muted)] hover:text-[var(--text-secondary)] cursor-pointer transition-colors"
          >
            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        )}
      </div>
      {error && <p className="text-xs text-danger-500 ml-1">{error}</p>}
    </div>
  );
}
