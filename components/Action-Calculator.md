okay we need to create a new section right below the benmto ui section 

this section will have a tax calculator script, that im pasting below.

But the script follows and have vite variables, so we need to optimise it for our tech and integrate robustly - make sure none of its fuctions break and it works smoothly

Lastly: do a frontend makeover, use @design.md and design it according to our website and so this section compliments the page and not look like out of place.

Again make sure all fields and options are there the functions work and shows correctly on the front end

script
###
import React, { useState, useEffect } from 'react';

// --- Helper Components ---

// Custom Input Component
const InputField = ({ label, value, onChange, placeholder = "0", helpText, disabled = false }) => (
    <div>
        <label className={`block text-sm font-medium mb-1 ${disabled ? 'text-gray-400' : 'text-gray-700'}`}>{label}</label>
        <div className="relative rounded-md shadow-sm">
            <div className="pointer-events-none absolute inset-y-0 left-0 pl-3 flex items-center">
                <span className={`sm:text-sm ${disabled ? 'text-gray-400' : 'text-gray-500'}`}>$</span>
            </div>
            <input
                type="number"
                value={value}
                onChange={(e) => onChange(Math.max(0, parseFloat(e.target.value) || 0))}
                className={`w-full pl-7 pr-3 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500 transition duration-150 ease-in-out ${disabled ? 'bg-gray-100 cursor-not-allowed' : ''}`}
                placeholder={placeholder}
                disabled={disabled}
            />
        </div>
        {helpText && <p className="mt-1 text-xs text-gray-500">{helpText}</p>}
    </div>
);

// Custom Select Component
const SelectField = ({ label, value, onChange, options }) => (
    <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
        <select
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className="w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
        >
            {options.map(option => (
                <option key={option.value} value={option.value}>{option.label}</option>
            ))}
        </select>
    </div>
);

// Custom Toggle Switch Component
const Switch = ({ label, enabled, setEnabled, helpText }) => (
    <div>
        <div className="flex items-center justify-between">
            <span className="flex-grow flex flex-col">
                <span className="text-sm font-medium text-gray-700">{label}</span>
                 {helpText && <span className="text-xs text-gray-500">{helpText}</span>}
            </span>
            <button
                type="button"
                className={`${enabled ? 'bg-indigo-600' : 'bg-gray-200'} relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2`}
                onClick={() => setEnabled(!enabled)}
            >
                <span
                    aria-hidden="true"
                    className={`${enabled ? 'translate-x-5' : 'translate-x-0'} pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out`}
                />
            </button>
        </div>
    </div>
);


// Card component for grouping sections
const Card = ({ title, children, cols = 2 }) => (
    <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200">
        {title && <h3 className="text-xl font-semibold text-gray-800 mb-6">{title}</h3>}
        <div className={`grid grid-cols-1 md:grid-cols-${cols} gap-6`}>
            {children}
        </div>
    </div>
);

// --- Main App Component ---
export default function App() {
    // --- State Management ---
    const [financialYear, setFinancialYear] = useState('2025-26');
    const [resident, setResident] = useState('resident');
    const [payFrequency, setPayFrequency] = useState('annual'); // annual, monthly, fortnightly, weekly, hourly
    
    const [basePay, setBasePay] = useState(100000);
    const [hourlyRate, setHourlyRate] = useState(50);
    const [hoursPerWeek, setHoursPerWeek] = useState(38);

    const [overtimeHours, setOvertimeHours] = useState(0);
    const [overtimeRate, setOvertimeRate] = useState(1.5);
    const [bonusPay, setBonusPay] = useState(0);
    
    const [salaryIncludesSuper, setSalaryIncludesSuper] = useState(false);
    const [hasStudentLoan, setHasStudentLoan] = useState(true);
    
    // Calculated Results
    const [results, setResults] = useState({});

    // --- Options for Selects ---
    const financialYearOptions = [
        { value: '2025-26', label: '2025-26' },
        { value: '2024-25', label: '2024-25' },
        { value: '2023-24', label: '2023-24' },
    ];
    const payFrequencyOptions = [
        { value: 'annual', label: 'Annually' },
        { value: 'monthly', label: 'Monthly' },
        { value: 'fortnightly', label: 'Fortnightly' },
        { value: 'weekly', label: 'Weekly' },
        { value: 'hourly', label: 'Hourly' },
    ];

    // --- Core Australian Tax Calculation Logic ---
    useEffect(() => {
        // 1. Calculate Gross Annual Income from various pay structures
        let annualBasePay = 0;
        if (payFrequency === 'annual') {
            annualBasePay = basePay;
        } else if (payFrequency === 'monthly') {
            annualBasePay = basePay * 12;
        } else if (payFrequency === 'fortnightly') {
            annualBasePay = basePay * 26;
        } else if (payFrequency === 'weekly') {
            annualBasePay = basePay * 52;
        } else if (payFrequency === 'hourly') {
            annualBasePay = hourlyRate * hoursPerWeek * 52;
        }

        const annualOvertimePay = payFrequency === 'hourly' 
            ? hourlyRate * overtimeRate * overtimeHours * 52 // Assuming weekly OT for hourly
            : (annualBasePay / (hoursPerWeek * 52)) * overtimeRate * overtimeHours * 52; // Assuming weekly OT for salaried

        const grossAnnualIncome = annualBasePay + annualOvertimePay + bonusPay;

        // 2. Handle Superannuation
        const sgRate = financialYear === '2025-26' ? 0.12 : (financialYear === '2024-25' ? 0.115 : 0.11);
        let taxableIncome = grossAnnualIncome;
        let superannuation = 0;

        if (salaryIncludesSuper) {
            taxableIncome = grossAnnualIncome / (1 + sgRate);
            superannuation = taxableIncome * sgRate;
        } else {
            // Taxable income is the gross income, super is paid on top by employer
            superannuation = taxableIncome * sgRate;
        }

        let tax = 0;
        let lito = 0;
        let medicareLevy = 0;
        let studentLoanRepayment = 0;

        // 3. Calculate Income Tax
        if (resident === 'resident') {
            const rates = financialYear === '2025-26' || financialYear === '2024-25' 
            ? { brackets: [ { min: 0, max: 18200, rate: 0, base: 0 }, { min: 18201, max: 45000, rate: 0.16, base: 0 }, { min: 45001, max: 135000, rate: 0.30, base: 4288 }, { min: 135001, max: 190000, rate: 0.37, base: 31288 }, { min: 190001, max: Infinity, rate: 0.45, base: 51638 } ] }
            : { brackets: [ { min: 0, max: 18200, rate: 0, base: 0 }, { min: 18201, max: 45000, rate: 0.19, base: 0 }, { min: 45001, max: 120000, rate: 0.325, base: 5092 }, { min: 120001, max: 180000, rate: 0.37, base: 29467 }, { min: 180001, max: Infinity, rate: 0.45, base: 51667 } ] };
            
            const bracket = rates.brackets.find(b => taxableIncome >= b.min && taxableIncome <= b.max);
            if (bracket) {
                tax = bracket.base + (taxableIncome - (bracket.min > 0 ? bracket.min - 1 : 0)) * bracket.rate;
            }

            // 4. Calculate Low Income Tax Offset (LITO)
            if (taxableIncome <= 37500) {
                lito = 700;
            } else if (taxableIncome <= 45000) {
                lito = Math.max(0, 700 - (taxableIncome - 37500) * 0.05);
            } else if (taxableIncome <= 66667) {
                lito = Math.max(0, 325 - (taxableIncome - 45000) * 0.015);
            } else {
                lito = 0;
            }

            // 5. Calculate Medicare Levy
            const mlThresholds = { lower: 24276, upper: 30345 }; // Using 2023-24 for simplicity, ATO to confirm 25-26
            if (taxableIncome > mlThresholds.upper) {
                medicareLevy = taxableIncome * 0.02;
            } else if (taxableIncome > mlThresholds.lower) {
                medicareLevy = (taxableIncome - mlThresholds.lower) * 0.10;
            }

        } else { // Foreign Resident
            if (taxableIncome <= 120000) tax = taxableIncome * 0.325;
            else if (taxableIncome <= 180000) tax = 39000 + (taxableIncome - 120000) * 0.37;
            else tax = 61200 + (taxableIncome - 180000) * 0.45;
        }

        const taxBeforeOffset = tax;
        const taxAfterOffset = Math.max(0, tax - lito);

        // 6. Calculate Student Loan (HELP/HECS)
        if (hasStudentLoan && resident === 'resident') {
            if (financialYear === '2025-26') {
                // New Marginal System for 2025-26
                if (taxableIncome >= 179286) {
                    studentLoanRepayment = taxableIncome * 0.10;
                } else if (taxableIncome > 125000) {
                    studentLoanRepayment = 8700 + (taxableIncome - 125000) * 0.17;
                } else if (taxableIncome > 67000) {
                    studentLoanRepayment = (taxableIncome - 67000) * 0.15;
                } else {
                    studentLoanRepayment = 0;
                }
            } else {
                 // Old System for 2024-25 and 2023-24
                const helpRates = financialYear === '2024-25'
                ? [ {t: 54348, r: 0.01}, {t: 60523, r: 0.02}, {t: 67390, r: 0.025}, {t: 75030, r: 0.03}, {t: 83547, r: 0.035}, {t: 93025, r: 0.04}, {t: 103577, r: 0.045}, {t: 115339, r: 0.05}, {t: 128461, r: 0.055}, {t: 143116, r: 0.06}, {t: 159491, r: 0.065}, {t: 177790, r: 0.07}, {t: 198244, r: 0.075}, {t: 221105, r: 0.08}, {t: 246654, r: 0.085}, {t: 275218, r: 0.09}, {t: 307166, r: 0.095}, {t: Infinity, r: 0.1} ]
                : [ {t: 51550, r: 0.01}, {t: 59518, r: 0.02}, {t: 63089, r: 0.025}, {t: 66875, r: 0.03}, {t: 70888, r: 0.035}, {t: 75144, r: 0.04}, {t: 79658, r: 0.045}, {t: 84449, r: 0.05}, {t: 89535, r: 0.055}, {t: 94936, r: 0.06}, {t: 100673, r: 0.065}, {t: 106769, r: 0.07}, {t: 113247, r: 0.075}, {t: 120132, r: 0.08}, {t: 127449, r: 0.085}, {t: 135225, r: 0.09}, {t: 143489, r: 0.095}, {t: Infinity, r: 0.1} ];
                
                const rateInfo = [...helpRates].reverse().find(rate => taxableIncome >= rate.t);
                studentLoanRepayment = rateInfo ? taxableIncome * rateInfo.r : 0;
            }
        }

        const totalTax = taxAfterOffset + medicareLevy;
        const netIncome = taxableIncome - totalTax - studentLoanRepayment;

        setResults({
            grossAnnualIncome,
            superannuation,
            taxableIncome,
            incomeTaxBeforeOffset: taxBeforeOffset,
            incomeTax: taxAfterOffset,
            lito,
            medicareLevy,
            studentLoanRepayment,
            totalTax,
            netIncome,
        });

    }, [basePay, hourlyRate, hoursPerWeek, overtimeHours, overtimeRate, bonusPay, payFrequency, financialYear, resident, salaryIncludesSuper, hasStudentLoan]);

    const formatCurrency = (value) => new Intl.NumberFormat('en-AU', { style: 'currency', currency: 'AUD', minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(value || 0);
    const formatCurrencyNoDecimal = (value) => new Intl.NumberFormat('en-AU', { style: 'currency', currency: 'AUD', minimumFractionDigits: 0, maximumFractionDigits: 0 }).format(value || 0);

    return (
        <div className="bg-gray-50 min-h-screen font-sans">
            <div className="container mx-auto px-4 py-12">
                <header className="text-center mb-12">
                    <h1 className="text-4xl md:text-5xl font-bold text-gray-800">Comprehensive Tax Calculator</h1>
                    <p className="text-lg text-gray-600 mt-2">For Australian Residents</p>
                </header>

                <main className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-2 space-y-8">
                        <Card title="Your Details">
                            <SelectField label="Financial Year" value={financialYear} onChange={setFinancialYear} options={financialYearOptions} />
                            <SelectField label="Pay Frequency" value={payFrequency} onChange={setPayFrequency} options={payFrequencyOptions} />
                        </Card>
                        
                        <Card title="Your Pay">
                            {payFrequency !== 'hourly' ? (
                                <InputField label={`Base Pay (${payFrequency})`} value={basePay} onChange={setBasePay} />
                            ) : (
                                <>
                                    <InputField label="Hourly Rate" value={hourlyRate} onChange={setHourlyRate} />
                                    <InputField label="Hours per week" value={hoursPerWeek} onChange={setHoursPerWeek} />
                                </>
                            )}
                        </Card>

                        <Card title="Additional Pay">
                             <InputField label="Overtime (hours per week)" value={overtimeHours} onChange={setOvertimeHours} />
                             <InputField label="Bonus (one-off)" value={bonusPay} onChange={setBonusPay} />
                        </Card>

                        <Card title="Settings & Loans" cols={1}>
                             <div className="space-y-6">
                                <Switch label="Salary includes Superannuation" enabled={salaryIncludesSuper} setEnabled={setSalaryIncludesSuper} helpText="Is your salary package inclusive of the SG?"/>
                                <Switch label="Have a HELP/HECS student loan?" enabled={hasStudentLoan} setEnabled={setHasStudentLoan} helpText="Calculate compulsory repayments"/>
                            </div>
                        </Card>
                    </div>

                    <div className="lg:col-span-1">
                         <div className="sticky top-8 bg-white p-6 rounded-xl shadow-lg border border-gray-200">
                             <h3 className="text-xl font-semibold text-gray-800 mb-4">Your Estimate</h3>
                             
                             <div className="space-y-2 text-sm mb-6">
                                <div className="flex justify-between py-2"><span className="text-gray-600">Gross Annual Income</span><span className="font-medium">{formatCurrencyNoDecimal(results.grossAnnualIncome)}</span></div>
                                <div className="flex justify-between py-2"><span className="text-gray-600">Superannuation</span><span className="font-medium">{formatCurrencyNoDecimal(results.superannuation)}</span></div>
                                <div className="flex justify-between py-2 border-t font-semibold"><span className="text-gray-800">Taxable Income</span><span className="text-gray-900">{formatCurrencyNoDecimal(results.taxableIncome)}</span></div>
                                <div className="flex justify-between py-2 border-t"><span className="text-gray-600">Income Tax (before offsets)</span><span className="font-medium text-gray-900">{formatCurrencyNoDecimal(results.incomeTaxBeforeOffset)}</span></div>
                                <div className="flex justify-between py-2"><span className="text-gray-600">Low Income Offset</span><span className="font-medium text-green-600">- {formatCurrencyNoDecimal(results.lito)}</span></div>
                                <div className="flex justify-between py-2"><span className="text-gray-600">Medicare Levy</span><span className="font-medium text-red-600">- {formatCurrencyNoDecimal(results.medicareLevy)}</span></div>
                                {hasStudentLoan && <div className="flex justify-between py-2"><span className="text-gray-600">Student Loan</span><span className="font-medium text-red-600">- {formatCurrencyNoDecimal(results.studentLoanRepayment)}</span></div>}
                             </div>

                             <div className="mt-4 pt-4 border-t-2 border-dashed bg-indigo-50 p-4 rounded-lg">
                                 <div className="flex justify-between items-center">
                                     <span className="text-base font-bold text-gray-800">Net Annual Income</span>
                                     <span className="text-xl font-bold text-indigo-600">{formatCurrency(results.netIncome)}</span>
                                 </div>
                             </div>
                             
                             <div className="mt-6 text-center">
                                <h4 className="font-semibold mb-2">Take Home Pay</h4>
                                <div className="grid grid-cols-2 gap-2 text-sm bg-gray-50 p-3 rounded-md">
                                    <div>Monthly:</div><div className="font-mono">{formatCurrency(results.netIncome/12)}</div>
                                    <div>Fortnightly:</div><div className="font-mono">{formatCurrency(results.netIncome/26)}</div>
                                    <div>Weekly:</div><div className="font-mono">{formatCurrency(results.netIncome/52)}</div>
                                </div>
                             </div>

                         </div>
                    </div>
                </main>
            </div>
        </div>
    );
}