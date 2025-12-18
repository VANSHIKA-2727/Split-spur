import React from 'react';
import { BarChart3, ArrowLeft, ChevronRight } from 'lucide-react';
import Navbar from '../components/Navbar';
import { useNavigate } from "react-router-dom";

export default function SplitsurInsights() {
  const navigate = useNavigate();
  
  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      <Navbar />
      
      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-8">
        
        {/* Top Insight Card */}
        <div className="bg-white rounded-xl p-6 mb-8 shadow-sm border border-gray-100">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg shadow-purple-100">
              <BarChart3 className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900 mb-2">
                Consistent Color Performance Pattern
              </h1>
              <p className="text-gray-600 leading-relaxed">
                Across 2 button tests, variations using primary blue colors outperformed red and green by an average of 18%. This pattern holds strong across all demographics.
              </p>
            </div>
          </div>
        </div>

        {/* Related Tests Section */}
        <div>
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Related Tests</h2>
          
          {/* Test Card 1 */}
          <div className="bg-white rounded-xl p-6 mb-6 shadow-sm border border-gray-100">
            {/* Header Flex Container: Keeps Title and Button in one line */}
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-lg font-bold text-gray-900 mb-1">
                  Product Page - Add to Cart Button Color
                </h3>
                <div className="flex items-center gap-4 text-xs text-gray-500 uppercase tracking-wider">
                  <span>Created 2025-09-15</span>
                  <span className="text-gray-300">•</span>
                  <span>Updated 2 hours ago</span>
                </div>
              </div>

              {/* View Report Button - Aligned Right */}
              <button
                onClick={() => navigate("/Viewreport")}
                className="flex items-center gap-2 px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium text-sm whitespace-nowrap shadow-sm hover:shadow"
              >
                View Report
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            {/* Metrics Grid */}
            <div className="grid grid-cols-2 md:grid-cols-5 gap-6 p-4 bg-gray-50 rounded-lg">
              <div>
                <div className="text-xs text-gray-500 font-medium mb-1">Visitors</div>
                <div className="text-xl font-bold text-gray-900">12,456</div>
              </div>
              <div>
                <div className="text-xs text-gray-500 font-medium mb-1">Conversions</div>
                <div className="text-xl font-bold text-gray-900">1,847</div>
              </div>
              <div>
                <div className="text-xs text-gray-500 font-medium mb-1">Rate</div>
                <div className="text-xl font-bold text-gray-900 text-blue-600">14.8%</div>
              </div>
              <div>
                <div className="text-xs text-gray-500 font-medium mb-1">Leading Variant</div>
                <div className="flex items-center gap-2">
                  <span className="font-bold text-gray-900">Variant B</span>
                  <span className="text-xs text-green-600 font-bold">▲+16.2%</span>
                </div>
              </div>
              <div className="col-span-2 md:col-span-1">
                <div className="text-xs text-gray-500 font-medium mb-1">Confidence</div>
                <div className="flex items-center gap-3">
                  <div className="flex-1 bg-gray-200 rounded-full h-2 min-w-[60px]">
                    <div className="bg-green-500 h-2 rounded-full" style={{ width: '77%' }}></div>
                  </div>
                  <span className="text-sm font-bold text-gray-900">77%</span>
                </div>
              </div>
            </div>
          </div>

          {/* Test Card 2 */}
          <div className="bg-white rounded-xl p-6 mb-6 shadow-sm border border-gray-100">
             {/* Header Flex Container */}
             <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-lg font-bold text-gray-900 mb-1">
                  Checkout - Continue Shopping Button
                </h3>
                <div className="flex items-center gap-4 text-xs text-gray-500 uppercase tracking-wider">
                  <span>Created 2025-10-08</span>
                  <span className="text-gray-300">•</span>
                  <span>Updated 1 day ago</span>
                </div>
              </div>

              <button
                onClick={() => navigate("/Viewreport")}
                className="flex items-center gap-2 px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium text-sm whitespace-nowrap shadow-sm hover:shadow"
              >
                View Report
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            {/* Metrics Grid */}
            <div className="grid grid-cols-2 md:grid-cols-5 gap-6 p-4 bg-gray-50 rounded-lg">
              <div>
                <div className="text-xs text-gray-500 font-medium mb-1">Visitors</div>
                <div className="text-xl font-bold text-gray-900">8,923</div>
              </div>
              <div>
                <div className="text-xs text-gray-500 font-medium mb-1">Conversions</div>
                <div className="text-xl font-bold text-gray-900">1,245</div>
              </div>
              <div>
                <div className="text-xs text-gray-500 font-medium mb-1">Rate</div>
                <div className="text-xl font-bold text-gray-900 text-blue-600">13.9%</div>
              </div>
              <div>
                <div className="text-xs text-gray-500 font-medium mb-1">Leading Variant</div>
                <div className="flex items-center gap-2">
                  <span className="font-bold text-gray-900">Variant A</span>
                  <span className="text-xs text-green-600 font-bold">▲+22.1%</span>
                </div>
              </div>
              <div className="col-span-2 md:col-span-1">
                <div className="text-xs text-gray-500 font-medium mb-1">Confidence</div>
                <div className="flex items-center gap-3">
                  <div className="flex-1 bg-gray-200 rounded-full h-2 min-w-[60px]">
                    <div className="bg-green-500 h-2 rounded-full" style={{ width: '89%' }}></div>
                  </div>
                  <span className="text-sm font-bold text-gray-900">89%</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Back Button */}
        <button 
          onClick={() => navigate("/Pagename")} 
          className="mt-6 flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 font-medium text-gray-700 transition-colors shadow-sm"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Dashboard 
        </button>
      </main>

      {/* Footer (Condensed version) */}
      <footer className="bg-white border-t border-gray-200 mt-12 py-12">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8">
          <div>
            <h3 className="font-bold text-gray-900 mb-4">Stay Updated</h3>
            <div className="flex gap-2">
              <input type="email" placeholder="Email" className="w-full px-3 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none" />
              <button className="bg-blue-600 text-white px-3 py-2 rounded-lg">→</button>
            </div>
          </div>
          <div>
            <h3 className="font-bold text-gray-900 mb-4">Product</h3>
            <ul className="text-sm text-gray-600 space-y-2">
              <li>Features</li>
              <li>Pricing</li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold text-gray-900 mb-4">Company</h3>
            <ul className="text-sm text-gray-600 space-y-2">
              <li>About</li>
              <li>Blog</li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold text-gray-900 mb-4">Support</h3>
            <ul className="text-sm text-gray-600 space-y-2">
              <li>Help Center</li>
              <li>Contact</li>
            </ul>
          </div>
        </div>
      </footer>
    </div>
  );
}