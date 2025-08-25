import React, { useState, useEffect } from 'react';
import { Search, MapPin, Clock, Award } from 'lucide-react';

interface Job {
  id: string | number;
  title: string;
  location: string;
  type: string;
  experience: string;
  posted: string;
  createdAt: string; // Added to fix the error
}

interface JobsProps {
  onJobClick: (job: Job) => void;
}

const Jobs: React.FC<JobsProps> = ({ onJobClick }) => {
  const [allJobs, setAllJobs] = useState<Job[]>([]);
  const [filteredJobs, setFilteredJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const [searchKeyword, setSearchKeyword] = useState<string>('');
  const [searchLocation, setSearchLocation] = useState<string>('');

  const [visibleCount, setVisibleCount] = useState<number>(4); // 👈 initial visible jobs

  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5001/api';

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        setLoading(true);
        const response = await fetch(`${API_URL}/jobs`);
        if (!response.ok) throw new Error('Failed to fetch jobs');
        const data: Job[] = await response.json();
        setAllJobs(data);
        setFilteredJobs(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred while fetching jobs');
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, [API_URL]);

  const handleSearch = (): void => {
    const keyword = searchKeyword.toLowerCase();
    const location = searchLocation.toLowerCase();

    const results = allJobs.filter((job) => {
      const matchesKeyword = keyword
        ? job.title.toLowerCase().includes(keyword) ||
          job.type.toLowerCase().includes(keyword) ||
          job.experience.toLowerCase().includes(keyword)
        : true;

      const matchesLocation = location
        ? job.location.toLowerCase().includes(location)
        : true;

      return matchesKeyword && matchesLocation;
    });

    setFilteredJobs(results);
    setVisibleCount(4); // 👈 reset visible count after search
  };

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
    <section
      className="py-20 min-h-screen bg-gradient-to-br from-[#e0f2fe] via-[#f0f9ff] to-[#f8fafc]"
      id="jobs"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Search Section */}
        <div className="bg-white/90 backdrop-blur rounded-3xl p-10 shadow-xl mb-12 border border-blue-100">
          <h2 className="text-3xl font-extrabold text-gray-900 text-center mb-8 tracking-tight">
            <span className="bg-gradient-to-r from-[#3e94b3] to-[#7fbadd] bg-clip-text text-transparent">
              Find Your Dream Job
            </span>
          </h2>
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <input
                type="text"
                placeholder="Keyword (e.g. Developer, Designer)"
                value={searchKeyword}
                onChange={(e) => setSearchKeyword(e.target.value)}
                onBlur={handleSearch}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3e94b3] shadow-sm placeholder-gray-400"
              />
            </div>
            <div className="flex-1">
              <input
                type="text"
                placeholder="Location "
                value={searchLocation}
                onChange={(e) => setSearchLocation(e.target.value)}
                onBlur={handleSearch}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3e94b3] shadow-sm placeholder-gray-400"
              />
            </div>
            <button
              onClick={handleSearch}
              className="bg-[#3e94b3] hover:bg-[#7fbadd] text-white px-10 py-3 rounded-xl font-semibold flex items-center justify-center space-x-2 transition-all duration-200 shadow-lg hover:scale-105 md:w-auto"
            >
              <Search className="h-5 w-5" />
              <span>Search</span>
            </button>
          </div>
        </div>

        {/* Jobs List */}
        {loading ? (
          <div className="text-center py-16">
            <div className="animate-spin rounded-full h-14 w-14 border-b-4 border-[#3e94b3] mx-auto"></div>
            <p className="text-gray-600 mt-6 text-lg font-medium">Loading jobs...</p>
          </div>
        ) : error ? (
          <div className="text-center py-16 text-red-600">
            <p className="text-lg">{error}</p>
            <button
              onClick={() => window.location.reload()}
              className="mt-6 bg-gradient-to-r from-[#3e94b3] to-[#7fbadd] hover:from-[#7fbadd] hover:to-[#3e94b3] text-white px-6 py-2 rounded-xl shadow font-semibold"
            >
              Retry
            </button>
          </div>
        ) : filteredJobs.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-gray-600 text-lg">No jobs found matching your search.</p>
          </div>
        ) : (
          <div className="space-y-6">
            {filteredJobs.slice(0, visibleCount).map((job) => (
              <div
                key={job.id}
                onClick={() => onJobClick(job)}
                className="cursor-pointer bg-white/95 rounded-xl p-5 shadow-lg border border-blue-100 hover:shadow-2xl hover:border-blue-300 transition-all duration-200 group relative overflow-hidden"
              >
                <div className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-r from-[#e0f2fe]/60 to-[#7fbadd]/20" />
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-[#3e94b3] transition-colors duration-200">
                      {job.title}
                    </h3>
                    <div className="flex flex-wrap gap-4 text-base text-gray-600 mb-2">
                      <div className="flex items-center gap-2">
                        <MapPin className="h-5 w-5 text-blue-600" />
                        <span>{job.location}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="h-5 w-5 text-green-600" />
                        <span>{job.type}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Award className="h-5 w-5 text-yellow-400" />
                        <span>{job.experience} yrs</span>
                      </div>
                    </div>
                    <p className="text-xs text-gray-400 mt-1">
                      <span className="font-medium text-[#3e94b3]">Posted</span> {getRelativeTime(job.createdAt)}
                    </p>
                  </div>
                  <div className="flex-shrink-0 mt-4 md:mt-0">
                    <span className="inline-block bg-[#3e94b3] hover:bg-[#7fbadd] text-white px-5 py-2 rounded-lg font-semibold shadow hover:scale-105 transition-transform duration-200 cursor-pointer">
                      View Details
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Load More */}
        {visibleCount < filteredJobs.length && (
          <div className="text-center mt-16">
            <button
              onClick={() => setVisibleCount((prev) => prev + 2)}
              className="bg-[#3e94b3] hover:bg-[#7fbadd] text-white px-10 py-3 rounded-xl font-semibold transition-all duration-200 shadow-lg hover:scale-105"
            >
              Load More Jobs
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default Jobs;
