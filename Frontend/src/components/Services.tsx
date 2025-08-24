import React from 'react';
import { Briefcase, Users, Search, UserCheck, Building, Star, Target, Award } from 'lucide-react';

const Services = () => {
  const services = [
    {
      icon: Search,
      title: 'Permanent staffing',
      description: 'End-to-end recruitment solutions for permanent positions across all industries and experience levels.',
      image: '/src/Asset/CC-services3.jpg'
    },
    {
      icon: UserCheck,
      title: 'Remote staffing',
      description: 'Specialized executive recruitment for C-level and senior management positions.',
      image: '/src/Asset/DD-services_home.jpg'
    },
    {
      icon: Users,
      title: 'Contract staffing',
      description: 'Flexible staffing solutions for short-term projects and seasonal workforce needs.',
      image: '/src/Asset/DD-services_home2.jpg'
    },
    {
      icon: Building,
      title: 'RPO Services',
      description: 'Recruitment Process Outsourcing to streamline your entire hiring process.',
      image: '/src/Asset/extra.webp'
    },
    {
      icon: Target,
      title: 'Workforce Solutions',
      description: 'Complete workforce management and optimization strategies for your business.',
      image: 'https://images.pexels.com/photos/3184292/pexels-photo-3184292.jpeg?auto=compress&cs=tinysrgb&w=600'
    },
  ];

  const renderCard = (service) => {
    return (
      <div
        className="relative h-60 w-30 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 bg-cover bg-center"
        style={{ backgroundImage: `url(${service.image})` }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-40"></div>
        <div className="relative z-10 p-6 h-full flex flex-col justify-end text-white">
          <h3 className="text-xl font-semibold mb-2">{service.title}</h3>
          <p className="text-sm leading-relaxed">{service.description}</p>
        </div>
      </div>
    );
  };

  return (
    // <<-- section now has the fixed background and overlay
    <section
      className="relative bg-fixed bg-center bg-cover py-16"
      id="services"
      style={{
        // use whichever image you want as the big background
        backgroundImage: `url('/src/Asset/bgimagetint.jpeg')`,
      }}
    >
      {/* section-level black tint */}
 <div className="absolute inset-0 bg-black bg-opacity-80 pointer-events-none"></div>

      {/* content (kept exactly like before) */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-300">Our Services</h2>
        </div>

        {/* Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          
          {/* Top Center Card */}
          <div className="lg:col-start-2 lg:col-span-1">
            {renderCard(services[0])}
          </div>
          
          {/* Middle Row */}
          <div className="lg:col-start-1 lg:col-span-1">
            {renderCard(services[1])}
          </div>


          <div className="lg:col-start-3 lg:col-span-1">
            {renderCard(services[2])}
          </div>

          {/* Bottom Center Card */}
          <div className="lg:col-start-2 lg:col-span-1">
            {renderCard(services[3])}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;
