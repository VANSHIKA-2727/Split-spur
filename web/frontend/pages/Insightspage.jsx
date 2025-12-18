import { useState } from 'react';
import { ArrowLeft } from 'lucide-react';
import Navbar from '../components/Navbar';
import { useNavigate } from "react-router-dom";

export default function InsightsPage() {
  const [currentView, setCurrentView] = useState('all');
  const navigate = useNavigate();

  const allInsights = [
    {
      id: 1,
      title: 'Effectiveness Predictor',
      description:
        'New visitors show 34% lower conversion rates compared to returning visitors. Consider testing trust signals, social proof, or clearer value propositions for first-time users.',
      metric: '-34% conversion gap',
      confidence: 80,
      impact: 'High Impact',
      relatedTests: '2 Tests',
      borderColor: 'border-blue-300',
      bgColor: 'bg-blue-50',
    },
    {
      id: 2,
      title: 'Consistent Color Performance Pattern',
      description:
        'Across 8 button tests, variations using primary blue colors outperform red and green by an average of 18%. This pattern holds strong across all demographics.',
      metric: '+18% avg lift',
      confidence: 91,
      impact: 'High Impact',
      relatedTests: '3 Tests',
      borderColor: 'border-purple-300',
      bgColor: 'bg-purple-50',
    },
    {
      id: 3,
      title: 'High-Performing Variant Detected',
      description:
        'Your Homepage Hero variant is showing a steady 18% higher conversion rate than the control across desktop users. Consider ending the test early and rolling out the winning variant sitewide to capture additional conversions.',
      metric: '+18% avg lift',
      confidence: 87,
      impact: 'Medium Impact',
      relatedTests: '1 Test',
      borderColor: 'border-green-300',
      bgColor: 'bg-green-50',
    },
  ];

  const opportunities = [
    {
      id: 1,
      title: 'Effectiveness Predictor',
      description:
        'New visitors show 34% lower conversion rates compared to returning visitors. Consider testing trust signals, social proof, or clearer value propositions for first-time users.',
      metric: '-34% conversion gap',
      confidence: 80,
      impact: 'High Impact',
      relatedTests: '2 Tests',
      borderColor: 'border-blue-300',
      bgColor: 'bg-blue-50',
    },
  ];

  const patterns = [
    {
      title: 'Simplified Copy',
      testsRun: 12,
      avgLift: '+15.8%',
      confidence: 93,
      successRate: '93% Success Rate',
    },
    {
      title: 'Social Proof Elements',
      testsRun: 8,
      convRate: '+21.3%',
      confidence: 75,
      successRate: '75% Success Rate',
    },
  ];

  const segments = [
    {
      title: 'All Visitors',
      testsIncluded: 24,
      avgConvRate: '19.7%',
      recentTrend: '+8.4%',
      trendPositive: true,
      badge: '8.4%',
    },
    {
      title: 'Mobile Users',
      testsIncluded: 18,
      avgConvRate: '16.3%',
      recentTrend: '-3.2%',
      trendPositive: false,
      badge: '3.2%',
    },
  ];

  const renderAllInsights = () => (
    <div className="space-y-4">
      {allInsights.map((insight) => (
        <div
          key={insight.id}
          className={`${insight.bgColor} border-2 ${insight.borderColor} rounded-xl p-4 sm:p-6`}
        >
          <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
            {/* Left Content Side */}
            <div className="flex-1 min-w-0">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                {insight.title}
              </h3>
              <p className="text-sm text-gray-700 mb-4">{insight.description}</p>
              <div className="flex flex-wrap items-center gap-4 text-sm">
                {insight.metric && (
                  <span className="font-semibold text-gray-900">
                    Metric: {insight.metric}
                  </span>
                )}
                <div className="flex items-center gap-2">
                  <span className="text-gray-600 whitespace-nowrap">
                    AI Confidence:
                  </span>
                  <div className="w-20 bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-blue-600 h-2 rounded-full"
                      style={{ width: `${insight.confidence}%` }}
                    ></div>
                  </div>
                  <span className="font-semibold text-gray-900">
                    {insight.confidence}%
                  </span>
                </div>
                {insight.relatedTests && (
                  <span className="font-semibold text-gray-900">
                    Related: {insight.relatedTests}
                  </span>
                )}
              </div>
            </div>

            {/* Right Action/Badge Side */}
            <div className="flex flex-row lg:flex-col items-center lg:items-end justify-between lg:justify-start gap-3 border-t lg:border-t-0 pt-4 lg:pt-0">
              <button
                onClick={() => navigate("/Viewinsights")}
                className="px-6 py-2 bg-blue-600 text-white text-sm font-bold rounded-lg hover:bg-blue-700 transition-all shadow-sm active:scale-95"
              >
                View Tests
              </button>
              <span className="px-3 py-1 bg-green-100 text-green-700 text-xs font-medium rounded-full order-1 lg:order-2">
                {insight.impact}
              </span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );

  const renderOpportunities = () => (
    <div className="space-y-4">
      {opportunities.map((o) => (
        <div
          key={o.id}
          className={`${o.bgColor} border-2 ${o.borderColor} rounded-xl p-4 sm:p-6`}
        >
          <h3 className="text-lg font-semibold text-gray-900 mb-2">{o.title}</h3>
          <p className="text-sm text-gray-700 mb-4">{o.description}</p>
          <div className="flex items-center gap-4 text-sm">
            <span className="font-medium text-gray-900">Confidence: {o.confidence}%</span>
            <span className="px-3 py-1 bg-green-100 text-green-700 text-xs font-medium rounded-full">{o.impact}</span>
          </div>
        </div>
      ))}
    </div>
  );

  const renderPatterns = () => (
    <div className="bg-white rounded-xl border-2 border-gray-200 p-6 shadow-sm">
      <h2 className="text-xl font-bold text-gray-900 mb-4">Winning Patterns</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {patterns.map((p, idx) => (
          <div key={idx} className="border border-gray-200 rounded-lg p-4 hover:border-blue-200 transition-colors">
            <h3 className="font-semibold text-gray-900 mb-1">{p.title}</h3>
            <div className="text-sm text-gray-600 space-y-1">
              <p>Tests Run: <span className="text-gray-900 font-medium">{p.testsRun}</span></p>
              <p>Avg Lift: <span className="text-green-600 font-bold">{p.avgLift || p.convRate}</span></p>
              <p>Confidence: <span className="text-gray-900 font-medium">{p.confidence}%</span></p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderSegments = () => (
    <div className="bg-white rounded-xl border-2 border-gray-200 p-6 shadow-sm">
      <h2 className="text-xl font-bold text-gray-900 mb-4">Segment Analysis</h2>
      <div className="space-y-4">
        {segments.map((s, idx) => (
          <div key={idx} className="flex items-center justify-between border border-gray-200 rounded-lg p-4">
            <div>
              <h3 className="font-semibold text-gray-900">{s.title}</h3>
              <p className="text-sm text-gray-500">Included Tests: {s.testsIncluded}</p>
            </div>
            <div className="text-right">
              <p className="text-lg font-bold text-gray-900">{s.avgConvRate}</p>
              <span className={`text-xs font-medium ${s.trendPositive ? 'text-green-600' : 'text-red-600'}`}>
                {s.trendPositive ? '↑' : '↓'} {s.badge}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main className="max-w-7xl mx-auto px-6 py-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">AI Insights</h1>
        
        {/* Navigation Tabs */}
        <div className="flex gap-8 border-b border-gray-200 mb-8">
          {['all', 'opportunities', 'patterns', 'segments'].map((tab) => (
            <button
              key={tab}
              onClick={() => setCurrentView(tab)}
              className={`pb-4 text-sm font-semibold capitalize transition-all border-b-2 ${
                currentView === tab
                  ? 'border-blue-600 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              {tab === 'all' ? 'All Insights' : tab}
            </button>
          ))}
        </div>

        {/* View Content */}
        <div className="mb-8">
          {currentView === 'all' && renderAllInsights()}
          {currentView === 'opportunities' && renderOpportunities()}
          {currentView === 'patterns' && renderPatterns()}
          {currentView === 'segments' && renderSegments()}
        </div>

        {/* Global Back Button */}
        <button 
          onClick={() => navigate("/Pagename")} 
          className="flex items-center gap-2 px-5 py-2.5 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 font-semibold text-gray-700 transition-all shadow-sm"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Dashboard
        </button>
      </main>
    </div>
  );
}