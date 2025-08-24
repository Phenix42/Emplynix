import React, { useState, useEffect } from 'react';
import { Search, MapPin, Clock, Award } from 'lucide-react';

const Jobs = ({ onJobClick }) => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedFilter, setSelectedFilter] = useState('Latest');
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [searchKeyword, setSearchKeyword] = useState('');
  const [searchLocation, setSearchLocation] = useState('');

  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5001/api';

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        setLoading(true);
        const response = await fetch(`${API_URL}/jobs`);
        if (!response.ok) throw new Error('Failed to fetch jobs');
        const data = await response.json();
        setJobs(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred while fetching jobs');
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, [API_URL]);

  const handleSearch = () => {
    // Optional: Implement client-side filtering or make a new API call with search parameters
    const filteredJobs = jobs.filter(job =>
      job.title.toLowerCase().includes(searchKeyword.toLowerCase()) &&
      job.location.toLowerCase().includes(searchLocation.toLowerCase())
    );
    setJobs(filteredJobs);
  };

  return (
    <section className="py-16 bg-gray-50 min-h-screen" id="jobs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Search Section */}
        <div className="bg-white rounded-2xl p-8 shadow-sm mb-8">
          <h2 className="text-2xl font-bold text-gray-900 text-center mb-6">Find Your Dream Job</h2>
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <input
                type="text"
                placeholder="Keyword"
                value={searchKeyword}
                onChange={(e) => setSearchKeyword(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
              />
            </div>
            <div className="flex-1">
              <input
                type="text"
                placeholder="Location"
                value={searchLocation}
                onChange={(e) => setSearchLocation(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
              />
            </div>
            <button
              onClick={handleSearch}
              className="bg-[#3e94b3] hover:bg-[#7fbadd] text-white px-8 py-3 rounded-lg font-semibold flex items-center justify-center space-x-2 transition-all duration-200 shadow-md hover:shadow-lg md:w-auto"
            >
              <Search className="h-5 w-5" />
              <span>Search</span>
            </button>
          </div>
        </div>

        {/* Jobs List */}
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
          <div className="space-y-6">
            {jobs.map((job) => (
              <div
                key={job.id}
                onClick={() => onJobClick(job)}
                className="cursor-pointer bg-white rounded-2xl p-6 shadow-md border border-gray-100 hover:shadow-lg transition-all duration-200"
              >
                <h3 className="text-xl font-bold text-gray-900 mb-1">{job.title}</h3>
                <div className="flex flex-wrap gap-6 text-sm text-gray-600 mb-3">
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-blue-600" />
                    <span>{job.location}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-green-600" />
                    <span>{job.type}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Award className="h-4 w-4 text-yellow-300" />
                    <span>{job.experience}</span>
                  </div>
                </div>
                <p className="text-xs text-gray-400">Posted {job.posted}</p>
              </div>
            ))}
          </div>
        )}

        {/* Load More */}
        {jobs.length > 0 && !loading && !error && (
          <div className="text-center mt-12">
            <button className="bg-white hover:bg-gray-50 text-blue-600 border-2 border-blue-600 px-8 py-3 rounded-lg font-semibold transition-all duration-200">
              Load More Jobs
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default Jobs;