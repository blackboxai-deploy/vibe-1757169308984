'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { AnimatedBackground } from '../../../components/AnimatedBackground';
import { ConversionCard } from '../../../components/ConversionCard';
import { ConversionHistory } from '../../../components/ConversionHistory';
import { ThemeToggle } from '../../../components/ThemeToggle';
import { useTheme } from '../../../contexts/ThemeContext';
import { getCategoryById } from '../../../lib/units';

// Simple back arrow icon
function ArrowLeftIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
    </svg>
  );
}

interface ConverterPageProps {
  params: Promise<{
    category: string;
  }>;
}

export default function ConverterPage({ params }: ConverterPageProps) {
  const router = useRouter();
  const { isDark } = useTheme();
  const [categoryId, setCategoryId] = React.useState<string>('');
  const [category, setCategory] = React.useState<any>(null);

  React.useEffect(() => {
    params.then((resolvedParams) => {
      setCategoryId(resolvedParams.category);
      setCategory(getCategoryById(resolvedParams.category));
    });
  }, [params]);

  // Loading state while params are being resolved
  if (!categoryId) {
    return (
      <AnimatedBackground>
        <div className="container mx-auto px-4 py-8 text-center">
          <div className="text-white">Loading...</div>
        </div>
      </AnimatedBackground>
    );
  }

  if (!category) {
    return (
      <AnimatedBackground>
        <div className="container mx-auto px-4 py-8 text-center">
          <h1 className="text-2xl font-bold text-white mb-4">Category not found</h1>
          <button
            onClick={() => router.push('/')}
            className="px-6 py-3 bg-white/10 hover:bg-white/20 text-white rounded-xl transition-colors duration-200"
          >
            Back to Home
          </button>
        </div>
      </AnimatedBackground>
    );
  }

  return (
    <AnimatedBackground gradient={category.gradient}>
      <div className="container mx-auto px-4 py-8 md:py-12">
        {/* Theme Toggle - Fixed position */}
        <div className="fixed top-6 right-6 z-50">
          <ThemeToggle size="md" />
        </div>

        {/* Header */}
        <div className="mb-8 md:mb-12">
          <button
            onClick={() => router.push('/')}
            className={`flex items-center gap-2 mb-6 transition-colors duration-200 group ${
              isDark 
                ? 'text-white/80 hover:text-white' 
                : ''
            }`}
            style={!isDark ? { color: '#a16207' } : {}}
          >
            <ArrowLeftIcon className="h-5 w-5 group-hover:-translate-x-1 transition-transform duration-200" />
            Back to Categories
          </button>
          
          <div className="text-center">
            <h1 className={`text-3xl md:text-4xl font-bold mb-2 animate-fade-in ${
              isDark ? 'text-white' : ''
            }`} style={!isDark ? { color: '#92400e' } : {}}>
              <span className="text-4xl md:text-5xl mr-3">{category.icon}</span>
              {category.name} Converter
            </h1>
            <p className={`text-lg animate-fade-in-delay ${
              isDark ? 'text-white/70' : ''
            }`} style={!isDark ? { color: '#a16207' } : {}}>
              {category.description}
            </p>
          </div>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {/* Conversion Card - Takes up 2/3 on large screens */}
          <div className="xl:col-span-2">
            <div className="animate-slide-up">
              <ConversionCard categoryId={categoryId} />
            </div>
          </div>

          {/* History Sidebar - Takes up 1/3 on large screens */}
          <div className="xl:col-span-1">
            <div className="animate-slide-up" style={{ animationDelay: '0.2s', animationFillMode: 'both' }}>
              <ConversionHistory categoryId={categoryId} />
            </div>
          </div>
        </div>

        {/* Quick Tips */}
         <div className="mt-12 max-w-4xl mx-auto">
          <div className={`backdrop-blur-md rounded-xl border p-6 animate-fade-in-delay-2 ${
            isDark 
              ? 'bg-gray-800/50 border-gray-700/50' 
              : 'bg-white/20 border-orange-900/20'
          }`}>
            <h3 className={`font-semibold mb-3 flex items-center gap-2 ${
              isDark ? 'text-gray-100' : 'text-orange-900'
            }`}>
              <span>💡</span>
              Quick Tips
            </h3>
            <div className={`text-sm space-y-2 ${
              isDark ? 'text-gray-300' : 'text-orange-800/80'
            }`}>
              <p>• Use the swap button to quickly reverse your conversion</p>
              <p>• All conversions are calculated with high precision</p>
              <p>• Your recent conversions are saved locally for quick reference</p>
              <p>• Enter decimal numbers using a dot (e.g., 1.5)</p>
              <p>• Toggle between vampire mode 🧛‍♂️ and light mode using the theme button</p>
            </div>
          </div>
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
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fade-in {
          animation: fade-in 0.8s ease-out;
        }

        .animate-fade-in-delay {
          animation: fade-in 0.8s ease-out 0.2s both;
        }

        .animate-fade-in-delay-2 {
          animation: fade-in 0.8s ease-out 0.4s both;
        }

        .animate-slide-up {
          animation: slide-up 0.6s ease-out both;
        }
      `}</style>
    </AnimatedBackground>
  );
}