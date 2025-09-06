import { ConversionCategory, Unit } from './units';

export interface ConversionResult {
  value: number;
  fromUnit: string;
  toUnit: string;
  category: string;
  timestamp: Date;
}

export class ConversionEngine {
  private category: ConversionCategory;

  constructor(category: ConversionCategory) {
    this.category = category;
  }

  convert(value: number, fromUnitId: string, toUnitId: string): number {
    if (isNaN(value) || !isFinite(value)) {
      return 0;
    }

    const fromUnit = this.category.units[fromUnitId];
    const toUnit = this.category.units[toUnitId];

    if (!fromUnit || !toUnit) {
      throw new Error(`Invalid unit conversion: ${fromUnitId} to ${toUnitId}`);
    }

    // Convert to base unit first, then to target unit
    const baseValue = fromUnit.toBase(value);
    const convertedValue = toUnit.fromBase(baseValue);

    return this.roundToSignificantDigits(convertedValue, 10);
  }

  private roundToSignificantDigits(num: number, digits: number): number {
    if (num === 0) return 0;
    
    const magnitude = Math.floor(Math.log10(Math.abs(num)));
    const factor = Math.pow(10, digits - 1 - magnitude);
    
    return Math.round(num * factor) / factor;
  }

  getAvailableUnits(): Record<string, Unit> {
    return this.category.units;
  }

  getUnitName(unitId: string): string {
    return this.category.units[unitId]?.name || unitId;
  }

  getUnitSymbol(unitId: string): string {
    return this.category.units[unitId]?.symbol || unitId;
  }
}

export const formatNumber = (value: number): string => {
  if (isNaN(value) || !isFinite(value)) return '0';
  
  // For very large or very small numbers, use scientific notation
  if (Math.abs(value) >= 1e9 || (Math.abs(value) < 0.001 && value !== 0)) {
    return value.toExponential(3);
  }
  
  // For regular numbers, format with appropriate decimal places
  if (value % 1 === 0 && Math.abs(value) < 1e6) {
    return value.toString();
  }
  
  // Round to reasonable decimal places
  const decimalPlaces = Math.abs(value) >= 1 ? 6 : 8;
  const rounded = parseFloat(value.toFixed(decimalPlaces));
  
  return rounded.toString();
};

export const createConversionResult = (
  value: number,
  fromUnit: string,
  toUnit: string,
  category: string
): ConversionResult => ({
  value,
  fromUnit,
  toUnit,
  category,
  timestamp: new Date(),
});

// Utility function to get common conversions for quick access
export const getCommonConversions = (categoryId: string): Array<{from: string, to: string, label: string}> => {
  const commonConversions: Record<string, Array<{from: string, to: string, label: string}>> = {
    length: [
      { from: 'cm', to: 'in', label: 'cm → inches' },
      { from: 'ft', to: 'm', label: 'feet → meters' },
      { from: 'km', to: 'mi', label: 'km → miles' },
      { from: 'm', to: 'ft', label: 'meters → feet' },
    ],
    weight: [
      { from: 'kg', to: 'lb', label: 'kg → pounds' },
      { from: 'g', to: 'oz', label: 'grams → ounces' },
      { from: 'lb', to: 'kg', label: 'pounds → kg' },
    ],
    temperature: [
      { from: 'c', to: 'f', label: '°C → °F' },
      { from: 'f', to: 'c', label: '°F → °C' },
      { from: 'c', to: 'k', label: '°C → Kelvin' },
    ],
    volume: [
      { from: 'l', to: 'gal', label: 'liters → gallons' },
      { from: 'ml', to: 'cup', label: 'ml → cups' },
      { from: 'gal', to: 'l', label: 'gallons → liters' },
    ],
    area: [
      { from: 'm²', to: 'ft²', label: 'm² → ft²' },
      { from: 'acre', to: 'm²', label: 'acres → m²' },
      { from: 'cm²', to: 'in²', label: 'cm² → in²' },
    ],
    speed: [
      { from: 'kmh', to: 'mph', label: 'km/h → mph' },
      { from: 'ms', to: 'kmh', label: 'm/s → km/h' },
      { from: 'mph', to: 'kmh', label: 'mph → km/h' },
      { from: 'knot', to: 'kmh', label: 'knots → km/h' },
    ],
  };

  return commonConversions[categoryId] || [];
};