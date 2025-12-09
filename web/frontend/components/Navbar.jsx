import { useState } from 'react';
import { Bell, Menu, X, Plus } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';

export default function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navLinks = [
    { name: 'Dashboard', path: '/Pagename' },
    { name: 'Tests', path: '/TestPage' },
    { name: 'Insights', path: '/Insightspage' },
    { name: 'Analytics', path: '/Analyticspage' },
  ];

  const isActive = (path) => location.pathname === path;

  const handleMobileNavClick = (path) => {
    navigate(path);
    setIsMenuOpen(false); // Close menu on navigation
  };

  return (
    // Add relative positioning for the dropdown context
    <header className="bg-white border-b border-gray-200 relative z-10">
      {/* Main Navbar content */}
      <div className="max-w-7xl mx-auto flex items-center justify-between px-4 md:px-6 py-4">
        {/* Left Section */}
        <div className="flex items-center gap-8">
          {/* Logo */}
          <div
            onClick={() => navigate('/Loginpage')}
            className="flex items-center gap-2 cursor-pointer hover:opacity-80 transition-opacity"
          >
            <div className="w-6 h-6 bg-black rounded"></div>
            <span className="text-xl font-bold">Splitspur</span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex gap-6 text-sm">
            {navLinks.map((link) => (
              <button
                key={link.path}
                onClick={() => navigate(link.path)}
                className={`transition-colors pb-1 ${
                  isActive(link.path)
                    ? 'text-gray-900 font-semibold border-b-2 border-gray-900'
                    : 'text-gray-700 hover:text-gray-900'
                }`}
              >
                {link.name}
              </button>
            ))}
          </nav>
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-2 md:gap-4">
          {/* Create New Test Button (Responsive) */}
          <button
            onClick={() => navigate('/Splitspurpage')}
            className="bg-blue-600 text-white p-2 md:px-4 md:py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors flex items-center justify-center gap-1"
          >
            {/* Show icon on all sizes */}
            <Plus className="w-4 h-4" />
            {/* Show text only on medium screens and up */}
            <span className="hidden md:inline">Create New Test</span>
          </button>

          {/* Notifications */}
          <button className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors flex items-center justify-center">
            <Bell className="w-4 h-4 text-gray-700" />
          </button>

          {/* User Avatar */}
          <button className="w-8 h-8 rounded-full bg-gray-800 hover:bg-gray-700 transition-colors flex items-center justify-center text-white text-sm font-medium">
            V
          </button>

          {/* Hamburger Menu Button (Mobile) */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors flex items-center justify-center"
          >
            {isMenuOpen ? (
              <X className="w-4 h-4 text-gray-700" />
            ) : (
              <Menu className="w-4 h-4 text-gray-700" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Menu (Dropdown) */}
      {/* This div will appear below the header on mobile when isMenuOpen is true */}
      <div
        className={`md:hidden absolute top-full left-0 w-full bg-white border-b border-gray-200 shadow-md ${
          isMenuOpen ? 'block' : 'hidden'
        }`}
      >
        <nav className="flex flex-col p-4 space-y-1">
          {navLinks.map((link) => (
            <button
              key={link.path}
              onClick={() => handleMobileNavClick(link.path)}
              className={`py-2 px-3 rounded text-left transition-colors ${
                isActive(link.path)
                  ? 'bg-gray-100 text-gray-900 font-semibold'
                  : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
              }`}
            >
              {link.name}
            </button>
          ))}
        </nav>
      </div>
    </header>
  );
}
