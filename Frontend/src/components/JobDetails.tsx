import React from 'react';
import { MapPin, Clock, Award } from 'lucide-react';

interface Job {
  _id: string;
  title: string;
  company: string;
  location: string;
  type: string;
  salary: string;
  experience: string;
  description: string;
  requirements: string[];
  benefits: string[];
  status: string;
  createdAt: string;
}


interface JobDetailsProps {
  job: Job | null;
  onBack: () => void;
  onApply: (job: Job) => void;
}

const JobDetails: React.FC<JobDetailsProps> = ({ job, onBack, onApply }) => {
  if (!job) {
    return <p className="text-center mt-40 text-lg text-gray-600">Job not found.</p>;
  }

  return (
    <section className="pt-28 pb-20 bg-white min-h-screen">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
          <div>
            <h1 className="text-4xl font-bold text-gray-900">{job.title}</h1>
          </div>
          <button
            onClick={() => onApply(job)}
            className="mt-4 sm:mt-0 bg-[#3e94b3] hover:bg-[#7fbadd] text-white py-2 px-6 rounded-lg font-semibold transition-all duration-200"
          >
            Apply Now
          </button>
        </div>

        {/* Meta Info */}
        <div className="flex flex-wrap gap-6 text-gray-700 text-base mb-6">
          <div className="flex items-center gap-2">
            <MapPin className="h-5 w-5 text-blue-600" />
            <span>{job.location}</span>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="h-5 w-5 text-green-600" />
            <span>{job.type}</span>
          </div>
          <div className="flex items-center gap-2">
            <Award className="h-5 w-5 text-yellow-500" />
            <span>{job.experience} yrs</span>
          </div>
        </div>

        {/* ✅ Skills Section */}
        {job.requirements && job.requirements.length > 0 && (
          <div className="mb-10">
            <h3 className="text-xl font-semibold text-gray-800 mb-3">Skills Required</h3>
            <div className="flex flex-wrap gap-3">
              {job.requirements.map((skill, index) => (
                <span
                  key={index}
                  className="bg-[#3e94b3] text-white text-sm font-medium px-4 py-1.5 rounded-full"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Description */}
        <div className="mb-12 space-y-4">
          <h3 className="text-2xl font-semibold text-gray-800">Job Description</h3>
          <p className="text-gray-700 leading-relaxed">{job.description}</p>
        </div>

        {/* Back Button */}
        <button
          onClick={onBack}
          className="bg-[#3e94b3] hover:bg-[#7fbadd] text-white py-2 px-6 rounded-lg font-medium transition duration-150"
        >
          ← Back to Jobs
        </button>
      </div>
    </section>
  );
};

export default JobDetails;
