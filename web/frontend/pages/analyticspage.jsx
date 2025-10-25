import React, { useState } from 'react';
import { TrendingUp, Users, Target, ArrowLeft, Calendar } from 'lucide-react';

const AnalyticsDashboard = () => {
  const [activeTab, setActiveTab] = useState('trends');

  const stats = [
    { label: 'Total Visitors', value: '158,842', icon: Users, trend: null },
    { label: 'Total Conversions', value: '24,567', icon: Target, trend: null },
    { label: 'Conversion Rate', value: '15.66%', icon: TrendingUp, trend: null },
    { label: 'Avg Test Lift', value: '+12.4%', icon: TrendingUp, trend: 'up' }
  ];

  const testVelocityData = [
    { device: 'Desktop', avgLift: '+14.2%', convRate: '18.4%', performance: 85, tests: 4 },
    { device: 'Mobile', avgLift: '+12.8%', convRate: '15.7%', performance: 60, tests: 1 }
  ];

  const trendData = [
    { month: 'Jan 1', desktop: 35, mobile: 25 },
    { month: 'Feb 1', desktop: 45, mobile: 30 },
    { month: 'Mar 1', desktop: 50, mobile: 35 },
    { month: 'Apr 1', desktop: 65, mobile: 40 },
    { month: 'May 1', desktop: 70, mobile: 50 },
    { month: 'Jun 1', desktop: 40, mobile: 30 }
  ];

  const conversionRateData = [
    { date: 'Sep 1', rate: 14.2 },
    { date: 'Oct 1', rate: 14.8 },
    { date: 'Nov 1', rate: 15.1 },
    { date: 'Dec 1', rate: 15.3 },
    { date: 'Jan 1', rate: 15.5 },
    { date: 'Feb 1', rate: 15.8 },
    { date: 'Mar 1', rate: 16.2 },
    { date: 'Apr 1', rate: 16.0 },
    { date: 'May 1', rate: 15.9 },
    { date: 'Jun 1', rate: 15.7 },
    { date: 'Jul 1', rate: 15.6 },
    { date: 'Aug 1', rate: 15.66 },
    { date: 'Sep 1', rate: 15.7 },
    { date: 'Oct 1', rate: 15.8 }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between max-w-7xl mx-auto">
          <div className="flex items-center gap-8">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-black rounded"></div>
              <span className="font-semibold text-lg">Splitspur</span>
            </div>
            <nav className="flex gap-6 text-sm">
              <button className="text-gray-600 hover:text-gray-900">Dashboard</button>
              <button className="text-gray-600 hover:text-gray-900">Tests</button>
              <button className="text-gray-600 hover:text-gray-900">Insights</button>
              <button className="text-gray-900 font-medium">Analytics</button>
            </nav>
          </div>
          <div className="flex items-center gap-3">
            <button className="bg-blue-600 text-white px-4 py-2 rounded text-sm font-medium hover:bg-blue-700">
              + Create New Test
            </button>
            <button className="w-9 h-9 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-50">
              <Calendar className="w-4 h-4 text-gray-600" />
            </button>
            <button className="w-9 h-9 rounded-full bg-gray-900 flex items-center justify-center text-white text-sm font-medium">
              
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900 mb-1">Analytics Overview</h1>
          <p className="text-sm text-gray-500">Comprehensive analytics across all your A/B tests</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-4 gap-4 mb-8">
          {stats.map((stat, idx) => (
            <div key={idx} className="bg-white rounded-lg border border-gray-200 p-5">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-gray-600">{stat.label}</span>
                <stat.icon className="w-4 h-4 text-gray-400" />
              </div>
              <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
            </div>
          ))}
        </div>

        {/* Tabs */}
        <div className="flex gap-6 border-b border-gray-200 mb-6">
          <button
            onClick={() => setActiveTab('trends')}
            className={`pb-3 px-1 text-sm font-medium border-b-2 transition-colors ${
              activeTab === 'trends'
                ? 'border-blue-600 text-blue-600'
                : 'border-transparent text-gray-600 hover:text-gray-900'
            }`}
          >
            Trends
          </button>
          <button
            onClick={() => setActiveTab('velocity')}
            className={`pb-3 px-1 text-sm font-medium border-b-2 transition-colors ${
              activeTab === 'velocity'
                ? 'border-blue-600 text-blue-600'
                : 'border-transparent text-gray-600 hover:text-gray-900'
            }`}
          >
            Test Velocity
          </button>
          <button
            onClick={() => setActiveTab('devices')}
            className={`pb-3 px-1 text-sm font-medium border-b-2 transition-colors ${
              activeTab === 'devices'
                ? 'border-blue-600 text-blue-600'
                : 'border-transparent text-gray-600 hover:text-gray-900'
            }`}
          >
            Devices
          </button>
        </div>

        {/* Content Area */}
        {activeTab === 'trends' && (
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <div className="mb-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-1">Conversion Rate Trends</h2>
              <p className="text-sm text-gray-500">Comparing control groups vs variants across all active tests</p>
            </div>
            
            {/* Line Chart */}
            <div className="relative h-64">
              <svg width="100%" height="100%" viewBox="0 0 800 250">
                {/* Grid lines */}
                <line x1="50" y1="200" x2="750" y2="200" stroke="#e5e7eb" strokeWidth="1" />
                <line x1="50" y1="150" x2="750" y2="150" stroke="#e5e7eb" strokeWidth="1" />
                <line x1="50" y1="100" x2="750" y2="100" stroke="#e5e7eb" strokeWidth="1" />
                <line x1="50" y1="50" x2="750" y2="50" stroke="#e5e7eb" strokeWidth="1" />
                
                {/* Y-axis labels */}
                <text x="30" y="205" fontSize="12" fill="#9ca3af">0%</text>
                <text x="20" y="155" fontSize="12" fill="#9ca3af">10%</text>
                <text x="20" y="105" fontSize="12" fill="#9ca3af">20%</text>
                <text x="20" y="55" fontSize="12" fill="#9ca3af">30%</text>
                
                {/* Line path */}
                <path
                  d="M 50 180 L 100 175 L 200 170 L 300 165 L 400 160 L 500 155 L 600 150 L 650 152 L 700 153 L 750 155"
                  fill="none"
                  stroke="#93c5fd"
                  strokeWidth="2"
                />
                
                {/* X-axis labels */}
                {conversionRateData.slice(0, 8).map((item, idx) => (
                  <text
                    key={idx}
                    x={50 + (idx * 100)}
                    y="225"
                    fontSize="11"
                    fill="#9ca3af"
                    textAnchor="middle"
                  >
                    {item.date}
                  </text>
                ))}
                <text x="750" y="225" fontSize="11" fill="#9ca3af" textAnchor="middle">Oct 1</text>
              </svg>
              
              <div className="absolute bottom-4 right-4 flex items-center gap-2 text-xs text-gray-500">
                <span className="flex items-center gap-1">
                  <span className="w-3 h-0.5 bg-blue-400"></span>
                  All Active Tests
                </span>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'velocity' && (
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <div className="mb-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-1">Test Velocity Over Time</h2>
              <p className="text-sm text-gray-500">Track how many tests you're creating and completing each month</p>
            </div>
            
            {/* Bar Chart */}
            <div className="relative h-64 mb-8">
              <svg width="100%" height="100%" viewBox="0 0 700 250">
                {/* Grid lines */}
                <line x1="50" y1="200" x2="650" y2="200" stroke="#e5e7eb" strokeWidth="1" />
                
                {/* Y-axis labels */}
                <text x="30" y="205" fontSize="12" fill="#9ca3af">0</text>
                <text x="20" y="155" fontSize="12" fill="#9ca3af">25</text>
                <text x="20" y="105" fontSize="12" fill="#9ca3af">50</text>
                <text x="20" y="55" fontSize="12" fill="#9ca3af">75</text>
                
                {/* Bars */}
                {trendData.map((item, idx) => {
                  const x = 80 + (idx * 100);
                  const desktopHeight = (item.desktop / 75) * 150;
                  const mobileHeight = (item.mobile / 75) * 150;
                  
                  return (
                    <g key={idx}>
                      {/* Desktop bar */}
                      <rect
                        x={x}
                        y={200 - desktopHeight}
                        width="30"
                        height={desktopHeight}
                        fill="#60a5fa"
                        rx="2"
                      />
                      {/* Mobile bar */}
                      <rect
                        x={x + 35}
                        y={200 - mobileHeight}
                        width="30"
                        height={mobileHeight}
                        fill="#34d399"
                        rx="2"
                      />
                      {/* Month label */}
                      <text
                        x={x + 30}
                        y="220"
                        fontSize="11"
                        fill="#9ca3af"
                        textAnchor="middle"
                      >
                        {item.month}
                      </text>
                    </g>
                  );
                })}
              </svg>
              
              <div className="absolute bottom-4 right-4 flex items-center gap-4 text-xs">
                <span className="flex items-center gap-2">
                  <span className="w-3 h-3 bg-blue-400 rounded"></span>
                  <span className="text-gray-600">Desktop</span>
                </span>
                <span className="flex items-center gap-2">
                  <span className="w-3 h-3 bg-emerald-400 rounded"></span>
                  <span className="text-gray-600">Mobile</span>
                </span>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'devices' && (
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <div className="mb-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-1">Test Velocity Over Time</h2>
              <p className="text-sm text-gray-500">Track how many tests you're creating and completing each month</p>
            </div>
            
            {testVelocityData.map((device, idx) => (
              <div key={idx} className="mb-6 last:mb-0">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <h3 className="font-semibold text-gray-900">{device.device}</h3>
                  </div>
                  <span className="text-sm text-gray-600">{device.tests} Tests</span>
                </div>
                
                <div className="grid grid-cols-3 gap-4 mb-3">
                  <div>
                    <div className="text-xs text-gray-500 mb-1">Avg Lift</div>
                    <div className="text-lg font-semibold text-gray-900">{device.avgLift}</div>
                  </div>
                  <div>
                    <div className="text-xs text-gray-500 mb-1">Conv. Rate</div>
                    <div className="text-lg font-semibold text-gray-900">{device.convRate}</div>
                  </div>
                  <div>
                    <div className="text-xs text-gray-500 mb-1">Performance</div>
                    <div className="flex items-center gap-2">
                      <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-blue-500 rounded-full" 
                          style={{width: `${device.performance}%`}}
                        ></div>
                      </div>
                      <span className="text-sm font-medium text-gray-700">{device.performance}%</span>
                    </div>
                  </div>
                </div>
                
                {idx < testVelocityData.length - 1 && (
                  <div className="border-t border-gray-200 mt-6"></div>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Back Button */}
        <button className="mt-8 flex items-center gap-2 px-4 py-2 border border-gray-300 rounded text-sm font-medium text-gray-700 hover:bg-gray-50">
          <ArrowLeft className="w-4 h-4" />
          Back to Dashboard
        </button>

        {/* Footer */}
        <div className="mt-12 pt-8 border-t border-gray-200">
          <div className="grid grid-cols-4 gap-8 text-sm">
            <div>
              <h4 className="font-semibold mb-3">Stay Updated</h4>
              <p className="text-gray-600 mb-2">Get the latest features and testing insights</p>
              <div className="flex gap-2">
                <input
                  type="email"
                  placeholder="you@email.com"
                  className="flex-1 px-3 py-1.5 border border-gray-300 rounded text-sm"
                />
                <button className="px-3 py-1.5 bg-blue-600 text-white rounded text-sm">→</button>
              </div>
            </div>
            <div>
              <h4 className="font-semibold mb-3">Product</h4>
              <ul className="space-y-2 text-gray-600">
                <li>Features</li>
                <li>Pricing</li>
                <li>Documentation</li>
                <li>API Reference</li>
                <li>Integrations</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-3">Product</h4>
              <ul className="space-y-2 text-gray-600">
                <li>About Us</li>
                <li>Blog</li>
                <li>Contact Us</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-3">Resources</h4>
              <ul className="space-y-2 text-gray-600">
                <li>Help</li>
                <li>Community</li>
                <li>Tutorials</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsDashboard;