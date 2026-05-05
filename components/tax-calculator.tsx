"use client";

import React, { useState, useEffect, useRef, useMemo } from 'react';
import { motion, AnimatePresence, useMotionValue, animate, useMotionValueEvent } from 'framer-motion';

// --- Helper Components ---

type SelectOption = { value: string; label: string };

type InputFieldProps = {
    label: string;
    value: number;
    onChange: (value: number) => void;
    placeholder?: string;
    helpText?: string;
    disabled?: boolean;
};

const InputField = ({ label, value, onChange, placeholder = "0", helpText, disabled = false }: InputFieldProps) => (
    <div>
        <label className={`block text-[15px] font-medium mb-2 ${disabled ? 'text-[#898483]/50' : 'text-white'}`}>{label}</label>
        <div className="relative rounded-lg shadow-sm">
            <div className="pointer-events-none absolute inset-y-0 left-0 pl-4 flex items-center">
                <span className={`sm:text-[15px] ${disabled ? 'text-[#898483]/50' : 'text-[#898483]'}`}>$</span>
            </div>
            <input
                type="number"
                value={value}
                onChange={(e) => onChange(Math.max(0, parseFloat(e.target.value) || 0))}
                className={`w-full pl-8 pr-4 py-3 bg-[#363332] border border-transparent rounded-xl focus:outline-none focus:ring-2 focus:ring-[#FF5E3A]/80 text-white transition duration-200 ease-in-out ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
                placeholder={placeholder}
                disabled={disabled}
            />
        </div>
        {helpText && <p className="mt-2 text-[12px] font-medium text-[#898483]">{helpText}</p>}
    </div>
);

type SelectFieldProps = {
    label: string;
    value: string;
    onChange: (value: string) => void;
    options: SelectOption[];
};

const SelectField = ({ label, value, onChange, options }: SelectFieldProps) => {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const selectedLabel = options.find((o) => o.value === value)?.label || '';

    return (
        <div className="relative" ref={dropdownRef} style={{ zIndex: isOpen ? 50 : 1 }}>
            <label className="block text-[15px] font-medium text-white mb-2">{label}</label>
            <button
                type="button"
                onClick={() => setIsOpen(!isOpen)}
                className="w-full text-left py-3 px-4 bg-[#363332] border border-transparent text-white rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-[#FF5E3A]/80 transition duration-200 flex justify-between items-center relative z-10"
            >
                <span>{selectedLabel}</span>
                <motion.svg 
                    animate={{ rotate: isOpen ? 180 : 0 }} 
                    transition={{ duration: 0.2 }}
                    className="h-4 w-4 text-[#898483]" 
                    fill="none" stroke="currentColor" viewBox="0 0 24 24"
                >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                </motion.svg>
            </button>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -10, scaleY: 0.95 }}
                        animate={{ opacity: 1, y: 0, scaleY: 1 }}
                        exit={{ opacity: 0, y: -10, scaleY: 0.95 }}
                        transition={{ duration: 0.2, ease: "easeOut" }}
                        className="absolute z-20 w-full mt-2 bg-[#282524] border border-white/10 rounded-xl shadow-2xl overflow-hidden origin-top"
                    >
                        {options.map((option) => (
                            <button
                                key={option.value}
                                type="button"
                                onClick={() => {
                                    onChange(option.value);
                                    setIsOpen(false);
                                }}
                                className={`w-full text-left px-4 py-3 text-[15px] font-medium transition-colors hover:bg-[#363332] ${value === option.value ? 'text-[#FF5E3A] bg-[#363332]/50' : 'text-white'}`}
                            >
                                {option.label}
                            </button>
                        ))}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

type SwitchProps = {
    label: string;
    enabled: boolean;
    setEnabled: (next: boolean) => void;
    helpText?: string;
};

const Switch = ({ label, enabled, setEnabled, helpText }: SwitchProps) => (
    <div>
        <div className="flex items-center justify-between">
            <span className="flex-grow flex flex-col mr-6">
                <span className="text-[15px] font-medium text-white">{label}</span>
                 {helpText && <span className="text-[13px] mt-1 font-medium text-[#898483]">{helpText}</span>}
            </span>
            <button
                type="button"
                className={`${enabled ? 'bg-[#FF5E3A]' : 'bg-[#363332]'} relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-[#FF5E3A]/80`}
                onClick={() => setEnabled(!enabled)}
            >
                <span
                    aria-hidden="true"
                    className={`${enabled ? 'translate-x-5' : 'translate-x-0'} pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-300 ease-in-out`}
                />
            </button>
        </div>
    </div>
);

type CardProps = {
    title?: string;
    children: React.ReactNode;
    cols?: 1 | 2 | 3;
    className?: string;
};

const Card = ({ title, children, cols = 2, className = "" }: CardProps) => (
    <div className={`bg-[#282524] p-6 md:p-8 rounded-[24px] shadow-lg border border-white/5 relative ${className}`}>
        {/* Subtle top highlight for depth */}
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-50" />
        
        {title && <h3 className="text-[20px] font-semibold text-white mb-6 tracking-tight">{title}</h3>}
        <div className={`grid grid-cols-1 ${cols === 1 ? 'md:grid-cols-1' : cols === 2 ? 'md:grid-cols-2' : 'md:grid-cols-3'} gap-6`}>
            {children}
        </div>
    </div>
);

    // Number animation hook using framer-motion
    const AnimatedNumber = ({ value, formatFn }: { value: number, formatFn: (val: number) => string }) => {
        const [display, setDisplay] = useState(formatFn(value));
        const motionValue = useMotionValue(value);

        useEffect(() => {
            const controls = animate(motionValue, value, {
                duration: 1.2,
                ease: "circOut"
            });
            return controls.stop;
        }, [value, motionValue]);

        useMotionValueEvent(motionValue, "change", (latest) => {
            setDisplay(formatFn(latest));
        });

        return <span className="tabular-nums">{display}</span>;
    };

type TaxResults = {
    grossAnnualIncome: number;
    superannuation: number;
    taxableIncome: number;
    incomeTaxBeforeOffset: number;
    incomeTax: number;
    lito: number;
    medicareLevy: number;
    studentLoanRepayment: number;
    totalTax: number;
    netIncome: number;
};

export function TaxCalculator() {
    // --- State Management ---
    const [financialYear, setFinancialYear] = useState('2025-26');
    const resident = 'resident' as const;
    const [payFrequency, setPayFrequency] = useState('annual');

    const [basePay, setBasePay] = useState(100000);
    const [hourlyRate, setHourlyRate] = useState(50);
    const [hoursPerWeek, setHoursPerWeek] = useState(38);

    const [overtimeHours, setOvertimeHours] = useState(0);
    const overtimeRate = 1.5;
    const [bonusPay, setBonusPay] = useState(0);

    const [salaryIncludesSuper, setSalaryIncludesSuper] = useState(false);
    const [hasStudentLoan, setHasStudentLoan] = useState(true);

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
    const results: TaxResults = useMemo(() => {
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
            ? hourlyRate * overtimeRate * overtimeHours * 52
            : (annualBasePay / (hoursPerWeek * 52)) * overtimeRate * overtimeHours * 52;

        const grossAnnualIncome = annualBasePay + (annualOvertimePay || 0) + (bonusPay || 0);

        const sgRate = financialYear === '2025-26' ? 0.12 : (financialYear === '2024-25' ? 0.115 : 0.11);
        let taxableIncome = grossAnnualIncome;
        let superannuation = 0;

        if (salaryIncludesSuper) {
            taxableIncome = grossAnnualIncome / (1 + sgRate);
            superannuation = taxableIncome * sgRate;
        } else {
            superannuation = taxableIncome * sgRate;
        }

        let tax = 0;
        let lito = 0;
        let medicareLevy = 0;
        let studentLoanRepayment = 0;

        if (resident === 'resident') {
            const rates = financialYear === '2025-26' || financialYear === '2024-25'
                ? { brackets: [{ min: 0, max: 18200, rate: 0, base: 0 }, { min: 18201, max: 45000, rate: 0.16, base: 0 }, { min: 45001, max: 135000, rate: 0.30, base: 4288 }, { min: 135001, max: 190000, rate: 0.37, base: 31288 }, { min: 190001, max: Infinity, rate: 0.45, base: 51638 }] }
                : { brackets: [{ min: 0, max: 18200, rate: 0, base: 0 }, { min: 18201, max: 45000, rate: 0.19, base: 0 }, { min: 45001, max: 120000, rate: 0.325, base: 5092 }, { min: 120001, max: 180000, rate: 0.37, base: 29467 }, { min: 180001, max: Infinity, rate: 0.45, base: 51667 }] };

            const bracket = rates.brackets.find(b => taxableIncome >= b.min && taxableIncome <= b.max);
            if (bracket) {
                tax = bracket.base + (taxableIncome - (bracket.min > 0 ? bracket.min - 1 : 0)) * bracket.rate;
            }

            if (taxableIncome <= 37500) {
                lito = 700;
            } else if (taxableIncome <= 45000) {
                lito = Math.max(0, 700 - (taxableIncome - 37500) * 0.05);
            } else if (taxableIncome <= 66667) {
                lito = Math.max(0, 325 - (taxableIncome - 45000) * 0.015);
            } else {
                lito = 0;
            }

            const mlThresholds = { lower: 24276, upper: 30345 };
            if (taxableIncome > mlThresholds.upper) {
                medicareLevy = taxableIncome * 0.02;
            } else if (taxableIncome > mlThresholds.lower) {
                medicareLevy = (taxableIncome - mlThresholds.lower) * 0.10;
            }

        } else {
            if (taxableIncome <= 120000) tax = taxableIncome * 0.325;
            else if (taxableIncome <= 180000) tax = 39000 + (taxableIncome - 120000) * 0.37;
            else tax = 61200 + (taxableIncome - 180000) * 0.45;
        }

        const taxBeforeOffset = tax;
        const taxAfterOffset = Math.max(0, tax - lito);

        if (hasStudentLoan && resident === 'resident') {
            if (financialYear === '2025-26') {
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
                const helpRates = financialYear === '2024-25'
                    ? [{ t: 54348, r: 0.01 }, { t: 60523, r: 0.02 }, { t: 67390, r: 0.025 }, { t: 75030, r: 0.03 }, { t: 83547, r: 0.035 }, { t: 93025, r: 0.04 }, { t: 103577, r: 0.045 }, { t: 115339, r: 0.05 }, { t: 128461, r: 0.055 }, { t: 143116, r: 0.06 }, { t: 159491, r: 0.065 }, { t: 177790, r: 0.07 }, { t: 198244, r: 0.075 }, { t: 221105, r: 0.08 }, { t: 246654, r: 0.085 }, { t: 275218, r: 0.09 }, { t: 307166, r: 0.095 }, { t: Infinity, r: 0.1 }]
                    : [{ t: 51550, r: 0.01 }, { t: 59518, r: 0.02 }, { t: 63089, r: 0.025 }, { t: 66875, r: 0.03 }, { t: 70888, r: 0.035 }, { t: 75144, r: 0.04 }, { t: 79658, r: 0.045 }, { t: 84449, r: 0.05 }, { t: 89535, r: 0.055 }, { t: 94936, r: 0.06 }, { t: 100673, r: 0.065 }, { t: 106769, r: 0.07 }, { t: 113247, r: 0.075 }, { t: 120132, r: 0.08 }, { t: 127449, r: 0.085 }, { t: 135225, r: 0.09 }, { t: 143489, r: 0.095 }, { t: Infinity, r: 0.1 }];

                const rateInfo = [...helpRates].reverse().find(rate => taxableIncome >= rate.t);
                studentLoanRepayment = rateInfo ? taxableIncome * rateInfo.r : 0;
            }
        }

        const totalTax = taxAfterOffset + medicareLevy;
        const netIncome = taxableIncome - totalTax - studentLoanRepayment;

        return {
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
        };
    }, [basePay, hourlyRate, hoursPerWeek, overtimeHours, bonusPay, payFrequency, financialYear, resident, salaryIncludesSuper, hasStudentLoan]);

    const formatCurrency = (value: number) => new Intl.NumberFormat('en-AU', { style: 'currency', currency: 'AUD', minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(value || 0);
    const formatCurrencyNoDecimal = (value: number) => new Intl.NumberFormat('en-AU', { style: 'currency', currency: 'AUD', minimumFractionDigits: 0, maximumFractionDigits: 0 }).format(value || 0);

    return (
        <section className="relative z-[20] shrink-0 bg-[#1a1919] py-24 md:py-32 overflow-hidden">
            {/* Subtle background glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#FF5E3A]/5 rounded-full blur-[120px] pointer-events-none" />
            
            <div className="container mx-auto px-6 md:px-10 lg:px-[3rem] relative z-10 max-w-7xl">
                <header className="text-center mb-16 md:mb-24">
                    <motion.h2 
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.7 }}
                        className="mb-6 text-[36px] font-medium leading-[1.05] tracking-tight text-white drop-shadow-md sm:text-[48px] md:text-[56px]"
                    >
                        Calculate your tax. <br className="hidden sm:block" />
                        <span className="text-[#898483]">Accurately and easily.</span>
                    </motion.h2>
                    <motion.p 
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.7, delay: 0.1 }}
                        className="text-[16px] md:text-[18px] font-medium text-[#898483] max-w-2xl mx-auto"
                    >
                        Comprehensive estimation for Australian Residents. See exactly where your money goes.
                    </motion.p>
                </header>

                <main className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-10">
                    <motion.div 
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.7, delay: 0.2 }}
                        className="lg:col-span-8 space-y-8"
                    >
                        <Card title="Your Details">
                            <SelectField label="Financial Year" value={financialYear} onChange={setFinancialYear} options={financialYearOptions} />
                            <SelectField label="Pay Frequency" value={payFrequency} onChange={setPayFrequency} options={payFrequencyOptions} />
                        </Card>
                        
                        <motion.div layout>
                            <Card title="Your Pay">
                                <motion.div layout className="grid grid-cols-1 gap-6">
                                    {payFrequency !== 'hourly' ? (
                                        <InputField label={`Base Pay (${payFrequency})`} value={basePay} onChange={setBasePay} />
                                    ) : (
                                        <>
                                            <InputField label="Hourly Rate" value={hourlyRate} onChange={setHourlyRate} />
                                            <InputField label="Hours per week" value={hoursPerWeek} onChange={setHoursPerWeek} />
                                        </>
                                    )}
                                </motion.div>
                            </Card>
                        </motion.div>

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
                    </motion.div>

                    <motion.div 
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.7, delay: 0.3 }}
                        className="lg:col-span-4"
                    >
                         <div className="relative bg-[#282524] p-6 md:p-8 rounded-[24px] shadow-2xl border border-white/5 overflow-hidden lg:sticky lg:top-10">
                             <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#FF5E3A]/40 to-transparent" />
                             
                             <h3 className="text-[22px] font-semibold text-white mb-8 tracking-tight">Your Estimate</h3>
                             
                             <div className="space-y-4 text-[15px] mb-8 font-medium">
                                <div className="flex justify-between items-center py-1"><span className="text-[#898483] whitespace-nowrap">Gross Income</span><span className="text-white font-semibold truncate ml-4" title={formatCurrencyNoDecimal(results.grossAnnualIncome)}><AnimatedNumber value={results.grossAnnualIncome} formatFn={formatCurrencyNoDecimal} /></span></div>
                                <div className="flex justify-between items-center py-1"><span className="text-[#898483] whitespace-nowrap">Superannuation</span><span className="text-white font-semibold truncate ml-4" title={formatCurrencyNoDecimal(results.superannuation)}><AnimatedNumber value={results.superannuation} formatFn={formatCurrencyNoDecimal} /></span></div>
                                <div className="flex justify-between items-center py-3 border-y border-white/10 my-2"><span className="text-white whitespace-nowrap">Taxable Income</span><span className="text-white font-semibold truncate ml-4" title={formatCurrencyNoDecimal(results.taxableIncome)}><AnimatedNumber value={results.taxableIncome} formatFn={formatCurrencyNoDecimal} /></span></div>
                                <div className="flex justify-between items-center py-1"><span className="text-[#898483] whitespace-nowrap">Income Tax</span><span className="text-white font-semibold truncate ml-4" title={formatCurrencyNoDecimal(results.incomeTaxBeforeOffset)}><AnimatedNumber value={results.incomeTaxBeforeOffset} formatFn={formatCurrencyNoDecimal} /></span></div>
                                <motion.div 
                                    initial={false}
                                    animate={{ height: results.lito > 0 ? 'auto' : 0, opacity: results.lito > 0 ? 1 : 0 }}
                                    className="overflow-hidden"
                                >
                                    <div className="flex justify-between items-center py-1"><span className="text-[#898483] whitespace-nowrap">Low Income Offset</span><span className="text-green-400 font-semibold truncate ml-4" title={formatCurrencyNoDecimal(results.lito)}>- <AnimatedNumber value={results.lito} formatFn={formatCurrencyNoDecimal} /></span></div>
                                </motion.div>
                                <div className="flex justify-between items-center py-1"><span className="text-[#898483] whitespace-nowrap">Medicare Levy</span><span className="text-[#FF5E3A] font-semibold truncate ml-4" title={formatCurrencyNoDecimal(results.medicareLevy)}>- <AnimatedNumber value={results.medicareLevy} formatFn={formatCurrencyNoDecimal} /></span></div>
                                <motion.div 
                                    initial={false}
                                    animate={{ height: hasStudentLoan ? 'auto' : 0, opacity: hasStudentLoan ? 1 : 0 }}
                                    className="overflow-hidden"
                                >
                                    <div className="flex justify-between items-center py-1"><span className="text-[#898483] whitespace-nowrap">Student Loan</span><span className="text-[#FF5E3A] font-semibold truncate ml-4" title={formatCurrencyNoDecimal(results.studentLoanRepayment)}>- <AnimatedNumber value={results.studentLoanRepayment} formatFn={formatCurrencyNoDecimal} /></span></div>
                                </motion.div>
                             </div>

                             <div className="mt-6 pt-6 border-t border-white/10">
                                 <div className="flex flex-col mb-8">
                                     <span className="text-[14px] font-medium text-[#898483] mb-1">Net Annual Income</span>
                                     <span className="text-[32px] sm:text-[36px] font-bold text-[#FF5E3A] leading-none tracking-tight truncate w-full" title={formatCurrency(results.netIncome)}><AnimatedNumber value={results.netIncome} formatFn={formatCurrency} /></span>
                                 </div>
                             </div>
                             
                             <div>
                                <h4 className="text-[13px] uppercase tracking-wider text-[#898483] font-semibold mb-4">Take Home Pay</h4>
                                <div className="flex flex-col gap-3 text-[15px] font-medium">
                                    <div className="flex justify-between items-center bg-[#363332] p-4 rounded-xl border border-white/5">
                                        <div className="text-[#898483] whitespace-nowrap">Monthly</div>
                                        <div className="text-white font-semibold truncate ml-4" title={formatCurrency(results.netIncome/12)}><AnimatedNumber value={results.netIncome/12} formatFn={formatCurrency} /></div>
                                    </div>
                                    <div className="flex justify-between items-center bg-[#363332] p-4 rounded-xl border border-white/5">
                                        <div className="text-[#898483] whitespace-nowrap">Fortnightly</div>
                                        <div className="text-white font-semibold truncate ml-4" title={formatCurrency(results.netIncome/26)}><AnimatedNumber value={results.netIncome/26} formatFn={formatCurrency} /></div>
                                    </div>
                                    <div className="flex justify-between items-center bg-[#363332] p-4 rounded-xl border border-white/5">
                                        <div className="text-[#898483] whitespace-nowrap">Weekly</div>
                                        <div className="text-white font-semibold truncate ml-4" title={formatCurrency(results.netIncome/52)}><AnimatedNumber value={results.netIncome/52} formatFn={formatCurrency} /></div>
                                    </div>
                                </div>
                             </div>
                         </div>
                    </motion.div>
                </main>
            </div>
        </section>
    );
}
