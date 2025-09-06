'use client';

import { useTheme } from '../contexts/ThemeContext';

interface AnimatedBackgroundProps {
  children: React.ReactNode;
  variant?: 'default' | 'category';
  gradient?: string;
}

export function AnimatedBackground({ 
  children, 
  variant = 'default', 
  gradient 
}: AnimatedBackgroundProps) {
  const { isDark } = useTheme();

  return (
    <div className={`relative min-h-screen overflow-hidden transition-all duration-500 ${
      isDark ? 'dark' : 'light'
    }`}>
      {/* Animated gradient background */}
      <div className="absolute inset-0 -z-10">
        <div 
          className={`absolute inset-0 transition-all duration-500 ${
            isDark ? 'opacity-100' : 'opacity-95'
          }`}
          style={{
            background: variant === 'category' && gradient
              ? `linear-gradient(135deg, ${gradient.replace('from-', '').replace('via-', ', ').replace('to-', ', ')})`
              : isDark
              ? `linear-gradient(135deg, #000000, #111111, #1a1a1a)`  // Complete black theme
              : `linear-gradient(135deg, #ffbf00, #ffa500, #ff8000)`  // Light mode with exact hex colors
          }}
        />
        
        {/* Animated orbs with theme-aware colors */}
        <div className={`absolute -top-40 -right-40 w-80 h-80 rounded-full blur-3xl animate-pulse transition-colors duration-500 ${
          isDark 
            ? 'bg-gray-700/10' 
            : 'bg-yellow-400/25'
        }`} style={!isDark ? { backgroundColor: 'rgba(255, 191, 0, 0.25)' } : {}} />
        <div className={`absolute -bottom-40 -left-40 w-96 h-96 rounded-full blur-3xl animate-pulse delay-1000 transition-colors duration-500 ${
          isDark 
            ? 'bg-gray-600/5' 
            : 'bg-orange-400/20'
        }`} style={!isDark ? { backgroundColor: 'rgba(255, 165, 0, 0.20)' } : {}} />
        <div className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 rounded-full blur-2xl animate-pulse delay-500 transition-colors duration-500 ${
          isDark 
            ? 'bg-gray-500/5' 
            : 'bg-orange-500/20'
        }`} style={!isDark ? { backgroundColor: 'rgba(255, 128, 0, 0.20)' } : {}} />
        
        {/* Floating particles with theme colors */}
        <div className="absolute inset-0">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className={`absolute w-1 h-1 rounded-full animate-float transition-colors duration-500 ${
                isDark 
                  ? 'bg-gray-300/20' 
                  : ''
              }`}
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`,
                animationDuration: `${3 + Math.random() * 4}s`,
                backgroundColor: !isDark ? 'rgba(255, 128, 0, 0.6)' : undefined,
              }}
            />
          ))}
        </div>
      </div>
      
      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>
      
      {/* Custom CSS for animations */}
      <style jsx>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(0px) translateX(0px);
            opacity: 0.3;
          }
          25% {
            transform: translateY(-10px) translateX(5px);
            opacity: 0.6;
          }
          50% {
            transform: translateY(0px) translateX(10px);
            opacity: 0.4;
          }
          75% {
            transform: translateY(5px) translateX(-5px);
            opacity: 0.8;
          }
        }
        
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}