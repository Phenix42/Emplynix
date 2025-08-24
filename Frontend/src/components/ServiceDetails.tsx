import React from "react";

const serviceData: Record<
  string,
  { title: string; image: string; content: string }
> = {
  "sales-marketing": {
    title: "Permanent Staffing",
    image: "src/asset/CCC-services4.jpg",
    content: `
     We help companies hire the right people for long-term roles. Our permanent staffing services are designed to find skilled, reliable, and job-ready candidates who fit your team and company culture. We offer comprehensive permanent staffing solutions designed to bring you talent that adds value from day one and stays for the long haul.<br/><br/> Our permanent staffing solutions are designed to help companies attract top-tier talent, strengthen their workforce, and stay ahead in a rapidly changing business environment. With a proven recruitment process and deep industry insight, we deliver quality hires who stay, grow, and lead.<br/><br/> <h3 style="font-size: 1.5rem; font-weight: bold; margin-bottom: 1rem;">🔹 Permanent Staffing that Powers Long-Term Success</h3> At Emplynix, we understand that building a successful organization starts with hiring the right people. Our Permanent Staffing services are designed to help you find skilled professionals who not only match your job requirements but also align with your company’s culture and long-term vision.<br/><br/> We offer end-to-end permanent staffing services designed to help you identify, attract, and retain high-quality professionals who not only meet your skill requirements but also align with your company’s culture and vision.<br/><br/> <h3 style="font-size: 1.5rem; font-weight: bold; margin-bottom: 1rem;">🌟 Why Choose Us for Permanent Hiring?</h3> <ul style="list-style-type: none; padding-left: 0; margin-bottom: 1rem;"> <li style="margin-bottom: 0.5rem;"><span style="color: #28a745; font-weight: bold;">✅</span> Strategic Talent Acquisition: We align hiring with your business vision, delivering candidates who are not only qualified, but purpose-driven and growth-oriented.</li> <li style="margin-bottom: 0.5rem;"><span style="color: #28a745; font-weight: bold;">✅</span> Industry-Focused Expertise: Our specialized recruiters understand your sector’s demands — from tech to finance, healthcare to manufacturing — and deliver tailored hiring solutions.</li> <li style="margin-bottom: 0.5rem;"><span style="color: #28a745; font-weight: bold;">✅</span> Quality Over Quantity: We focus on precision hiring — only the most relevant, culturally aligned, and skill-verified professionals are shortlisted.</li> </ul> <h3 style="font-size: 1.5rem; font-weight: bold; margin-bottom: 1rem;">🔹 Build Your Core Team with Confidence</h3> Your business is only as strong as the people behind it. At Emplynix, we specialize in permanent staffing solutions that go beyond filling vacancies — we help you build teams that lead, innovate, and grow with your organization.
    `,
  },
  "engineering-technology": {
    title: "Remote Staffing",
    image: "src/asset/DD-services_home3.jpg",
    content: `
      <h3 style="font-size: 1.5rem; font-weight: bold; margin-bottom: 1rem;">Build Smarter. Scale Faster. Work from Anywhere</h3><br/> At Emplynix, we provide remote staffing solutions that give you access to highly skilled professionals from anywhere in the world — without compromising on quality, communication, or accountability.<br/><br/> Whether you're scaling quickly, need niche expertise, or want to optimize costs, our remote staffing model ensures you get on-demand support and seamless collaboration, all while staying agile.<br/><br/> <h3 style="font-size: 1.5rem; font-weight: bold; margin-bottom: 1rem;">Build a High-Performing Remote Team, Effortlessly</h3> Let us help you unlock the benefits of a global workforce with local-level accountability. Whether you’re hiring one expert or building an entire remote team, we make remote staffing simple, secure, and strategic. Our remote staffing model is tailored to optimize your workforce strategy and accelerate success.<br/><br/> We help you build remote teams that perform, innovate, and drive real business value. In a time when digital transformation is non-negotiable, we ensure that you have access to world-class talent without the constraints of geography or infrastructure.<br/><br/> <h3 style="font-size: 1.5rem; font-weight: bold; margin-bottom: 1rem;">How We Make Remote Work</h3> <ul style="list-style-type: none; padding-left: 0; margin-bottom: 1rem;"> <li style="margin-bottom: 0.5rem;">Understand your need: We analyze your role, required skills, and ideal working style.</li> <li style="margin-bottom: 0.5rem;">Source and Screen: We match you with vetted professionals with proven track records.</li> <li style="margin-bottom: 0.5rem;">Onboard and Integrate: Our team handles documentation, compliance, and cultural orientation.</li> <li style="margin-bottom: 0.5rem;">Support and Monitor: From productivity tracking to ongoing engagement, we stay involved every step of the way.</li> </ul> <h3 style="font-size: 1.5rem; font-weight: bold; margin-bottom: 1rem;">🌎 Empower Your Growth with Global Talent</h3> Remote staffing is about gaining a competitive edge. It gives you the power to scale smarter, deliver faster, and innovate more freely.<br/><br/> Let Emplynix help you build remote teams that feel like an extension of your business—committed, connected, and high-performing.<br/><br/> <p style="margin-bottom: 1rem;">📩 Contact us today to get started.</p>
    `,
  },
  "accounting-finance": {
    title: "RPO Services",
    image: "src/Asset/DD-services_home4.jpg",
    content: `
      At Emplynix, RPO services empower businesses to transform their hiring function into a cost-effective, efficient, and high-performing engine.<br/><br/> We operate as an extension of your talent acquisition team, managing part or all of your recruitment process — from workforce planning and sourcing to onboarding and analytics — allowing you to focus on growing your business.<br/><br/> <h3 style="font-size: 1.5rem; font-weight: bold; margin-bottom: 1rem;">Your Talent Strategy, Supercharged</h3> At Emplynix, we work as an extension of your internal HR and recruitment team, providing end-to-end recruitment services tailored to your business goals. From initial workforce planning to onboarding and retention strategies, we handle it all — giving you the freedom to focus on business growth while we bring you the talent to make it happen.<br/><br/> <h3 style="font-size: 1.5rem; font-weight: bold; margin-bottom: 1rem;">Scalable, Flexible, and Built for Business Impact</h3> Every organization has unique hiring challenges — rapid expansion, seasonal peaks, high-volume recruiting, or niche roles. Our RPO model is built for flexibility and scale, adapting quickly to your evolving talent needs. Whether you’re hiring 10 or 1,000, our approach ensures a steady pipeline of quality candidates, without overburdening your internal resources.<br/><br/> <h3 style="font-size: 1.5rem; font-weight: bold; margin-bottom: 1rem;">Delivering Talent That Drives Performance</h3> We believe recruitment isn’t just about filling positions — it’s about placing the right people in the right roles to help your organization thrive. With a strong focus on candidate quality, culture fit, and future potential, we align every hiring decision with your long-term business objectives. Our recruitment specialists are experts across industries and geographies, ensuring access to talent that delivers real results.<br/><br/> <h3 style="font-size: 1.5rem; font-weight: bold; margin-bottom: 1rem;">Advanced Technology Meets Human Expertise</h3> Our RPO services are backed by powerful recruitment technology, AI-driven sourcing tools, and real-time analytics — but we never lose sight of the human touch. Our experienced recruiters leverage both data and intuition to create a seamless hiring experience for both you and your candidates, reducing time-to-hire and enhancing employer brand reputation.<br/><br/> <h3 style="font-size: 1.5rem; font-weight: bold; margin-bottom: 1rem;">Compliance and Transparency, Guaranteed</h3> Hiring at scale comes with risks — compliance, documentation, and process alignment. We ensure every step of the recruitment process meets local labor laws and corporate policies, with full visibility into metrics, reporting, and hiring outcomes.
    `,
  },
  "information-technology": {
    title: "Contract Staffing",
    image: "src/Asset/contract_staffing.jpg",
    content: `
  Our contract staffing services give you the flexibility to hire skilled professionals exactly when you need them.<br/><br/> At Emplynix, we help you stay agile in a fast-paced world through contract staffing solutions that bring you top talent, exactly when you need it. Whether you're tackling a short-term project, filling a temporary vacancy, or scaling quickly to meet new demands—our contract staffing service keeps you one step ahead. We offer contract staffing solutions that allow you to plug skill gaps, meet project goals, and stay ahead.<br/><br/> <h3 style="font-size: 1.5rem; font-weight: bold; margin-bottom: 1rem;">Seamless Contract Staffing to Power Your Business Agility</h3> We’re a trusted workforce partner committed to helping you stay agile, lean, and ahead of the curve. Our contract staffing is designed to empower your business with fast, flexible, and reliable talent solutions.<br/><br/> <h3 style="font-size: 1.5rem; font-weight: bold; margin-bottom: 1rem;">Benefits of Our Contract Staffing Approach</h3> <ul style="list-style-type: none; padding-left: 0; margin-bottom: 1rem;"> <li style="margin-bottom: 0.5rem;">Hire Fast, Work Smart: Get qualified candidates deployed quickly without lengthy hiring processes.</li> <li style="margin-bottom: 0.5rem;">Full Compliance, Zero Hassle: We manage payroll, statutory compliance, onboarding, and exit formalities—so you don’t have to.</li> <li style="margin-bottom: 0.5rem;">High-Performance Talent: Access a curated pool of experts across functions and industries.</li> <li style="margin-bottom: 0.5rem;">Optimize Your Workforce: Reduce fixed costs while maintaining workforce strength and continuity.</li> <li style="margin-bottom: 0.5rem;">Project Confidence: Focus on your goals while we handle resource management.</li> </ul>
    `,
  },
};

interface ServiceDetailsProps {
  serviceId: string;
}

interface ServiceDetailsProps {
  serviceId: string;
  setCurrentPage: (page: string) => void; // ✅ added
}

const ServiceDetails: React.FC<ServiceDetailsProps> = ({
  serviceId,
  setCurrentPage,
}) => {
  const service = serviceData[serviceId] || null;

  if (!service) {
    return <p>Service not found.</p>;
  }

  return (
    <div>
      {/* 🔹 Banner Section */}
      <div className="relative w-full h-[400px]">
        <img
          src={service.image}
          alt={service.title}
          className="w-full h-full object-cover object-top"
        />
        <div className="absolute inset-0 bg-black/50 flex flex-col items-start justify-end text-left px-8 py-6">
          {/* Breadcrumb with navigation */}
          <p className="text-white text-sm md:text-base mb-3">
            <button
              className="underline hover:text-gray-300"
              onClick={() => setCurrentPage("home")}
            >
              Home
            </button>{" "}
            &gt;{" "}
            <button
              className="underline hover:text-gray-300"
              onClick={() => setCurrentPage("services")}
            >
              Services
            </button>{" "}
            &gt; <span className="font-semibold">{service.title}</span>
          </p>
          <h1 className="text-white text-3xl md:text-5xl font-bold">
            {service.title}
          </h1>
        </div>
      </div>

      {/* 🔹 Content Section */}
      <div className="max-w-4xl mx-auto py-12 px-6">
        <div
          className="text-lg leading-relaxed text-gray-700"
          dangerouslySetInnerHTML={{ __html: service.content }}
        />

        {/* 🔹 Contact Us Button */}
        <div className="mt-10 text-center">
          <button
            onClick={() => setCurrentPage("contact")} // ✅ redirects correctly
            className="inline-block bg-[#3e94b3] hover:bg-[#7fbadd] text-white font-semibold px-6 py-3 rounded-lg shadow-md transition"
          >
            Contact Us
          </button>
        </div>
      </div>
    </div>
  );
};

export default ServiceDetails;
