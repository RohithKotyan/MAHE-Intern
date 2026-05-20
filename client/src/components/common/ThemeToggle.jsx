import { useTheme } from '../../context/ThemeContext';

export default function ThemeToggle() {
  const { darkMode, toggleTheme } = useTheme();

  // Emerald Orbit is dark-first. Toggle kept for compatibility but hidden from public nav.
  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded-xl hover:bg-eo-surface-container-high transition-colors cursor-pointer"
      title={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
    >
      <span className="material-symbols-outlined text-[var(--text-secondary)] text-xl">
        {darkMode ? 'light_mode' : 'dark_mode'}
      </span>
    </button>
  );
}
