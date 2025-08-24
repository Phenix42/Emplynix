import React from 'react';
import { Users, Award, Target, Phone } from 'lucide-react';
import overlap1 from '../Asset/overlap1.jpg';
import overlap2 from '../Asset/overlap2.png';

interface EmployersProps {
  setCurrentPage: (page: string) => void;
}

const Employers: React.FC<EmployersProps> = ({ setCurrentPage }) => {
  const features = [
    {
      icon: Users,
      title: 'Top Talent Pool',
      description: 'Fuel your business growth with our top-tier talent pool',
    },
    {
      icon: Award,
      title: 'End-to-End Hiring Support',
      description:
        'End-to-End Hiring Support - From sourcing to onboarding, we manage it all with precision and care.',
    },
    {
      icon: Target,
      title: 'Fast & Reliable Turnaround ',
      description:
        'With deep talent pipelines and proactive sourcing, we reduce your time-to-hire',
    },
    {
      icon: Users,
      title: 'Your Trusted Growth Partner',
      description:
        'We act as true partner, adapting to your workflows, offering regular updates and aligning our strategy with your business goals.',
    },
    {
      icon: Users,
      title: 'Agility in action',
      description: 'Quick response to your requirements.',
    },
  ];

  return (
    <section className="py-16 bg-white" id="employers">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              Why Emplynix ?
            </h2>

            <p className="text-lg text-gray-600 mb-8 leading-relaxed">
              Emplynix supports companies across sectors who are about building
              class teams and want a staffing partner that shares their
              ambition.
            </p>

            <div className="space-y-6 mb-8">
              {features.map((feature, index) => {
                const Icon = feature.icon;
                return (
                  <div key={index} className="flex items-start space-x-4">
                    <div className="bg-blue-100 p-2 rounded-lg">
                      <Icon className="h-6 w-6 text-[#3e94b3]" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-1">
                        {feature.title}
                      </h3>
                      <p className="text-gray-600">{feature.description}</p>
                    </div>
                  </div>
                );
              })}
            </div>

            <p className="text-lg text-gray-600 mb-8 leading-relaxed">
              Welcome to Emplynix staffing solutions! Let’s build something
              meaningful—together. Whether you're hiring today or planning for
              tomorrow, Emplynix is here to help you hire better, faster, and
              smarter.
              <br />
              <br />
              👉 Contact us today to discover how Emplynix can strengthen your
              workforce.
            </p>

            <button
              onClick={() => setCurrentPage('contact')} // Redirect to Contact page
              className="bg-[#3e94b3] hover:bg-[#7fbadd] text-white px-8 py-3 rounded-lg font-semibold flex items-center space-x-2 transition-all duration-200 shadow-md hover:shadow-lg"
            >
              <Phone className="h-5 w-5" />
              <span>Contact US</span>
            </button>
          </div>

          {/* Right Image Section */}
          <div className="relative flex justify-center items-center w-full sm:w-[80%] lg:w-[500px] lg:h-[500px] h-[300px] sm:h-[400px] mx-auto">
            {/* First Image */}
            <div className="absolute top-0 left-0 w-2/3 sm:w-1/2 lg:w-[400px] rounded-lg shadow-lg overflow-hidden -translate-x-4 -translate-y-6 sm:-translate-x-6 sm:-translate-y-10">
              <img
                src={overlap1}
                alt="Employers at Emplynix"
                className="w-full h-auto object-contain"
              />
            </div>

            {/* Second Image */}
            <div className="absolute bottom-0 right-0 w-2/3 sm:w-1/2 lg:w-[400px] rounded-lg shadow-lg overflow-hidden translate-x-6 translate-y-4 sm:translate-x-10 sm:translate-y-8">
              <img
                src={overlap2}
                alt="Employers overlay"
                className="w-full h-auto object-contain"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Employers;
