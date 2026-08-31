import React, { useState } from 'react';
import { PageHeader } from '@/components/ui/PageHeader';
import { FormField } from '@/components/ui/FormField';
import { Button } from '@/components/ui/Button';
import { CONFERENCE_DATA } from '@/data/conference';
import { apiService } from '@/lib/api';

export const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [feedback, setFeedback] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setFeedback(null);

    const res = await apiService.submitContactMessage(formData);
    setIsSubmitting(false);

    if (res.success) {
      setFeedback({ type: 'success', text: res.message });
      setFormData({ name: '', email: '', phone: '', message: '' });
    } else {
      setFeedback({ type: 'error', text: res.message });
    }
  };

  return (
    <div className="pt-8 sm:pt-10 lg:pt-12 pb-20 sm:pb-28 lg:pb-32 bg-[#FDFBF7] text-slate-800 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">

        {/* ── 07 / EDITORIAL PAGE HEADER ── */}
        <PageHeader
          number="07"
          category="CONTACT"
          metaRight="Secretariat Inquiries &middot; Rajagiri Valley &amp; Hill Campus"
          eyebrow="Conference Secretariat"
          title={
            <>
              Contact the
              <span className="block font-heading text-[#071A33] text-[1.85rem] sm:text-[2.5rem] font-bold mt-1">
                DYUTI 2027 Secretariat
              </span>
            </>
          }
          subtitle="Reach out directly to the conference convenors for inquiries regarding paper submissions, registration guidelines, or institutional collaborations."
        />

        {/* ── TWO-COLUMN SECRETARIAT & FORM COMPOSITION ── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start mb-20 lg:mb-28">

          {/* Left Column: Secretariat Information (5 cols) */}
          <div className="lg:col-span-5 space-y-6">

            {/* Conference Coordinators */}
            <div className="rounded-[20px] p-8 sm:p-10 bg-white border border-slate-200 shadow-sm">
              <div className="mb-6 pb-4 border-b border-slate-200">
                <span className="text-[11px] font-mono font-bold uppercase tracking-[0.18em] text-[#071A33] block mb-1">
                  Coordinators
                </span>
                <h3 className="font-heading text-2xl sm:text-3xl text-slate-900 font-bold m-0">
                  Conference Secretariat
                </h3>
              </div>

              <div className="space-y-4">
                {CONFERENCE_DATA.contacts.map((contact, idx) => (
                  <div
                    key={idx}
                    className="border-l-2 border-[#071A33] pl-4 py-2.5 bg-slate-50 rounded-r-[14px]"
                  >
                    <p className="font-sans font-bold text-[#071A33] text-sm m-0">
                      {contact.name}
                    </p>
                    <p className="text-xs text-slate-550 m-0 mt-0.5 font-sans">
                      {contact.role} &middot; {contact.department}
                    </p>
                    {contact.email && (
                      <a
                        href={`mailto:${contact.email}`}
                        className="text-xs text-[#071A33] font-mono font-semibold hover:underline mt-1.5 inline-block"
                      >
                        {contact.email}
                      </a>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Mailing & Direct Venue Address */}
            <div className="rounded-[20px] p-8 sm:p-10 bg-white border border-slate-200 shadow-sm">
              <div className="mb-4">
                <span className="text-[11px] font-mono font-bold uppercase tracking-[0.18em] text-[#071A33] block mb-1">
                  Location &amp; Address
                </span>
                <h4 className="font-heading text-xl sm:text-2xl text-slate-900 font-bold m-0">
                  Mailing &amp; Venue Address
                </h4>
              </div>

              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed m-0 font-sans font-normal mb-5">
                <strong className="text-[#071A33] block mb-1 font-bold">{CONFERENCE_DATA.hostInstitution}</strong>
                Rajagiri Valley Campus: Chittethukara, Kakkanad, Kochi 682039, Kerala, India<br />
                Hill Campus: South Kalamassery, Kalamassery, Kochi 683104, Kerala, India
              </p>

              <div className="space-y-2.5 pt-4 border-t border-slate-200 text-xs text-slate-500 font-sans">
                <div>
                  <span>Phone: <strong className="text-[#071A33] font-mono font-semibold">+91 484-2911 346, 2911 321</strong></span>
                </div>
                <div>
                  <span>Email: <a href="mailto:dyuti@rajagiri.edu" className="text-[#071A33] font-mono font-semibold hover:underline">dyuti@rajagiri.edu</a></span>
                </div>
              </div>
            </div>

          </div>

          {/* Right Column: Inquiry Form (7 cols) */}
          <div className="lg:col-span-7">
            <div className="rounded-[20px] p-8 sm:p-12 lg:p-14 bg-white border border-slate-200 shadow-sm">
              <div className="flex items-center gap-2 mb-2">
                <span className="w-5 h-0.5 bg-[#071A33]" />
                <span className="text-[11.5px] font-sans font-bold uppercase tracking-[0.18em] text-[#071A33]">
                  Direct Inquiry Desk
                </span>
              </div>

              <h3 className="font-heading text-[1.85rem] sm:text-[2.35rem] text-[#071A33] font-extrabold mb-2 leading-snug">
                Send an Inquiry Message
              </h3>

              <p className="text-xs sm:text-sm text-slate-500 mb-8 font-sans font-normal leading-relaxed">
                Submit your query below and our organizing committee will respond promptly within 24 to 48 hours.
              </p>

              {/* Feedback Alert */}
              {feedback && (
                <div
                  className={`p-4 rounded-[14px] mb-6 text-sm ${feedback.type === 'success'
                      ? 'bg-emerald-50 text-emerald-900 border border-emerald-300'
                      : 'bg-red-50 text-red-900 border border-red-300'
                    }`}
                  role="alert"
                >
                  <span className="font-sans text-xs sm:text-sm leading-relaxed">{feedback.text}</span>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6 font-sans">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <FormField label="Full Name" id="name" required>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="e.g. Dr. Jane Smith"
                      className="w-full px-4 py-3.5 rounded-[12px] bg-slate-50 border border-slate-200 text-slate-800 placeholder-[#9CA3AF] text-sm focus:outline-none focus:border-[#071A33] focus:ring-2 focus:ring-[#071A33]/15 transition-all"
                    />
                  </FormField>

                  <FormField label="Email Address" id="email" required>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="name@university.edu"
                      className="w-full px-4 py-3.5 rounded-[12px] bg-slate-50 border border-slate-200 text-slate-800 placeholder-[#9CA3AF] text-sm focus:outline-none focus:border-[#071A33] focus:ring-2 focus:ring-[#071A33]/15 transition-all"
                    />
                  </FormField>
                </div>

                <FormField label="Mobile / WhatsApp Number (Optional)" id="phone">
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="+91 98765 43210"
                    className="w-full px-4 py-3.5 rounded-[12px] bg-slate-50 border border-slate-200 text-slate-800 placeholder-[#9CA3AF] text-sm focus:outline-none focus:border-[#071A33] focus:ring-2 focus:ring-[#071A33]/15 transition-all"
                  />
                </FormField>

                <FormField label="Your Inquiry Message" id="message" required>
                  <textarea
                    id="message"
                    name="message"
                    rows={4}
                    required
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Specify your inquiry regarding abstract submission, conference themes, registration fee, or travel accommodations..."
                    className="w-full px-4 py-3.5 rounded-[12px] bg-slate-50 border border-slate-200 text-slate-800 placeholder-[#9CA3AF] text-sm focus:outline-none focus:border-[#071A33] focus:ring-2 focus:ring-[#071A33]/15 transition-all"
                  />
                </FormField>

                <div>
                  <Button
                    type="submit"
                    variant="navy"
                    size="lg"
                    disabled={isSubmitting}
                    className="bg-[#071A33] hover:bg-slate-900 text-white font-bold h-12 flex items-center shadow-md"
                  >
                    {isSubmitting ? 'Sending Message...' : 'Submit Inquiry'}
                  </Button>
                </div>
              </form>
            </div>
          </div>

        </div>

        {/* ── GOOGLE MAP CONTAINER ── */}
        <div className="rounded-[20px] overflow-hidden border border-slate-200 shadow-sm bg-white mb-12">
          <div className="p-6 sm:p-8 bg-[#071A33] text-white flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <span className="text-[11px] font-mono font-bold text-slate-350 uppercase tracking-widest block mb-1">
                Campus Location Map
              </span>
              <h4 className="font-heading text-2xl text-white m-0 font-bold">
                Rajagiri College of Social Sciences (Autonomous)
              </h4>
            </div>
            <span className="text-xs text-white/80 font-sans">
              Kalamassery &amp; Rajagiri Valley Campuses
            </span>
          </div>
          <div className="w-full h-80 sm:h-96 bg-slate-50">
            <iframe
              title="Rajagiri Campus Map"
              src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d694.3646809247406!2d76.35574209792348!3d9.993886412091518!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0xffe403fa83187691!2sRajagiri%20College%20Of%20Social%20Sciences!5e0!3m2!1sen!2sin!4v1660152795214!5m2!1sen!2sin"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen={false}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>

      </div>
    </div>
  );
};
