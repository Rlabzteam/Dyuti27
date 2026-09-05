import React, { useState, useEffect } from 'react';
import {
  CheckCircle2,
  AlertCircle,
  ArrowLeft,
  Building2,
  Printer,
  Sparkles,
  CreditCard,
  Lock,
  Loader2,
  ShieldCheck,
  XCircle,
  RefreshCw,
  HelpCircle,
  PhoneCall
} from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { CONFERENCE_DATA } from '@/data/conference';
import { initiateVortexPayment } from '@/services/paymentService';

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
  paymentMode: 'online' | 'bank_transfer';
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
  paymentMode: 'online',
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
    fee: '₹ 1,000',
    amount: 1000,
    desc: 'For faculty members, professors, development practitioners, NGO heads, and CSR delegates',
    badge: 'Faculty / Delegate Pass',
  },
};

export const Registration: React.FC = () => {
  const [formData, setFormData] = useState<RegistrationFormData>(INITIAL_FORM_DATA);
  const [step, setStep] = useState<'form' | 'review' | 'success' | 'failure'>('form');
  const [formError, setFormError] = useState<string | null>(null);
  const [registrationId, setRegistrationId] = useState<string>('');
  const [isProcessingPayment, setIsProcessingPayment] = useState<boolean>(false);
  const [paymentResult, setPaymentResult] = useState<{
    orderId?: string;
    amount?: number;
    mode?: string;
  }>({});

  // Check URL query parameters for return redirect from payment gateway / Razorpay
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const paymentStatus = urlParams.get('payment_status') || urlParams.get('status');

    if (paymentStatus === 'success') {
      const orderId =
        urlParams.get('order_id') ||
        urlParams.get('payment_id') ||
        urlParams.get('razorpay_payment_id') ||
        `VORTEX-${Date.now().toString().slice(-6)}`;
      const name = urlParams.get('name') || 'Delegate';
      const email = urlParams.get('email') || '';
      const amount = Number(urlParams.get('amount')) || 750;

      setFormData((prev) => ({
        ...prev,
        name: name,
        email: email,
        paymentMode: 'online',
      }));

      setRegistrationId(`DYUTI27-ONLINE-${Math.floor(10000 + Math.random() * 90000)}`);
      setPaymentResult({
        orderId,
        amount,
        mode: 'Vortexx / Razorpay Gateway',
      });
      setStep('success');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (
      paymentStatus === 'failed' ||
      paymentStatus === 'failure' ||
      paymentStatus === 'cancelled' ||
      paymentStatus === 'error'
    ) {
      const errorMessage =
        urlParams.get('message') ||
        urlParams.get('error') ||
        'The online payment transaction was cancelled or could not be completed by your bank / payment gateway.';
      const orderId = urlParams.get('order_id') || urlParams.get('payment_id') || '';
      const amount = Number(urlParams.get('amount')) || 750;

      setPaymentResult({
        orderId,
        amount,
        mode: 'Vortexx / Razorpay Gateway',
      });
      setFormError(errorMessage);
      setStep('failure');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, []);

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

  const handleFinalSubmit = async () => {
    if (!formData.agreeToTerms) {
      setFormError('Please check the verification declaration box to confirm your details.');
      return;
    }

    setFormError(null);

    if (formData.paymentMode === 'online') {
      setIsProcessingPayment(true);
      try {
        const orderRequest = {
          customerName: `${formData.title} ${formData.name}`.trim(),
          customerEmail: formData.email.trim(),
          customerMobile: formData.phone.trim(),
          amount: selectedCategory.amount,
          currency: 'INR',
          redirectUrl: `${window.location.origin}/register?payment_status=success&name=${encodeURIComponent(
            `${formData.title} ${formData.name}`
          )}&email=${encodeURIComponent(formData.email)}&amount=${selectedCategory.amount}`,
        };

        const result = await initiateVortexPayment(orderRequest);

        if (result.status === 'success' && result.data?.payment_url) {
          // Direct user to the payment gateway checkout page
          window.location.href = result.data.payment_url;
          return;
        } else {
          setFormError(result.message || 'Payment initialization failed. Please try again or use direct bank transfer.');
          setIsProcessingPayment(false);
        }
      } catch (err: any) {
        setFormError(err?.message || 'Error communicating with the payment gateway.');
        setIsProcessingPayment(false);
      }
    } else {
      // Direct Bank Transfer (NEFT/RTGS)
      const randomCode = Math.floor(10000 + Math.random() * 90000);
      const generatedId = `DYUTI27-REG-${randomCode}`;
      setRegistrationId(generatedId);
      setPaymentResult({
        amount: selectedCategory.amount,
        mode: 'Direct Bank Transfer (NEFT/RTGS)',
      });
      setStep('success');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
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
        <div className="mb-12 max-w-4xl mx-auto">
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
          <div className="max-w-6xl mx-auto space-y-8 animate-fadeIn">
            <form onSubmit={handleProceedToReview} className="space-y-8">

              {/* Form Card */}
              <div className="rounded-[28px] sm:rounded-[36px] rounded-tl-[56px] sm:rounded-tl-[72px] rounded-br-[56px] sm:rounded-br-[72px] p-6 sm:p-10 lg:p-14 bg-gradient-to-br from-[#071A33] via-[#0e2a52] to-[#040e1c] text-white border border-white/20 shadow-2xl relative overflow-hidden">
                
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
                  <h2 className="font-heading text-2xl sm:text-3xl lg:text-4xl font-black text-white m-0">
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
                  <div className="grid grid-cols-1 sm:grid-cols-12 gap-5 items-start">
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
                        className="w-full h-12 px-4 rounded-xl bg-white/10 border border-white/20 text-white text-sm focus:outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-400/20 transition-all cursor-pointer"
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
                        className="w-full h-12 px-4 rounded-xl bg-white/10 border border-white/20 text-white placeholder-slate-400 text-sm focus:outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-400/20 transition-all"
                      />
                      <span className="text-[11px] text-amber-300/90 font-sans block pt-0.5">
                        (As you want to appear in the Conference Certificate and other documents)
                      </span>
                    </div>
                  </div>

                  {/* 3. Designation & 4. Gender */}
                  <div className="grid grid-cols-1 sm:grid-cols-12 gap-5 items-start">
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
                        className="w-full h-12 px-4 rounded-xl bg-white/10 border border-white/20 text-white placeholder-slate-400 text-sm focus:outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-400/20 transition-all"
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
                        className="w-full h-12 px-4 rounded-xl bg-white/10 border border-white/20 text-white text-sm focus:outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-400/20 transition-all cursor-pointer"
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
                      className="w-full h-12 px-4 rounded-xl bg-white/10 border border-white/20 text-white placeholder-slate-400 text-sm focus:outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-400/20 transition-all"
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
                      className="w-full h-12 px-4 rounded-xl bg-white/10 border border-white/20 text-white placeholder-slate-400 text-sm focus:outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-400/20 transition-all"
                    />
                    <span className="text-[11px] text-slate-300 font-sans block pt-0.5">
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
                      className="w-full p-4 rounded-xl bg-white/10 border border-white/20 text-white placeholder-slate-400 text-sm focus:outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-400/20 transition-all resize-none"
                    />
                  </div>

                  {/* Pincode & Contact Number */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 items-start">
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
                        className="w-full h-12 px-4 rounded-xl bg-white/10 border border-white/20 text-white placeholder-slate-400 text-sm focus:outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-400/20 transition-all"
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
                        className="w-full h-12 px-4 rounded-xl bg-white/10 border border-white/20 text-white placeholder-slate-400 text-sm focus:outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-400/20 transition-all"
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
                      className="w-full h-12 px-4 rounded-xl bg-white/10 border border-white/20 text-white placeholder-slate-400 text-sm focus:outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-400/20 transition-all"
                    />
                    <span className="text-[11px] text-slate-300 font-sans block pt-0.5">
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
                      <span className="text-[11px] font-mono text-amber-300 bg-white/10 px-2.5 py-0.5 rounded-full font-bold">
                        Required Question
                      </span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                      {FOOD_OPTIONS.map((food) => (
                        <label
                          key={food.id}
                          className={`p-4 rounded-xl border flex items-center gap-3.5 cursor-pointer transition-all ${
                            formData.foodPreference === food.id
                              ? 'bg-amber-400/20 border-amber-400 text-white shadow-md ring-1 ring-amber-400/40'
                              : 'bg-white/10 border-white/20 text-slate-200 hover:bg-white/15'
                          }`}
                        >
                          <input
                            type="radio"
                            name="foodPreference"
                            value={food.id}
                            checked={formData.foodPreference === food.id}
                            onChange={handleChange}
                            className="accent-amber-400 w-4 h-4 shrink-0"
                          />
                          <span className="text-xs sm:text-sm font-sans font-bold leading-normal">
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
                        className="w-full h-12 px-4 rounded-xl bg-white/10 border border-amber-400/60 text-white text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-amber-400/20 mt-2"
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

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <label
                        className={`p-4 rounded-xl border flex items-center justify-center gap-3 cursor-pointer transition-all ${
                          formData.requireAccommodation === 'yes'
                            ? 'bg-amber-400/20 border-amber-400 text-white shadow-md ring-1 ring-amber-400/40'
                            : 'bg-white/10 border-white/20 text-slate-200 hover:bg-white/15'
                        }`}
                      >
                        <input
                          type="radio"
                          name="requireAccommodation"
                          value="yes"
                          checked={formData.requireAccommodation === 'yes'}
                          onChange={handleChange}
                          className="accent-amber-400 w-4 h-4 shrink-0"
                        />
                        <span className="text-xs sm:text-sm font-sans font-bold text-center">
                          Yes, I require accommodation
                        </span>
                      </label>

                      <label
                        className={`p-4 rounded-xl border flex items-center justify-center gap-3 cursor-pointer transition-all ${
                          formData.requireAccommodation === 'no'
                            ? 'bg-amber-400/20 border-amber-400 text-white shadow-md ring-1 ring-amber-400/40'
                            : 'bg-white/10 border-white/20 text-slate-200 hover:bg-white/15'
                        }`}
                      >
                        <input
                          type="radio"
                          name="requireAccommodation"
                          value="no"
                          checked={formData.requireAccommodation === 'no'}
                          onChange={handleChange}
                          className="accent-amber-400 w-4 h-4 shrink-0"
                        />
                        <span className="text-xs sm:text-sm font-sans font-bold text-center">
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

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <label
                        className={`p-4 rounded-xl border flex items-center justify-center gap-3 cursor-pointer transition-all ${
                          formData.isPresentingPaper === 'yes'
                            ? 'bg-amber-400/20 border-amber-400 text-white shadow-md ring-1 ring-amber-400/40'
                            : 'bg-white/10 border-white/20 text-slate-200 hover:bg-white/15'
                        }`}
                      >
                        <input
                          type="radio"
                          name="isPresentingPaper"
                          value="yes"
                          checked={formData.isPresentingPaper === 'yes'}
                          onChange={handleChange}
                          className="accent-amber-400 w-4 h-4 shrink-0"
                        />
                        <span className="text-xs sm:text-sm font-sans font-bold text-center">
                          Yes (Author / Presenter)
                        </span>
                      </label>

                      <label
                        className={`p-4 rounded-xl border flex items-center justify-center gap-3 cursor-pointer transition-all ${
                          formData.isPresentingPaper === 'no'
                            ? 'bg-amber-400/20 border-amber-400 text-white shadow-md ring-1 ring-amber-400/40'
                            : 'bg-white/10 border-white/20 text-slate-200 hover:bg-white/15'
                        }`}
                      >
                        <input
                          type="radio"
                          name="isPresentingPaper"
                          value="no"
                          checked={formData.isPresentingPaper === 'no'}
                          onChange={handleChange}
                          className="accent-amber-400 w-4 h-4 shrink-0"
                        />
                        <span className="text-xs sm:text-sm font-sans font-bold text-center">
                          No (Attendee / Delegate)
                        </span>
                      </label>
                    </div>

                    {formData.isPresentingPaper === 'yes' && (
                      <div className="p-5 rounded-2xl bg-white/10 border border-white/15 space-y-4 mt-2 animate-fadeIn">
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
                            className="w-full h-11 px-4 rounded-lg bg-white/10 border border-white/20 text-white text-xs sm:text-sm focus:outline-none focus:border-amber-400"
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
                              className="w-full h-11 px-4 rounded-lg bg-white/10 border border-white/20 text-white text-xs sm:text-sm focus:outline-none focus:border-amber-400"
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
                              className="w-full h-11 px-3 rounded-lg bg-[#071A33] border border-white/20 text-white text-xs sm:text-sm focus:outline-none focus:border-amber-400"
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

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-stretch">
                      {/* Option 1: UG / PG Student */}
                      <div
                        onClick={() => handleCategorySelect('student')}
                        className={`p-5 rounded-2xl rounded-tl-3xl rounded-br-3xl border transition-all cursor-pointer flex flex-col justify-between ${
                          formData.registrationCategory === 'student'
                            ? 'bg-amber-400/20 border-amber-400 text-white shadow-xl scale-[1.02] ring-1 ring-amber-400/50'
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
                            ? 'bg-amber-400/20 border-amber-400 text-white shadow-xl scale-[1.02] ring-1 ring-amber-400/50'
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
                            ? 'bg-amber-400/20 border-amber-400 text-white shadow-xl scale-[1.02] ring-1 ring-amber-400/50'
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
                          <span className="font-mono text-base font-black text-amber-300">₹ 1,000</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Divider */}
                  <div className="pt-6 pb-2 border-t border-white/15">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="w-5 h-0.5 bg-amber-400" />
                      <span className="text-[11.5px] font-mono font-bold uppercase tracking-[0.2em] text-amber-300">
                        Section E &bull; Payment Method &amp; Gateway
                      </span>
                    </div>
                  </div>

                  {/* Payment Mode Choice */}
                  <div className="space-y-4">
                    <label className="block text-xs font-mono font-bold uppercase tracking-wider text-slate-200">
                      Choose Payment Method <span className="text-amber-400">*</span>
                    </label>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-stretch">
                      {/* Option 1: Online Payment Gateway */}
                      <div
                        onClick={() => setFormData((prev) => ({ ...prev, paymentMode: 'online' }))}
                        className={`p-5 rounded-2xl rounded-tl-3xl rounded-br-3xl border transition-all cursor-pointer flex flex-col justify-between ${
                          formData.paymentMode === 'online'
                            ? 'bg-amber-400/20 border-amber-400 text-white shadow-xl ring-2 ring-amber-400/40'
                            : 'bg-white/10 border-white/20 text-slate-200 hover:bg-white/15'
                        }`}
                      >
                        <div className="space-y-2">
                          <div className="flex items-center justify-between">
                            <span className="inline-flex items-center gap-1.5 text-[11px] font-mono uppercase font-black text-amber-300">
                              <CreditCard className="w-3.5 h-3.5" />
                              Instant Online
                            </span>
                            <input
                              type="radio"
                              name="paymentMode"
                              value="online"
                              checked={formData.paymentMode === 'online'}
                              onChange={handleChange}
                              className="accent-amber-400"
                            />
                          </div>
                          <h4 className="font-heading font-black text-base text-white">
                            Online Payment Gateway
                          </h4>
                          <p className="text-xs text-slate-200 font-sans leading-relaxed">
                            Pay securely via UPI, Credit/Debit Cards, or NetBanking with instant registration confirmation.
                          </p>
                        </div>
                        <div className="pt-3 mt-3 border-t border-white/15 flex items-center gap-1.5 text-[11px] font-mono text-amber-300">
                          <ShieldCheck className="w-3.5 h-3.5" />
                          <span>Vortexx 256-Bit SSL Encrypted</span>
                        </div>
                      </div>

                      {/* Option 2: Direct Bank Transfer */}
                      <div
                        onClick={() => setFormData((prev) => ({ ...prev, paymentMode: 'bank_transfer' }))}
                        className={`p-5 rounded-2xl rounded-tr-3xl rounded-bl-3xl border transition-all cursor-pointer flex flex-col justify-between ${
                          formData.paymentMode === 'bank_transfer'
                            ? 'bg-amber-400/20 border-amber-400 text-white shadow-xl ring-2 ring-amber-400/40'
                            : 'bg-white/10 border-white/20 text-slate-200 hover:bg-white/15'
                        }`}
                      >
                        <div className="space-y-2">
                          <div className="flex items-center justify-between">
                            <span className="inline-flex items-center gap-1.5 text-[11px] font-mono uppercase font-black text-amber-300">
                              <Building2 className="w-3.5 h-3.5" />
                              Bank Wire
                            </span>
                            <input
                              type="radio"
                              name="paymentMode"
                              value="bank_transfer"
                              checked={formData.paymentMode === 'bank_transfer'}
                              onChange={handleChange}
                              className="accent-amber-400"
                            />
                          </div>
                          <h4 className="font-heading font-black text-base text-white">
                            NEFT / RTGS / IMPS Transfer
                          </h4>
                          <p className="text-xs text-slate-200 font-sans leading-relaxed">
                            Direct electronic wire transfer to Rajagiri College South Indian Bank account.
                          </p>
                        </div>
                        <div className="pt-3 mt-3 border-t border-white/15 text-[11px] font-mono text-slate-300">
                          <span>Requires UTR Reference Number</span>
                        </div>
                      </div>
                    </div>

                    {/* Transaction Reference / UTR Number (shown if bank transfer or optional) */}
                    {formData.paymentMode === 'bank_transfer' && (
                      <div className="p-5 rounded-2xl bg-white/10 border border-amber-400/30 space-y-3 mt-4 animate-fadeIn">
                        <div className="flex items-center justify-between">
                          <label htmlFor="transactionRef" className="block text-xs font-mono font-bold uppercase tracking-wider text-amber-300">
                            NEFT / RTGS / UPI Transaction UTR Reference Number
                          </label>
                          <span className="text-[10px] font-mono text-amber-300">
                            Bank Wire Record
                          </span>
                        </div>
                        <input
                          type="text"
                          id="transactionRef"
                          name="transactionRef"
                          value={formData.transactionRef}
                          onChange={handleChange}
                          placeholder="e.g. UTR1234567890 / SIBL-TXN-987654"
                          className="w-full h-12 px-4 rounded-xl bg-white/10 border border-white/20 text-white placeholder-slate-400 text-xs sm:text-sm focus:outline-none focus:border-amber-400"
                        />
                        <p className="text-[11px] text-slate-200 font-sans m-0 leading-relaxed">
                          Enter your bank UTR number if already paid. You may also transfer after submitting and email the receipt screenshot to <a href="mailto:dyuti@rajagiri.edu" className="text-amber-300 underline font-mono">dyuti@rajagiri.edu</a>.
                        </p>
                      </div>
                    )}
                  </div>

                </div>

                {/* Submission Action Button */}
                <div className="pt-8 mt-8 border-t border-white/15 flex flex-col sm:flex-row items-center justify-between gap-4 relative z-10">
                  <p className="text-xs text-slate-200 font-sans font-medium m-0">
                    * Next Step: You will be able to cross-check all details before final confirmation.
                  </p>
                  <Button
                    variant="primary"
                    size="lg"
                    type="submit"
                    showArrow
                    className="w-full sm:w-auto shadow-xl"
                  >
                    {formData.paymentMode === 'online'
                      ? `Review & Pay ₹ ${selectedCategory.amount}`
                      : 'Review & Confirm Details'}
                  </Button>
                </div>

              </div>
            </form>
          </div>
        )}

        {/* ── STEP 2: CROSS-CHECK & REVIEW MODAL / VIEW ── */}
        {step === 'review' && (
          <div className="max-w-6xl mx-auto space-y-8 animate-fadeIn">

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

                {/* Section 3: Conference Logistics, Category & Payment Mode */}
                <div className="p-6 rounded-2xl bg-white/10 border border-white/15 space-y-4">
                  <h3 className="font-mono text-xs font-black uppercase tracking-wider text-amber-300 pb-2 border-b border-white/15">
                    3. Conference Preferences &amp; Payment Gateway
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
                      <span className="text-[11px] text-slate-300 block uppercase font-mono">12. Registration Category &amp; Fee</span>
                      <strong className="text-amber-300 font-bold block">{selectedCategory.label}</strong>
                      <span className="text-xs text-white font-mono font-black">{selectedCategory.fee}</span>
                    </div>

                    <div className="sm:col-span-2 pt-3 border-t border-white/10">
                      <span className="text-[11px] text-slate-300 block uppercase font-mono mb-1">
                        Selected Payment Mode
                      </span>
                      <div className="flex items-center gap-2">
                        {formData.paymentMode === 'online' ? (
                          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-400/50 text-emerald-300 font-mono text-xs font-bold">
                            <CreditCard className="w-3.5 h-3.5" />
                            Online Payment Gateway (Instant Confirmation)
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-400/20 border border-amber-400/50 text-amber-300 font-mono text-xs font-bold">
                            <Building2 className="w-3.5 h-3.5" />
                            Direct Bank Wire Transfer (NEFT / RTGS)
                          </span>
                        )}
                      </div>
                    </div>

                    {formData.paymentMode === 'bank_transfer' && formData.transactionRef && (
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
                  disabled={isProcessingPayment}
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
                  disabled={isProcessingPayment}
                  onClick={handleFinalSubmit}
                  showArrow={!isProcessingPayment}
                  className="w-full sm:w-auto shadow-xl"
                >
                  {isProcessingPayment ? (
                    <span className="inline-flex items-center gap-2">
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Redirecting to Payment Gateway...
                    </span>
                  ) : formData.paymentMode === 'online' ? (
                    <span className="inline-flex items-center gap-2">
                      <Lock className="w-4 h-4" />
                      Register &amp; Pay ₹ {selectedCategory.amount} Now
                    </span>
                  ) : (
                    'Confirm &amp; Submit Registration'
                  )}
                </Button>
              </div>

            </div>

          </div>
        )}

        {/* ── STEP 3: REGISTRATION SUCCESS SCREEN ── */}
        {step === 'success' && (
          <div className="max-w-4xl mx-auto space-y-8 animate-fadeIn">

            {/* Success Card (Curved Leaf Shape) */}
            <div className="rounded-[28px] sm:rounded-[36px] rounded-tl-[56px] sm:rounded-tl-[72px] rounded-br-[56px] sm:rounded-br-[72px] p-8 sm:p-12 lg:p-14 bg-gradient-to-br from-[#071A33] via-[#0e2a52] to-[#040e1c] text-white border border-white/20 shadow-2xl text-center relative overflow-hidden">
              
              {/* Subtle ambient glow */}
              <div className="absolute top-0 right-0 w-80 h-80 bg-white/5 rounded-full blur-3xl pointer-events-none" />

              {/* Success Icon */}
              <div className="w-20 h-20 rounded-full bg-emerald-500/20 border-2 border-emerald-400 flex items-center justify-center mx-auto mb-6 shadow-xl relative z-10">
                <CheckCircle2 className="w-10 h-10 text-emerald-400" />
              </div>

              <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-emerald-500/20 border border-emerald-400/50 text-emerald-300 font-mono text-xs font-black uppercase tracking-widest mb-4">
                <Sparkles className="w-3.5 h-3.5 text-emerald-300" />
                {formData.paymentMode === 'online' || paymentResult.orderId
                  ? 'Payment Verified & Registration Confirmed'
                  : 'Registration Recorded (Bank Wire Pending Verification)'}
              </span>

              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-heading font-black text-white mb-3">
                Thank You, {formData.title} {formData.name}!
              </h2>

              <p className="text-xs sm:text-sm text-slate-100 font-sans max-w-xl mx-auto leading-relaxed mb-6 font-medium">
                Your delegate registration request for <strong className="text-white font-black">DYUTI 2027</strong> has been acknowledged and recorded successfully.
              </p>

              {/* Reference ID & Order Banner */}
              <div className="p-6 rounded-2xl bg-white/10 border border-white/20 max-w-md mx-auto mb-8 shadow-inner space-y-2">
                <div>
                  <span className="text-[11px] text-slate-300 uppercase font-mono block mb-1">
                    Registration Reference ID
                  </span>
                  <span className="font-mono text-xl sm:text-2xl font-black text-amber-300 tracking-wider block">
                    {registrationId}
                  </span>
                </div>
                {paymentResult.orderId && (
                  <div className="pt-2 border-t border-white/15">
                    <span className="text-[10px] text-slate-300 uppercase font-mono block">
                      Gateway Order ID
                    </span>
                    <span className="font-mono text-sm font-bold text-emerald-300">
                      {paymentResult.orderId}
                    </span>
                  </div>
                )}
              </div>

              {/* Summary Details Box */}
              <div className="p-6 rounded-2xl bg-white/5 border border-white/10 text-left font-sans text-xs sm:text-sm space-y-3 mb-8 max-w-xl mx-auto">
                <div className="flex justify-between pb-2 border-b border-white/10">
                  <span className="text-slate-300">Category:</span>
                  <strong className="text-white">{selectedCategory.label}</strong>
                </div>
                <div className="flex justify-between pb-2 border-b border-white/10">
                  <span className="text-slate-300">Amount:</span>
                  <strong className="text-amber-300 font-mono font-bold">
                    ₹ {paymentResult.amount || selectedCategory.amount}
                  </strong>
                </div>
                <div className="flex justify-between pb-2 border-b border-white/10">
                  <span className="text-slate-300">Payment Status:</span>
                  <strong className="text-emerald-300">
                    {formData.paymentMode === 'online' || paymentResult.orderId
                      ? 'Completed via Vortexx Gateway'
                      : 'Bank Wire Transfer'}
                  </strong>
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

        {/* ── STEP 4: PAYMENT FAILURE / CANCELLED SCREEN ── */}
        {step === 'failure' && (
          <div className="max-w-4xl mx-auto space-y-8 animate-fadeIn">

            {/* Failure Card (Curved Leaf Shape) */}
            <div className="rounded-[28px] sm:rounded-[36px] rounded-tl-[56px] sm:rounded-tl-[72px] rounded-br-[56px] sm:rounded-br-[72px] p-8 sm:p-12 lg:p-14 bg-gradient-to-br from-[#071A33] via-[#0e2a52] to-[#040e1c] text-white border border-red-500/30 shadow-2xl text-center relative overflow-hidden">
              
              {/* Subtle ambient glow */}
              <div className="absolute top-0 right-0 w-80 h-80 bg-red-500/5 rounded-full blur-3xl pointer-events-none" />

              {/* Failure Icon */}
              <div className="w-20 h-20 rounded-full bg-red-500/20 border-2 border-red-400 flex items-center justify-center mx-auto mb-6 shadow-xl relative z-10">
                <XCircle className="w-10 h-10 text-red-400" />
              </div>

              <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-red-500/20 border border-red-400/50 text-red-300 font-mono text-xs font-black uppercase tracking-widest mb-4">
                <AlertCircle className="w-3.5 h-3.5 text-red-300" />
                Payment Transaction Incomplete
              </span>

              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-heading font-black text-white mb-3">
                Payment Was Cancelled or Failed
              </h2>

              <p className="text-xs sm:text-sm text-slate-200 font-sans max-w-xl mx-auto leading-relaxed mb-6 font-medium">
                We could not complete your online transaction with Razorpay. Your delegate registration has not been finalized yet.
              </p>

              {/* Error Details Box */}
              <div className="p-5 rounded-2xl bg-red-500/10 border border-red-400/30 text-red-200 text-xs sm:text-sm font-sans max-w-xl mx-auto mb-8 text-left space-y-2">
                <div className="flex items-start gap-2.5">
                  <AlertCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
                  <div>
                    <strong className="block text-red-300 font-bold mb-0.5">Gateway Notice:</strong>
                    <span>{formError || 'The payment session was cancelled or could not be authenticated by the issuing bank.'}</span>
                  </div>
                </div>
              </div>

              {/* Helpful Resolution Guidelines */}
              <div className="p-6 rounded-2xl bg-white/5 border border-white/10 text-left font-sans text-xs sm:text-sm space-y-3 mb-8 max-w-xl mx-auto">
                <h4 className="font-mono text-xs font-black uppercase tracking-wider text-amber-300 flex items-center gap-2 pb-2 border-b border-white/10">
                  <HelpCircle className="w-4 h-4 text-amber-400" />
                  What Should You Do Next?
                </h4>
                <ul className="space-y-2.5 text-slate-200">
                  <li className="flex items-start gap-2.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-400 mt-1.5 shrink-0" />
                    <span><strong>Money Deducted?</strong> If amount was debited from your bank/UPI, Razorpay and your bank will automatically process a full reversal within 2&ndash;3 business days.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-400 mt-1.5 shrink-0" />
                    <span><strong>Retry Online Payment:</strong> You can re-attempt using another card, UPI ID, or NetBanking without re-entering your details.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-400 mt-1.5 shrink-0" />
                    <span><strong>Direct Bank Transfer:</strong> You can alternatively transfer the fee directly to Rajagiri College South Indian Bank account.</span>
                  </li>
                </ul>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center justify-center gap-4 relative z-10">
                <Button
                  variant="primary"
                  size="md"
                  onClick={() => {
                    setFormError(null);
                    setStep('review');
                  }}
                  icon={<RefreshCw className="w-4 h-4" />}
                >
                  Retry Payment (₹ {selectedCategory.amount})
                </Button>

                <Button
                  variant="white"
                  size="md"
                  onClick={() => {
                    setFormData((prev) => ({ ...prev, paymentMode: 'bank_transfer' }));
                    setFormError(null);
                    setStep('review');
                  }}
                  icon={<Building2 className="w-4 h-4" />}
                >
                  Pay via Direct Bank Transfer
                </Button>

                <Button
                  variant="white"
                  size="md"
                  onClick={() => {
                    setFormError(null);
                    setStep('form');
                  }}
                  icon={<ArrowLeft className="w-4 h-4" />}
                >
                  Edit Registration Details
                </Button>
              </div>

              {/* Support Contact Footer */}
              <div className="mt-8 pt-6 border-t border-white/10 flex items-center justify-center gap-2 text-[11px] font-mono text-slate-300">
                <PhoneCall className="w-3.5 h-3.5 text-amber-400" />
                <span>Need assistance? Contact Secretariat at <a href="mailto:dyuti@rajagiri.edu" className="text-amber-300 underline">dyuti@rajagiri.edu</a></span>
              </div>

            </div>

          </div>
        )}

      </div>
    </div>
  );
};

export default Registration;
