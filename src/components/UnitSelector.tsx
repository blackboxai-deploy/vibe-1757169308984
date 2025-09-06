'use client';

import { useState } from 'react';
import { Unit } from '../lib/units';
import { useTheme } from '../contexts/ThemeContext';

// Simple ChevronDown component
function ChevronDownIcon({ className }: { className: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
    </svg>
  );
}

interface UnitSelectorProps {
  units: Record<string, Unit>;
  selectedUnit: string;
  onUnitChange: (unitId: string) => void;
  label: string;
}

export function UnitSelector({ units, selectedUnit, onUnitChange, label }: UnitSelectorProps) {
  const { isDark } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const selectedUnitData = units[selectedUnit];

  return (
    <div className="relative">
      <label className={`block text-sm font-medium mb-2 ${
        isDark ? 'text-gray-200' : 'text-orange-900/80'
      }`}>
        {label}
      </label>
      
      <div className="relative">
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className={`w-full backdrop-blur-md border rounded-xl px-4 py-3 text-left focus:outline-none focus:ring-2 transition-all duration-200 flex items-center justify-between ${
            isDark 
              ? 'bg-gray-800/60 border-gray-600/50 text-gray-100 hover:bg-gray-700/70 focus:ring-gray-500/50' 
              : 'bg-white/20 border-orange-900/20 text-orange-900 hover:bg-white/30 focus:ring-orange-500/50'
          }`}
        >
          <div>
            <span className="font-medium">{selectedUnitData?.symbol}</span>
            <span className={`ml-2 text-sm ${
              isDark ? 'text-gray-300' : 'text-orange-800/70'
            }`}>{selectedUnitData?.name}</span>
          </div>
          <ChevronDownIcon 
            className={`h-5 w-5 transition-transform duration-200 ${
              isDark ? 'text-gray-300' : 'text-orange-800/70'
            } ${isOpen ? 'rotate-180' : ''}`}
          />
        </button>
        
        {isOpen && (
          <div className={`absolute z-50 mt-2 w-full backdrop-blur-md border rounded-xl shadow-xl overflow-hidden ${
            isDark 
              ? 'bg-gray-800/95 border-gray-600/50' 
              : 'bg-orange-50/95 border-orange-900/20'
          }`}>
            <div className="max-h-60 overflow-y-auto">
              {Object.entries(units).map(([unitId, unit]) => (
                <button
                  key={unitId}
                  type="button"
                  onClick={() => {
                    onUnitChange(unitId);
                    setIsOpen(false);
                  }}
                  className={`w-full px-4 py-3 text-left transition-colors duration-150 flex items-center justify-between ${
                    isDark
                      ? `${selectedUnit === unitId 
                          ? 'bg-gray-700/60 text-white font-medium' 
                          : 'text-gray-200 hover:bg-gray-700/40'}`
                      : `${selectedUnit === unitId 
                          ? 'bg-orange-200/50 text-orange-900 font-medium' 
                          : 'text-orange-900 hover:bg-orange-100/50'}`
                  }`}
                >
                  <div>
                    <span className="font-medium">{unit.symbol}</span>
                    <span className={`ml-2 text-sm ${
                      isDark 
                        ? selectedUnit === unitId ? 'text-gray-200' : 'text-gray-300'
                        : selectedUnit === unitId ? 'text-orange-800' : 'text-orange-700'
                    }`}>{unit.name}</span>
                  </div>
                  {selectedUnit === unitId && (
                    <svg className={`h-4 w-4 ${
                      isDark ? 'text-white' : 'text-orange-900'
                    }`} fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  )}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
      
      {/* Backdrop to close dropdown */}
      {isOpen && (
        <div 
          className="fixed inset-0 z-40" 
          onClick={() => setIsOpen(false)}
        />
      )}
    </div>
  );
}