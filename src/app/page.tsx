'use client';

import { AnimatedBackground } from '../components/AnimatedBackground';
import { CategoryCard } from '../components/CategoryCard';
import { ThemeToggle } from '../components/ThemeToggle';
import { ThemeProvider, useTheme } from '../contexts/ThemeContext';
import { getAllCategories } from '../lib/units';

function HomePage() {
  const categories = getAllCategories();
  const { isDark } = useTheme();

  return (
    <AnimatedBackground>
      <div className="container mx-auto px-4 py-8 md:py-16">
        {/* Theme Toggle - Fixed position */}
        <div className="fixed top-6 right-6 z-50">
          <ThemeToggle size="lg" />
        </div>

        {/* Hero Section */}
        <div className="text-center mb-12 md:mb-16">
          <h1 className={`text-4xl md:text-6xl font-bold mb-4 animate-fade-in ${
            isDark ? 'text-white' : 'text-amber-900'
          }`} style={!isDark ? { color: '#92400e' } : {}}>
            Unit Converter
          </h1>
          <p className={`text-xl md:text-2xl mb-8 animate-fade-in-delay ${
            isDark ? 'text-white/80' : 'text-amber-800/90'
          }`} style={!isDark ? { color: '#b45309' } : {}}>
            Convert measurements with ease and precision
          </p>
          <div className={`animate-fade-in-delay-2 ${
            isDark ? 'text-white/60' : 'text-amber-700/80'
          }`} style={!isDark ? { color: '#a16207' } : {}}>
            <p>Choose a category to start converting</p>
            {isDark ? (
              <p className="text-orange-300/70 text-sm mt-2 flex items-center justify-center gap-2">
                <span>🧛‍♂️</span> Vampire mode activated - easy on the eyes!
              </p>
            ) : (
              <p className="text-sm mt-2 flex items-center justify-center gap-2" style={{ color: '#d97706' }}>
                <span>☀️</span> Beautiful amber theme - bright and energetic!
              </p>
            )}
          </div>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 max-w-6xl mx-auto">
          {categories.map((category, index) => (
            <div
              key={category.id}
              className="animate-slide-up"
              style={{
                animationDelay: `${index * 150}ms`,
                animationFillMode: 'both',
              }}
            >
              <CategoryCard category={category} index={index} />
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="text-center mt-16 md:mt-24">
          <p className={`text-sm ${
            isDark ? 'text-white/40' : ''
          }`} style={!isDark ? { color: '#a16207' } : {}}>
            Fast, accurate, and beautiful unit conversions
          </p>
          <p className={`text-xs mt-2 ${
            isDark ? 'text-gray-400' : ''
          }`} style={!isDark ? { color: '#d97706' } : {}}>
            Custom amber theme & vampire-friendly black mode
          </p>
        </div>
      </div>

      {/* Custom CSS for animations */}
      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes slide-up {
          from {
            opacity: 0;
            transform: translateY(40px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fade-in {
          animation: fade-in 1s ease-out;
        }

        .animate-fade-in-delay {
          animation: fade-in 1s ease-out 0.3s both;
        }

        .animate-fade-in-delay-2 {
          animation: fade-in 1s ease-out 0.6s both;
        }

        .animate-slide-up {
          animation: slide-up 0.8s ease-out both;
        }
      `}</style>
    </AnimatedBackground>
  );
}

export default HomePage;