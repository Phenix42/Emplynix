
import { Users, Award, Heart, TrendingUp } from 'lucide-react';

const About = () => {
  const values = [
    {
      icon: Award,
      title: 'Excellence',
      description: 'We set high standards and exceed them.'
    },
    {
      icon: Heart,
      title: 'Integrity',
      description: 'We operate with honesty, transparency, and ethical responsibility in everything we do.'
    },
    {
      icon: Users,
      title: 'Partnership',
      description: 'We build long-term relationships'
    },
    {
      icon: TrendingUp,
      title: 'Continuous Improvement',
      description: 'We constantly refine our processes, adopt new technologies, and learn from every engagement to stay ahead of market demands.'
    }
  ];

  const contentSections = [
    "Emplynix staffing solutions is a reliable agency, offering a wide variety of staffing solutions to corporate companies for their IT and non-IT recruitments. It caters to corporate clients, providing them with efficient manpower for their recruitment requirements. We do our best to supply myriad staffing assistance like Contract Staffing Services, Permanent Staffing Services, Remote/ Virtual IT Staffing Services, RPO Services across India.",
    "With a passion for excellence and a focus on results, our team combines deep industry knowledge with a personalized approach to recruitment. We understand that every role matters, and that the right match can drive real business success. Emplynix believes that quality hires build quality businesses. We approach every hiring engagement with deep focus and precision.",
    "Our mission is to deliver top-tier talent. Our growth has been driven by our dedication to quality, responsiveness, and long-term partnerships. Whether you're an organization looking for top-tier talent or a candidate seeking the next step in your career, you can trust Emplynix to deliver with speed, precision, and professionalism."
  ];

  const domains = [
    "Healthcare",
    "IT (Information Technology)",
    "BFSI (Banking, Financial Services & Insurance)",
    "Manufacturing & Engineering",
    "Retail & E-commerce",
    "Pharmaceuticals & Life Sciences",
    "Telecommunications",
    "Education & EdTech"
  ];

  return (
    <section className="py-16 bg-white" id="about">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Image Above Heading */}
        <div className="mb-10">
          <img
            src="src/Asset/Aboutus3.jpeg"
            alt="About Emplynix"
            className="w-full h-64 object-cover object-right rounded-xl shadow-md"
          />
        </div>

        {/* Two Column Layout */}
        <div className="grid lg:grid-cols-2 gap-12 items-start mb-20">
          {/* Left: Content */}
          <div className="space-y-6 text-gray-700 text-base leading-relaxed">

            {/* First paragraph */}
            <p>{contentSections[0]}</p>

            {/* Our Domains Section (placed immediately after first paragraph) */}
            <div className="mt-6">
              <h2 className=" font-bold text-gray-900 mb-4">Our Domains :</h2>
              <p className="mb-3">
                At Emplynix Staffing Solutions, we serve multiple industries with specialized hiring expertise. 
                Our domain-focused approach ensures we provide the right talent aligned with your business needs.
              </p>
              <ul className="list-disc list-inside space-y-1 text-gray-700">
                {domains.map((domain, i) => (
                  <li key={i}>{domain}</li>
                ))}
              </ul>
            </div>

            {/* Remaining content sections */}
            {contentSections.slice(1).map((section, index) => (
              <p key={index}>{section}</p>
            ))}
          </div>

          {/* Right: Image */}
          <div className="mt-24 lg:mt-32">
            <div className="rounded-xl overflow-hidden shadow-lg">
              <img
                src="https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=1200"
                alt="Professional team collaboration"
                className="w-full h-auto object-cover"
              />
            </div>
          </div>
        </div>

        {/* Quote Section */}
        <div className="bg-[#7fbadd] rounded-lg p-8 max-w-4xl mx-auto mb-20">
          <p className="text-xl text-gray-700 leading-relaxed italic">
            " Emplynix staffing solutions is one of the fastest-growing staffing firms in the industry, we are committed to delivering high-quality staffing solutions tailored to meet the unique needs of both employers and job seekers."
          </p>
        </div>

        {/* Values Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">Our Values</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => {
              const Icon = value.icon;
              return (
                <div key={index} className="text-center">
                  <div className="bg-blue-100 p-4 rounded-full inline-block mb-4">
                    <Icon className="h-8 w-8 text-[#3e94b3]" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">{value.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{value.description}</p>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
};

export default About;
