'use client';

import { UnitSelector } from './UnitSelector';
import { useConversion } from '../hooks/use-conversion';
import { useTheme } from '../contexts/ThemeContext';

interface ConversionCardProps {
  categoryId: string;
}

// Simple swap icon component
function SwapIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
    </svg>
  );
}

// Simple refresh icon component  
function RefreshIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0V9a8.002 8.002 0 0115.356 2M15.418 15v0a8.001 8.001 0 01-15.356-2m15.356 0H20v5" />
    </svg>
  );
}

export function ConversionCard({ categoryId }: ConversionCardProps) {
  const { isDark } = useTheme();
  const {
    inputValue,
    outputValue,
    fromUnit,
    toUnit,
    isValidInput,
    category,
    availableUnits,
    setInputValue,
    setFromUnit,
    setToUnit,
    swapUnits,
    reset,
    getUnitSymbol,
  } = useConversion(categoryId);

  if (!category) {
    return (
      <div className={`backdrop-blur-md rounded-2xl border p-8 text-center ${
        isDark 
          ? 'bg-gray-800/60 border-gray-700/50' 
          : 'bg-white/20 border-orange-900/20'
      }`}>
        <p className={isDark ? 'text-gray-300' : 'text-orange-800/70'}>Category not found</p>
      </div>
    );
  }

  return (
    <div className={`backdrop-blur-md rounded-2xl border p-6 md:p-8 shadow-2xl ${
      isDark 
        ? 'bg-gray-800/50 border-gray-700/50' 
        : 'bg-white/20 border-orange-900/20'
    }`}>
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className={`text-2xl font-bold flex items-center gap-3 ${
            isDark ? 'text-white' : 'text-orange-900'
          }`}>
            <span className="text-3xl">{category.icon}</span>
            {category.name} Converter
          </h2>
          <p className={`mt-1 ${
            isDark ? 'text-white/70' : 'text-orange-800/70'
          }`}>{category.description}</p>
        </div>
        <button
          onClick={reset}
          className={`p-2 rounded-lg transition-colors duration-200 ${
            isDark 
              ? 'bg-gray-700/50 hover:bg-gray-600/60 text-gray-300 hover:text-white' 
              : 'bg-orange-900/10 hover:bg-orange-900/20 text-orange-800/70 hover:text-orange-900'
          }`}
          title="Reset"
        >
          <RefreshIcon className="h-5 w-5" />
        </button>
      </div>

      <div className="space-y-6">
        {/* From Section */}
        <div className="space-y-4">
          <div className="flex flex-col md:flex-row md:items-end gap-4">
            <div className="flex-1">
              <label className={`block text-sm font-medium mb-2 ${
                isDark ? 'text-gray-200' : 'text-orange-900/80'
              }`}>
                From
              </label>
              <input
                type="number"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Enter value..."
                className={`w-full backdrop-blur-md border rounded-xl px-4 py-3 focus:outline-none focus:ring-2 transition-all duration-200 ${
                  isDark 
                    ? `bg-gray-800/60 text-gray-100 placeholder-gray-400 ${
                        isValidInput 
                          ? 'border-gray-600/50 focus:ring-gray-500/50' 
                          : 'border-red-400/50 focus:ring-red-400/50'
                      }`
                    : `bg-white/20 text-orange-900 placeholder-orange-800/50 ${
                        isValidInput 
                          ? 'border-orange-900/20 focus:ring-orange-500/50' 
                          : 'border-red-500/50 focus:ring-red-500/50'
                      }`
                }`}
              />
              {!isValidInput && (
                <p className={`text-sm mt-1 ${
                  isDark ? 'text-red-400' : 'text-red-600'
                }`}>Please enter a valid number</p>
              )}
            </div>
            
            <div className="flex-1">
              <UnitSelector
                units={availableUnits}
                selectedUnit={fromUnit}
                onUnitChange={setFromUnit}
                label="Unit"
              />
            </div>
          </div>
        </div>

        {/* Swap Button */}
        <div className="flex justify-center">
          <button
            onClick={swapUnits}
            className={`p-3 rounded-full transition-all duration-300 hover:scale-110 group ${
              isDark 
                ? 'bg-gray-700/50 hover:bg-gray-600/60 text-gray-300 hover:text-white' 
                : 'bg-orange-900/10 hover:bg-orange-900/20 text-orange-800/70 hover:text-orange-900'
            }`}
            title="Swap units"
          >
            <SwapIcon className="h-6 w-6 group-hover:rotate-180 transition-transform duration-300" />
          </button>
        </div>

        {/* To Section */}
        <div className="space-y-4">
          <div className="flex flex-col md:flex-row md:items-end gap-4">
            <div className="flex-1">
              <label className={`block text-sm font-medium mb-2 ${
                isDark ? 'text-gray-200' : 'text-orange-900/80'
              }`}>
                To
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={outputValue}
                  readOnly
                  placeholder="Result will appear here..."
                  className={`w-full backdrop-blur-md border rounded-xl px-4 py-3 focus:outline-none cursor-default ${
                    isDark 
                      ? 'bg-gray-900/60 border-gray-700/50 text-gray-100 placeholder-gray-500' 
                      : 'bg-white/10 border-orange-900/10 text-orange-900 placeholder-orange-800/30'
                  }`}
                />
                <div className={`absolute right-3 top-1/2 transform -translate-y-1/2 text-sm ${
                  isDark ? 'text-gray-400' : 'text-orange-800/50'
                }`}>
                  {outputValue && getUnitSymbol(toUnit)}
                </div>
              </div>
            </div>
            
            <div className="flex-1">
              <UnitSelector
                units={availableUnits}
                selectedUnit={toUnit}
                onUnitChange={setToUnit}
                label="Unit"
              />
            </div>
          </div>
        </div>

        {/* Quick conversion info */}
        {inputValue && outputValue && isValidInput && (
          <div className={`mt-6 p-4 rounded-xl border ${
            isDark 
              ? 'bg-gray-900/60 border-gray-700/50' 
              : 'bg-white/10 border-orange-900/10'
          }`}>
            <p className={`text-sm text-center ${
              isDark ? 'text-gray-200' : 'text-orange-900/80'
            }`}>
              <span className="font-medium">{inputValue} {getUnitSymbol(fromUnit)}</span>
              <span className={`mx-2 ${
                isDark ? 'text-gray-400' : 'text-orange-800/50'
              }`}>=</span>
              <span className="font-medium">{outputValue} {getUnitSymbol(toUnit)}</span>
            </p>
          </div>
        )}
      </div>
    </div>
  );
}