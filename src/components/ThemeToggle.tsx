'use client';

import { useTheme } from '../contexts/ThemeContext';

// Sun icon for light mode
function SunIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path 
        strokeLinecap="round" 
        strokeLinejoin="round" 
        strokeWidth={2} 
        d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" 
      />
    </svg>
  );
}

// Moon icon for dark mode
function MoonIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path 
        strokeLinecap="round" 
        strokeLinejoin="round" 
        strokeWidth={2} 
        d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" 
      />
    </svg>
  );
}

// Vampire emoji for dark mode
function VampireIcon({ className }: { className?: string }) {
  return (
    <span className={`${className} text-lg`}>🧛‍♂️</span>
  );
}

interface ThemeToggleProps {
  size?: 'sm' | 'md' | 'lg';
  showLabel?: boolean;
  className?: string;
}

export function ThemeToggle({ size = 'md', showLabel = false, className = '' }: ThemeToggleProps) {
  const { toggleTheme, isDark } = useTheme();

  const sizeClasses = {
    sm: 'p-2 text-sm',
    md: 'p-3 text-base',
    lg: 'p-4 text-lg',
  };

  const iconSizes = {
    sm: 'h-4 w-4',
    md: 'h-5 w-5',
    lg: 'h-6 w-6',
  };

  return (
    <button
      onClick={toggleTheme}
      className={`
        ${sizeClasses[size]}
        ${className}
        relative overflow-hidden
        bg-white/10 hover:bg-white/20 
        dark:bg-white/10 dark:hover:bg-white/20
        light:bg-orange-900/10 light:hover:bg-orange-900/20
        backdrop-blur-md border border-white/20
        dark:border-white/20 light:border-orange-900/30
        rounded-full transition-all duration-300 
        hover:scale-110 active:scale-95
        text-white dark:text-white light:text-orange-900
        group
      `}
      title={isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode (Vampire Mode)'}
    >
      {/* Background glow effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-orange-500/20 via-red-500/20 to-orange-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-full" />
      
      {/* Icon container with rotation animation */}
      <div className="relative flex items-center justify-center">
        <div className={`transform transition-all duration-500 ${isDark ? 'rotate-0 opacity-100' : 'rotate-180 opacity-0 absolute'}`}>
          {size === 'lg' ? <VampireIcon className={iconSizes[size]} /> : <MoonIcon className={iconSizes[size]} />}
        </div>
        <div className={`transform transition-all duration-500 ${isDark ? 'rotate-180 opacity-0 absolute' : 'rotate-0 opacity-100'}`}>
          <SunIcon className={iconSizes[size]} />
        </div>
      </div>
      
      {/* Optional label */}
      {showLabel && (
        <span className="ml-2 text-sm font-medium">
          {isDark ? 'Vampire Mode' : 'Light Mode'}
        </span>
      )}
      
      {/* Animated border */}
      <div className="absolute inset-0 rounded-full bg-gradient-to-r from-orange-400 via-red-500 to-orange-600 opacity-0 group-hover:opacity-20 transition-opacity duration-300 -z-10 blur-sm" />
    </button>
  );
}