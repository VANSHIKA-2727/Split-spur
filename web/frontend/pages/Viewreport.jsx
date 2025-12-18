import { useState } from 'react';
import { TrendingUp, TrendingDown, ArrowLeft, Share2 } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, BarChart, Bar } from 'recharts';
import Navbar from '../components/Navbar';
import { useNavigate } from "react-router-dom";

export default function SplitsurDashboard() {
  const [activeTab, setActiveTab] = useState('dashboard');

  const conversionData = [
    { date: 'Sep 1', variant1: 3.2, variant2: 2.8 },
    { date: 'Sep 8', variant1: 3.5, variant2: 3.1 },
    { date: 'Sep 15', variant1: 3.8, variant2: 3.3 },
    { date: 'Sep 22', variant1: 3.4, variant2: 3.0 },
    { date: 'Sep 29', variant1: 3.9, variant2: 3.5 },
    { date: 'Oct 6', variant1: 4.1, variant2: 3.4 },
    { date: 'Oct 13', variant1: 3.7, variant2: 3.2 },
    { date: 'Oct 20', variant1: 4.0, variant2: 3.6 },
  ];
  const navigate = useNavigate();
  const deviceData = [
    { device: 'Mobile', variant1: 3.8, variant2: 3.2 },
    { device: 'Desktop', variant1: 4.5, variant2: 3.9 },
    { device: 'Tablet', variant1: 3.6, variant2: 3.1 },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-6">
        {/* Back Button & Title */}
        <div className="flex items-center gap-3 mb-6">
          <button className="p-2 hover:bg-gray-100 rounded">
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Product Page - Add to Cart Button Color</h1>
            <p className="text-sm text-gray-600">Results from Sep 1st to Oct 20th</p>
            <span className="inline-block mt-1 px-2 py-0.5 bg-green-100 text-green-700 text-xs rounded">Test Completed</span>
          </div>
        </div>

        {/* Insights Panel */}
        <div className="bg-gradient-to-br from-purple-50 to-purple-100 border-2 border-purple-300 rounded-2xl p-8 mb-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="text-2xl">⚡</div>
            <h2 className="text-xl font-bold text-gray-900">AI Insights Panel</h2>
          </div>
          <p className="text-sm text-gray-600 mb-6 ml-11">Key findings and recommendations from your test</p>

          <div className="space-y-4">
            {/* Key Finding */}
            <div className="bg-white rounded-xl p-5 shadow-sm">
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 flex-shrink-0"></div>
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900 mb-2">Key Finding</h3>
                  <p className="text-sm text-gray-700 mb-3">The green CTA button in Variant B outperformed the blue one, especially with first-time visitors.</p>
                  <div className="flex gap-2">
                    <span className="px-3 py-1 bg-green-100 text-green-700 text-xs font-medium rounded-full">High impact</span>
                    <span className="px-3 py-1 bg-green-100 text-green-700 text-xs font-medium rounded-full">+8% conversion</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Statistical Note */}
            <div className="bg-white rounded-xl p-5 shadow-sm">
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 flex-shrink-0"></div>
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900 mb-2">Statistical Note</h3>
                  <p className="text-sm text-gray-700">Results are 75% confident across all user segments</p>
                </div>
              </div>
            </div>

            {/* Recommendation */}
            <div className="bg-white rounded-xl p-5 shadow-sm">
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 flex-shrink-0"></div>
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900 mb-2">Recommendation</h3>
                  <p className="text-sm text-gray-700 mb-3">Maximize impact by showing the green button</p>
                  <button className="px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white text-sm font-medium rounded-lg hover:opacity-90 transition-opacity">
                    Implement Changes
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Metrics Cards */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          {/* Winner Card */}
          <div className="bg-white rounded-lg border border-gray-200 p-5">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-8 h-8 bg-green-100 rounded flex items-center justify-center text-green-600">
                ✓
              </div>
              <span className="text-sm font-medium text-gray-700">Winner</span>
            </div>
            <div className="text-2xl font-bold text-gray-900 mb-1">Variant B</div>
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium text-gray-600">Conversion Rate:</span>
              <span className="text-green-600 font-semibold">4.2%</span>
            </div>
            <div className="flex items-center gap-1 text-green-600 text-sm mt-1">
              <TrendingUp className="w-4 h-4" />
              <span>+18.2%</span>
            </div>
          </div>

          {/* Confidence Card */}
          <div className="bg-white rounded-lg border border-gray-200 p-5">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-8 h-8 bg-blue-100 rounded flex items-center justify-center">
                <span className="text-blue-600"></span>
              </div>
              <span className="text-sm font-medium text-gray-700">Confidence</span>
            </div>
            <div className="text-2xl font-bold text-gray-900 mb-2">Statistical</div>
            <div className="w-full bg-gray-200 rounded-full h-2 mb-1">
              <div className="bg-blue-600 h-2 rounded-full" style={{ width: '75%' }}></div>
            </div>
            <span className="text-sm text-gray-600">75%</span>
          </div>

          {/* Test Duration Card */}
          <div className="bg-white rounded-lg border border-gray-200 p-5">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-8 h-8 bg-orange-100 rounded flex items-center justify-center">
                <span className="text-orange-600"></span>
              </div>
              <span className="text-sm font-medium text-gray-700">Test Duration</span>
            </div>
            <div className="text-2xl font-bold text-gray-900 mb-1">49 Days</div>
            <div className="text-sm text-gray-600">Sep 1st - Oct 19th</div>
            <div className="mt-1">
              <span className="text-sm font-semibold text-gray-900">Total:</span>
              <span className="text-sm text-gray-600 ml-1">18466</span>
            </div>
          </div>
        </div>

        {/* Conversion Rate Chart */}
        <div className="bg-white rounded-lg border border-gray-200 p-6 mb-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Conversion Rate Over Time</h3>
          <p className="text-sm text-gray-600 mb-4">Daily performance comparison between variants</p>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={conversionData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="date" tick={{ fontSize: 12 }} />
              <YAxis tick={{ fontSize: 12 }} />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="variant1" stroke="#10b981" strokeWidth={2} name="Variant B (Green)" dot={{ r: 3 }} />
              <Line type="monotone" dataKey="variant2" stroke="#6b7280" strokeWidth={2} name="Variant A (Control)" dot={{ r: 3 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Bottom Section */}
        <div className="grid grid-cols-2 gap-6 mb-6">
          {/* Variant Performance */}
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Variant Performance</h3>
            <div className="space-y-4">
              <div className="border-b pb-3">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium">Control (Blue Button)</span>
                  <span className="px-2 py-0.5 bg-gray-100 text-gray-700 text-xs rounded">Control</span>
                </div>
                <div className="grid grid-cols-3 gap-4 text-sm">
                  <div>
                    <div className="text-gray-600">Visitors</div>
                    <div className="font-semibold">9,234</div>
                  </div>
                  <div>
                    <div className="text-gray-600">Conversions</div>
                    <div className="font-semibold">334</div>
                  </div>
                  <div>
                    <div className="text-gray-600">Rate</div>
                    <div className="font-semibold">3.6%</div>
                  </div>
                </div>
              </div>
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium">Variant B (Green Button)</span>
                  <span className="px-2 py-0.5 bg-green-100 text-green-700 text-xs rounded">Winner</span>
                </div>
                <div className="grid grid-cols-3 gap-4 text-sm">
                  <div>
                    <div className="text-gray-600">Visitors</div>
                    <div className="font-semibold">9,232</div>
                  </div>
                  <div>
                    <div className="text-gray-600">Conversions</div>
                    <div className="font-semibold">388</div>
                  </div>
                  <div>
                    <div className="text-gray-600">Rate</div>
                    <div className="font-semibold text-green-600">4.2%</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Performance by Device */}
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Performance by Device</h3>
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={deviceData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="device" tick={{ fontSize: 12 }} />
                <YAxis tick={{ fontSize: 12 }} />
                <Tooltip />
                <Bar dataKey="variant1" fill="#10b981" name="Variant B" />
                <Bar dataKey="variant2" fill="#6b7280" name="Control" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-between">
          <button 
  // REDIRECTION LOGIC
  onClick={() => navigate("/Pagename")} 
  className="mt-6 flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 font-medium text-gray-700 transition-colors"
>
  <ArrowLeft className="w-4 h-4" />
  Back to Dashboard 
</button>
          <div className="flex gap-3">
            <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-md text-sm font-medium hover:bg-gray-50">
              <Share2 className="w-4 h-4" />
              Share Results
            </button>
            <button className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-md hover:bg-blue-700">
              Implement Winner
            </button>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 mt-12 px-6 py-8">
        <div className="max-w-7xl mx-auto grid grid-cols-4 gap-8">
          <div>
            <h4 className="font-semibold mb-3">Stay Updated</h4>
            <p className="text-sm text-gray-600 mb-2">Get the latest features and testing tips</p>
            <div className="flex gap-2">
              <input 
                type="email" 
                placeholder="name@email.com"
                className="flex-1 px-3 py-2 border border-gray-300 rounded text-sm"
              />
              <button className="px-4 py-2 bg-blue-600 text-white text-sm rounded hover:bg-blue-700">
                →
              </button>
            </div>
          </div>
          <div>
            <h4 className="font-semibold mb-3">Product</h4>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>Features</li>
              <li>Pricing</li>
              <li>Documentation</li>
              <li>Changelog</li>
              <li>Integrations</li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-3">Product</h4>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>Case Studies</li>
              <li>Blog</li>
              <li>Contact Us</li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-3">Resources</h4>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>Help Center</li>
              <li>Community</li>
              <li>Careers</li>
            </ul>
          </div>
        </div>
      </footer>
    </div>
  );
}