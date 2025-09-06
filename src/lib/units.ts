export interface Unit {
  symbol: string;
  name: string;
  toBase: (value: number) => number;
  fromBase: (value: number) => number;
}

export interface ConversionCategory {
  id: string;
  name: string;
  description: string;
  icon: string;
  gradient: string;
  units: Record<string, Unit>;
  baseUnit: string;
}

// Length conversions (base: meters)
const lengthUnits: Record<string, Unit> = {
  mm: { symbol: 'mm', name: 'Millimeters', toBase: (v) => v / 1000, fromBase: (v) => v * 1000 },
  cm: { symbol: 'cm', name: 'Centimeters', toBase: (v) => v / 100, fromBase: (v) => v * 100 },
  m: { symbol: 'm', name: 'Meters', toBase: (v) => v, fromBase: (v) => v },
  km: { symbol: 'km', name: 'Kilometers', toBase: (v) => v * 1000, fromBase: (v) => v / 1000 },
  in: { symbol: 'in', name: 'Inches', toBase: (v) => v * 0.0254, fromBase: (v) => v / 0.0254 },
  ft: { symbol: 'ft', name: 'Feet', toBase: (v) => v * 0.3048, fromBase: (v) => v / 0.3048 },
  yd: { symbol: 'yd', name: 'Yards', toBase: (v) => v * 0.9144, fromBase: (v) => v / 0.9144 },
  mi: { symbol: 'mi', name: 'Miles', toBase: (v) => v * 1609.344, fromBase: (v) => v / 1609.344 },
};

// Weight conversions (base: grams)
const weightUnits: Record<string, Unit> = {
  mg: { symbol: 'mg', name: 'Milligrams', toBase: (v) => v / 1000, fromBase: (v) => v * 1000 },
  g: { symbol: 'g', name: 'Grams', toBase: (v) => v, fromBase: (v) => v },
  kg: { symbol: 'kg', name: 'Kilograms', toBase: (v) => v * 1000, fromBase: (v) => v / 1000 },
  oz: { symbol: 'oz', name: 'Ounces', toBase: (v) => v * 28.3495, fromBase: (v) => v / 28.3495 },
  lb: { symbol: 'lb', name: 'Pounds', toBase: (v) => v * 453.592, fromBase: (v) => v / 453.592 },
  ton: { symbol: 'ton', name: 'Tons', toBase: (v) => v * 1000000, fromBase: (v) => v / 1000000 },
};

// Temperature conversions (base: Celsius)
const temperatureUnits: Record<string, Unit> = {
  c: { 
    symbol: '°C', 
    name: 'Celsius', 
    toBase: (v) => v, 
    fromBase: (v) => v 
  },
  f: { 
    symbol: '°F', 
    name: 'Fahrenheit', 
    toBase: (v) => (v - 32) * 5/9, 
    fromBase: (v) => v * 9/5 + 32 
  },
  k: { 
    symbol: 'K', 
    name: 'Kelvin', 
    toBase: (v) => v - 273.15, 
    fromBase: (v) => v + 273.15 
  },
};

// Volume conversions (base: liters)
const volumeUnits: Record<string, Unit> = {
  ml: { symbol: 'ml', name: 'Milliliters', toBase: (v) => v / 1000, fromBase: (v) => v * 1000 },
  l: { symbol: 'l', name: 'Liters', toBase: (v) => v, fromBase: (v) => v },
  cup: { symbol: 'cup', name: 'Cups', toBase: (v) => v * 0.236588, fromBase: (v) => v / 0.236588 },
  pt: { symbol: 'pt', name: 'Pints', toBase: (v) => v * 0.473176, fromBase: (v) => v / 0.473176 },
  qt: { symbol: 'qt', name: 'Quarts', toBase: (v) => v * 0.946353, fromBase: (v) => v / 0.946353 },
  gal: { symbol: 'gal', name: 'Gallons', toBase: (v) => v * 3.78541, fromBase: (v) => v / 3.78541 },
};

// Area conversions (base: square meters)
const areaUnits: Record<string, Unit> = {
  'cm²': { symbol: 'cm²', name: 'Square Centimeters', toBase: (v) => v / 10000, fromBase: (v) => v * 10000 },
  'm²': { symbol: 'm²', name: 'Square Meters', toBase: (v) => v, fromBase: (v) => v },
  'km²': { symbol: 'km²', name: 'Square Kilometers', toBase: (v) => v * 1000000, fromBase: (v) => v / 1000000 },
  'in²': { symbol: 'in²', name: 'Square Inches', toBase: (v) => v * 0.00064516, fromBase: (v) => v / 0.00064516 },
  'ft²': { symbol: 'ft²', name: 'Square Feet', toBase: (v) => v * 0.092903, fromBase: (v) => v / 0.092903 },
  acre: { symbol: 'acre', name: 'Acres', toBase: (v) => v * 4046.86, fromBase: (v) => v / 4046.86 },
};

// Speed conversions (base: meters per second)
const speedUnits: Record<string, Unit> = {
  'ms': { symbol: 'm/s', name: 'Meters per Second', toBase: (v) => v, fromBase: (v) => v },
  'kmh': { symbol: 'km/h', name: 'Kilometers per Hour', toBase: (v) => v / 3.6, fromBase: (v) => v * 3.6 },
  'mph': { symbol: 'mph', name: 'Miles per Hour', toBase: (v) => v * 0.44704, fromBase: (v) => v / 0.44704 },
  'fts': { symbol: 'ft/s', name: 'Feet per Second', toBase: (v) => v * 0.3048, fromBase: (v) => v / 0.3048 },
  'knot': { symbol: 'knot', name: 'Knots', toBase: (v) => v * 0.514444, fromBase: (v) => v / 0.514444 },
  'mach': { symbol: 'Mach', name: 'Mach (Speed of Sound)', toBase: (v) => v * 343, fromBase: (v) => v / 343 },
  'c': { symbol: 'c', name: 'Speed of Light', toBase: (v) => v * 299792458, fromBase: (v) => v / 299792458 },
};

export const conversionCategories: Record<string, ConversionCategory> = {
  length: {
    id: 'length',
    name: 'Length',
    description: 'Convert between different units of length and distance',
    icon: '📏',
    gradient: 'from-yellow-400 via-orange-400 to-orange-500',
    units: lengthUnits,
    baseUnit: 'm',
  },
  weight: {
    id: 'weight',
    name: 'Weight',
    description: 'Convert between different units of weight and mass',
    icon: '⚖️',
    gradient: 'from-amber-400 via-orange-500 to-orange-600',
    units: weightUnits,
    baseUnit: 'g',
  },
  temperature: {
    id: 'temperature',
    name: 'Temperature',
    description: 'Convert between Celsius, Fahrenheit, and Kelvin',
    icon: '🌡️',
    gradient: 'from-yellow-500 via-orange-500 to-red-500',
    units: temperatureUnits,
    baseUnit: 'c',
  },
  volume: {
    id: 'volume',
    name: 'Volume',
    description: 'Convert between different units of volume and capacity',
    icon: '🧪',
    gradient: 'from-amber-400 via-yellow-500 to-orange-500',
    units: volumeUnits,
    baseUnit: 'l',
  },
  area: {
    id: 'area',
    name: 'Area',
    description: 'Convert between different units of area and surface',
    icon: '📐',
    gradient: 'from-orange-400 via-amber-500 to-orange-600',
    units: areaUnits,
    baseUnit: 'm²',
  },
  speed: {
    id: 'speed',
    name: 'Speed',
    description: 'Convert between different units of speed and velocity',
    icon: '🚀',
    gradient: 'from-amber-500 via-orange-500 to-yellow-500',
    units: speedUnits,
    baseUnit: 'ms',
  },
};

export const getCategoryById = (id: string): ConversionCategory | undefined => {
  return conversionCategories[id];
};

export const getAllCategories = (): ConversionCategory[] => {
  return Object.values(conversionCategories);
};