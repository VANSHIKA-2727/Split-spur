import { useState } from 'react';
import { ArrowLeft, Bell } from 'lucide-react';

export default function SplitsurInsightsDashboard() {
  const [currentView, setCurrentView] = useState('all');

  const allInsights = [
    {
      id: 1,
      title: 'Effectiveness Predictor',
      description: 'New visitors show 34% lower conversion rates compared to returning visitors. Consider testing trust signals, social proof, or clearer value propositions for first-time users.',
      metric: '-34% conversion gap',
      confidence: 80,
      impact: 'High Impact',
      relatedTests: '2 Tests',
      borderColor: 'border-blue-300',
      bgColor: 'bg-blue-50'
    },
    {
      id: 2,
      title: 'Consistent Color Performance Pattern',
      description: 'Across 8 button tests, variations using primary blue colors outperform red and green by an average of 18%. This pattern holds strong across all demographics.',
      metric: '+18% avg lift',
      confidence: 91,
      impact: 'High Impact',
      relatedTests: '3 Tests',
      borderColor: 'border-purple-300',
      bgColor: 'bg-purple-50'
    },
    {
      id: 3,
      title: 'High-Performing Variant Detected',
      description: 'Your Homepage Hero variant is showing a steady 18% higher conversion rate than the control across desktop users. Consider ending the test early and rolling out the winning variant sitewide to capture additional conversions.',
      metric: '+18% avg lift',
      confidence: 87,
      impact: 'Medium Impact',
      relatedTests: '1 Test',
      borderColor: 'border-green-300',
      bgColor: 'bg-green-50'
    },
    {
      id: 4,
      title: 'Sample Size Concern',
      description: 'Two active tests are running with overlapping traffic segments, potentially diluting results. Consider pausing one test or adjusting targeting.',
      metric: '',
      confidence: 95,
      impact: 'High Impact',
      relatedTests: '2 Tests',
      borderColor: 'border-orange-300',
      bgColor: 'bg-orange-50'
    },
    {
      id: 5,
      title: 'Time-of-Day Performance Variation',
      description: 'Tests show 23% higher conversion rates between 2-5 PM EST. Consider time-based targeting or scheduling for optimal impact.',
      metric: '+23% peak hours',
      confidence: 85,
      impact: 'Medium Impact',
      relatedTests: '',
      borderColor: 'border-purple-300',
      bgColor: 'bg-purple-50'
    },
    {
      id: 6,
      title: 'Effectiveness Predictor',
      description: 'Your Product Features section shows a 35% drop in scroll depth compared to other areas of the homepage. Consider testing a shorter layout or adding interactive elements to improve engagement.',
      metric: 'Avg. scroll depth 65% → 30%',
      confidence: 84,
      impact: 'High Impact',
      relatedTests: '1 Test',
      borderColor: 'border-blue-300',
      bgColor: 'bg-blue-50'
    }
  ];

  const opportunities = [
    {
      id: 1,
      title: 'Effectiveness Predictor',
      description: 'New visitors show 34% lower conversion rates compared to returning visitors. Consider testing trust signals, social proof, or clearer value propositions for first-time users.',
      metric: '-34% conversion gap',
      confidence: 80,
      impact: 'High Impact',
      relatedTests: '2 Tests',
      borderColor: 'border-blue-300',
      bgColor: 'bg-blue-50'
    },
    {
      id: 2,
      title: 'Effectiveness Predictor',
      description: 'Your Product Features section shows a 35% drop in scroll depth compared to other areas of the homepage. Consider testing a shorter layout or adding interactive elements to improve engagement.',
      metric: 'Avg. scroll depth 65% → 30%',
      confidence: 84,
      impact: 'High Impact',
      relatedTests: '1 Test',
      borderColor: 'border-blue-300',
      bgColor: 'bg-blue-50'
    }
  ];

  const patterns = [
    {
      title: 'Simplified Copy',
      testsRun: 12,
      avgLift: '+15.8%',
      confidence: 93,
      successRate: '93% Success Rate'
    },
    {
      title: 'Social Proof Elements',
      testsRun: 8,
      convRate: '+21.3%',
      confidence: 75,
      successRate: '75% Success Rate'
    },
    {
      title: 'Reduced Form Fields',
      testsRun: 6,
      avgLift: '+28.4%',
      confidence: 100,
      successRate: '100% Success Rate'
    },
    {
      title: 'Urgency/Scarcity Messaging',
      testsRun: 9,
      convRate: '+11.2%',
      confidence: 67,
      successRate: '67% Success Rate'
    }
  ];

  const segments = [
    {
      title: 'All Visitors',
      icon: '👥',
      testsIncluded: 24,
      avgConvRate: '19.7%',
      recentTrend: '+8.4%',
      trendPositive: true,
      badge: '8.4%'
    },
    {
      title: 'New Visitors',
      icon: '👥',
      testsIncluded: 24,
      avgConvRate: '14.2%',
      recentTrend: '+12.3%',
      trendPositive: true,
      badge: '12.3%'
    },
    {
      title: 'Returning Visitors',
      icon: '👥',
      testsIncluded: 24,
      avgConvRate: '24.8%',
      recentTrend: '+5.1%',
      trendPositive: true,
      badge: '5.1%'
    },
    {
      title: 'Mobile Users',
      icon: '👥',
      testsIncluded: 18,
      avgConvRate: '16.3%',
      recentTrend: '-3.2%',
      trendPositive: false,
      badge: '3.2%'
    },
    {
      title: 'Desktop Users',
      icon: '👥',
      testsIncluded: 21,
      avgConvRate: '22.9%',
      recentTrend: '+11.7%',
      trendPositive: true,
      badge: '11.7%'
    }
  ];

  const renderAllInsights = () => (
    <div className="space-y-4">
      {allInsights.map(insight => (
        <div key={insight.id} className={`${insight.bgColor} border-2 ${insight.borderColor} rounded-xl p-4 sm:p-6`}>
          <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
            <div className="flex items-start gap-3 flex-1">
              <div className="text-2xl flex-shrink-0">💡</div>
              <div className="flex-1 min-w-0">
                <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-2">{insight.title}</h3>
                <p className="text-xs sm:text-sm text-gray-700 mb-4">{insight.description}</p>
                <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-6 text-xs sm:text-sm">
                  {insight.metric && (
                    <div className="flex items-center gap-1">
                      <span className="text-gray-600">Metric: </span>
                      <span className="font-semibold text-gray-900">{insight.metric}</span>
                    </div>
                  )}
                  <div className="flex items-center gap-2">
                    <span className="text-gray-600 whitespace-nowrap">AI Confidence:</span>
                    <div className="w-16 sm:w-24 bg-gray-200 rounded-full h-2">
                      <div className="bg-blue-600 h-2 rounded-full" style={{ width: `${insight.confidence}%` }}></div>
                    </div>
                    <span className="font-semibold text-gray-900">{insight.confidence}%</span>
                  </div>
                  {insight.relatedTests && (
                    <div className="flex items-center gap-1">
                      <span className="text-gray-600">Related: </span>
                      <span className="font-semibold text-gray-900">{insight.relatedTests}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
            <div className="flex flex-row lg:flex-col items-center gap-3 lg:items-end">
              <span className="px-3 py-1 bg-green-100 text-green-700 text-xs font-medium rounded-full whitespace-nowrap">
                {insight.impact}
              </span>
              <button className="px-3 sm:px-4 py-2 bg-blue-600 text-white text-xs sm:text-sm font-medium rounded-lg hover:bg-blue-700 whitespace-nowrap">
                View Tests
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );

  const renderOpportunities = () => (
    <div className="space-y-4">
      {opportunities.map(opportunity => (
        <div key={opportunity.id} className={`${opportunity.bgColor} border-2 ${opportunity.borderColor} rounded-xl p-4 sm:p-6`}>
          <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
            <div className="flex items-start gap-3 flex-1">
              <div className="text-2xl flex-shrink-0">🎯</div>
              <div className="flex-1 min-w-0">
                <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-2">{opportunity.title}</h3>
                <p className="text-xs sm:text-sm text-gray-700 mb-4">{opportunity.description}</p>
                <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-6 text-xs sm:text-sm">
                  <div className="flex items-center gap-1">
                    <span className="text-gray-600">Metric: </span>
                    <span className="font-semibold text-gray-900">{opportunity.metric}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-gray-600 whitespace-nowrap">AI Confidence:</span>
                    <div className="w-16 sm:w-24 bg-gray-200 rounded-full h-2">
                      <div className="bg-blue-600 h-2 rounded-full" style={{ width: `${opportunity.confidence}%` }}></div>
                    </div>
                    <span className="font-semibold text-gray-900">{opportunity.confidence}%</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <span className="text-gray-600">Related: </span>
                    <span className="font-semibold text-gray-900">{opportunity.relatedTests}</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex flex-row lg:flex-col items-center gap-3 lg:items-end">
              <span className="px-3 py-1 bg-green-100 text-green-700 text-xs font-medium rounded-full whitespace-nowrap">
                {opportunity.impact}
              </span>
              <button className="px-3 sm:px-4 py-2 bg-blue-600 text-white text-xs sm:text-sm font-medium rounded-lg hover:bg-blue-700 whitespace-nowrap">
                View Tests
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );

  const renderPatterns = () => (
    <div className="bg-white rounded-xl border-2 border-gray-200 p-4 sm:p-6">
      <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-2">Winning Patterns</h2>
      <p className="text-xs sm:text-sm text-gray-600 mb-6">AI-identified patterns from your successful tests that you can apply to future experiments</p>
      
      <div className="space-y-4">
        {patterns.map((pattern, idx) => (
          <div key={idx} className="border border-gray-200 rounded-lg p-4 sm:p-5">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-4">
              <h3 className="font-semibold text-gray-900 text-sm sm:text-base">{pattern.title}</h3>
              <span className="px-3 py-1 bg-green-100 text-green-700 text-xs font-medium rounded-full w-fit">
                {pattern.successRate}
              </span>
            </div>
            <div className="grid grid-cols-3 gap-4 sm:gap-6">
              <div>
                <div className="text-xs text-gray-600 mb-1">Tests Run</div>
                <div className="text-base sm:text-lg font-semibold text-gray-900">{pattern.testsRun}</div>
              </div>
              <div>
                <div className="text-xs text-gray-600 mb-1">{pattern.avgLift ? 'Avg Lift' : 'Conv. Rate'}</div>
                <div className="text-base sm:text-lg font-semibold text-green-600">{pattern.avgLift || pattern.convRate}</div>
              </div>
              <div>
                <div className="text-xs text-gray-600 mb-1">Confidence</div>
                <div className="w-full bg-gray-200 rounded-full h-2 mb-1">
                  <div className="bg-blue-600 h-2 rounded-full" style={{ width: `${pattern.confidence}%` }}></div>
                </div>
                <div className="text-xs font-semibold text-gray-900">{pattern.confidence}%</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderSegments = () => (
    <div className="bg-white rounded-xl border-2 border-gray-200 p-4 sm:p-6">
      <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-2">Segment Performance Analysis</h2>
      <p className="text-xs sm:text-sm text-gray-600 mb-6">How different user segments are performing across all your tests</p>
      
      <div className="space-y-4">
        {segments.map((segment, idx) => (
          <div key={idx} className="border border-gray-200 rounded-lg p-4 sm:p-5">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-4">
              <div className="flex items-center gap-2">
                <span className="text-xl">{segment.icon}</span>
                <h3 className="font-semibold text-gray-900 text-sm sm:text-base">{segment.title}</h3>
              </div>
              <span className={`px-3 py-1 ${segment.trendPositive ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'} text-xs font-medium rounded-full w-fit`}>
                {segment.trendPositive ? '+' : '-'}{segment.badge}
              </span>
            </div>
            <div className="grid grid-cols-3 gap-4 sm:gap-6">
              <div>
                <div className="text-xs text-gray-600 mb-1">Tests Included</div>
                <div className="text-base sm:text-lg font-semibold text-gray-900">{segment.testsIncluded}</div>
              </div>
              <div>
                <div className="text-xs text-gray-600 mb-1">Avg Conv. Rate</div>
                <div className="text-base sm:text-lg font-semibold text-gray-900">{segment.avgConvRate}</div>
              </div>
              <div>
                <div className="text-xs text-gray-600 mb-1">Recent Trend</div>
                <div className={`text-base sm:text-lg font-semibold ${segment.trendPositive ? 'text-green-600' : 'text-red-600'}`}>
                  {segment.recentTrend}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200 px-4 sm:px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2 sm:gap-4">
            <div className="w-10 h-10 bg-black rounded-lg flex-shrink-0"></div>
            <span className="text-xl sm:text-2xl font-bold">Splitspur</span>
            <nav className="hidden md:flex items-center gap-1 ml-8">
              <button className="px-4 py-2 text-sm text-gray-600 hover:text-gray-900 rounded-md hover:bg-gray-50">Dashboard</button>
              <button className="px-4 py-2 text-sm text-gray-600 hover:text-gray-900 rounded-md hover:bg-gray-50">Tests</button>
              <button className="px-4 py-2 text-sm font-medium text-gray-900 bg-gray-100 rounded-md">Insights</button>
              <button className="px-4 py-2 text-sm text-gray-600 hover:text-gray-900 rounded-md hover:bg-gray-50">Analytics</button>
            </nav>
          </div>
          <div className="flex items-center gap-2 sm:gap-3">
            <button className="hidden sm:flex items-center gap-2 px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-md hover:bg-blue-700">
              <span className="text-lg leading-none">+</span>
              <span className="hidden md:inline">Create New Test</span>
              <span className="md:hidden">New Test</span>
            </button>
            <button className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 flex-shrink-0">
              <Bell className="w-5 h-5 text-gray-600" />
            </button>
            <button className="w-10 h-10 rounded-full bg-gray-900 text-white flex items-center justify-center text-sm flex-shrink-0">
              
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-4 sm:py-6">
        <div className="mb-4 sm:mb-6">
          <h1 className="text-xl sm:text-2xl font-bold text-gray-900 mb-1">AI Insights</h1>
          <p className="text-xs sm:text-sm text-gray-600">AI-powered insights and recommendations based on your testing data</p>
        </div>

        <div className="flex gap-4 mb-6 overflow-x-auto pb-2">
          <div className="bg-white rounded-xl border border-gray-200 p-5 hover:shadow-sm transition-shadow min-w-[200px] flex-shrink-0">
            <div className="flex items-center gap-2 mb-3">
              <svg className="w-5 h-5 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                <path d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              <span className="text-sm font-medium text-gray-900">All Insights</span>
            </div>
            <div className="text-2xl font-semibold text-gray-900">24</div>
          </div>
          <div className="bg-white rounded-xl border border-gray-200 p-5 hover:shadow-sm transition-shadow min-w-[200px] flex-shrink-0">
            <div className="flex items-center gap-2 mb-3">
              <svg className="w-5 h-5 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                <path d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              <span className="text-sm font-medium text-gray-900">Patterns Found</span>
            </div>
            <div className="text-2xl font-semibold text-gray-900">18</div>
          </div>
          <div className="bg-white rounded-xl border border-gray-200 p-5 hover:shadow-sm transition-shadow min-w-[200px] flex-shrink-0">
            <div className="flex items-center gap-2 mb-3">
              <svg className="w-5 h-5 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
              </svg>
              <span className="text-sm font-medium text-gray-900">Opportunities</span>
            </div>
            <div className="text-2xl font-semibold text-gray-900">8</div>
          </div>
        </div>

        <div className="flex gap-2 sm:gap-4 mb-4 sm:mb-6 border-b border-gray-200 overflow-x-auto">
          <button
            onClick={() => setCurrentView('all')}
            className={`pb-3 px-2 text-xs sm:text-sm font-medium border-b-2 transition-colors whitespace-nowrap ${
              currentView === 'all'
                ? 'border-blue-600 text-blue-600'
                : 'border-transparent text-gray-600 hover:text-gray-900'
            }`}
          >
            All Insights
          </button>
          <button
            onClick={() => setCurrentView('opportunities')}
            className={`pb-3 px-2 text-xs sm:text-sm font-medium border-b-2 transition-colors whitespace-nowrap ${
              currentView === 'opportunities'
                ? 'border-blue-600 text-blue-600'
                : 'border-transparent text-gray-600 hover:text-gray-900'
            }`}
          >
            Opportunities
          </button>
          <button
            onClick={() => setCurrentView('patterns')}
            className={`pb-3 px-2 text-xs sm:text-sm font-medium border-b-2 transition-colors whitespace-nowrap ${
              currentView === 'patterns'
                ? 'border-blue-600 text-blue-600'
                : 'border-transparent text-gray-600 hover:text-gray-900'
            }`}
          >
            Patterns
          </button>
          <button
            onClick={() => setCurrentView('segments')}
            className={`pb-3 px-2 text-xs sm:text-sm font-medium border-b-2 transition-colors whitespace-nowrap ${
              currentView === 'segments'
                ? 'border-blue-600 text-blue-600'
                : 'border-transparent text-gray-600 hover:text-gray-900'
            }`}
          >
            Segments
          </button>
        </div>

        <div className="mb-8">
          {currentView === 'all' && renderAllInsights()}
          {currentView === 'opportunities' && renderOpportunities()}
          {currentView === 'patterns' && renderPatterns()}
          {currentView === 'segments' && renderSegments()}
        </div>

        <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg text-xs sm:text-sm font-medium hover:bg-gray-50 mb-12">
          <ArrowLeft className="w-4 h-4" />
          Back to Dashboard
        </button>
      </main>

      <footer className="bg-white border-t border-gray-200 px-4 sm:px-6 py-8">
        <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          <div>
            <h4 className="font-semibold mb-3 text-sm sm:text-base">Stay Updated</h4>
            <p className="text-xs sm:text-sm text-gray-600 mb-2">Get the latest features and testing insights</p>
            <div className="flex gap-2">
              <input 
                type="email" 
                placeholder="your@email.com"
                className="flex-1 px-3 py-2 border border-gray-300 rounded text-xs sm:text-sm"
              />
              <button className="px-4 py-2 bg-blue-600 text-white text-xs sm:text-sm rounded hover:bg-blue-700 flex-shrink-0">
                ➤
              </button>
            </div>
          </div>
          <div>
            <h4 className="font-semibold mb-3 text-sm sm:text-base">Product</h4>
            <ul className="space-y-2 text-xs sm:text-sm text-gray-600">
              <li className="hover:text-gray-900 cursor-pointer">Features</li>
              <li className="hover:text-gray-900 cursor-pointer">Pricing</li>
              <li className="hover:text-gray-900 cursor-pointer">Documentation</li>
              <li className="hover:text-gray-900 cursor-pointer">API Reference</li>
              <li className="hover:text-gray-900 cursor-pointer">Integrations</li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-3 text-sm sm:text-base">Company</h4>
            <ul className="space-y-2 text-xs sm:text-sm text-gray-600">
              <li className="hover:text-gray-900 cursor-pointer">About Us</li>
              <li className="hover:text-gray-900 cursor-pointer">Blog</li>
              <li className="hover:text-gray-900 cursor-pointer">Contact Us</li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-3 text-sm sm:text-base">Resources</h4>
            <ul className="space-y-2 text-xs sm:text-sm text-gray-600">
              <li className="hover:text-gray-900 cursor-pointer">Help</li>
              <li className="hover:text-gray-900 cursor-pointer">Community</li>
              <li className="hover:text-gray-900 cursor-pointer">Tutorials</li>
            </ul>
          </div>
        </div>
      </footer>
    </div>
  );
}