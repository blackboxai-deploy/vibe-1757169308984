'use client';

import { useState } from 'react';

export function useLocalStorage<T>(
  key: string,
  initialValue: T
): [T, (value: T | ((val: T) => T)) => void] {
  // Get from local storage then parse stored json or return initialValue
  const [storedValue, setStoredValue] = useState<T>(() => {
    if (typeof window === 'undefined') {
      return initialValue;
    }
    
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.warn(`Error reading localStorage key "${key}":`, error);
      return initialValue;
    }
  });

  // Return a wrapped version of useState's setter function that persists the new value to localStorage
  const setValue = (value: T | ((val: T) => T)) => {
    try {
      // Allow value to be a function so we have the same API as useState
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      
      setStoredValue(valueToStore);
      
      // Save state
      if (typeof window !== 'undefined') {
        window.localStorage.setItem(key, JSON.stringify(valueToStore));
      }
    } catch (error) {
      console.warn(`Error setting localStorage key "${key}":`, error);
    }
  };

  return [storedValue, setValue];
}

// Hook for managing conversion history
export function useConversionHistory() {
  const [history, setHistory] = useLocalStorage<Array<{
    id: string;
    category: string;
    fromValue: number;
    fromUnit: string;
    toValue: number;
    toUnit: string;
    timestamp: number;
  }>>('conversion-history', []);

  const addToHistory = (
    category: string,
    fromValue: number,
    fromUnit: string,
    toValue: number,
    toUnit: string
  ) => {
    const newEntry = {
      id: Math.random().toString(36).substr(2, 9),
      category,
      fromValue,
      fromUnit,
      toValue,
      toUnit,
      timestamp: Date.now(),
    };

    setHistory(prev => {
      // Remove duplicates and keep only last 20 entries
      const filtered = prev.filter(item => 
        !(item.category === category && 
          item.fromUnit === fromUnit && 
          item.toUnit === toUnit &&
          Math.abs(item.fromValue - fromValue) < 0.001)
      );
      
      return [newEntry, ...filtered].slice(0, 20);
    });
  };

  const clearHistory = () => {
    setHistory([]);
  };

  const getRecentConversions = (category: string, limit: number = 5) => {
    return history
      .filter(item => item.category === category)
      .slice(0, limit);
  };

  return {
    history,
    addToHistory,
    clearHistory,
    getRecentConversions,
  };
}