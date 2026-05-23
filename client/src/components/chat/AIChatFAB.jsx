import React from 'react';
import { Link, useLocation } from 'react-router-dom';

export default function AIChatFAB() {
  const location = useLocation();
  const isChatPage = location.pathname === '/dashboard/chat';

  if (isChatPage) return null;

  return (
    <Link
      to="/dashboard/chat"
      className="fixed bottom-24 right-4 md:bottom-8 md:right-8 z-[60] flex items-center justify-center group"
    >
      <div className="relative w-14 h-14 md:w-16 md:h-16 rounded-full bg-gradient-to-br from-emerald-500 to-emerald-700 text-white shadow-[0_8px_30px_rgba(16,185,129,0.4)] hover:shadow-[0_8px_40px_rgba(16,185,129,0.6)] hover:-translate-y-1 transition-all duration-300 flex items-center justify-center border-2 border-white/20">
        <span className="absolute inset-0 w-full h-full bg-white/20 rounded-full scale-0 group-hover:scale-100 transition-transform duration-300 ease-out opacity-0 group-hover:opacity-100"></span>
        <span className="material-symbols-outlined text-[28px] md:text-[32px] relative z-10 group-hover:scale-110 transition-transform duration-300">forum</span>
        <span className="absolute -top-1 -right-1 w-4 h-4 md:w-5 md:h-5 rounded-full bg-emerald-300 border-2 border-emerald-700 animate-pulse"></span>
      </div>
    </Link>
  );
}
