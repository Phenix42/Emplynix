import React from 'react';
import { MapPin, Clock, Award, IndianRupee } from 'lucide-react';

const JobDetails = ({ job, onBack ,onApply }) => {
  if (!job)
    return <p className="text-center mt-40 text-lg text-gray-600">Job not found.</p>;

  return (
    <section className="pt-28 pb-20 bg-white min-h-screen">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Row */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
          <div>
            <h1 className="text-4xl font-bold text-gray-900">{job.title}</h1>
            <p className="text-lg text-gray-700 font-medium mt-1">{job.company}</p>
          </div>
          <button
            onClick={() => onApply(job)}
            className="mt-4 sm:mt-0 bg-blue-600 hover:bg-blue-700 text-white py-2 px-6 rounded-lg font-semibold transition-all duration-200"
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
            <span>{job.experience}</span>
          </div>
        </div>

        {/* Skills Required */}
        {job.skills?.length > 0 && (
          <div className="mb-10">
            <h3 className="text-xl font-semibold text-gray-800 mb-3">Skills Required</h3>
            <div className="flex flex-wrap gap-3">
              {job.skills.map((skill, index) => (
                <span
                  key={index}
                  className="bg-blue-100 text-blue-800 text-sm font-medium px-4 py-1.5 rounded-full"
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
          className="bg-gray-100 hover:bg-gray-200 text-gray-800 py-2 px-6 rounded-lg font-medium transition duration-150"
        >
          ← Back to Jobs
        </button>
      </div>
    </section>
  );
};

export default JobDetails;
