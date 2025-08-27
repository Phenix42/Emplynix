import { Search } from 'lucide-react';

const JobSearch = () => {
  return (
    <section className="py-12 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gray-50 rounded-2xl p-8 shadow-sm">
          <h2 className="text-2xl font-bold text-gray-900 text-center mb-8">
            Are you Looking for a Job?
          </h2>
          
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <input
                type="text"
                placeholder="Keyword"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
              />
            </div>
            <div className="flex-1">
              <input
                type="text"
                placeholder="Location"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
              />
            </div>
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold flex items-center justify-center space-x-2 transition-all duration-200 shadow-md hover:shadow-lg md:w-auto">
              <Search className="h-5 w-5" />
              <span>Search</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default JobSearch;