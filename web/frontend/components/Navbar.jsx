import { Bell } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';

export default function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();

  const navLinks = [
    { name: 'Dashboard', path: '/Pagename' },
    { name: 'Tests', path: '/TestPage' },
    { name: 'Insights', path: '/Insightspage' },
    { name: 'Analytics', path: '/Analyticspage' },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <header className="bg-white border-b border-gray-200 px-6 py-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
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

          {/* Navigation */}
          <nav className="flex gap-6 text-sm">
            {navLinks.map((link) => (
              <button
                key={link.path}
                onClick={() => navigate(link.path)}
                className={`transition-colors ${
                  isActive(link.path)
                    ? 'text-gray-900 font-semibold border-b-2 border-gray-900 pb-1'
                    : 'text-gray-700 hover:text-gray-900'
                }`}
              >
                {link.name}
              </button>
            ))}
          </nav>
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-4">
          {/* Create New Test Button */}
          <button
            onClick={() => navigate('/Testcreatepage')}
            className="bg-blue-600 text-white px-4 py-2 rounded text-sm font-medium hover:bg-blue-700 transition-colors"
          >
            + Create New Test
          </button>

          {/* Notifications */}
          <button className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors flex items-center justify-center">
            <Bell className="w-4 h-4 text-gray-700" />
          </button>

          {/* User Avatar */}
          <button className="w-8 h-8 rounded-full bg-gray-800 hover:bg-gray-700 transition-colors flex items-center justify-center text-white text-sm font-medium">
            V
          </button>
        </div>
      </div>
    </header>
  );
}
