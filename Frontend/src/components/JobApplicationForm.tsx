import React, { useState } from 'react';
import {
  User,
  Mail,
  Phone,
  Clock,
  Briefcase,
  DollarSign,
  Award,
  FileText,
  ArrowLeft,
} from 'lucide-react';
import { Job } from '../types/Job'; // ✅ import central Job type

interface JobApplicationFormProps {
  job: Job | null; // ✅ allow null (safe for first render)
  onBack: () => void;
}

const JobApplicationForm: React.FC<JobApplicationFormProps> = ({ job, onBack }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    contact: '',
    noticePeriod: '',
    experience: '',
    currentCTC: '',
    expectedCTC: '',
    qualification: '',
    resume: null as File | null,
  });
const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5001/api";

  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleResumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, resume: e.target.files?.[0] || null }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!job) {
      setError("No job selected to apply");
      return;
    }

    setLoading(true);
    setError(null);

    const formDataToSend = new FormData();
    formDataToSend.append('name', formData.name);
    formDataToSend.append('email', formData.email);
    formDataToSend.append('contact', formData.contact);
    formDataToSend.append('noticePeriod', formData.noticePeriod);
    formDataToSend.append('experience', formData.experience);
    formDataToSend.append('currentCTC', formData.currentCTC);
    formDataToSend.append('expectedCTC', formData.expectedCTC);
    formDataToSend.append('qualification', formData.qualification);
    formDataToSend.append('jobId', job._id.toString()); // ✅ ensure string type
    if (formData.resume) {
      formDataToSend.append('resume', formData.resume);
    }

    try {
      const response = await fetch(`${API_URL}/candidates/apply`, {
        method: 'POST',
        body: formDataToSend,
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || 'Failed to submit application');
      }

      console.log('Application submitted:', data);
      alert('Application submitted successfully!');
      onBack();
    } catch (err: any) {
      console.error('Error submitting application:', err);
      setError(err.message || 'An error occurred while submitting the application');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="min-h-screen bg-gray-50 py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="bg-gradient-to-r bg-[#3e94b3] px-8 py-6">
            <h2 className="text-3xl font-bold text-white text-center">
              {job ? `Apply for: ${job.title}` : "No Job Selected"}
            </h2>
            <p className="text-blue-100 text-center mt-2">
              Please fill out the form below to apply
            </p>
          </div>

          {job ? (
            <form onSubmit={handleSubmit} className="p-8">
              {error && (
                <div className="mb-4 p-4 bg-red-100 text-red-800 rounded-lg">
                  {error}
                </div>
              )}
              <div className="grid md:grid-cols-2 gap-6">
                <FormInput
                  icon={<User className="h-5 w-5 text-gray-400" />}
                  label="Full Name *"
                  name="name"
                  type="text"
                  placeholder="Enter your name"
                  value={formData.name}
                  onChange={handleChange}
                />
                <FormInput
                  icon={<Mail className="h-5 w-5 text-gray-400" />}
                  label="Email ID *"
                  name="email"
                  type="email"
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={handleChange}
                />
                <FormInput
                  icon={<Phone className="h-5 w-5 text-gray-400" />}
                  label="Contact Number *"
                  name="contact"
                  type="tel"
                  placeholder="Enter contact number"
                  value={formData.contact}
                  onChange={handleChange}
                />
                <FormInput
                  icon={<Clock className="h-5 w-5 text-gray-400" />}
                  label="Notice Period (in days) *"
                  name="noticePeriod"
                  type="number"
                  placeholder="e.g., 30"
                  value={formData.noticePeriod}
                  onChange={handleChange}
                />
                <FormInput
                  icon={<Briefcase className="h-5 w-5 text-gray-400" />}
                  label="Experience (in years) *"
                  name="experience"
                  type="number"
                  placeholder="e.g., 3"
                  value={formData.experience}
                  onChange={handleChange}
                />
                <FormInput
                  icon={<DollarSign className="h-5 w-5 text-gray-400" />}
                  label="Current CTC *"
                  name="currentCTC"
                  type="text"
                  placeholder="e.g., ₹5 LPA"
                  value={formData.currentCTC}
                  onChange={handleChange}
                />
                <FormInput
                  icon={<DollarSign className="h-5 w-5 text-gray-400" />}
                  label="Expected CTC *"
                  name="expectedCTC"
                  type="text"
                  placeholder="e.g., ₹7 LPA"
                  value={formData.expectedCTC}
                  onChange={handleChange}
                />
                <FormInput
                  icon={<Award className="h-5 w-5 text-gray-400" />}
                  label="Highest Qualification *"
                  name="qualification"
                  type="text"
                  placeholder="e.g., B.Tech, MBA"
                  value={formData.qualification}
                  onChange={handleChange}
                />
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">
                    Upload Resume *
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FileText className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type="file"
                      accept=".pdf,.doc,.docx"
                      required
                      onChange={handleResumeChange}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white"
                    />
                  </div>
                </div>
              </div>
              <div className="mt-8 text-center">
                <button
                  type="submit"
                  disabled={loading}
                  className={`bg-gradient-to-r bg-[#3e94b3] hover:bg-[#7fbadd] text-white px-12 py-4 rounded-lg font-semibold text-lg transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-1 ${
                    loading ? 'opacity-50 cursor-not-allowed' : ''
                  }`}
                >
                  {loading ? 'Submitting...' : 'Submit Application'}
                </button>
              </div>
            </form>
          ) : (
            <div className="p-8 text-center text-gray-500">
              Please go back and select a job before applying.
            </div>
          )}
        </div>
        <div className="mt-6 text-center">
          <button
            onClick={onBack}
            className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium"
          >
            <ArrowLeft className="h-5 w-5 mr-1" />
            Back to Job Details
          </button>
        </div>
      </div>
    </section>
  );
};

const FormInput = ({
  icon,
  label,
  name,
  type,
  placeholder,
  value,
  onChange,
}: {
  icon: React.ReactNode;
  label: string;
  name: string;
  type: string;
  placeholder: string;
  value: string | number;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) => (
  <div>
    <label className="block text-sm font-semibold text-gray-900 mb-2">
      {label}
    </label>
    <div className="relative">
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        {icon}
      </div>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        required
        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
        placeholder={placeholder}
      />
    </div>
  </div>
);

export default JobApplicationForm;
