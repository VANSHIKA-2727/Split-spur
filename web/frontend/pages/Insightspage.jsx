import { useState } from 'react';
import { ArrowLeft } from 'lucide-react';
import Navbar from '../components/Navbar';

export default function InsightsPage() {
  const [currentView, setCurrentView] = useState('all');

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
          <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
            <div className="flex items-start gap-3 flex-1">
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
            </div>
            <div className="flex flex-row lg:flex-col items-center gap-3 lg:items-end">
              <span className="px-3 py-1 bg-green-100 text-green-700 text-xs font-medium rounded-full">
                {insight.impact}
              </span>
              <button className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700">
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
      {opportunities.map((o) => (
        <div
          key={o.id}
          className={`${o.bgColor} border-2 ${o.borderColor} rounded-xl p-4 sm:p-6`}
        >
          <h3 className="text-lg font-semibold text-gray-900 mb-2">{o.title}</h3>
          <p className="text-sm text-gray-700 mb-4">{o.description}</p>
          <div className="flex items-center gap-4 text-sm">
            <span>Confidence: {o.confidence}%</span>
            <span>Impact: {o.impact}</span>
          </div>
        </div>
      ))}
    </div>
  );

  const renderPatterns = () => (
    <div className="bg-white rounded-xl border-2 border-gray-200 p-6">
      <h2 className="text-xl font-bold text-gray-900 mb-2">Winning Patterns</h2>
      <div className="space-y-4">
        {patterns.map((p, idx) => (
          <div key={idx} className="border border-gray-200 rounded-lg p-4">
            <h3 className="font-semibold text-gray-900">{p.title}</h3>
            <p className="text-sm text-gray-700">
              Tests: {p.testsRun} • Confidence: {p.confidence}%
            </p>
          </div>
        ))}
      </div>
    </div>
  );

  const renderSegments = () => (
    <div className="bg-white rounded-xl border-2 border-gray-200 p-6">
      <h2 className="text-xl font-bold text-gray-900 mb-2">Segment Analysis</h2>
      <div className="space-y-4">
        {segments.map((s, idx) => (
          <div key={idx} className="border border-gray-200 rounded-lg p-4">
            <h3 className="font-semibold text-gray-900">{s.title}</h3>
            <p className="text-sm text-gray-700">
              Conv. Rate: {s.avgConvRate} ({s.recentTrend})
            </p>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main className="max-w-7xl mx-auto px-6 py-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">AI Insights</h1>
        <div className="flex gap-4 border-b border-gray-200 mb-6">
          <button
            onClick={() => setCurrentView('all')}
            className={`pb-2 text-sm font-medium border-b-2 ${
              currentView === 'all'
                ? 'border-blue-600 text-blue-600'
                : 'border-transparent text-gray-600 hover:text-gray-900'
            }`}
          >
            All Insights
          </button>
          <button
            onClick={() => setCurrentView('opportunities')}
            className={`pb-2 text-sm font-medium border-b-2 ${
              currentView === 'opportunities'
                ? 'border-blue-600 text-blue-600'
                : 'border-transparent text-gray-600 hover:text-gray-900'
            }`}
          >
            Opportunities
          </button>
          <button
            onClick={() => setCurrentView('patterns')}
            className={`pb-2 text-sm font-medium border-b-2 ${
              currentView === 'patterns'
                ? 'border-blue-600 text-blue-600'
                : 'border-transparent text-gray-600 hover:text-gray-900'
            }`}
          >
            Patterns
          </button>
          <button
            onClick={() => setCurrentView('segments')}
            className={`pb-2 text-sm font-medium border-b-2 ${
              currentView === 'segments'
                ? 'border-blue-600 text-blue-600'
                : 'border-transparent text-gray-600 hover:text-gray-900'
            }`}
          >
            Segments
          </button>
        </div>

        {currentView === 'all' && renderAllInsights()}
        {currentView === 'opportunities' && renderOpportunities()}
        {currentView === 'patterns' && renderPatterns()}
        {currentView === 'segments' && renderSegments()}

        <button className="mt-8 flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium hover:bg-gray-50">
          <ArrowLeft className="w-4 h-4" />
          Back to Dashboard
        </button>
      </main>
    </div>
  );
}
