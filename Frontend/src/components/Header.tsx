import React from 'react';
import { Search, Menu, X } from 'lucide-react';
import logo from "../Asset/Logo.png";

interface HeaderProps {
  currentPage: string;
  setCurrentPage: (page: string) => void;
}

const Header: React.FC<HeaderProps> = ({ currentPage, setCurrentPage }) => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const [isScrolled, setIsScrolled] = React.useState(false);

  React.useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      setIsScrolled(scrollTop > 32);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navigation = [
    { name: 'Home', href: 'home' },
    { name: 'About Us', href: 'about' },
    {
      name: 'Services',
      href: 'services',
      children: [
        { name: 'Permanent staffing', href: 'sales-marketing' },
        { name: 'Remote staffing', href: 'engineering-technology' },
        { name: 'RPO services', href: 'accounting-finance' },
        { name: 'Contract staffing', href: 'information-technology' },
      ],
    },
    { name: 'Jobs', href: 'jobs' },
    { name: 'Emplynix', href: 'login' },
    { name: 'Contact us', href: 'contact' },
  ];

  // SPA navigation for normal menu items
  const handleNavClick = (href: string, e: React.MouseEvent) => {
    e.preventDefault();
    setCurrentPage(href);
    setIsMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // SPA navigation for submenu items
  const handleSubmenuRedirect = (href: string, e: React.MouseEvent) => {
    e.preventDefault();
    setCurrentPage(href);
    setIsMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const shouldUseSolidBackground = currentPage !== 'home' || isScrolled;

  return (
  <header
  className={`fixed left-0 right-0 z-50 transition-all duration-300 ${
    isScrolled ? 'top-0' : 'top-8'
  } ${
    shouldUseSolidBackground
      ? 'bg-white shadow-lg border-b border-gray-200'
      : 'bg-transparent'
  }`}
>

      <div className="max-w-7xl mx-auto px-4 sm:px-7 lg:px-12">
        <div className="flex justify-between items-center h-24">
          {/* Logo */}
          <div className="flex items-center ml-16">
            <button
              onClick={(e) => handleNavClick('home', e)}
              className="w-48 h-24" // Increased from w-36 h-20 to w-48 h-24
            >
              <img
                src={logo}
                alt="Company Logo"
                className="w-full h-28 object-contain hover:opacity-90 transition-opacity duration-200" // Increased h-24 to h-28
              />
            </button>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8 relative">
            {navigation.map((item) =>
              item.children ? (
                <div key={item.name} className="relative group">
                  <button
                    onClick={(e) => e.preventDefault()}
                    className={`px-3 py-2 text-sm font-medium transition-colors duration-200 ${
                      shouldUseSolidBackground
                        ? 'text-gray-700 hover:text-[#3e94b3]'
                        : 'text-black hover:text-[#3e94b3]'
                    }`}
                  >
                    {item.name}
                  </button>

                  {/* Dropdown Menu */}
                  <div className="absolute left-0 top-full mt-2 w-64 bg-white shadow-lg border border-gray-200 rounded z-50 opacity-0 group-hover:opacity-100 invisible group-hover:visible transition-all duration-200">
                    {item.children.map((subItem) => (
                      <button
                        key={subItem.name}
                        onClick={(e) => handleSubmenuRedirect(subItem.href, e)}
                        className={`block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-[#7fbadd] hover:text-[#3e94b3] ${
                          currentPage === subItem.href
                            ? 'text-blue-600 font-semibold'
                            : ''
                        }`}
                      >
                        {subItem.name}
                      </button>
                    ))}
                  </div>
                </div>
              ) : (
                <button
                  key={item.name}
                  onClick={(e) => handleNavClick(item.href, e)}
                  className={`px-3 py-2 text-sm font-medium transition-colors duration-200 ${
                    shouldUseSolidBackground
                      ? 'text-gray-700 hover:text-[#7fbadd]'
                      : 'text-black hover:text-[#3e94b3]'
                  }`}
                >
                  {item.name}
                </button>
              )
            )}
          </nav>

          {/* Search + Mobile menu toggle */}
          <div className="flex items-center space-x-4">
            <button
              className={`p-2 transition-colors duration-200 ${
                shouldUseSolidBackground
                  ? 'text-gray-700 hover:text-blue-600'
                  : 'text-white hover:text-[#7fbadd]'
              }`}
            >
              <Search className="h-5 w-5" />
            </button>
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className={`md:hidden p-2 transition-colors duration-200 ${
                shouldUseSolidBackground
                  ? 'text-gray-700 hover:text-blue-600'
                  : 'text-white hover:text-blue-200'
              }`}
            >
              {isMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div
            className={`md:hidden py-4 rounded-lg mt-2 ${
              shouldUseSolidBackground
                ? 'bg-white shadow-lg border border-gray-200'
                : 'bg-black bg-opacity-50 backdrop-blur-sm'
            }`}
          >
            <nav className="flex flex-col space-y-2">
              {navigation.map((item) =>
                item.children ? (
                  <div key={item.name}>
                    <span className="px-3 py-2 text-sm font-medium text-gray-700">
                      {item.name}
                    </span>
                    <div className="pl-4 flex flex-col space-y-1">
                      {item.children.map((subItem) => (
                        <button
                          key={subItem.name}
                          onClick={(e) => handleSubmenuRedirect(subItem.href, e)}
                          className={`text-left px-3 py-2 text-sm text-gray-600 hover:text-blue-600 ${
                            currentPage === subItem.href
                              ? 'text-blue-600 font-semibold'
                              : ''
                          }`}
                        >
                          {subItem.name}
                        </button>
                      ))}
                    </div>
                  </div>
                ) : (
                  <button
                    key={item.name}
                    onClick={(e) => handleNavClick(item.href, e)}
                    className={`px-3 py-2 text-sm font-medium transition-colors duration-200 text-left ${
                      shouldUseSolidBackground
                        ? 'text-gray-700 hover:text-blue-600'
                        : 'text-white hover:text-blue-200'
                    }`}
                  >
                    {item.name}
                  </button>
                )
              )}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;