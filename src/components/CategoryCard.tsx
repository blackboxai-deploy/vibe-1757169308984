'use client';

import Link from 'next/link';
import { ConversionCategory, Unit } from '../lib/units';
import { useTheme } from '../contexts/ThemeContext';

interface CategoryCardProps {
  category: ConversionCategory;
  index: number;
}

export function CategoryCard({ category, index }: CategoryCardProps) {
  const { isDark } = useTheme();
  
  return (
    <Link href={`/converter/${category.id}`}>
      <div 
        className={`group relative p-6 backdrop-blur-md rounded-2xl border transition-all duration-500 hover:scale-105 hover:shadow-2xl cursor-pointer ${
          isDark 
            ? 'bg-gray-800/50 border-gray-700/50 hover:bg-gray-700/60 hover:shadow-gray-500/10' 
            : 'bg-white/40 hover:bg-white/50'
        }`}
        style={{
          animationDelay: `${index * 100}ms`,
          ...((!isDark) ? { 
            borderColor: 'rgba(146, 64, 14, 0.3)',
            boxShadow: '0 20px 25px -5px rgba(255, 165, 0, 0.1), 0 10px 10px -5px rgba(255, 165, 0, 0.04)'
          } : {
            borderColor: 'rgba(75, 85, 99, 0.5)',
            boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.3), 0 10px 10px -5px rgba(0, 0, 0, 0.2)'
          })
        }}
      >
        {/* Gradient background overlay */}
        <div className={`absolute inset-0 bg-gradient-to-br ${category.gradient} opacity-0 group-hover:opacity-10 rounded-2xl transition-opacity duration-500`} />
        
        {/* Content */}
        <div className="relative z-10">
          {/* Icon */}
          <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">
            {category.icon}
          </div>
          
          {/* Title */}
          <h3 className={`text-xl font-bold mb-2 transition-colors ${
            isDark 
              ? 'text-white group-hover:text-white' 
              : ''
          }`} style={!isDark ? { color: '#92400e' } : {}}>
            {category.name}
          </h3>
          
          {/* Description */}
          <p className={`text-sm transition-colors ${
            isDark 
              ? 'text-white/70 group-hover:text-white/90' 
              : ''
          }`} style={!isDark ? { color: '#a16207' } : {}}>
            {category.description}
          </p>
          
          {/* Units preview */}
          <div className="flex flex-wrap gap-1 mt-4">
            {Object.values(category.units).slice(0, 3).map((unit: Unit) => (
              <span 
                key={unit.symbol} 
                className={`px-2 py-1 rounded-full text-xs transition-all duration-300 ${
                  isDark 
                    ? 'bg-gray-700/50 text-gray-200 group-hover:bg-gray-600/60 group-hover:text-white' 
                    : ''
                }`}
                style={!isDark ? {
                  backgroundColor: 'rgba(255, 191, 0, 0.2)',
                  color: '#92400e',
                } : {}}
              >
                {unit.symbol}
              </span>
            ))}
            {Object.values(category.units).length > 3 && (
              <span className={`px-2 py-1 rounded-full text-xs transition-all duration-300 ${
                isDark 
                  ? 'bg-gray-700/40 text-gray-300 group-hover:bg-gray-600/50 group-hover:text-gray-200' 
                  : ''
              }`}
              style={!isDark ? {
                backgroundColor: 'rgba(255, 191, 0, 0.15)',
                color: '#a16207',
              } : {}}>
                +{Object.values(category.units).length - 3}
              </span>
            )}
          </div>
        </div>
        
        {/* Hover arrow */}
        <div className={`absolute top-4 right-4 group-hover:translate-x-1 transition-all duration-300 ${
          isDark 
            ? 'text-white/50 group-hover:text-white' 
            : ''
        }`} style={!isDark ? { color: '#a16207' } : {}}>
          <svg width="20" height="20" fill="none" viewBox="0 0 24 24">
            <path 
              stroke="currentColor" 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth="2" 
              d="M5 12h14m-7-7 7 7-7 7"
            />
          </svg>
        </div>
        
        {/* Animated border */}
        <div className={`absolute inset-0 rounded-2xl bg-gradient-to-r opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10 blur-sm ${
          isDark 
            ? 'from-transparent via-gray-400/10 to-transparent' 
            : 'from-transparent via-orange-600/30 to-transparent'
        }`} />
      </div>
    </Link>
  );
}