import React, { useState, useRef, ChangeEvent, FormEvent } from 'react';
import { Send } from 'lucide-react';
import bgImage from '../Asset/Background.jpeg';

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
}

const Contact: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });
const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5001/api";
  const [status, setStatus] = useState<string>('');
  const [showSuccessModal, setShowSuccessModal] = useState<boolean>(false);
  const [errorBanner, setErrorBanner] = useState<string>('');

  const errorRef = useRef<HTMLDivElement | null>(null);
  const modalRef = useRef<HTMLDivElement | null>(null);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus('Sending...');
    setErrorBanner('');

    try {
      const res = await fetch(`${API_URL}/contact`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      const data = await res.json();

      if (res.ok) {
        setStatus('');
        setFormData({
          firstName: '',
          lastName: '',
          email: '',
          phone: '',
          subject: '',
          message: ''
        });
        setShowSuccessModal(true);

        setTimeout(() => {
          modalRef.current?.scrollIntoView({ behavior: 'smooth' });
        }, 100);

        setTimeout(() => setShowSuccessModal(false), 3000);
      } else {
        setStatus('');
        setErrorBanner(data.error || 'Something went wrong. Try again later.');
        setTimeout(() => {
          errorRef.current?.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      }
    } catch (err) {
      console.error(err);
      setStatus('');
      setErrorBanner('Something went wrong. Try again later.');
      setTimeout(() => {
        errorRef.current?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    }
  };

  return (
    <section className="relative py-16 overflow-hidden" id="contact">
      {/* Background */}
      <div
        className="absolute inset-0 z-0 bg-cover bg-center filter blur-sm brightness-50 scale-100"
        style={{ backgroundImage: `url(${bgImage})` }}
      ></div>
      <div className="absolute inset-0 bg-black opacity-30"></div>

      {/* Main container */}
      <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-300 mb-6">Contact Us</h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Ready to find your next great hire or dream job? Get in touch with our team of staffing experts.
            We're here to help you succeed.
          </p>
        </div>

        {/* Contact form container */}
        <div className="flex justify-center">
          <div className="bg-[#fcf2e3] rounded-lg shadow-md p-8 w-full max-w-2xl">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Send us a Message</h2>

            {/* ❌ Error Banner */}
            {errorBanner && (
              <div
                ref={errorRef}
                className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-6"
                role="alert"
              >
                <strong className="font-bold">Oops! </strong>
                <span className="block sm:inline">{errorBanner}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">First Name *</label>
                  <input
                    type="text"
                    name="firstName"
                    required
                    value={formData.firstName}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3e94b3]"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Last Name *</label>
                  <input
                    type="text"
                    name="lastName"
                    required
                    value={formData.lastName}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3e94b3]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Email Address *</label>
                <input
                  type="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3e94b3]"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3e94b3]"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Subject *</label>
                <select
                  name="subject"
                  required
                  value={formData.subject}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3e94b3]"
                >
                  <option value="">Select a subject</option>
                  <option value="I'm looking for a job">I'm looking for a job</option>
                  <option value="I need to hire talent">I need to hire talent</option>
                  <option value="Partnership opportunities">Partnership opportunities</option>
                  <option value="General inquiry">General inquiry</option>
                  <option value="Support">Support</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Message *</label>
                <textarea
                  name="message"
                  rows={6}
                  required
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3e94b3] resize-vertical"
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full bg-[#3e94b3] hover:bg-[#7fbadd] text-white px-8 py-4 rounded-lg font-semibold flex items-center justify-center space-x-2 transition-all duration-200 shadow-md hover:shadow-lg"
              >
                <Send className="h-5 w-5" />
                <span>{status === 'Sending...' ? 'Sending...' : 'Send Message'}</span>
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* ✅ Success Modal */}
      {showSuccessModal && (
        <div
          ref={modalRef}
          className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50"
        >
          <div className="bg-white rounded-lg shadow-lg p-8 flex flex-col items-center justify-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
              <svg
                className="w-8 h-8 text-green-600"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h2 className="text-xl font-semibold text-green-700">Message Sent Successfully!</h2>
          </div>
        </div>
      )}
    </section>
  );
};

export default Contact;
