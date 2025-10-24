import React, { useState } from 'react';

export default function Dashboard() {
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showNavDropdown, setShowNavDropdown] = useState(false);

  const stats = [
    { title: 'Active Tests', value: '12', color: 'bg-gradient-to-br from-blue-500 to-blue-600', icon: '📊' },
    { title: 'Tests Completed', value: '48', color: 'bg-gradient-to-br from-green-500 to-green-600', icon: '✅' },
    { title: 'AI-Optimized Wins', value: '23', color: 'bg-gradient-to-br from-purple-500 to-purple-600', icon: '🎯' }
  ];

  const features = [
    {
      icon: '🧠',
      bgColor: 'bg-pink-50',
      iconBg: 'bg-pink-100',
      title: 'Smart Test Ideas',
      description: 'Get intelligent test suggestions in seconds based on your industry and audience'
    },
    {
      icon: '🔮',
      bgColor: 'bg-blue-50',
      iconBg: 'bg-blue-100',
      title: 'Predictive Analysis',
      description: 'Know what will work before testing with AI-powered predictions'
    },
    {
      icon: '🎯',
      bgColor: 'bg-green-50',
      iconBg: 'bg-green-100',
      title: 'Auto-Optimization',
      description: 'Multi-Armed Bandit automatically sends traffic to winning variants'
    },
    {
      icon: '✨',
      bgColor: 'bg-orange-50',
      iconBg: 'bg-orange-100',
      title: 'AI Insights',
      description: 'Surface key findings and actionable recommendations instantly'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-lg border-b border-gray-200 sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Left side - Logo with Dropdown */}
            <div className="flex items-center">
              <div className="relative">
                <div 
                  onClick={() => setShowNavDropdown(!showNavDropdown)}
                  className="flex items-center space-x-3 cursor-pointer group"
                >
                  <div className="w-9 h-9 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg shadow-lg group-hover:shadow-xl transition-shadow duration-300"></div>
                  <div className="flex items-center">
                    <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Splitspur</span>
                    <svg 
                      className={`w-4 h-4 ml-1 transition-transform duration-200 ${showNavDropdown ? 'rotate-180' : ''}`} 
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>

                {/* Dropdown Menu */}
                {showNavDropdown && (
                  <div className="absolute top-full left-0 mt-2 w-48 bg-white rounded-lg shadow-xl border border-gray-200 z-50 animate-in fade-in slide-in-from-top-2 duration-200">
                    <a 
                      href="#" 
                      className="block px-4 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-600 rounded-t-lg border-b border-gray-100 flex items-center transition-colors duration-200"
                      onClick={() => setShowNavDropdown(false)}
                    >
                      <svg className="w-4 h-4 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                      </svg>
                      Dashboard
                    </a>
                    <a 
                      href="#" 
                      className="block px-4 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-600 border-b border-gray-100 flex items-center transition-colors duration-200"
                      onClick={() => setShowNavDropdown(false)}
                    >
                      <svg className="w-4 h-4 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                      </svg>
                      Tests
                    </a>
                    <a 
                      href="#" 
                      className="block px-4 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-600 border-b border-gray-100 flex items-center transition-colors duration-200"
                      onClick={() => setShowNavDropdown(false)}
                    >
                      <svg className="w-4 h-4 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                      </svg>
                      Insights
                    </a>
                    <a 
                      href="#" 
                      className="block px-4 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-600 rounded-b-lg flex items-center transition-colors duration-200"
                      onClick={() => setShowNavDropdown(false)}
                    >
                      <svg className="w-4 h-4 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                      Analytics
                    </a>
                  </div>
                )}
              </div>
            </div>

            {/* Center - Navigation Links (Removed since we have dropdown) */}
            <div className="flex-1"></div>

            {/* Right side - Buttons */}
            <div className="flex items-center space-x-3">
              <button className="px-5 py-2.5 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all duration-300 shadow-md hover:shadow-lg font-medium flex items-center space-x-2">
                <span className="text-lg">+</span>
                <span>Create New Test</span>
              </button>
              <div className="relative">
                <button 
                  onClick={() => setShowLoginModal(!showLoginModal)}
                  className="w-10 h-10 bg-gradient-to-br from-gray-100 to-gray-200 rounded-full flex items-center justify-center hover:from-gray-200 hover:to-gray-300 transition-all duration-300 shadow-sm hover:shadow-md"
                >
                  <svg className="w-5 h-5 text-gray-700" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                  </svg>
                </button>
                
                {showLoginModal && (
                  <div className="absolute right-0 mt-3 w-56 bg-white rounded-xl shadow-2xl border border-gray-100 p-4 z-50 animate-in fade-in slide-in-from-top-2 duration-200">
                    <div className="mb-3">
                      <p className="text-xs font-semibold text-gray-500 mb-2 uppercase tracking-wide">New User?</p>
                      <button className="w-full py-2.5 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all duration-300 text-sm font-medium shadow-sm hover:shadow-md">
                        Sign Up
                      </button>
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-gray-500 mb-2 uppercase tracking-wide">Existing User?</p>
                      <button className="w-full py-2.5 bg-gradient-to-r from-purple-600 to-purple-700 text-white rounded-lg hover:from-purple-700 hover:to-purple-800 transition-all duration-300 text-sm font-medium shadow-sm hover:shadow-md">
                        Log In
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Close dropdown when clicking outside */}
      {showNavDropdown && (
        <div 
          className="fixed inset-0 z-40" 
          onClick={() => setShowNavDropdown(false)}
        ></div>
      )}

      {/* Rest of your main content remains exactly the same */}
      <main className="max-w-7xl mx-auto px-6 lg:px-8 py-12">
        {/* Welcome Section */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-900 via-blue-900 to-purple-900 bg-clip-text text-transparent mb-3">
            Welcome Back, Varun
          </h1>
          <p className="text-gray-600 text-lg">Here's what's happening with your testing program</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {stats.map((stat, index) => (
            <div 
              key={index} 
              className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 p-8 group hover:-translate-y-1"
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <p className="text-gray-500 text-sm font-medium mb-3 uppercase tracking-wide">{stat.title}</p>
                  <p className="text-5xl font-bold text-gray-900 mb-2">{stat.value}</p>
                  <div className="w-16 h-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"></div>
                </div>
                <div className={`w-10 h-10 ${stat.color} rounded-lg flex items-center justify-center text-3xl shadow-md group-hover:scale-110 transition-transform duration-300 flex-shrink-0`}>
                  {stat.icon}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Active Tests Section */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 mb-12 overflow-hidden">
          <div className="bg-gradient-to-r from-gray-50 to-blue-50 p-6 border-b border-gray-200">
            <h2 className="text-2xl font-bold text-gray-900">Active Tests</h2>
          </div>
          <div className="p-16 text-center bg-gradient-to-br from-gray-50 to-blue-50">
            <div className="max-w-md mx-auto">
              <div className="w-20 h-20 bg-gradient-to-br from-blue-100 to-purple-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-10 h-10 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <p className="text-gray-600 text-lg mb-6">Log in / Sign up to get started with your first test</p>
              <div className="flex gap-3 justify-center">
                <button className="px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all duration-300 font-medium shadow-md hover:shadow-lg">
                  Sign Up
                </button>
                <button className="px-6 py-3 bg-white border-2 border-gray-200 text-gray-700 rounded-lg hover:border-gray-300 hover:bg-gray-50 transition-all duration-300 font-medium">
                  Log In
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* AI-Powered Testing Platform */}
        <div className="bg-gradient-to-br from-purple-100 via-blue-100 to-pink-100 rounded-3xl p-12 shadow-xl mb-12 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-purple-300 rounded-full opacity-20 blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-300 rounded-full opacity-20 blur-3xl"></div>
          
          <div className="relative z-10">
            <div className="text-center mb-12">
              <div className="inline-block bg-white/90 backdrop-blur-sm border-2 border-purple-300 rounded-full px-8 py-4 shadow-lg">
                <span className="text-purple-900 font-bold text-lg">✨ AI-Powered Testing Platform</span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
              {features.map((feature, index) => (
                <div 
                  key={index} 
                  className="bg-white/90 backdrop-blur-sm rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border border-white/50 hover:-translate-y-1 group"
                >
                  <div className="flex items-start space-x-5">
                    <div className={`${feature.iconBg} w-16 h-16 rounded-2xl flex items-center justify-center text-3xl shadow-md group-hover:scale-110 transition-transform duration-300 flex-shrink-0`}>
                      {feature.icon}
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 mb-3">{feature.title}</h3>
                      <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer className="mt-20 pt-12 border-t border-gray-200">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
            <div className="md:col-span-1">
              <h4 className="font-bold text-gray-900 mb-4 text-lg">Stay Updated</h4>
              <p className="text-sm text-gray-600 mb-6 leading-relaxed">Get the latest features and testing insights delivered to your inbox</p>
              <div className="flex">
                <input 
                  type="email" 
                  placeholder="your@email.com"
                  className="flex-1 px-4 py-3 border border-gray-300 rounded-l-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                />
                <button className="px-5 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-r-xl hover:from-blue-700 hover:to-blue-800 transition-all duration-300 font-medium shadow-sm hover:shadow-md">
                  →
                </button>
              </div>
            </div>
            
            <div>
              <h4 className="font-bold text-gray-900 mb-4 text-lg">Product</h4>
              <ul className="space-y-3">
                <li><a href="#" className="text-gray-600 hover:text-blue-600 transition-colors duration-200 text-sm">Features</a></li>
                <li><a href="#" className="text-gray-600 hover:text-blue-600 transition-colors duration-200 text-sm">Pricing</a></li>
                <li><a href="#" className="text-gray-600 hover:text-blue-600 transition-colors duration-200 text-sm">Documentation</a></li>
                <li><a href="#" className="text-gray-600 hover:text-blue-600 transition-colors duration-200 text-sm">API Reference</a></li>
                <li><a href="#" className="text-gray-600 hover:text-blue-600 transition-colors duration-200 text-sm">Integrations</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-bold text-gray-900 mb-4 text-lg">Company</h4>
              <ul className="space-y-3">
                <li><a href="#" className="text-gray-600 hover:text-blue-600 transition-colors duration-200 text-sm">About Us</a></li>
                <li><a href="#" className="text-gray-600 hover:text-blue-600 transition-colors duration-200 text-sm">Blog</a></li>
                <li><a href="#" className="text-gray-600 hover:text-blue-600 transition-colors duration-200 text-sm">Contact Us</a></li>
                <li><a href="#" className="text-gray-600 hover:text-blue-600 transition-colors duration-200 text-sm">Careers</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-bold text-gray-900 mb-4 text-lg">Resources</h4>
              <ul className="space-y-3">
                <li><a href="#" className="text-gray-600 hover:text-blue-600 transition-colors duration-200 text-sm">Help Center</a></li>
                <li><a href="#" className="text-gray-600 hover:text-blue-600 transition-colors duration-200 text-sm">Community</a></li>
                <li><a href="#" className="text-gray-600 hover:text-blue-600 transition-colors duration-200 text-sm">Tutorials</a></li>
                <li><a href="#" className="text-gray-600 hover:text-blue-600 transition-colors duration-200 text-sm">Status</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-200 pt-8 pb-6">
            <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
              <p className="text-sm text-gray-500">© 2025 Splitspur. All rights reserved.</p>
              <div className="flex space-x-6">
                <a href="#" className="text-gray-400 hover:text-gray-600 transition-colors">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/></svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-gray-600 transition-colors">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-gray-600 transition-colors">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
                </a>
              </div>
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
}