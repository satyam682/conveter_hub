import React, { useState } from 'react';
import { Calculator } from 'lucide-react';

export const UnitConverter: React.FC = () => {
  const [category, setCategory] = useState<'length' | 'weight' | 'temp'>('length');
  const [val, setVal] = useState<number>(1);
  const [fromUnit, setFromUnit] = useState<string>('m');
  const [toUnit, setToUnit] = useState<string>('ft');

  const convertValue = (): number => {
    if (category === 'length') {
      const toMeters: { [key: string]: number } = {
        m: 1,
        km: 1000,
        cm: 0.01,
        mm: 0.001,
        ft: 0.3048,
        in: 0.0254,
        mile: 1609.34
      };
      const meters = val * (toMeters[fromUnit] || 1);
      return meters / (toMeters[toUnit] || 1);
    }

    if (category === 'weight') {
      const toKg: { [key: string]: number } = {
        kg: 1,
        g: 0.001,
        mg: 0.000001,
        lb: 0.453592,
        oz: 0.0283495
      };
      const kilograms = val * (toKg[fromUnit] || 1);
      return kilograms / (toKg[toUnit] || 1);
    }

    if (category === 'temp') {
      if (fromUnit === 'C' && toUnit === 'F') return (val * 9) / 5 + 32;
      if (fromUnit === 'F' && toUnit === 'C') return ((val - 32) * 5) / 9;
      if (fromUnit === 'C' && toUnit === 'K') return val + 273.15;
      if (fromUnit === 'K' && toUnit === 'C') return val - 273.15;
      return val;
    }

    return val;
  };

  const result = convertValue();

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="glass-card rounded-2xl p-6 border border-slate-200 shadow-sm">
        <h2 className="text-xl font-bold text-slate-900 mb-1 flex items-center gap-2">
          <Calculator className="w-5 h-5 text-indigo-600" />
          Universal Unit Converter
        </h2>
        <p className="text-xs text-slate-500 mb-6">
          Convert metric and imperial units of length, weight, and temperature in real-time. 100% Free.
        </p>

        {/* Category Tabs */}
        <div className="flex gap-2 mb-6">
          {[
            { id: 'length', label: 'Length & Distance' },
            { id: 'weight', label: 'Weight & Mass' },
            { id: 'temp', label: 'Temperature' }
          ].map((cat) => (
            <button
              key={cat.id}
              onClick={() => {
                setCategory(cat.id as any);
                if (cat.id === 'length') { setFromUnit('m'); setToUnit('ft'); }
                if (cat.id === 'weight') { setFromUnit('kg'); setToUnit('lb'); }
                if (cat.id === 'temp') { setFromUnit('C'); setToUnit('F'); }
              }}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition ${
                category === cat.id ? 'bg-indigo-600 text-white shadow-sm' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 items-center">
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Value</label>
            <input
              type="number"
              value={val}
              onChange={(e) => setVal(Number(e.target.value))}
              className="glass-input w-full px-3.5 py-2.5 rounded-xl text-sm font-semibold"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">From Unit</label>
            <select
              value={fromUnit}
              onChange={(e) => setFromUnit(e.target.value)}
              className="glass-input w-full px-3.5 py-2.5 rounded-xl text-xs font-semibold bg-white"
            >
              {category === 'length' && (
                <>
                  <option value="m">Meters (m)</option>
                  <option value="km">Kilometers (km)</option>
                  <option value="cm">Centimeters (cm)</option>
                  <option value="ft">Feet (ft)</option>
                  <option value="in">Inches (in)</option>
                  <option value="mile">Miles (mi)</option>
                </>
              )}
              {category === 'weight' && (
                <>
                  <option value="kg">Kilograms (kg)</option>
                  <option value="g">Grams (g)</option>
                  <option value="lb">Pounds (lbs)</option>
                  <option value="oz">Ounces (oz)</option>
                </>
              )}
              {category === 'temp' && (
                <>
                  <option value="C">Celsius (°C)</option>
                  <option value="F">Fahrenheit (°F)</option>
                  <option value="K">Kelvin (K)</option>
                </>
              )}
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">To Unit</label>
            <select
              value={toUnit}
              onChange={(e) => setToUnit(e.target.value)}
              className="glass-input w-full px-3.5 py-2.5 rounded-xl text-xs font-semibold bg-white"
            >
              {category === 'length' && (
                <>
                  <option value="ft">Feet (ft)</option>
                  <option value="m">Meters (m)</option>
                  <option value="km">Kilometers (km)</option>
                  <option value="cm">Centimeters (cm)</option>
                  <option value="in">Inches (in)</option>
                  <option value="mile">Miles (mi)</option>
                </>
              )}
              {category === 'weight' && (
                <>
                  <option value="lb">Pounds (lbs)</option>
                  <option value="kg">Kilograms (kg)</option>
                  <option value="g">Grams (g)</option>
                  <option value="oz">Ounces (oz)</option>
                </>
              )}
              {category === 'temp' && (
                <>
                  <option value="F">Fahrenheit (°F)</option>
                  <option value="C">Celsius (°C)</option>
                  <option value="K">Kelvin (K)</option>
                </>
              )}
            </select>
          </div>
        </div>

        {/* Result Output Banner */}
        <div className="mt-6 p-4 rounded-2xl bg-gradient-to-r from-indigo-50 to-purple-50 border border-indigo-200 text-center">
          <div className="text-xs text-indigo-700 font-bold mb-1">Converted Result</div>
          <div className="text-2xl sm:text-3xl font-extrabold text-slate-900">
            {val} {fromUnit} = <span className="text-emerald-600">{result.toFixed(4)}</span> {toUnit}
          </div>
        </div>
      </div>
    </div>
  );
};
