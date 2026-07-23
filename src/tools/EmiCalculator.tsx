import React, { useState } from 'react';
import { DollarSign, Table, ChevronDown, ChevronUp, CheckCircle } from 'lucide-react';

export const EmiCalculator: React.FC = () => {
  const [loanAmount, setLoanAmount] = useState<number>(50000);
  const [interestRate, setInterestRate] = useState<number>(8.5);
  const [tenureYears, setTenureYears] = useState<number>(5);
  const [currencySymbol, setCurrencySymbol] = useState<string>('$');
  const [showAmortization, setShowAmortization] = useState<boolean>(false);

  const currencies = [
    { symbol: '$', name: '$ USD (US Dollar)' },
    { symbol: '₹', name: '₹ INR (Indian Rupee)' },
    { symbol: '€', name: '€ EUR (Euro)' },
    { symbol: '£', name: '£ GBP (British Pound)' },
    { symbol: '¥', name: '¥ JPY (Japanese Yen)' },
    { symbol: 'A$', name: 'A$ AUD (Australian Dollar)' },
    { symbol: 'C$', name: 'C$ CAD (Canadian Dollar)' }
  ];

  // Exact Bank Standard Reducing Balance EMI Formula: [P x R x (1+R)^N]/[(1+R)^N-1]
  const principal = loanAmount;
  const monthlyRate = interestRate / 12 / 100;
  const totalMonths = tenureYears * 12;

  const emi =
    monthlyRate === 0
      ? principal / totalMonths
      : (principal * monthlyRate * Math.pow(1 + monthlyRate, totalMonths)) /
        (Math.pow(1 + monthlyRate, totalMonths) - 1);

  const totalPayment = emi * totalMonths;
  const totalInterest = totalPayment - principal;

  const principalRatio = ((principal / totalPayment) * 100).toFixed(1);
  const interestRatio = ((totalInterest / totalPayment) * 100).toFixed(1);

  // Generate Year-by-Year Bank Amortization Schedule
  const generateAmortizationSchedule = () => {
    let balance = principal;
    const schedule = [];

    for (let year = 1; year <= tenureYears; year++) {
      let yearlyInterest = 0;
      let yearlyPrincipal = 0;

      for (let month = 1; month <= 12; month++) {
        const interestForMonth = balance * monthlyRate;
        const principalForMonth = emi - interestForMonth;

        yearlyInterest += interestForMonth;
        yearlyPrincipal += principalForMonth;
        balance -= principalForMonth;
      }

      schedule.push({
        year,
        principalPaid: yearlyPrincipal,
        interestPaid: yearlyInterest,
        endingBalance: Math.max(0, balance)
      });
    }
    return schedule;
  };

  const schedule = generateAmortizationSchedule();

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="glass-card rounded-2xl p-6 border border-slate-200 shadow-sm">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6 pb-4 border-b border-slate-100">
          <div>
            <h2 className="text-xl font-bold text-slate-900 mb-1 flex items-center gap-2">
              <DollarSign className="w-5 h-5 text-indigo-600" />
              Bank Standard Loan EMI Calculator
            </h2>
            <p className="text-xs text-slate-500 flex items-center gap-1.5 font-medium">
              <CheckCircle className="w-3.5 h-3.5 text-emerald-600" />
              Uses 100% Exact Bank Standard Reducing Balance Formula
            </p>
          </div>

          {/* Currency Selector */}
          <div className="flex items-center gap-2 shrink-0">
            <label className="text-xs font-bold text-slate-700">Currency:</label>
            <select
              value={currencySymbol}
              onChange={(e) => setCurrencySymbol(e.target.value)}
              className="glass-input px-3 py-1.5 rounded-xl text-xs font-bold bg-white text-slate-800 border border-slate-300"
            >
              {currencies.map((c) => (
                <option key={c.symbol} value={c.symbol}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Sliders Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          {/* Loan Amount */}
          <div>
            <div className="flex justify-between text-xs font-bold text-slate-700 mb-1">
              <span>Loan Principal ({currencySymbol})</span>
              <span className="text-indigo-600">{currencySymbol}{loanAmount.toLocaleString()}</span>
            </div>
            <input
              type="range"
              min="1000"
              max="1000000"
              step="1000"
              value={loanAmount}
              onChange={(e) => setLoanAmount(Number(e.target.value))}
              className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-indigo-600 mb-2"
            />
            <input
              type="number"
              value={loanAmount}
              onChange={(e) => setLoanAmount(Number(e.target.value))}
              className="glass-input w-full px-3 py-1.5 rounded-xl text-xs font-semibold"
            />
          </div>

          {/* Interest Rate */}
          <div>
            <div className="flex justify-between text-xs font-bold text-slate-700 mb-1">
              <span>Annual Interest Rate (%)</span>
              <span className="text-indigo-600">{interestRate}%</span>
            </div>
            <input
              type="range"
              min="1"
              max="30"
              step="0.1"
              value={interestRate}
              onChange={(e) => setInterestRate(Number(e.target.value))}
              className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-indigo-600 mb-2"
            />
            <input
              type="number"
              step="0.1"
              value={interestRate}
              onChange={(e) => setInterestRate(Number(e.target.value))}
              className="glass-input w-full px-3 py-1.5 rounded-xl text-xs font-semibold"
            />
          </div>

          {/* Tenure */}
          <div>
            <div className="flex justify-between text-xs font-bold text-slate-700 mb-1">
              <span>Loan Tenure (Years)</span>
              <span className="text-indigo-600">{tenureYears} Years</span>
            </div>
            <input
              type="range"
              min="1"
              max="30"
              value={tenureYears}
              onChange={(e) => setTenureYears(Number(e.target.value))}
              className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-indigo-600 mb-2"
            />
            <input
              type="number"
              value={tenureYears}
              onChange={(e) => setTenureYears(Number(e.target.value))}
              className="glass-input w-full px-3 py-1.5 rounded-xl text-xs font-semibold"
            />
          </div>
        </div>

        {/* EMI Summary Card */}
        <div className="p-6 rounded-2xl bg-gradient-to-br from-indigo-50 to-purple-50 border border-indigo-200 grid grid-cols-1 sm:grid-cols-3 gap-4 text-center mb-6">
          <div>
            <div className="text-xs text-slate-600 font-bold mb-1">Monthly EMI</div>
            <div className="text-2xl font-extrabold text-indigo-700">
              {currencySymbol}{Math.round(emi).toLocaleString()}
            </div>
          </div>
          <div>
            <div className="text-xs text-slate-600 font-bold mb-1">Total Interest Payable</div>
            <div className="text-2xl font-extrabold text-pink-600">
              {currencySymbol}{Math.round(totalInterest).toLocaleString()}
            </div>
          </div>
          <div>
            <div className="text-xs text-slate-600 font-bold mb-1">Total Payment</div>
            <div className="text-2xl font-extrabold text-emerald-600">
              {currencySymbol}{Math.round(totalPayment).toLocaleString()}
            </div>
          </div>
        </div>

        {/* Visual Payment Progress Ratio Bar */}
        <div className="space-y-2 mb-6">
          <div className="flex justify-between text-xs font-bold text-slate-700">
            <span className="flex items-center gap-1 text-indigo-700">
              <span className="w-2.5 h-2.5 rounded-full bg-indigo-600 inline-block"></span>
              Principal Amount: {principalRatio}%
            </span>
            <span className="flex items-center gap-1 text-pink-700">
              <span className="w-2.5 h-2.5 rounded-full bg-pink-500 inline-block"></span>
              Total Interest: {interestRatio}%
            </span>
          </div>
          <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden flex border border-slate-200">
            <div style={{ width: `${principalRatio}%` }} className="bg-indigo-600 h-full transition-all duration-500"></div>
            <div style={{ width: `${interestRatio}%` }} className="bg-pink-500 h-full transition-all duration-500"></div>
          </div>
        </div>

        {/* Toggle Amortization Schedule */}
        <div>
          <button
            onClick={() => setShowAmortization(!showAmortization)}
            className="w-full py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 border border-slate-200 text-slate-800 text-xs font-bold flex items-center justify-center gap-2 transition"
          >
            <Table className="w-4 h-4 text-indigo-600" />
            {showAmortization ? 'Hide Yearly Amortization Schedule' : 'Show Bank Amortization Schedule Table'}
            {showAmortization ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </button>

          {showAmortization && (
            <div className="mt-4 overflow-x-auto animate-fade-in">
              <table className="w-full text-xs text-left">
                <thead className="bg-indigo-50 text-indigo-900 font-bold border-b border-indigo-100">
                  <tr>
                    <th className="p-3 rounded-l-xl">Year</th>
                    <th className="p-3">Principal Paid ({currencySymbol})</th>
                    <th className="p-3">Interest Paid ({currencySymbol})</th>
                    <th className="p-3 rounded-r-xl">Balance Remaining ({currencySymbol})</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
                  {schedule.map((row) => (
                    <tr key={row.year} className="hover:bg-slate-50">
                      <td className="p-3 font-bold text-slate-900">Year {row.year}</td>
                      <td className="p-3 text-indigo-700 font-semibold">{currencySymbol}{Math.round(row.principalPaid).toLocaleString()}</td>
                      <td className="p-3 text-pink-600 font-semibold">{currencySymbol}{Math.round(row.interestPaid).toLocaleString()}</td>
                      <td className="p-3 font-bold text-slate-900">{currencySymbol}{Math.round(row.endingBalance).toLocaleString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

      </div>
    </div>
  );
};
