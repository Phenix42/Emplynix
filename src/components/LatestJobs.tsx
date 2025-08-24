import React, { useState, useEffect } from 'react';
import { MapPin, Clock, Award } from 'lucide-react';

interface Job {
  id: number;
  title: string;
  company: string;
  location: string;
  type: string;
  experience: string;
  posted: string;
}

const LatestJobs: React.FC = () => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5001/api';

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        setLoading(true);
        const response = await fetch(`${API_URL}/jobs`);
        if (!response.ok) throw new Error('Failed to fetch jobs');
        const data: Job[] = await response.json();
        setJobs(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred while fetching jobs');
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, [API_URL]);

  return (
    <section className="py-16 bg-gray-50" id="jobs">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900">Latest Jobs</h2>
        </div>

        {loading ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#3e94b3] mx-auto"></div>
            <p className="text-gray-600 mt-4">Loading jobs...</p>
          </div>
        ) : error ? (
          <div className="text-center py-12 text-red-600">
            <p>{error}</p>
            <button
              onClick={() => window.location.reload()}
              className="mt-4 bg-[#3e94b3] hover:bg-[#7fbadd] text-white px-4 py-2 rounded-lg"
            >
              Retry
            </button>
          </div>
        ) : jobs.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-600">No jobs available at the moment.</p>
          </div>
        ) : (
          <div className="space-y-4 mb-8">
            {jobs.map((job) => (
              <div
                key={job.id}
                className="bg-white rounded-lg p-6 shadow-sm hover:shadow-md transition-all duration-200 border border-gray-100"
              >
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                      {job.title}
                    </h3>

                    <div className="flex flex-wrap gap-4 text-sm text-gray-500">
                      <div className="flex items-center space-x-1">
                        <MapPin className="h-4 w-4" />
                        <span>{job.location}</span>
                      </div>

                      <div className="flex items-center space-x-1">
                        <Clock className="h-4 w-4" />
                        <span>{job.type}</span>
                      </div>

                      <div className="flex items-center space-x-1">
                        <Award className="h-4 w-4" />
                        <span>{job.experience}</span>
                      </div>
                    </div>

                    <p className="text-xs text-gray-400 mt-2">Posted {job.posted}</p>
                  </div>

                  <div className="ml-6">
                    <button className="bg-[#3e94b3] hover:bg-[#7fbadd] text-white px-6 py-2 rounded-lg font-medium transition-all duration-200">
                      Apply
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default LatestJobs;