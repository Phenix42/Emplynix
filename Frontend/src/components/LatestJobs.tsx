import React, { useState, useEffect } from 'react';
import { MapPin, Clock, Award } from 'lucide-react';
import { Job } from '../types/Job';
import { mapToFullJob } from './utils';


interface LatestJobsProps {
  setCurrentPage: (page: string) => void;
  setSelectedJob: (job: Job) => void;
  searchFilters: { keyword: string; location: string }; // ✅ new
}

const LatestJobs: React.FC<LatestJobsProps> = ({ setCurrentPage, setSelectedJob, searchFilters }) => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [visibleCount, setVisibleCount] = useState(4);

  const API_URL = import.meta.env.VITE_API_URL;

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

  // ✅ Apply filters
  const filteredJobs = jobs.filter((job) => {
    const matchesKeyword = searchFilters.keyword
      ? job.title.toLowerCase().includes(searchFilters.keyword.toLowerCase()) ||
        job.company.toLowerCase().includes(searchFilters.keyword.toLowerCase())
      : true;

    const matchesLocation = searchFilters.location
      ? job.location.toLowerCase().includes(searchFilters.location.toLowerCase())
      : true;

    return matchesKeyword && matchesLocation;
  });

  const getRelativeTime = (dateString: string): string => {
    const now = new Date();
    const postedDate = new Date(dateString);
    const diffMs = now.getTime() - postedDate.getTime();
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

    if (diffDays < 1) {
      return 'Today';
    } else if (diffDays === 1) {
      return '1 day ago';
    } else if (diffDays < 7) {
      return `${diffDays} days ago`;
    } else if (diffDays < 30) {
      const weeks = Math.floor(diffDays / 7);
      return weeks === 1 ? '1 week ago' : `${weeks} weeks ago`;
    } else {
      const months = Math.floor(diffDays / 30);
      return months === 1 ? '1 month ago' : `${months} months ago`;
    }
  };

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
        ) : filteredJobs.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-600">No jobs found matching your search.</p>
          </div>
        ) : (
          <>
            <div className="space-y-4 mb-8">
              {filteredJobs.slice(0, visibleCount).map((job) => (
                <div
                  key={job._id}
                  className="bg-white rounded-lg p-6 shadow-sm hover:shadow-md transition-all duration-200 border border-gray-100"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">{job.title}</h3>

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
                          <span>{job.experience} yrs</span>
                        </div>
                      </div>

                      <p className="text-xs text-gray-400 mt-2"> Posted  {getRelativeTime(job.createdAt)}</p>
                    </div>

                    <div className="ml-6">
                      <button
                        onClick={() => {
                          setSelectedJob(mapToFullJob(job));
                          setCurrentPage('jobDetails');
                        }}
                        className="bg-[#3e94b3] hover:bg-[#7fbadd] text-white px-6 py-2 rounded-lg font-medium transition-all duration-200"
                      >
                        Apply
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {visibleCount < filteredJobs.length && (
              <div className="text-center">
                <button
                  onClick={() => setVisibleCount((prev) => prev + 2)}
                  className="bg-[#3e94b3] hover:bg-[#7fbadd] text-white px-6 py-2 rounded-lg font-medium transition-all duration-200"
                >
                  More
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
};

export default LatestJobs;
