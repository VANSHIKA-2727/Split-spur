import React, { useState } from 'react';
import { 
  BarChart, 
  CheckCircle, 
  Zap, 
  Brain, 
  TrendingUp, 
  Target, 
  Lightbulb 
} from 'lucide-react';
import Navbar from '../components/Navbar';
import { useNavigate } from "react-router-dom";

export default function SplitspurLanding() {
  const [email, setEmail] = useState('');
  const [showPauseModal, setShowPauseModal] = useState(false);
  const [selectedTest, setSelectedTest] = useState(null);
  
  // New state for toggling the list view
  const [isViewAll, setIsViewAll] = useState(false);

  const navigate = useNavigate();

  const activeTests = [
    {
      title: 'Product Page - Add to Cart Button Colour',
      status: 'Test is running',
      confidence: 97,
      visitors: 855,
      expectedLift: '+16.2%',
    },
    {
      title: 'Checkout Flow - Trust Badges Placement',
      status: 'Test is running',
      confidence: 60,
      visitors: 1055,
      expectedLift: '+8.4%',
    },
    {
      title: 'Homepage Hero - Value Proposition Copy',
      status: 'Test is running',
      confidence: 92,
      visitors: 1210,
      expectedLift: '+21.3%',
    },
  ];

  const activities = [
    {
      icon: <Zap className="w-4 h-4" />,
      text: 'AI recommendation implemented - conversion up 15%',
      time: '1 hour ago',
      badge: '+223 (9)',
    },
    {
      icon: <Zap className="w-4 h-4" />,
      text: 'AI detected anomaly in Test B - traffic pattern unusual',
      time: '2 hours ago',
      badge: '+33 (8)',
    },
    {
      icon: <CheckCircle className="w-4 h-4" />,
      text: 'Homepage Hero CTA Test completed with True Win',
      time: '1 day ago',
    },
    {
      icon: <CheckCircle className="w-4 h-4" />,
      text: 'Email Signup Form Test reached statistical significance',
      time: '2 days ago',
      badge: '+203 (9)',
    },
  ];

  const features = [
    {
      icon: <Brain className="w-6 h-6" />,
      title: 'Smart Test Ideas',
      description: 'Get intelligent test suggestions in seconds based on your industry and data',
      bgColor: 'bg-purple-50',
    },
    {
      icon: <Target className="w-6 h-6" />,
      title: 'Predictive Analysis',
      description: 'Know what will work before testing with AI-powered predictions',
      bgColor: 'bg-blue-50',
    },
    {
      icon: <TrendingUp className="w-6 h-6" />,
      title: 'Auto-Optimization',
      description: 'Multi-Armed Bandit automatically sends traffic to winning variants',
      bgColor: 'bg-green-50',
    },
    {
      icon: <Lightbulb className="w-6 h-6" />,
      title: 'AI Insights',
      description: 'Surface key findings and actionable recommendations instantly',
      bgColor: 'bg-orange-50',
    },
  ];

  const handlePauseClick = (test) => {
    setSelectedTest(test);
    setShowPauseModal(true);
  };

  const handleConfirmPause = () => {
    console.log('Pausing test:', selectedTest.title);
    setShowPauseModal(false);
    setSelectedTest(null);
  };

  // Determine which tests to show based on state
  const displayedTests = isViewAll ? activeTests : activeTests.slice(0, 2);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <main className="max-w-7xl mx-auto px-6 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900 mb-1">Welcome Back, Varun</h1>
          <p className="text-gray-600 text-sm">Here's what's happening with your testing program</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
            <div className="flex items-start justify-between mb-4">
              <div>
                <p className="text-gray-600 text-sm mb-1">Active Tests</p>
                <p className="text-3xl font-bold">12</p>
              </div>
              <div className="w-10 h-10 bg-blue-500 rounded flex items-center justify-center">
                <BarChart className="w-5 h-5 text-white" />
              </div>
            </div>
            <p className="text-green-600 text-sm">+2 this week</p>
          </div>

          <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
            <div className="flex items-start justify-between mb-4">
              <div>
                <p className="text-gray-600 text-sm mb-1">Tests Completed</p>
                <p className="text-3xl font-bold">30</p>
              </div>
              <div className="w-10 h-10 bg-green-500 rounded flex items-center justify-center">
                <CheckCircle className="w-5 h-5 text-white" />
              </div>
            </div>
            <p className="text-green-600 text-sm">+8 this month</p>
          </div>

          <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
            <div className="flex items-start justify-between mb-4">
              <div>
                <p className="text-gray-600 text-sm mb-1">AI-Optimized Wins</p>
                <p className="text-3xl font-bold">12</p>
              </div>
              <div className="w-10 h-10 bg-purple-500 rounded flex items-center justify-center">
                <Zap className="w-5 h-5 text-white" />
              </div>
            </div>
            <p className="text-green-600 text-sm">+5 this month</p>
          </div>
        </div>

        {/* Active Tests Section with View All/Less toggle */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-8">
          <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
            <h2 className="text-lg font-semibold">Active Tests</h2>
            <button 
              onClick={() => setIsViewAll(!isViewAll)}
              className="text-sm font-medium text-blue-600 hover:text-blue-700 transition-colors"
            >
              {isViewAll ? 'View Less' : 'View All'}
            </button>
          </div>

          <div className="p-6 space-y-4">
            {displayedTests.map((test, index) => (
              <div key={index} className="border border-gray-200 rounded-lg p-4">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="font-medium text-gray-900 mb-2">{test.title}</h3>
                    <span className="inline-flex items-center gap-1 text-xs text-gray-600 bg-gray-100 px-2 py-1 rounded">
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-pulse"></div>
                      {test.status}
                    </span>
                  </div>

                  <div className="flex gap-2">
                    <button 
                      onClick={() => handlePauseClick(test)}
                      className="px-6 py-2 border border-gray-300 rounded text-sm hover:bg-gray-50"
                    >
                      Pause
                    </button>
                    <button
                      onClick={() => navigate('/Viewreport')}
                      className="px-6 py-2 bg-blue-600 text-white text-sm font-bold rounded-lg hover:bg-blue-700 transition-all shadow-sm active:scale-95"
                    >
                      View Report
                    </button>
                  </div>
                </div>

                <div className="mb-3">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm text-gray-600">Statistical Confidence</span>
                    <span className="text-sm font-semibold">{test.confidence}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-blue-600 h-2 rounded-full" style={{ width: `${test.confidence}%` }}></div>
                  </div>
                </div>

                <p className="text-sm text-gray-600 mb-2">
                  Visitors: <span className="font-medium text-gray-900">{test.visitors}</span>
                </p>

                <p className="text-sm text-gray-600">
                  Expected Conversion Lift: <span className="text-green-600 font-medium">{test.expectedLift}</span>
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Activity Feed */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-8">
          <div className="px-6 py-4 space-y-3">
            {activities.map((activity, index) => (
              <div key={index} className="flex items-start gap-3 py-2">
                <div className="mt-1">{activity.icon}</div>
                <div className="flex-1">
                  <p className="text-sm text-gray-900">{activity.text}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-xs text-gray-500">{activity.time}</span>
                    {activity.badge && (
                      <span className="text-xs text-gray-600 bg-gray-100 px-2 py-0.5 rounded">
                        {activity.badge}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* AI-Powered Section */}
        <div className="text-center mb-8">
          <button className="bg-purple-100 text-purple-700 px-6 py-3 rounded-full text-sm font-medium hover:bg-purple-200">
            AI-Powered Testing Platform
          </button>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-2 gap-6 mb-12">
          {features.map((feature, index) => (
            <div key={index} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex items-start gap-4">
                <div className={`${feature.bgColor} w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0`}>
                  {feature.icon}
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">{feature.title}</h3>
                  <p className="text-sm text-gray-600">{feature.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <footer className="border-t border-gray-200 pt-8">
          <div className="grid grid-cols-4 gap-8">
            <div>
              <h4 className="font-semibold text-gray-900 mb-4">Stay Updated</h4>
              <p className="text-sm text-gray-600 mb-4">Get the latest features and testing insights</p>
              <div className="flex gap-2">
                <input
                  type="email"
                  placeholder="your@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="flex-1 px-3 py-2 border border-gray-300 rounded text-sm"
                />
                <button className="bg-blue-600 text-white px-4 py-2 rounded text-sm hover:bg-blue-700">→</button>
              </div>
            </div>

            <div>
              <h4 className="font-semibold text-gray-900 mb-4">Product</h4>
              <ul className="space-y-2 text-sm text-gray-600">
                <li><a href="#" className="hover:text-gray-900">Features</a></li>
                <li><a href="#" className="hover:text-gray-900">Pricing</a></li>
                <li><a href="#" className="hover:text-gray-900">Documentation</a></li>
                <li><a href="#" className="hover:text-gray-900">API Reference</a></li>
                <li><a href="#" className="hover:text-gray-900">Integrations</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-gray-900 mb-4">Company</h4>
              <ul className="space-y-2 text-sm text-gray-600">
                <li><a href="#" className="hover:text-gray-900">About Us</a></li>
                <li><a href="#" className="hover:text-gray-900">Blog</a></li>
                <li><a href="#" className="hover:text-gray-900">Contact Us</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-gray-900 mb-4">Resources</h4> 
              <ul className="space-y-2 text-sm text-gray-600">
                <li><a href="#" className="hover:text-gray-900">Help</a></li>
                <li><a href="#" className="hover:text-gray-900">Community</a></li>
                <li><a href="#" className="hover:text-gray-900">Tutorials</a></li>
              </ul>
            </div>
          </div>
        </footer>
      </main>

      {/* Pause Test Modal */}
      {showPauseModal && selectedTest && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-2xl w-full p-8 relative shadow-xl">
            {selectedTest.visitors >= 1000 ? (
              <>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Pause Test</h2>
                <p className="text-gray-900 mb-6">Pausing {selectedTest.title}</p>
                <ul className="space-y-2 mb-6">
                  <li className="text-gray-900">
                    • Visitors: <span className="font-semibold text-red-600">{selectedTest.visitors}</span>
                  </li>
                  <li className="text-gray-900">
                    • Current leader: Variant B ({selectedTest.expectedLift})
                  </li>
                  <li className="text-gray-900">
                    • Confidence: {selectedTest.confidence}%
                  </li>
                </ul>
                <p className="text-gray-900 mb-8">
                  Pausing now may prevent reaching statistically significant results.
                </p>
                <div className="flex justify-end gap-3">
                  <button
                    onClick={() => setShowPauseModal(false)}
                    className="px-6 py-2 border border-gray-300 rounded-lg text-gray-900 hover:bg-gray-50 font-medium"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleConfirmPause}
                    className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium"
                  >
                    Yes, Pause Test
                  </button>
                </div>
              </>
            ) : (
              <>
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Test needs more data</h2>
                <p className="text-gray-900 mb-4">
                  Please wait until your test reaches <span className="font-semibold">1,000 visitors</span> before pausing to ensure statistically reliable results.
                </p>
                <p className="text-gray-900 mb-6">
                  Current progress: <span className="font-semibold text-red-600">{selectedTest.visitors}/1000</span> visitors
                </p>
                <ul className="space-y-2 mb-8">
                  <li className="text-gray-900">• Continuing the test ensures accurate winner detection</li>
                  <li className="text-gray-900">• Pausing now may lead to inconclusive results</li>
                </ul>
                <div className="flex justify-end">
                  <button
                    onClick={() => setShowPauseModal(false)}
                    className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium"
                  >
                    Close
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}