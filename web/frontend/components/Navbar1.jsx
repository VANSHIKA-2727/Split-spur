import React, { useState } from 'react';
// 👈 IMPORT useNavigate HERE
import { useNavigate } from 'react-router-dom'; 
// We need these icons and state for the mobile menu
import { Menu, X } from 'lucide-react';

const Navbar1 = () => {
  // 👈 CALL THE HOOK HERE TO GET THE REAL FUNCTION
  const navigate = useNavigate(); 
  
  // State to manage the mobile menu visibility
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Helper function to close menu on navigation
  const handleMobileNav = (path) => {
    navigate(path);
    setIsMenuOpen(false);
  };

  return (
    // Add relative positioning for the dropdown menu context
    <header className="bg-white border-b border-gray-200 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
        
        {/* Logo and Brand Name */}
        <div 
          onClick={() => handleMobileNav('/')} // Navigate home on logo click
          className="flex items-center gap-2 cursor-pointer"
        >
          {/* Logo Placeholder */}
          <div className="w-8 h-8 bg-black rounded"></div>
          <span className="text-xl font-bold">Splitspur</span>
        </div>
        
        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-8">
          <button 
            // This navigate call will now work correctly
            onClick={() => navigate('/Start')} 
            className="text-gray-700 hover:text-gray-900"
          >
            Features
          </button>
          <button 
            // This navigate call will now work correctly
            onClick={() => navigate('/Pricing')}
            className="text-gray-700 hover:text-gray-900"
          >
            Pricing
          </button>
          <button 
            // This navigate call will now work correctly
            onClick={() => navigate('/Features')}
            className="text-gray-700 hover:text-gray-900"
          >
            Documentation
          </button>
        </nav>
        
        {/* Desktop Auth Buttons */}
        <div className="hidden md:flex items-center gap-3">
          <button
            // This navigate call will now work correctly
            onClick={() => navigate('/Loginpage')}
            className="px-4 py-2 text-gray-700 hover:text-gray-900"
          >
            Login
          </button>
          <button
            // This navigate call will now work correctly
            onClick={() => navigate('/Signup')}
            className="px-5 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
          >
            Sign Up
          </button>
        </div>

        {/* --- Mobile Hamburger Button --- */}
        <div className="md:hidden">
          <button 
            onClick={() => setIsMenuOpen(!isMenuOpen)} 
            className="p-2 rounded-md text-gray-700 hover:bg-gray-100"
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

      </div>

      {/* --- Mobile Dropdown Menu --- */}
      {/* This menu appears below the header on mobile when isMenuOpen is true */}
      <div 
        className={`md:hidden absolute top-full left-0 w-full bg-white border-b border-gray-200 shadow-md ${isMenuOpen ? 'block' : 'hidden'}`}
      >
        <nav className="flex flex-col p-4 space-y-2">
          {/* Mobile Nav Links */}
          <button 
            onClick={() => handleMobileNav('/Start')} 
            className="py-2 px-3 rounded text-left text-gray-700 hover:bg-gray-50"
          >
            Features
          </button>
          <button 
            onClick={() => handleMobileNav('/Pricing')}
            className="py-2 px-3 rounded text-left text-gray-700 hover:bg-gray-50"
          >
            Pricing
          </button>
          <button 
            onClick={() => handleMobileNav('/Features')}
            className="py-2 px-3 rounded text-left text-gray-700 hover:bg-gray-50"
          >
            Documentation
          </button>

          {/* Mobile Auth Buttons */}
          <div className="border-t border-gray-200 pt-4 mt-2 flex flex-col space-y-2">
            <button
              onClick={() => handleMobileNav('/Loginpage')}
              className="w-full text-left py-2 px-3 rounded text-gray-700 hover:bg-gray-50"
            >
              Login
            </button>
            <button
              onClick={() => handleMobileNav('/Signup')}
              className="w-full text-left px-3 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
            >
              Sign Up
            </button>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Navbar1;