import React from 'react';
import { BarChart3, ArrowLeft, Bell, User } from 'lucide-react';
import Navbar from '../components/Navbar';
import { useNavigate } from "react-router-dom";



export default function SplitsurInsights() {
  const navigate = useNavigate();
  
  return (
    <div className="min-h-screen bg-gray-50">
     <Navbar />
      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-8">
        {/* Insight Card */}
        <div className="bg-white rounded-xl p-6 mb-6 shadow-sm">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center flex-shrink-0">
              <BarChart3 className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900 mb-2">
                Consistent Color Performance Pattern
              </h1>
              <p className="text-gray-600">
                Across 2 button tests, variations using primary blue colors outperformed red and green by an average of 18%. This pattern holds strong across all demographics.
              </p>
            </div>
          </div>
        </div>

        {/* Related Tests Section */}
        <div>
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Related Tests</h2>
          
          {/* Test Card 1 */}
          <div className="bg-white rounded-xl p-6 mb-4 shadow-sm">
            <div className="mb-4">
              <h3 className="text-lg font-semibold text-gray-900 mb-1">
                Product Page - Add to Cart Button Color
              </h3>
              <div className="flex items-center gap-4 text-sm text-gray-500">
                <span>Created 2025-09-15</span>
                <span>•</span>
                <span>Updated 2 hours ago</span>
              </div>
            </div>

            <div className="grid grid-cols-5 gap-6 mb-4">
              <div>
                <div className="text-sm text-gray-500 mb-1">Visitors</div>
                <div className="text-xl font-semibold text-gray-900">12,456</div>
              </div>
              <div>
                <div className="text-sm text-gray-500 mb-1">Conversions</div>
                <div className="text-xl font-semibold text-gray-900">1,847</div>
              </div>
              <div>
                <div className="text-sm text-gray-500 mb-1">Rate</div>
                <div className="text-xl font-semibold text-gray-900">14.8%</div>
              </div>
              <div>
                <div className="text-sm text-gray-500 mb-1">Leading Variant</div>
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-gray-900">Variant B</span>
                  <span className="text-sm text-green-600 font-medium">▲+16.2%</span>
                </div>
              </div>
              <div>
                <div className="text-sm text-gray-500 mb-1">Confidence</div>
                <div className="flex items-center gap-3">
                  <div className="flex-1 bg-gray-200 rounded-full h-2">
                    <div className="bg-blue-600 h-2 rounded-full" style={{ width: '77%' }}></div>
                  </div>
                  <span className="text-sm font-semibold text-gray-900">77%</span>
                </div>
              </div>
            </div>

            <button
      onClick={() => navigate("/Viewreport")} // 👈 Redirect to View Report page
      className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium text-sm"
    >
      View Report
    </button>
          </div>

          {/* Test Card 2 */}
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <div className="mb-4">
              <h3 className="text-lg font-semibold text-gray-900 mb-1">
                Checkout - Continue Shopping Button
              </h3>
              <div className="flex items-center gap-4 text-sm text-gray-500">
                <span>Created 2025-10-08</span>
                <span>•</span>
                <span>Updated 1 day ago</span>
              </div>
            </div>

            <div className="grid grid-cols-5 gap-6 mb-4">
              <div>
                <div className="text-sm text-gray-500 mb-1">Visitors</div>
                <div className="text-xl font-semibold text-gray-900">8,923</div>
              </div>
              <div>
                <div className="text-sm text-gray-500 mb-1">Conversions</div>
                <div className="text-xl font-semibold text-gray-900">1,245</div>
              </div>
              <div>
                <div className="text-sm text-gray-500 mb-1">Rate</div>
                <div className="text-xl font-semibold text-gray-900">13.9%</div>
              </div>
              <div>
                <div className="text-sm text-gray-500 mb-1">Leading Variant</div>
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-gray-900">Variant A</span>
                  <span className="text-sm text-green-600 font-medium">▲+22.1%</span>
                </div>
              </div>
              <div>
                <div className="text-sm text-gray-500 mb-1">Confidence</div>
                <div className="flex items-center gap-3">
                  <div className="flex-1 bg-gray-200 rounded-full h-2">
                    <div className="bg-blue-600 h-2 rounded-full" style={{ width: '89%' }}></div>
                  </div>
                  <span className="text-sm font-semibold text-gray-900">89%</span>
                </div>
              </div>
            </div>

            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium text-sm">
              View Report
            </button>
          </div>
        </div>

        {/* Back Button */}
        <button className="mt-6 flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 font-medium text-gray-700">
          <ArrowLeft className="w-4 h-4" />
          Back to Insights
        </button>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 mt-12">
        <div className="max-w-7xl mx-auto px-6 py-12">
          <div className="grid grid-cols-4 gap-8">
            <div>
              <h3 className="font-semibold text-gray-900 mb-4">Stay Updated</h3>
              <p className="text-sm text-gray-600 mb-4">Get the latest features and testing insights</p>
              <div className="flex gap-2">
                <input
                  type="email"
                  placeholder="your@email.com"
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                  →
                </button>
              </div>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-4">Product</h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li><a href="#" className="hover:text-gray-900">Features</a></li>
                <li><a href="#" className="hover:text-gray-900">Pricing</a></li>
                <li><a href="#" className="hover:text-gray-900">Documentation</a></li>
                <li><a href="#" className="hover:text-gray-900">API Reference</a></li>
                <li><a href="#" className="hover:text-gray-900">Integrations</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-4">Product</h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li><a href="#" className="hover:text-gray-900">About Us</a></li>
                <li><a href="#" className="hover:text-gray-900">Blog</a></li>
                <li><a href="#" className="hover:text-gray-900">Contact Us</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-4">Resources</h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li><a href="#" className="hover:text-gray-900">Help</a></li>
                <li><a href="#" className="hover:text-gray-900">Community</a></li>
                <li><a href="#" className="hover:text-gray-900">Tutorials</a></li>
              </ul>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}