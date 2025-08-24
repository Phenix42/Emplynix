import React from 'react';
import logo from "../Asset/LogoR.png"
import { Facebook, Twitter, Instagram, Mail, MapPin, Phone } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="lg:col-span-2">
          
            
            <div className="w-36 h-auto">
                      <img
      src={logo}
      alt="Company Logo"
      className="w-full h-auto object-contain hover:opacity-90 transition-opacity duration-200"
    />
            </div>
            
            <p className="text-gray-300 mb-6 leading-relaxed">
              Emplynix is a leading staffing solutions provider connecting top talent with exceptional opportunities. 
              We specialize in permanent placements, contract staffing, and executive search across all industries.
            </p>
            
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <MapPin className="h-5 w-5 text-blue-400" />
                <span className="text-gray-300">50,2nd cross, Rajarajeswari Nagar, Devasandra, KRPURAM, Bangalore, Karnataka-560036</span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="h-5 w-5 text-blue-400" />
                <span className="text-gray-300">+91-8125942585</span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="h-5 w-5 text-blue-400" />
                <span className="text-gray-300">info@Emplynix.com</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-6">Explore</h3>
            <ul className="space-y-3">
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors duration-200">About us</a></li>
              <li><a href="#services" className="text-gray-300 hover:text-white transition-colors duration-200">Services</a></li>
              <li><a href="#jobs" className="text-gray-300 hover:text-white transition-colors duration-200">Job Openings</a></li>
              <li><a href="#contact" className="text-gray-300 hover:text-white transition-colors duration-200">Contact us</a></li>
            </ul>
          </div>

          {/* Contact Info */}
      {/* Our Address */}
<div>
  <h3 className="text-lg font-semibold mb-6">Our Address</h3>
  <div className="bg-gray-800 p-4 rounded-lg">
    <a 
      href="https://www.google.com/maps?q=50,2nd+cross,Rajarajeswari+Nagar,Devasandra,KRPURAM,Bangalore,Karnataka-560036" 
      target="_blank" 
      rel="noopener noreferrer"
    >
      <img
        src="src/Asset/mappin.png"
        alt="Company Location"
        className="w-full h-32 object-cover rounded mb-4 hover:opacity-90 transition-opacity duration-200"
      />
    </a>
    <p className="text-sm text-gray-300">
      Visit our office for in-person consultations and meetings.
    </p>
  </div>
</div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">
              © 2025 - All Rights Reserved | Emplynix Staffing Solutions Inc 
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;