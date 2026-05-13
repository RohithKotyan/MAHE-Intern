export default function Logo({ size = 'md' }) {
  const sizes = { sm: 'text-lg', md: 'text-xl', lg: 'text-2xl' };
  return (
    <div className={`flex items-center gap-2 font-bold ${sizes[size]}`}>
      <div className="w-8 h-8 rounded-lg gradient-bg flex items-center justify-center">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 2C12 2 4 6 4 14s8 8 8 8 8 0 8-8S12 2 12 2z" fill="white" fillOpacity="0.9"/>
          <path d="M12 6c0 0 4 3 4 8s-4 6-4 6" stroke="rgba(0,0,0,0.2)" strokeWidth="1.5" fill="none"/>
        </svg>
      </div>
      <span className="text-[var(--text-primary)]">Agro<span className="text-primary-500">Care</span></span>
    </div>
  );
}
