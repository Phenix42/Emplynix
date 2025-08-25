import React, { useState, useEffect } from 'react';
import { Search, ChevronLeft, ChevronRight } from 'lucide-react';

interface Slide {
  title: string;
  description: string;
  subDecription: string;
  buttonText: string;
  background: string;
  image: string;
  alignment: 'left' | 'right';
}

interface HeroProps {
  setCurrentPage: (page: 'hirestaff' | 'jobs') => void;
  setSearchFilters: (filters: { keyword: string; location: string }) => void; // ✅ new
}

const Hero: React.FC<HeroProps> = ({ setCurrentPage, setSearchFilters }) => {
  const [currentSlide, setCurrentSlide] = useState<number>(0);
  const [keyword, setKeyword] = useState('');
  const [location, setLocation] = useState('');

  const slides: Slide[] = [
    {
      title: "Find your perfect Candidate",
      description: "Connecting Talent with Opportunity",
      subDecription: "Start your next step in success with us.",
      buttonText: "Post Vacancy",
      background: "from-blue-600 via-blue-700 to-indigo-800",
      image: "/src/Asset/banner1.jpg",
      alignment: "left"
    },
    {
      title: "Looking for the opportunity?",
      description: "",
      subDecription: "",
      buttonText: "Explore Jobs",
      background: "from-indigo-600 via-purple-700 to-blue-800",
      image: "/src/Asset/banner-2.jpg",
      alignment: "right"
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 40000);
    return () => clearInterval(timer);
  }, [slides.length]);

  const nextSlide = (): void => setCurrentSlide((prev) => (prev + 1) % slides.length);
  const prevSlide = (): void => setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  const goToSlide = (index: number): void => setCurrentSlide(index);

  return (
    <section className="relative min-h-screen overflow-hidden">
      {/* Background Slides */}
      <div className="absolute inset-0">
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-all duration-1000 ease-in-out ${
              index === currentSlide
                ? 'opacity-100 translate-x-0'
                : index < currentSlide
                ? 'opacity-0 -translate-x-full'
                : 'opacity-0 translate-x-full'
            }`}
          >
            <div className={`absolute inset-0 bg-gradient-to-br ${slide.background}`} />
            <div className="absolute inset-0">
              <img
                src={slide.image}
                alt={slide.title}
                className="w-full h-full object-cover object-top"
              />
              <div className="absolute inset-0 bg-black bg-opacity-10" />
            </div>
          </div>
        ))}
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-16">
        <div className="flex flex-col items-center justify-center min-h-[calc(100vh-14rem)]">
          <div className="mb-16 w-full">
            <div
              className={`flex flex-col max-w-2xl ${
                slides[currentSlide].alignment === 'right'
                  ? 'ml-auto text-right items-end pr-12'
                  : 'mr-auto text-left items-start pl-12'
              }`}
            >
              <h1 className="text-4xl lg:text-6xl font-bold text-white mb-6 leading-tight">
                {slides[currentSlide].title}
              </h1>
              <p className="text-xl text-gray-200 mb-8 leading-relaxed">
                {slides[currentSlide].description}
                <br />
                {slides[currentSlide].subDecription}
              </p>

              <button
                onClick={() =>
                  slides[currentSlide].buttonText === 'Post Vacancy'
                    ? setCurrentPage('hirestaff')
                    : setCurrentPage('jobs')
                }
                className="bg-[#3e94b3] hover:bg-[#7fbadd] text-white px-8 py-4 rounded-lg font-semibold flex items-center space-x-2 transition-all duration-200 shadow-lg hover:shadow-xl"
              >
                <span>{slides[currentSlide].buttonText}</span>
              </button>
            </div>
          </div>

          {/* Job Search */}
         <div className="w-full max-w-5xl">
  <div className="bg-white bg-opacity-10 backdrop-blur-lg border border-white border-opacity-20 rounded-2xl p-8 shadow-2xl">
    <h2 className="text-2xl font-bold text-white text-center mb-8">
      Find your right job!
    </h2>
    <div className="flex flex-col md:flex-row gap-4">
      <div className="flex-1">
        <input
          type="text"
          placeholder="Keyword"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          onBlur={() => setSearchFilters({ keyword, location })} // ✅ auto update on blur
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3e94b3] shadow-sm placeholder-gray-400"
        />
      </div>
      <div className="flex-1">
        <input
          type="text"
          placeholder="Location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          onBlur={() => setSearchFilters({ keyword, location })} // ✅ auto update on blur
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3e94b3] shadow-sm placeholder-gray-400"
        />
      </div>
      <button
        onClick={() => setSearchFilters({ keyword, location })} // ✅ still works on click
        className="bg-[#3e94b3] hover:bg-[#7fbadd] text-white px-8 py-4 rounded-lg font-semibold flex items-center justify-center space-x-2 transition-all duration-200 shadow-lg hover:shadow-xl md:w-auto"
      >
        <Search className="h-5 w-5" />
        <span>Search</span>
      </button>
    </div>
  </div>
</div>
        </div>
      </div>

      {/* Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 transform -translate-y-1/2 z-20 bg-white bg-opacity-20 hover:bg-opacity-30 text-white p-3 rounded-full"
      >
        <ChevronLeft className="h-6 w-6" />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 z-20 bg-white bg-opacity-20 hover:bg-opacity-30 text-white p-3 rounded-full"
      >
        <ChevronRight className="h-6 w-6" />
      </button>

      {/* Indicators */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20 flex space-x-3">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentSlide
                ? 'bg-white scale-125'
                : 'bg-white bg-opacity-50 hover:bg-opacity-75'
            }`}
          />
        ))}
      </div>
    </section>
  );
};

export default Hero;
