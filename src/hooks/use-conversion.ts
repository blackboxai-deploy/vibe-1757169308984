'use client';

import { useState, useCallback, useMemo } from 'react';
import { ConversionEngine, formatNumber } from '../lib/conversions';
import { getCategoryById } from '../lib/units';
import { useConversionHistory } from './use-local-storage';

export interface ConversionState {
  inputValue: string;
  outputValue: string;
  fromUnit: string;
  toUnit: string;
  isValidInput: boolean;
}

export function useConversion(categoryId: string) {
  const category = useMemo(() => getCategoryById(categoryId), [categoryId]);
  const engine = useMemo(() => category ? new ConversionEngine(category) : null, [category]);
  const { addToHistory } = useConversionHistory();

  // Get the first two units as defaults
  const defaultUnits = useMemo(() => {
    if (!category) return { from: '', to: '' };
    const unitKeys = Object.keys(category.units);
    return {
      from: unitKeys[0] || '',
      to: unitKeys[1] || unitKeys[0] || '',
    };
  }, [category]);

  const [state, setState] = useState<ConversionState>({
    inputValue: '',
    outputValue: '',
    fromUnit: defaultUnits.from,
    toUnit: defaultUnits.to,
    isValidInput: true,
  });

  const performConversion = useCallback((
    inputValue: string,
    fromUnit: string,
    toUnit: string
  ) => {
    if (!engine || !inputValue.trim()) {
      return { outputValue: '', isValidInput: true };
    }

    const numericValue = parseFloat(inputValue);
    
    if (isNaN(numericValue)) {
      return { outputValue: '', isValidInput: false };
    }

    try {
      const result = engine.convert(numericValue, fromUnit, toUnit);
      const formattedResult = formatNumber(result);
      
      // Add to history if it's a valid conversion with a meaningful result
      if (result !== 0 || numericValue === 0) {
        addToHistory(categoryId, numericValue, fromUnit, result, toUnit);
      }
      
      return { outputValue: formattedResult, isValidInput: true };
    } catch (error) {
      console.warn('Conversion error:', error);
      return { outputValue: '', isValidInput: false };
    }
  }, [engine, categoryId, addToHistory]);

  const setInputValue = useCallback((value: string) => {
    const { outputValue, isValidInput } = performConversion(value, state.fromUnit, state.toUnit);
    
    setState(prev => ({
      ...prev,
      inputValue: value,
      outputValue,
      isValidInput,
    }));
  }, [state.fromUnit, state.toUnit, performConversion]);

  const setFromUnit = useCallback((unit: string) => {
    const { outputValue, isValidInput } = performConversion(state.inputValue, unit, state.toUnit);
    
    setState(prev => ({
      ...prev,
      fromUnit: unit,
      outputValue,
      isValidInput,
    }));
  }, [state.inputValue, state.toUnit, performConversion]);

  const setToUnit = useCallback((unit: string) => {
    const { outputValue, isValidInput } = performConversion(state.inputValue, state.fromUnit, unit);
    
    setState(prev => ({
      ...prev,
      toUnit: unit,
      outputValue,
      isValidInput,
    }));
  }, [state.inputValue, state.fromUnit, performConversion]);

  const swapUnits = useCallback(() => {
    const newFromUnit = state.toUnit;
    const newToUnit = state.fromUnit;
    const newInputValue = state.outputValue;
    
    const { outputValue, isValidInput } = performConversion(newInputValue, newFromUnit, newToUnit);
    
    setState({
      inputValue: newInputValue,
      outputValue,
      fromUnit: newFromUnit,
      toUnit: newToUnit,
      isValidInput,
    });
  }, [state.toUnit, state.fromUnit, state.outputValue, performConversion]);

  const reset = useCallback(() => {
    setState({
      inputValue: '',
      outputValue: '',
      fromUnit: defaultUnits.from,
      toUnit: defaultUnits.to,
      isValidInput: true,
    });
  }, [defaultUnits]);

  const getUnitName = useCallback((unitId: string) => {
    return engine?.getUnitName(unitId) || unitId;
  }, [engine]);

  const getUnitSymbol = useCallback((unitId: string) => {
    return engine?.getUnitSymbol(unitId) || unitId;
  }, [engine]);

  return {
    ...state,
    category,
    engine,
    setInputValue,
    setFromUnit,
    setToUnit,
    swapUnits,
    reset,
    getUnitName,
    getUnitSymbol,
    availableUnits: engine?.getAvailableUnits() || {},
  };
}