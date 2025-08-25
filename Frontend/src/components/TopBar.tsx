import React from 'react';
import { Mail, Phone, Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';

const TopBar = () => {
  const [isScrolled, setIsScrolled] = React.useState(false);

  React.useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 32);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className={`fixed top-0 left-0 right-0 z-40 bg-black text-white py-2 text-sm transition-transform duration-300 ${
      isScrolled ? '-translate-y-full' : 'translate-y-0'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-6">
            <a href="mailto:hr@Emplynix.com" className="flex items-center space-x-2">
              <Mail className="h-4 w-4 text-blue-400" />
              <span className="text-gray-300">hr@Emplynix.com</span>
            </a>
            <a href="tel:+918125942585" className="flex items-center space-x-2">
              <Phone className="h-4 w-4 text-blue-400" />
              <span className="text-gray-300">+91-8125942585</span>
            </a>
          </div>
          <div className="flex items-center space-x-3">
            <a href="#" className="text-gray-400 hover:text-white transition-colors duration-200 p-1" aria-label="Facebook">
              <Facebook className="h-4 w-4" />
            </a>
            <a href="#" className="text-gray-400 hover:text-white transition-colors duration-200 p-1" aria-label="Twitter">
              <Twitter className="h-4 w-4" />
            </a>
            <a href="#" className="text-gray-400 hover:text-white transition-colors duration-200 p-1" aria-label="Instagram">
              <Instagram className="h-4 w-4" />
            </a>
            <a href="#" className="text-gray-400 hover:text-white transition-colors duration-200 p-1" aria-label="LinkedIn">
              <Linkedin className="h-4 w-4" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopBar;