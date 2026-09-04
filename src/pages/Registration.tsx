import React, { useState } from 'react';
import {
  CheckCircle2,
  AlertCircle,
  ArrowLeft,
  Building2,
  Printer,
  Sparkles,
  Info
} from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { CONFERENCE_DATA } from '@/data/conference';

interface RegistrationFormData {
  title: string;
  name: string;
  designation: string;
  gender: string;
  organization: string;
  discipline: string;
  address: string;
  pincode: string;
  phone: string;
  email: string;
  foodPreference: string;
  foodDetails: string;
  requireAccommodation: string;
  accommodationNotes: string;
  isPresentingPaper: string;
  paperTitle: string;
  cmtPaperId: string;
  paperTheme: string;
  registrationCategory: string;
  paymentMode: string;
  transactionRef: string;
  agreeToTerms: boolean;
}

const INITIAL_FORM_DATA: RegistrationFormData = {
  title: 'Dr.',
  name: '',
  designation: '',
  gender: '',
  organization: '',
  discipline: 'Social Work',
  address: '',
  pincode: '',
  phone: '',
  email: '',
  foodPreference: '',
  foodDetails: '',
  requireAccommodation: '',
  accommodationNotes: '',
  isPresentingPaper: '',
  paperTitle: '',
  cmtPaperId: '',
  paperTheme: '',
  registrationCategory: 'student',
  paymentMode: 'NEFT/RTGS Bank Transfer',
  transactionRef: '',
  agreeToTerms: false,
};

const TITLE_OPTIONS = [
  'Dr.',
  'Prof.',
  'Mr.',
  'Ms.',
  'Mrs.',
  'Rev.',
  'Fr.',
  'Sr.',
];

const GENDER_OPTIONS = [
  'Female',
  'Male',
  'Transgender',
  'Prefer not to say',
];

const FOOD_OPTIONS = [
  { id: 'veg', label: 'Vegetarian' },
  { id: 'non-veg', label: 'Non-Vegetarian' },
  { id: 'jain', label: 'Jain Food' },
  { id: 'special', label: 'Specific Dietary Requirement' },
];

const CATEGORY_DETAILS: Record<string, { label: string; fee: string; amount: number; desc: string; badge: string }> = {
  student: {
    label: 'UG / PG Student',
    fee: '₹ 750',
    amount: 750,
    desc: 'For graduate and postgraduate students (valid student ID card required at venue desk)',
    badge: 'Student Pass',
  },
  scholar: {
    label: 'M.Phil / Research Scholars',
    fee: '₹ 750',
    amount: 750,
    desc: 'For full-time / part-time M.Phil scholars and PhD research candidates',
    badge: 'Research Pass',
  },
  professional: {
    label: 'Professionals / Academicians / Practitioners',
    fee: '₹ 1,000 – ₹ 1,500',
    amount: 1000,
    desc: 'For faculty members, professors, development practitioners, NGO heads, and CSR delegates',
    badge: 'Faculty / Delegate Pass',
  },
};

export const Registration: React.FC = () => {
  const [formData, setFormData] = useState<RegistrationFormData>(INITIAL_FORM_DATA);
  const [step, setStep] = useState<'form' | 'review' | 'success'>('form');
  const [formError, setFormError] = useState<string | null>(null);
  const [registrationId, setRegistrationId] = useState<string>('');

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData((prev) => ({ ...prev, [name]: checked }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleCategorySelect = (categoryKey: string) => {
    setFormData((prev) => ({ ...prev, registrationCategory: categoryKey }));
  };

  const validateForm = (): boolean => {
    if (!formData.title.trim()) {
      setFormError('Please select your Title.');
      return false;
    }
    if (!formData.name.trim()) {
      setFormError('Please enter your full Name as it should appear on the certificate.');
      return false;
    }
    if (!formData.designation.trim()) {
      setFormError('Please enter your academic or professional Designation.');
      return false;
    }
    if (!formData.gender) {
      setFormError('Please select your Gender.');
      return false;
    }
    if (!formData.organization.trim()) {
      setFormError('Please provide the name of your representing Organization / College / Institution.');
      return false;
    }
    if (!formData.discipline.trim()) {
      setFormError('Please specify your Discipline (e.g., Social Work, Economics, Public Health).');
      return false;
    }
    if (!formData.address.trim()) {
      setFormError('Please provide your complete Address for Communication.');
      return false;
    }
    if (!formData.pincode.trim()) {
      setFormError('Please provide your PIN / Postal Code.');
      return false;
    }
    if (!formData.phone.trim()) {
      setFormError('Please enter a valid Contact / Mobile Number.');
      return false;
    }
    if (!formData.email.trim() || !formData.email.includes('@')) {
      setFormError('Please enter a valid Email Address for registration correspondence.');
      return false;
    }
    if (!formData.foodPreference) {
      setFormError('Food Preference is a required question. Please choose your preference.');
      return false;
    }
    if (!formData.requireAccommodation) {
      setFormError('Please indicate whether you require accommodation.');
      return false;
    }
    if (!formData.isPresentingPaper) {
      setFormError('Please specify whether you are presenting a paper in the conference.');
      return false;
    }
    if (!formData.registrationCategory) {
      setFormError('Please select your Registration Category.');
      return false;
    }

    setFormError(null);
    return true;
  };

  const handleProceedToReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      setStep('review');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleFinalSubmit = () => {
    if (!formData.agreeToTerms) {
      setFormError('Please check the verification declaration box to confirm your details.');
      return;
    }

    // Generate unique registration reference
    const randomCode = Math.floor(10000 + Math.random() * 90000);
    const generatedId = `DYUTI27-REG-${randomCode}`;
    setRegistrationId(generatedId);
    setStep('success');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handlePrint = () => {
    window.print();
  };

  const selectedCategory = CATEGORY_DETAILS[formData.registrationCategory] || CATEGORY_DETAILS.student;

  return (
    <div className="pt-8 sm:pt-10 lg:pt-12 pb-20 sm:pb-28 lg:pb-32 bg-[#FDFBF7] text-slate-800 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">

        {/* ── PAGE HEADER ── */}
        <div className="text-center max-w-3xl mx-auto mb-14 lg:mb-20">
          <div className="flex items-center justify-center gap-2.5 mb-6">
            <span className="w-6 h-0.5 bg-[#071A33]" />
            <span className="text-[12px] font-sans font-bold uppercase tracking-[0.22em] text-slate-600">
              DYUTI 2027 Registration Portal
            </span>
            <span className="w-6 h-0.5 bg-[#071A33]" />
          </div>

          <h1 className="font-heading font-extrabold text-[#071A33] leading-none tracking-tight mb-6 text-[2.5rem] sm:text-[3.25rem] lg:text-[4rem]">
            Conference Delegate
            <span className="block text-slate-850 mt-2 text-[1.85rem] sm:text-[2.5rem] lg:text-[2.75rem] font-bold">
              Registration Form
            </span>
          </h1>

          <div className="w-16 h-1 bg-[#071A33] rounded-full mx-auto mb-6" />

          <p className="text-sm sm:text-base text-slate-650 leading-relaxed font-sans max-w-2xl mx-auto font-normal">
            Please fill in your participant coordinates accurately. Cross-check all details before final submission to ensure a smooth conference check-in, certificate issuance, and hospitality arrangement.
          </p>
        </div>

        {/* ── STEP INDICATOR BANNER ── */}
        <div className="mb-12 max-w-3xl mx-auto">
          <div className="flex items-center justify-between p-2.5 sm:p-3 rounded-full bg-white border border-slate-300 shadow-md">
            <div
              className={`flex-1 py-2 px-3 sm:px-4 rounded-full text-center text-xs sm:text-sm font-sans font-bold transition-all flex items-center justify-center gap-2 ${
                step === 'form'
                  ? 'bg-gradient-to-r from-[#071A33] to-[#0e2a52] text-white shadow-md'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <span className="w-5 h-5 rounded-full bg-white/20 text-white text-[11px] font-mono flex items-center justify-center font-black">
                1
              </span>
              <span>Participant Details</span>
            </div>

            <div
              className={`flex-1 py-2 px-3 sm:px-4 rounded-full text-center text-xs sm:text-sm font-sans font-bold transition-all flex items-center justify-center gap-2 ${
                step === 'review'
                  ? 'bg-gradient-to-r from-[#071A33] to-[#0e2a52] text-white shadow-md'
                  : 'text-slate-600'
              }`}
            >
              <span className="w-5 h-5 rounded-full bg-slate-200 text-slate-700 text-[11px] font-mono flex items-center justify-center font-black">
                2
              </span>
              <span>Cross-Check &amp; Review</span>
            </div>

            <div
              className={`flex-1 py-2 px-3 sm:px-4 rounded-full text-center text-xs sm:text-sm font-sans font-bold transition-all flex items-center justify-center gap-2 ${
                step === 'success'
                  ? 'bg-gradient-to-r from-[#071A33] to-[#0e2a52] text-white shadow-md'
                  : 'text-slate-400'
              }`}
            >
              <span className="w-5 h-5 rounded-full bg-slate-200 text-slate-700 text-[11px] font-mono flex items-center justify-center font-black">
                3
              </span>
              <span>Confirmed</span>
            </div>
          </div>
        </div>

        {/* ── STEP 1: REGISTRATION FORM ── */}
        {step === 'form' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">

            {/* Left Column: Comprehensive Registration Form (8 Cols) */}
            <div className="lg:col-span-8 space-y-8">
              <form onSubmit={handleProceedToReview} className="space-y-8">

                {/* Form Card */}
                <div className="rounded-[28px] sm:rounded-[36px] rounded-tl-[56px] sm:rounded-tl-[72px] rounded-br-[56px] sm:rounded-br-[72px] p-8 sm:p-12 bg-gradient-to-br from-[#071A33] via-[#0e2a52] to-[#040e1c] text-white border border-white/20 shadow-2xl relative overflow-hidden">
                  
                  {/* Subtle ambient glow */}
                  <div className="absolute top-0 right-0 w-80 h-80 bg-white/5 rounded-full blur-3xl pointer-events-none" />

                  {/* Header inside form */}
                  <div className="mb-8 pb-6 border-b border-white/15 relative z-10">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="w-5 h-0.5 bg-amber-400" />
                      <span className="text-[11.5px] font-mono font-bold uppercase tracking-[0.2em] text-amber-300">
                        Section A &bull; Identity &amp; Affiliation
                      </span>
                    </div>
                    <h2 className="font-heading text-2xl sm:text-3xl font-black text-white m-0">
                      Details of the Participant
                    </h2>
                    <p className="text-xs sm:text-sm text-slate-200 font-sans mt-2 leading-relaxed">
                      Please enter your personal and institutional particulars with care. Fields marked with <span className="text-amber-400 font-black">*</span> are mandatory.
                    </p>
                  </div>

                  {/* Error Alert Box */}
                  {formError && (
                    <div className="p-4 rounded-xl bg-red-500/20 border border-red-400/50 text-red-200 text-xs sm:text-sm font-sans flex items-start gap-3 mb-6 animate-fadeIn">
                      <AlertCircle className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
                      <span>{formError}</span>
                    </div>
                  )}

                  <div className="space-y-6 relative z-10 font-sans">

                    {/* 1. Title & 2. Name */}
                    <div className="grid grid-cols-1 sm:grid-cols-12 gap-5">
                      {/* 1. Title * */}
                      <div className="sm:col-span-4 space-y-2">
                        <label htmlFor="title" className="block text-xs font-mono font-bold uppercase tracking-wider text-slate-200">
                          1. Title <span className="text-amber-400">*</span>
                        </label>
                        <select
                          id="title"
                          name="title"
                          required
                          value={formData.title}
                          onChange={handleChange}
                          className="w-full px-4 py-3.5 rounded-xl bg-white/10 border border-white/20 text-white text-sm focus:outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-400/20 transition-all cursor-pointer"
                        >
                          {TITLE_OPTIONS.map((t) => (
                            <option key={t} value={t} className="bg-[#071A33] text-white">
                              {t}
                            </option>
                          ))}
                        </select>
                      </div>

                      {/* 2. Name * */}
                      <div className="sm:col-span-8 space-y-2">
                        <label htmlFor="name" className="block text-xs font-mono font-bold uppercase tracking-wider text-slate-200">
                          2. Full Name <span className="text-amber-400">*</span>
                        </label>
                        <input
                          type="text"
                          id="name"
                          name="name"
                          required
                          value={formData.name}
                          onChange={handleChange}
                          placeholder="e.g. Bincy C.C"
                          className="w-full px-4 py-3.5 rounded-xl bg-white/10 border border-white/20 text-white placeholder-slate-400 text-sm focus:outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-400/20 transition-all"
                        />
                        <span className="text-[11px] text-amber-300/90 font-sans block">
                          (As you want to appear in the Conference Certificate and other documents)
                        </span>
                      </div>
                    </div>

                    {/* 3. Designation & 4. Gender */}
                    <div className="grid grid-cols-1 sm:grid-cols-12 gap-5">
                      {/* 3. Designation * */}
                      <div className="sm:col-span-7 space-y-2">
                        <label htmlFor="designation" className="block text-xs font-mono font-bold uppercase tracking-wider text-slate-200">
                          3. Designation <span className="text-amber-400">*</span>
                        </label>
                        <input
                          type="text"
                          id="designation"
                          name="designation"
                          required
                          value={formData.designation}
                          onChange={handleChange}
                          placeholder="e.g. Assistant Professor / PhD Scholar / Student"
                          className="w-full px-4 py-3.5 rounded-xl bg-white/10 border border-white/20 text-white placeholder-slate-400 text-sm focus:outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-400/20 transition-all"
                        />
                      </div>

                      {/* 4. Gender * */}
                      <div className="sm:col-span-5 space-y-2">
                        <label htmlFor="gender" className="block text-xs font-mono font-bold uppercase tracking-wider text-slate-200">
                          4. Gender <span className="text-amber-400">*</span>
                        </label>
                        <select
                          id="gender"
                          name="gender"
                          required
                          value={formData.gender}
                          onChange={handleChange}
                          className="w-full px-4 py-3.5 rounded-xl bg-white/10 border border-white/20 text-white text-sm focus:outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-400/20 transition-all cursor-pointer"
                        >
                          <option value="" disabled className="bg-[#071A33] text-slate-400">
                            Select Gender
                          </option>
                          {GENDER_OPTIONS.map((g) => (
                            <option key={g} value={g} className="bg-[#071A33] text-white">
                              {g}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>

                    {/* 5. Organization / College / Institution * */}
                    <div className="space-y-2">
                      <label htmlFor="organization" className="block text-xs font-mono font-bold uppercase tracking-wider text-slate-200">
                        5. Name of the representing Organization / College / Institution / Independent <span className="text-amber-400">*</span>
                      </label>
                      <input
                        type="text"
                        id="organization"
                        name="organization"
                        required
                        value={formData.organization}
                        onChange={handleChange}
                        placeholder="e.g. Rajagiri College of Social Sciences (Autonomous)"
                        className="w-full px-4 py-3.5 rounded-xl bg-white/10 border border-white/20 text-white placeholder-slate-400 text-sm focus:outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-400/20 transition-all"
                      />
                    </div>

                    {/* 6. Discipline * */}
                    <div className="space-y-2">
                      <label htmlFor="discipline" className="block text-xs font-mono font-bold uppercase tracking-wider text-slate-200">
                        6. Discipline <span className="text-amber-400">*</span>
                      </label>
                      <input
                        type="text"
                        id="discipline"
                        name="discipline"
                        required
                        value={formData.discipline}
                        onChange={handleChange}
                        placeholder="e.g. Social Work, Economics, Public Health, Sociology, Management etc."
                        className="w-full px-4 py-3.5 rounded-xl bg-white/10 border border-white/20 text-white placeholder-slate-400 text-sm focus:outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-400/20 transition-all"
                      />
                      <span className="text-[11px] text-slate-300 font-sans block">
                        (for example: Social Work, Economics, Public Health, Psychology, Sociology, Management etc.)
                      </span>
                    </div>

                    {/* Divider */}
                    <div className="pt-6 pb-2 border-t border-white/15">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="w-5 h-0.5 bg-amber-400" />
                        <span className="text-[11.5px] font-mono font-bold uppercase tracking-[0.2em] text-amber-300">
                          Section B &bull; Communication &amp; Contact
                        </span>
                      </div>
                    </div>

                    {/* 7. Address for Communication * */}
                    <div className="space-y-2">
                      <label htmlFor="address" className="block text-xs font-mono font-bold uppercase tracking-wider text-slate-200">
                        7. Address for Communication (Please provide your Pin code too) <span className="text-amber-400">*</span>
                      </label>
                      <textarea
                        id="address"
                        name="address"
                        rows={3}
                        required
                        value={formData.address}
                        onChange={handleChange}
                        placeholder="Door / Flat No., Department, Street Name, City, State, Country"
                        className="w-full px-4 py-3.5 rounded-xl bg-white/10 border border-white/20 text-white placeholder-slate-400 text-sm focus:outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-400/20 transition-all resize-none"
                      />
                    </div>

                    {/* Pincode & Contact Number */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      {/* Pincode */}
                      <div className="space-y-2">
                        <label htmlFor="pincode" className="block text-xs font-mono font-bold uppercase tracking-wider text-slate-200">
                          PIN / Postal Code <span className="text-amber-400">*</span>
                        </label>
                        <input
                          type="text"
                          id="pincode"
                          name="pincode"
                          required
                          value={formData.pincode}
                          onChange={handleChange}
                          placeholder="e.g. 683104"
                          className="w-full px-4 py-3.5 rounded-xl bg-white/10 border border-white/20 text-white placeholder-slate-400 text-sm focus:outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-400/20 transition-all"
                        />
                      </div>

                      {/* 8. Contact Number * */}
                      <div className="space-y-2">
                        <label htmlFor="phone" className="block text-xs font-mono font-bold uppercase tracking-wider text-slate-200">
                          8. Contact Number (Mobile / WhatsApp) <span className="text-amber-400">*</span>
                        </label>
                        <input
                          type="tel"
                          id="phone"
                          name="phone"
                          required
                          value={formData.phone}
                          onChange={handleChange}
                          placeholder="e.g. +91 98765 43210"
                          className="w-full px-4 py-3.5 rounded-xl bg-white/10 border border-white/20 text-white placeholder-slate-400 text-sm focus:outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-400/20 transition-all"
                        />
                      </div>
                    </div>

                    {/* Email Address */}
                    <div className="space-y-2">
                      <label htmlFor="email" className="block text-xs font-mono font-bold uppercase tracking-wider text-slate-200">
                        Email Address <span className="text-amber-400">*</span>
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="e.g. delegate@university.edu"
                        className="w-full px-4 py-3.5 rounded-xl bg-white/10 border border-white/20 text-white placeholder-slate-400 text-sm focus:outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-400/20 transition-all"
                      />
                      <span className="text-[11px] text-slate-300 font-sans block">
                        Official conference confirmation and receipt will be dispatched to this email.
                      </span>
                    </div>

                    {/* Divider */}
                    <div className="pt-6 pb-2 border-t border-white/15">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="w-5 h-0.5 bg-amber-400" />
                        <span className="text-[11.5px] font-mono font-bold uppercase tracking-[0.2em] text-amber-300">
                          Section C &bull; Preferences &amp; Conference Logistics
                        </span>
                      </div>
                    </div>

                    {/* 9. Food Preference * */}
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <label className="block text-xs font-mono font-bold uppercase tracking-wider text-slate-200">
                          9. Food Preference <span className="text-amber-400">*</span>
                        </label>
                        <span className="text-[11px] font-mono text-amber-300 bg-white/10 px-2.5 py-0.5 rounded-full">
                          Required Question
                        </span>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {FOOD_OPTIONS.map((food) => (
                          <label
                            key={food.id}
                            className={`p-4 rounded-xl border flex items-center gap-3 cursor-pointer transition-all ${
                              formData.foodPreference === food.id
                                ? 'bg-amber-400/20 border-amber-400 text-white shadow-md'
                                : 'bg-white/10 border-white/20 text-slate-200 hover:bg-white/15'
                            }`}
                          >
                            <input
                              type="radio"
                              name="foodPreference"
                              value={food.id}
                              checked={formData.foodPreference === food.id}
                              onChange={handleChange}
                              className="accent-amber-400 w-4 h-4"
                            />
                            <span className="text-xs sm:text-sm font-sans font-bold">
                              {food.label}
                            </span>
                          </label>
                        ))}
                      </div>

                      {formData.foodPreference === 'special' && (
                        <input
                          type="text"
                          name="foodDetails"
                          value={formData.foodDetails}
                          onChange={handleChange}
                          placeholder="Please specify your dietary requirements (e.g., Gluten-Free, Vegan, Allergies)"
                          className="w-full px-4 py-3 rounded-xl bg-white/10 border border-amber-400/60 text-white text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-amber-400/20 mt-2"
                        />
                      )}
                    </div>

                    {/* 10. Do you require accommodation? * */}
                    <div className="space-y-3 pt-2">
                      <div>
                        <label className="block text-xs font-mono font-bold uppercase tracking-wider text-slate-200 mb-1">
                          10. Do you require accommodation? <span className="text-amber-400">*</span>
                        </label>
                        <span className="text-xs text-slate-300 font-sans block">
                          (Moderate Accommodation will be provided on request)
                        </span>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <label
                          className={`p-4 rounded-xl border flex items-center justify-center gap-3 cursor-pointer transition-all ${
                            formData.requireAccommodation === 'yes'
                              ? 'bg-amber-400/20 border-amber-400 text-white shadow-md'
                              : 'bg-white/10 border-white/20 text-slate-200 hover:bg-white/15'
                          }`}
                        >
                          <input
                            type="radio"
                            name="requireAccommodation"
                            value="yes"
                            checked={formData.requireAccommodation === 'yes'}
                            onChange={handleChange}
                            className="accent-amber-400 w-4 h-4"
                          />
                          <span className="text-xs sm:text-sm font-sans font-bold">
                            Yes, I require accommodation
                          </span>
                        </label>

                        <label
                          className={`p-4 rounded-xl border flex items-center justify-center gap-3 cursor-pointer transition-all ${
                            formData.requireAccommodation === 'no'
                              ? 'bg-amber-400/20 border-amber-400 text-white shadow-md'
                              : 'bg-white/10 border-white/20 text-slate-200 hover:bg-white/15'
                          }`}
                        >
                          <input
                            type="radio"
                            name="requireAccommodation"
                            value="no"
                            checked={formData.requireAccommodation === 'no'}
                            onChange={handleChange}
                            className="accent-amber-400 w-4 h-4"
                          />
                          <span className="text-xs sm:text-sm font-sans font-bold">
                            No, I will arrange my own stay
                          </span>
                        </label>
                      </div>
                    </div>

                    {/* 11. Are you presenting a paper in the conference? * */}
                    <div className="space-y-3 pt-2">
                      <label className="block text-xs font-mono font-bold uppercase tracking-wider text-slate-200">
                        11. Are you presenting a paper in the conference? <span className="text-amber-400">*</span>
                      </label>

                      <div className="grid grid-cols-2 gap-4">
                        <label
                          className={`p-4 rounded-xl border flex items-center justify-center gap-3 cursor-pointer transition-all ${
                            formData.isPresentingPaper === 'yes'
                              ? 'bg-amber-400/20 border-amber-400 text-white shadow-md'
                              : 'bg-white/10 border-white/20 text-slate-200 hover:bg-white/15'
                          }`}
                        >
                          <input
                            type="radio"
                            name="isPresentingPaper"
                            value="yes"
                            checked={formData.isPresentingPaper === 'yes'}
                            onChange={handleChange}
                            className="accent-amber-400 w-4 h-4"
                          />
                          <span className="text-xs sm:text-sm font-sans font-bold">
                            Yes (Author / Presenter)
                          </span>
                        </label>

                        <label
                          className={`p-4 rounded-xl border flex items-center justify-center gap-3 cursor-pointer transition-all ${
                            formData.isPresentingPaper === 'no'
                              ? 'bg-amber-400/20 border-amber-400 text-white shadow-md'
                              : 'bg-white/10 border-white/20 text-slate-200 hover:bg-white/15'
                          }`}
                        >
                          <input
                            type="radio"
                            name="isPresentingPaper"
                            value="no"
                            checked={formData.isPresentingPaper === 'no'}
                            onChange={handleChange}
                            className="accent-amber-400 w-4 h-4"
                          />
                          <span className="text-xs sm:text-sm font-sans font-bold">
                            No (Attendee / Delegate)
                          </span>
                        </label>
                      </div>

                      {formData.isPresentingPaper === 'yes' && (
                        <div className="p-4 rounded-xl bg-white/10 border border-white/15 space-y-4 mt-2">
                          <div className="space-y-1.5">
                            <label htmlFor="paperTitle" className="block text-xs font-mono font-bold uppercase tracking-wider text-slate-200">
                              Paper Title (Optional / As Submitted)
                            </label>
                            <input
                              type="text"
                              id="paperTitle"
                              name="paperTitle"
                              value={formData.paperTitle}
                              onChange={handleChange}
                              placeholder="Title of your accepted abstract / paper"
                              className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white text-xs sm:text-sm focus:outline-none focus:border-amber-400"
                            />
                          </div>

                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div className="space-y-1.5">
                              <label htmlFor="cmtPaperId" className="block text-xs font-mono font-bold uppercase tracking-wider text-slate-200">
                                Microsoft CMT Paper ID (If applicable)
                              </label>
                              <input
                                type="text"
                                id="cmtPaperId"
                                name="cmtPaperId"
                                value={formData.cmtPaperId}
                                onChange={handleChange}
                                placeholder="e.g. CMT-2027-042"
                                className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white text-xs sm:text-sm focus:outline-none focus:border-amber-400"
                              />
                            </div>

                            <div className="space-y-1.5">
                              <label htmlFor="paperTheme" className="block text-xs font-mono font-bold uppercase tracking-wider text-slate-200">
                                Allocated Sub-Theme Track
                              </label>
                              <select
                                id="paperTheme"
                                name="paperTheme"
                                value={formData.paperTheme}
                                onChange={handleChange}
                                className="w-full px-4 py-3 rounded-lg bg-[#071A33] border border-white/20 text-white text-xs sm:text-sm focus:outline-none focus:border-amber-400"
                              >
                                <option value="">Select Sub-theme</option>
                                {CONFERENCE_DATA.subThemes.map((st) => (
                                  <option key={st.id} value={st.title}>
                                    Track {st.number}: {st.title}
                                  </option>
                                ))}
                              </select>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Divider */}
                    <div className="pt-6 pb-2 border-t border-white/15">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="w-5 h-0.5 bg-amber-400" />
                        <span className="text-[11.5px] font-mono font-bold uppercase tracking-[0.2em] text-amber-300">
                          Section D &bull; Registration Category
                        </span>
                      </div>
                    </div>

                    {/* 12. Registration Category * */}
                    <div className="space-y-3">
                      <label className="block text-xs font-mono font-bold uppercase tracking-wider text-slate-200">
                        12. Registration Category <span className="text-amber-400">*</span>
                      </label>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {/* Option 1: UG / PG Student */}
                        <div
                          onClick={() => handleCategorySelect('student')}
                          className={`p-5 rounded-2xl rounded-tl-3xl rounded-br-3xl border transition-all cursor-pointer flex flex-col justify-between ${
                            formData.registrationCategory === 'student'
                              ? 'bg-amber-400/20 border-amber-400 text-white shadow-xl scale-[1.02]'
                              : 'bg-white/10 border-white/20 text-slate-200 hover:bg-white/15'
                          }`}
                        >
                          <div>
                            <div className="flex items-center justify-between mb-2">
                              <span className="text-[11px] font-mono uppercase font-black text-amber-300">
                                Option 01
                              </span>
                              <input
                                type="radio"
                                name="registrationCategory"
                                value="student"
                                checked={formData.registrationCategory === 'student'}
                                onChange={handleChange}
                                className="accent-amber-400"
                              />
                            </div>
                            <h4 className="font-heading font-black text-base text-white mb-1">
                              UG / PG Student
                            </h4>
                            <p className="text-xs text-slate-200 font-sans leading-relaxed mb-3">
                              Graduate &amp; Postgraduate Students
                            </p>
                          </div>
                          <div className="pt-3 border-t border-white/15 flex items-center justify-between">
                            <span className="text-[11px] text-slate-300 font-sans uppercase font-bold">Fee</span>
                            <span className="font-mono text-base font-black text-amber-300">₹ 750</span>
                          </div>
                        </div>

                        {/* Option 2: M.Phil / Research Scholars */}
                        <div
                          onClick={() => handleCategorySelect('scholar')}
                          className={`p-5 rounded-2xl rounded-tr-3xl rounded-bl-3xl border transition-all cursor-pointer flex flex-col justify-between ${
                            formData.registrationCategory === 'scholar'
                              ? 'bg-amber-400/20 border-amber-400 text-white shadow-xl scale-[1.02]'
                              : 'bg-white/10 border-white/20 text-slate-200 hover:bg-white/15'
                          }`}
                        >
                          <div>
                            <div className="flex items-center justify-between mb-2">
                              <span className="text-[11px] font-mono uppercase font-black text-amber-300">
                                Option 02
                              </span>
                              <input
                                type="radio"
                                name="registrationCategory"
                                value="scholar"
                                checked={formData.registrationCategory === 'scholar'}
                                onChange={handleChange}
                                className="accent-amber-400"
                              />
                            </div>
                            <h4 className="font-heading font-black text-base text-white mb-1">
                              M.Phil / Research Scholars
                            </h4>
                            <p className="text-xs text-slate-200 font-sans leading-relaxed mb-3">
                              Full-time &amp; PhD Research Scholars
                            </p>
                          </div>
                          <div className="pt-3 border-t border-white/15 flex items-center justify-between">
                            <span className="text-[11px] text-slate-300 font-sans uppercase font-bold">Fee</span>
                            <span className="font-mono text-base font-black text-amber-300">₹ 750</span>
                          </div>
                        </div>

                        {/* Option 3: Professionals / Academicians / Practitioners */}
                        <div
                          onClick={() => handleCategorySelect('professional')}
                          className={`p-5 rounded-2xl rounded-tl-3xl rounded-br-3xl border transition-all cursor-pointer flex flex-col justify-between ${
                            formData.registrationCategory === 'professional'
                              ? 'bg-amber-400/20 border-amber-400 text-white shadow-xl scale-[1.02]'
                              : 'bg-white/10 border-white/20 text-slate-200 hover:bg-white/15'
                          }`}
                        >
                          <div>
                            <div className="flex items-center justify-between mb-2">
                              <span className="text-[11px] font-mono uppercase font-black text-amber-300">
                                Option 03
                              </span>
                              <input
                                type="radio"
                                name="registrationCategory"
                                value="professional"
                                checked={formData.registrationCategory === 'professional'}
                                onChange={handleChange}
                                className="accent-amber-400"
                              />
                            </div>
                            <h4 className="font-heading font-black text-base text-white mb-1">
                              Professionals / Academicians / Practitioners
                            </h4>
                            <p className="text-xs text-slate-200 font-sans leading-relaxed mb-3">
                              Faculty, NGO &amp; CSR Delegates
                            </p>
                          </div>
                          <div className="pt-3 border-t border-white/15 flex items-center justify-between">
                            <span className="text-[11px] text-slate-300 font-sans uppercase font-bold">Fee</span>
                            <span className="font-mono text-base font-black text-amber-300">₹ 1,000 – ₹ 1,500</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Transaction Reference / UTR Number */}
                    <div className="p-5 rounded-2xl bg-white/10 border border-white/15 space-y-3">
                      <div className="flex items-center justify-between">
                        <label htmlFor="transactionRef" className="block text-xs font-mono font-bold uppercase tracking-wider text-amber-300">
                          NEFT / RTGS / UPI Transaction UTR Reference Number (Optional)
                        </label>
                        <span className="text-[10px] font-mono text-slate-300">
                          Direct Bank Transfer
                        </span>
                      </div>
                      <input
                        type="text"
                        id="transactionRef"
                        name="transactionRef"
                        value={formData.transactionRef}
                        onChange={handleChange}
                        placeholder="e.g. UTR1234567890 / SIBL-TXN-987654"
                        className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-slate-400 text-xs sm:text-sm focus:outline-none focus:border-amber-400"
                      />
                      <p className="text-[11px] text-slate-200 font-sans m-0 leading-relaxed">
                        If you have already made the bank transfer, enter your UTR number above. You can also complete bank transfer after submitting and email the receipt screenshot to <a href="mailto:dyuti@rajagiri.edu" className="text-amber-300 underline font-mono">dyuti@rajagiri.edu</a>.
                      </p>
                    </div>

                  </div>

                  {/* Submission Action Button */}
                  <div className="pt-8 mt-8 border-t border-white/15 flex flex-col sm:flex-row items-center justify-between gap-4 relative z-10">
                    <p className="text-xs text-slate-200 font-sans font-medium m-0">
                      * Next Step: You will be able to cross-check all 12 items before final confirmation.
                    </p>
                    <Button
                      variant="primary"
                      size="lg"
                      type="submit"
                      showArrow
                      className="w-full sm:w-auto shadow-xl"
                    >
                      Cross-Check &amp; Review Details
                    </Button>
                  </div>

                </div>
              </form>
            </div>

            {/* Right Column: Registration Summary Sidebar (4 Cols) */}
            <div className="lg:col-span-4 space-y-6">

              {/* 1. Category & Inclusions Card (Curved Leaf Shape) */}
              <div className="rounded-[24px] sm:rounded-[28px] rounded-tr-[48px] rounded-bl-[48px] p-7 sm:p-8 bg-gradient-to-br from-[#0a2540] via-[#123962] to-[#051424] text-white border border-white/20 shadow-2xl relative overflow-hidden">
                <span className="text-[11px] font-mono font-black uppercase tracking-[0.2em] text-amber-300 block mb-1">
                  Selected Category
                </span>
                <h3 className="font-heading text-xl text-white font-black mb-1">
                  {selectedCategory.label}
                </h3>
                <span className="inline-block px-3 py-1 rounded-full bg-amber-400 text-slate-950 font-mono text-xs font-black mb-4">
                  {selectedCategory.fee} / delegate
                </span>

                <div className="space-y-3 pt-3 border-t border-white/15 text-xs text-slate-100 font-sans font-medium">
                  <div className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-amber-300 shrink-0 mt-0.5" />
                    <span>Official Conference Kit, Folder &amp; Badge</span>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-amber-300 shrink-0 mt-0.5" />
                    <span>Verified Certificate of Presentation / Participation</span>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-amber-300 shrink-0 mt-0.5" />
                    <span>Executive Buffet Lunch &amp; Tea on 7 &amp; 8 Jan 2027</span>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-amber-300 shrink-0 mt-0.5" />
                    <span>Full Access to Plenaries &amp; 8 Technical Tracks</span>
                  </div>
                </div>
              </div>

              {/* 2. Official Bank Coordinates Card (Curved Leaf Shape) */}
              <div className="rounded-[24px] sm:rounded-[28px] rounded-tl-[48px] rounded-br-[48px] p-7 sm:p-8 bg-gradient-to-br from-[#071A33] via-[#0e2a52] to-[#040e1c] text-white border border-white/20 shadow-2xl space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-white/15">
                  <div>
                    <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-amber-300 block mb-0.5">
                      Bank Wire Gateway
                    </span>
                    <h4 className="font-heading text-base font-black text-white m-0">
                      Official RCSS Account
                    </h4>
                  </div>
                  <Building2 className="w-6 h-6 text-amber-400 shrink-0" />
                </div>

                <div className="space-y-2.5 text-xs font-sans">
                  <div>
                    <span className="text-[10px] text-slate-300 uppercase font-mono font-bold block">Beneficiary Account Name</span>
                    <strong className="text-white font-bold block">{CONFERENCE_DATA.bankDetails.accountName}</strong>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-300 uppercase font-mono font-bold block">Account Number</span>
                    <strong className="text-amber-300 font-mono font-black text-sm block tracking-wider">{CONFERENCE_DATA.bankDetails.accountNumber}</strong>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-300 uppercase font-mono font-bold block">Bank &amp; Branch</span>
                    <strong className="text-white font-bold block">{CONFERENCE_DATA.bankDetails.bank}, Kalamassery</strong>
                  </div>
                  <div>
                    <span className="text-[10px] text-amber-400 uppercase font-mono font-bold block">IFSC Code</span>
                    <strong className="text-amber-300 font-mono font-black text-sm block tracking-wider">{CONFERENCE_DATA.bankDetails.ifsc}</strong>
                  </div>
                </div>
              </div>

              {/* 3. Hospitality & Secretariat Quick Help */}
              <div className="rounded-2xl p-6 bg-white border border-slate-300 shadow-md space-y-3">
                <div className="flex items-center gap-2">
                  <Info className="w-4 h-4 text-[#071A33]" />
                  <h4 className="font-heading text-sm font-black text-[#071A33] m-0">
                    Registration Assistance
                  </h4>
                </div>
                <p className="text-xs text-slate-600 font-sans m-0 leading-relaxed">
                  Have questions regarding your category or accommodation? Connect with the secretariat desk:
                </p>
                <div className="pt-2 text-xs font-sans font-medium text-slate-800 space-y-1">
                  <p className="m-0">Phone: <strong className="font-mono">+91 484-2911 346 / 321</strong></p>
                  <p className="m-0">Email: <a href="mailto:dyuti@rajagiri.edu" className="text-blue-900 font-bold underline">dyuti@rajagiri.edu</a></p>
                </div>
              </div>

            </div>

          </div>
        )}

        {/* ── STEP 2: CROSS-CHECK & REVIEW MODAL / VIEW ── */}
        {step === 'review' && (
          <div className="max-w-4xl mx-auto space-y-8 animate-fadeIn">

            {/* Review Summary Card (Curved Leaf Shape) */}
            <div className="rounded-[28px] sm:rounded-[36px] rounded-tl-[56px] sm:rounded-tl-[72px] rounded-br-[56px] sm:rounded-br-[72px] p-8 sm:p-12 lg:p-14 bg-gradient-to-br from-[#071A33] via-[#0e2a52] to-[#040e1c] text-white border border-white/20 shadow-2xl relative overflow-hidden">
              
              {/* Subtle ambient glow */}
              <div className="absolute top-0 right-0 w-80 h-80 bg-white/5 rounded-full blur-3xl pointer-events-none" />

              {/* Header */}
              <div className="mb-8 pb-6 border-b border-white/15 relative z-10">
                <div className="flex items-center gap-2 mb-2">
                  <span className="w-5 h-0.5 bg-amber-400" />
                  <span className="text-[11.5px] font-mono font-bold uppercase tracking-[0.2em] text-amber-300">
                    Verification Protocol
                  </span>
                </div>
                <h2 className="font-heading text-2xl sm:text-3xl lg:text-4xl font-black text-white m-0">
                  Cross-Check Your Registration Details
                </h2>
                <p className="text-xs sm:text-sm text-slate-200 font-sans mt-2 leading-relaxed">
                  Cross check all details before submitting to ensure an overall smooth registration process.
                </p>
              </div>

              {/* Error in Review */}
              {formError && (
                <div className="p-4 rounded-xl bg-red-500/20 border border-red-400/50 text-red-200 text-xs sm:text-sm font-sans flex items-start gap-3 mb-6">
                  <AlertCircle className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
                  <span>{formError}</span>
                </div>
              )}

              {/* Verification Review Grid */}
              <div className="space-y-6 relative z-10 font-sans text-xs sm:text-sm">

                {/* Section 1: Participant Particulars */}
                <div className="p-6 rounded-2xl bg-white/10 border border-white/15 space-y-4">
                  <h3 className="font-mono text-xs font-black uppercase tracking-wider text-amber-300 pb-2 border-b border-white/15">
                    1. Participant &amp; Institutional Profile
                  </h3>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <span className="text-[11px] text-slate-300 block uppercase font-mono">1. Title &amp; 2. Full Name</span>
                      <strong className="text-white text-base font-bold">
                        {formData.title} {formData.name}
                      </strong>
                    </div>

                    <div>
                      <span className="text-[11px] text-slate-300 block uppercase font-mono">3. Designation</span>
                      <strong className="text-white font-bold">{formData.designation}</strong>
                    </div>

                    <div>
                      <span className="text-[11px] text-slate-300 block uppercase font-mono">4. Gender</span>
                      <strong className="text-white font-bold">{formData.gender}</strong>
                    </div>

                    <div>
                      <span className="text-[11px] text-slate-300 block uppercase font-mono">5. Representing Organization</span>
                      <strong className="text-white font-bold">{formData.organization}</strong>
                    </div>

                    <div className="sm:col-span-2">
                      <span className="text-[11px] text-slate-300 block uppercase font-mono">6. Discipline</span>
                      <strong className="text-white font-bold">{formData.discipline}</strong>
                    </div>
                  </div>
                </div>

                {/* Section 2: Communication Coordinates */}
                <div className="p-6 rounded-2xl bg-white/10 border border-white/15 space-y-4">
                  <h3 className="font-mono text-xs font-black uppercase tracking-wider text-amber-300 pb-2 border-b border-white/15">
                    2. Address &amp; Communication Details
                  </h3>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="sm:col-span-2">
                      <span className="text-[11px] text-slate-300 block uppercase font-mono">7. Address for Communication</span>
                      <strong className="text-white font-medium block leading-relaxed">{formData.address}</strong>
                      <span className="text-xs text-amber-300 font-mono font-bold mt-1 block">PIN: {formData.pincode}</span>
                    </div>

                    <div>
                      <span className="text-[11px] text-slate-300 block uppercase font-mono">8. Contact Number</span>
                      <strong className="text-white font-mono font-bold">{formData.phone}</strong>
                    </div>

                    <div>
                      <span className="text-[11px] text-slate-300 block uppercase font-mono">Email Address</span>
                      <strong className="text-white font-mono font-bold">{formData.email}</strong>
                    </div>
                  </div>
                </div>

                {/* Section 3: Conference Logistics & Category */}
                <div className="p-6 rounded-2xl bg-white/10 border border-white/15 space-y-4">
                  <h3 className="font-mono text-xs font-black uppercase tracking-wider text-amber-300 pb-2 border-b border-white/15">
                    3. Conference Preferences &amp; Category
                  </h3>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <span className="text-[11px] text-slate-300 block uppercase font-mono">9. Food Preference</span>
                      <strong className="text-white font-bold capitalize">
                        {formData.foodPreference}
                        {formData.foodDetails && ` (${formData.foodDetails})`}
                      </strong>
                    </div>

                    <div>
                      <span className="text-[11px] text-slate-300 block uppercase font-mono">10. Accommodation Required?</span>
                      <strong className="text-white font-bold capitalize">
                        {formData.requireAccommodation === 'yes' ? 'Yes (Moderate Accommodation provided)' : 'No (Arranging Own Stay)'}
                      </strong>
                    </div>

                    <div>
                      <span className="text-[11px] text-slate-300 block uppercase font-mono">11. Presenting Paper?</span>
                      <strong className="text-white font-bold">
                        {formData.isPresentingPaper === 'yes' ? 'Yes (Author / Presenter)' : 'No (Delegate)'}
                      </strong>
                      {formData.paperTitle && (
                        <p className="text-xs text-slate-200 mt-1 italic m-0">&ldquo;{formData.paperTitle}&rdquo;</p>
                      )}
                    </div>

                    <div>
                      <span className="text-[11px] text-slate-300 block uppercase font-mono">12. Registration Category</span>
                      <strong className="text-amber-300 font-bold block">{selectedCategory.label}</strong>
                      <span className="text-xs text-white font-mono font-black">{selectedCategory.fee}</span>
                    </div>

                    {formData.transactionRef && (
                      <div className="sm:col-span-2 pt-2 border-t border-white/10">
                        <span className="text-[11px] text-slate-300 block uppercase font-mono">Transaction Reference / UTR</span>
                        <strong className="text-amber-300 font-mono font-bold">{formData.transactionRef}</strong>
                      </div>
                    )}
                  </div>
                </div>

                {/* Verification Checkbox */}
                <div className="p-5 rounded-2xl bg-amber-400/10 border border-amber-400/40">
                  <label className="flex items-start gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      name="agreeToTerms"
                      checked={formData.agreeToTerms}
                      onChange={handleChange}
                      className="accent-amber-400 w-5 h-5 mt-0.5 shrink-0"
                    />
                    <span className="text-xs sm:text-sm text-slate-100 font-sans leading-relaxed font-medium">
                      I have cross-checked all the details entered above and confirm that they are accurate and complete for registration at DYUTI 2027.
                    </span>
                  </label>
                </div>

              </div>

              {/* Action Buttons */}
              <div className="pt-8 mt-8 border-t border-white/15 flex flex-col sm:flex-row items-center justify-between gap-4 relative z-10">
                <Button
                  variant="white"
                  size="md"
                  onClick={() => {
                    setStep('form');
                    setFormError(null);
                  }}
                  icon={<ArrowLeft className="w-4 h-4" />}
                >
                  Edit / Modify Details
                </Button>

                <Button
                  variant="primary"
                  size="lg"
                  onClick={handleFinalSubmit}
                  showArrow
                  className="w-full sm:w-auto shadow-xl"
                >
                  Confirm &amp; Submit Registration
                </Button>
              </div>

            </div>

          </div>
        )}

        {/* ── STEP 3: REGISTRATION SUCCESS SCREEN ── */}
        {step === 'success' && (
          <div className="max-w-3xl mx-auto space-y-8 animate-fadeIn">

            {/* Success Card (Curved Leaf Shape) */}
            <div className="rounded-[28px] sm:rounded-[36px] rounded-tl-[56px] sm:rounded-tl-[72px] rounded-br-[56px] sm:rounded-br-[72px] p-8 sm:p-12 lg:p-14 bg-gradient-to-br from-[#071A33] via-[#0e2a52] to-[#040e1c] text-white border border-white/20 shadow-2xl text-center relative overflow-hidden">
              
              {/* Subtle ambient glow */}
              <div className="absolute top-0 right-0 w-80 h-80 bg-white/5 rounded-full blur-3xl pointer-events-none" />

              {/* Success Icon */}
              <div className="w-20 h-20 rounded-full bg-emerald-500/20 border-2 border-emerald-400 flex items-center justify-center mx-auto mb-6 shadow-xl relative z-10">
                <CheckCircle2 className="w-10 h-10 text-emerald-400" />
              </div>

              <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-white/15 border border-white/25 text-amber-300 font-mono text-xs font-black uppercase tracking-widest mb-4">
                <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                Registration Acknowledged
              </span>

              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-heading font-black text-white mb-3">
                Thank You, {formData.title} {formData.name}!
              </h2>

              <p className="text-xs sm:text-sm text-slate-100 font-sans max-w-xl mx-auto leading-relaxed mb-6 font-medium">
                Your delegate registration request for <strong className="text-white font-black">DYUTI 2027</strong> has been recorded successfully.
              </p>

              {/* Reference ID Banner */}
              <div className="p-5 rounded-2xl bg-white/10 border border-white/20 max-w-md mx-auto mb-8 shadow-inner">
                <span className="text-[11px] text-slate-300 uppercase font-mono block mb-1">
                  Your Registration Reference ID
                </span>
                <span className="font-mono text-xl sm:text-2xl font-black text-amber-300 tracking-wider">
                  {registrationId}
                </span>
              </div>

              {/* Summary Details Box */}
              <div className="p-6 rounded-2xl bg-white/5 border border-white/10 text-left font-sans text-xs sm:text-sm space-y-3 mb-8 max-w-xl mx-auto">
                <div className="flex justify-between pb-2 border-b border-white/10">
                  <span className="text-slate-300">Category:</span>
                  <strong className="text-white">{selectedCategory.label}</strong>
                </div>
                <div className="flex justify-between pb-2 border-b border-white/10">
                  <span className="text-slate-300">Institution:</span>
                  <strong className="text-white text-right">{formData.organization}</strong>
                </div>
                <div className="flex justify-between pb-2 border-b border-white/10">
                  <span className="text-slate-300">Contact Number:</span>
                  <strong className="text-white font-mono">{formData.phone}</strong>
                </div>
                <div className="flex justify-between pb-2 border-b border-white/10">
                  <span className="text-slate-300">Email:</span>
                  <strong className="text-white font-mono">{formData.email}</strong>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-300">Accommodation:</span>
                  <strong className="text-white">{formData.requireAccommodation === 'yes' ? 'Requested' : 'Self-arranged'}</strong>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center justify-center gap-4 relative z-10">
                <Button
                  variant="primary"
                  size="md"
                  onClick={handlePrint}
                  icon={<Printer className="w-4 h-4" />}
                >
                  Print / Save Registration Summary
                </Button>

                <Button
                  variant="white"
                  size="md"
                  asLink
                  href="/"
                >
                  Return to Homepage
                </Button>
              </div>

            </div>

          </div>
        )}

      </div>
    </div>
  );
};

export default Registration;
