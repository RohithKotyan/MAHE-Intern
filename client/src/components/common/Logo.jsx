import { Link } from 'react-router-dom';

export default function Logo({ size = 'md', linkTo = '/' }) {
  const sizes = {
    sm: 'text-lg',
    md: 'text-xl',
    lg: 'text-2xl',
  };

  const iconSizes = {
    sm: '20px',
    md: '24px',
    lg: '28px',
  };

  const content = (
    <div className={`flex items-center gap-2 font-bold ${sizes[size]}`}>
      <span
        className="material-symbols-outlined text-primary-500"
        style={{
          fontVariationSettings: "'FILL' 1",
          fontSize: iconSizes[size],
        }}
      >
        eco
      </span>
      <span className="text-[var(--text-primary)] tracking-tight">
        AgroCare <span className="text-primary-500">AI</span>
      </span>
    </div>
  );

  if (linkTo) {
    return <Link to={linkTo} className="flex items-center">{content}</Link>;
  }
  return content;
}
