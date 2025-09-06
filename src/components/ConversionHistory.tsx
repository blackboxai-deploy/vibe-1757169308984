'use client';

import { useConversionHistory } from '../hooks/use-local-storage';
import { getCategoryById } from '../lib/units';
import { useTheme } from '../contexts/ThemeContext';

interface ConversionHistoryProps {
  categoryId: string;
}

function TrashIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
    </svg>
  );
}

function ClockIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  );
}

export function ConversionHistory({ categoryId }: ConversionHistoryProps) {
  const { isDark } = useTheme();
  const { getRecentConversions, clearHistory } = useConversionHistory();
  const recentConversions = getRecentConversions(categoryId, 5);
  const category = getCategoryById(categoryId);

  if (recentConversions.length === 0) {
    return null;
  }

  const formatValue = (value: number): string => {
    if (value === 0) return '0';
    if (Math.abs(value) >= 1e9 || (Math.abs(value) < 0.001 && value !== 0)) {
      return value.toExponential(2);
    }
    if (value % 1 === 0 && Math.abs(value) < 1e6) {
      return value.toString();
    }
    return parseFloat(value.toFixed(6)).toString();
  };

  const getUnitSymbol = (unitId: string): string => {
    return category?.units[unitId]?.symbol || unitId;
  };

  const formatRelativeTime = (timestamp: number): string => {
    const now = Date.now();
    const diff = now - timestamp;
    
    if (diff < 60000) return 'Just now';
    if (diff < 3600000) return `${Math.floor(diff / 60000)}m ago`;
    if (diff < 86400000) return `${Math.floor(diff / 3600000)}h ago`;
    return `${Math.floor(diff / 86400000)}d ago`;
  };

  return (
    <div className={`backdrop-blur-md rounded-2xl border p-6 ${
      isDark 
        ? 'bg-gray-800/50 border-gray-700/50' 
        : 'bg-white/20 border-orange-900/20'
    }`}>
      <div className="flex items-center justify-between mb-4">
         <h3 className={`text-lg font-semibold flex items-center gap-2 ${
          isDark ? 'text-gray-100' : 'text-orange-900'
        }`}>
          <ClockIcon className="h-5 w-5" />
          Recent Conversions
        </h3>
        <button
          onClick={clearHistory}
           className={`p-2 rounded-lg transition-all duration-200 ${
            isDark 
              ? 'text-gray-400 hover:text-gray-200 hover:bg-gray-700/40' 
              : 'text-orange-800/50 hover:text-orange-900/80 hover:bg-orange-900/10'
          }`}
          title="Clear history"
        >
          <TrashIcon className="h-4 w-4" />
        </button>
      </div>
      
      <div className="space-y-3">
        {recentConversions.map((conversion) => (
          <div
            key={conversion.id}
             className={`p-3 rounded-lg border transition-all duration-200 group ${
              isDark 
                ? 'bg-gray-900/60 hover:bg-gray-800/70 border-gray-700/50' 
                : 'bg-white/10 hover:bg-white/20 border-orange-900/10'
            }`}
          >
            <div className="flex items-center justify-between">
              <div className="flex-1">
                 <div className={`text-sm ${
                  isDark ? 'text-gray-200' : 'text-orange-900/90'
                }`}>
                  <span className="font-medium">
                    {formatValue(conversion.fromValue)} {getUnitSymbol(conversion.fromUnit)}
                  </span>
                   <span className={`mx-2 ${
                    isDark ? 'text-gray-400' : 'text-orange-800/50'
                  }`}>→</span>
                  <span className="font-medium">
                    {formatValue(conversion.toValue)} {getUnitSymbol(conversion.toUnit)}
                  </span>
                </div>
              </div>
               <div className={`text-xs ml-4 ${
                isDark ? 'text-gray-500' : 'text-orange-800/40'
              }`}>
                {formatRelativeTime(conversion.timestamp)}
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {recentConversions.length >= 5 && (
        <div className="mt-4 text-center">
           <p className={`text-xs ${
            isDark ? 'text-gray-500' : 'text-orange-800/50'
          }`}>
            Showing last 5 conversions
          </p>
        </div>
      )}
    </div>
  );
}