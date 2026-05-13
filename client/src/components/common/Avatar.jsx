import { getInitials, cn } from '../../utils/helpers';

export default function Avatar({ name, src, size = 'md', className }) {
  const sizes = { sm: 'w-8 h-8 text-xs', md: 'w-10 h-10 text-sm', lg: 'w-14 h-14 text-lg', xl: 'w-20 h-20 text-xl' };

  if (src) {
    return <img src={src} alt={name} className={cn('rounded-full object-cover border-2 border-[var(--border-color)]', sizes[size], className)} />;
  }

  return (
    <div className={cn('rounded-full flex items-center justify-center font-semibold bg-primary-500/10 text-primary-500 border-2 border-primary-500/20', sizes[size], className)}>
      {getInitials(name)}
    </div>
  );
}
