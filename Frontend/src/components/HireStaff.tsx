import React, { useState } from 'react';
import { ArrowLeft, Building, User, Phone, Mail, MapPin, Briefcase, Award, Hash } from 'lucide-react';

interface HireStaffProps {
  onBack: () => void;
}

const HireStaff: React.FC<HireStaffProps> = ({ onBack }) => {
  const [formData, setFormData] = useState({
    companyName: '',
    skill: '',
    mobileNumber: '',
    emailId: '',
    contactPersonName: '',
    location: '',
    noOfPosition: '',
    experience: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    // Handle form submission here
    alert('Form submitted successfully!');
  };

  const skillOptions = [
    'Software Development',
    'Web Development',
    'Mobile Development',
    'Data Science',
    'Machine Learning',
    'DevOps',
    'UI/UX Design',
    'Digital Marketing',
    'Sales',
    'Customer Service',
    'Project Management',
    'Business Analysis',
    'Quality Assurance',
    'Database Administration',
    'Network Administration',
    'Cybersecurity',
    'Content Writing',
    'Graphic Design',
    'Accounting',
    'Human Resources'
  ];

  const experienceOptions = [
    'Fresher (0 years)',
    '1-2 years',
    '3-5 years',
    '6-10 years',
    '10+ years'
  ];

  return (
    <section className="min-h-screen bg-gray-50 py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      

        {/* Form Container */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r bg-[#3e94b3] px-8 py-6">
            <h1 className="text-3xl font-bold text-white text-center">Hire Staff</h1>
            <p className="text-blue-100 text-center mt-2">Find the perfect talent for your organization</p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="p-8">
            <div className="grid md:grid-cols-2 gap-6">
              {/* Company Name */}
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">
                  Name of the Company *
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Building className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    name="companyName"
                    value={formData.companyName}
                    onChange={handleInputChange}
                    required
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                    placeholder="Enter company name"
                  />
                </div>
              </div>

              {/* Skill */}
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">
                  Skill
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Award className="h-5 w-5 text-gray-400" />
                  </div>
                   <input
                    type="text"
                    name="skill"
                    value={formData.skill}
                    onChange={handleInputChange}
                    required
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                    placeholder="Enter skills required"
                  />
                </div>
              </div>

              {/* Mobile Number */}
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">
                  Mobile Number *
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Phone className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="tel"
                    name="mobileNumber"
                    value={formData.mobileNumber}
                    onChange={handleInputChange}
                    required
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                    placeholder="Enter mobile number"
                  />
                </div>
              </div>

              {/* Email ID */}
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">
                  Email Id *
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Mail className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="email"
                    name="emailId"
                    value={formData.emailId}
                    onChange={handleInputChange}
                    required
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                    placeholder="Enter email address"
                  />
                </div>
              </div>

              {/* Contact Person Name */}
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">
                  Contact Person Name *
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <User className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    name="contactPersonName"
                    value={formData.contactPersonName}
                    onChange={handleInputChange}
                    required
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                    placeholder="Enter contact person name"
                  />
                </div>
              </div>

              {/* Location */}
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">
                  Location
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <MapPin className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    name="location"
                    value={formData.location}
                    onChange={handleInputChange}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                    placeholder="Enter job location"
                  />
                </div>
              </div>

              {/* No of Position */}
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">
                  No of Position
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Hash className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="number"
                    name="noOfPosition"
                    value={formData.noOfPosition}
                    onChange={handleInputChange}
                    min="1"
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                    placeholder="Number of positions"
                  />
                </div>
              </div>

              {/* Experience */}
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">
                  Experience
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Briefcase className="h-5 w-5 text-gray-400" />
                  </div>
                  <select
                    name="experience"
                    value={formData.experience}
                    onChange={handleInputChange}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 appearance-none bg-white"
                  >
                    <option value="">Select experience level</option>
                    {experienceOptions.map((exp, index) => (
                      <option key={index} value={exp}>{exp}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <div className="mt-8 text-center">
              <button
                type="submit"
                className="bg-gradient-to-r bg-[#3e94b3] hover:bg-[#7fbadd] text-white px-12 py-4 rounded-lg font-semibold text-lg transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
              >
                Submit
              </button>
            </div>
          </form>
        </div>

        {/* Additional Info */}
        <div className="mt-8 text-center">
          <p className="text-gray-600">
            For any helps Contact us at{' '}
            <a href="mailto:hr@emplynix.com" className="text-blue-600 hover:text-blue-700 font-medium">
              hr@emplynix.com
            </a>{' '}
            or call{' '}
            <a href="tel:+91-8125942585" className="text-blue-600 hover:text-blue-700 font-medium">
              +91-8125942585
            </a>
          </p>
        </div>
      </div>
    </section>
  );
};

export default HireStaff;