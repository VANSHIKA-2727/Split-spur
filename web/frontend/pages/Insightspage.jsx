import { useState, useEffect } from 'react';
import { ArrowLeft } from 'lucide-react';
import Navbar from '../components/Navbar';
import { useNavigate } from "react-router-dom";

export default function InsightsPage() {
  const [currentView, setCurrentView] = useState('all');
  const [insights, setInsights] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  /* -------------------------------
      FETCH INSIGHTS FROM BACKEND
  -------------------------------- */
  useEffect(() => {
    const fetchInsights = async () => {
      try {
        const res = await fetch("http://localhost:3001/api/insights");
        if (!res.ok) throw new Error("Failed to fetch insights");
        const data = await res.json();
        setInsights(data);
      } catch (err) {
        console.error(err);
        setError("Unable to load AI insights");
      } finally {
        setLoading(false);
      }
    };

    fetchInsights();
  }, []);

  /* -------------------------------
      LOADING / ERROR STATES
  -------------------------------- */
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="flex items-center justify-center h-96 text-gray-500 font-bold">
          Loading AI Insights...
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="flex items-center justify-center h-96 text-red-500 font-bold">
          {error}
        </div>
      </div>
    );
  }

  /* -------------------------------
      FILTER INSIGHTS BY TAB
  -------------------------------- */
  const filteredInsights =
    currentView === "all"
      ? insights
      : insights.filter((i) => i.type === currentView);

  /* -------------------------------
      RENDER INSIGHTS LIST
  -------------------------------- */
  const renderInsights = () => (
    <div className="space-y-4">
      {filteredInsights.map((insight) => (
        <div
          key={insight.id}
          className="bg-blue-50 border-2 border-blue-300 rounded-xl p-4 sm:p-6"
        >
          <div className="flex flex-col lg:flex-row lg:justify-between gap-6">
            {/* Left Content */}
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                {insight.title}
              </h3>
              <p className="text-sm text-gray-700 mb-4">
                {insight.description}
              </p>

              <div className="flex flex-wrap items-center gap-4 text-sm">
                {insight.metric && (
                  <span className="font-semibold">
                    Metric: {insight.metric}
                  </span>
                )}

                <div className="flex items-center gap-2">
                  <span className="text-gray-600">AI Confidence:</span>
                  <div className="w-20 bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-blue-600 h-2 rounded-full"
                      style={{ width: `${insight.confidence}%` }}
                    />
                  </div>
                  <span className="font-semibold">{insight.confidence}%</span>
                </div>

                {insight.relatedTests && (
                  <span className="font-semibold">
                    Related: {insight.relatedTests}
                  </span>
                )}
              </div>
            </div>

            {/* Right Actions */}
            <div className="flex flex-col items-end gap-3">
              <button
                onClick={() => navigate("/Viewinsights")}
                className="px-6 py-2 bg-blue-600 text-white text-sm font-bold rounded-lg hover:bg-blue-700 transition-all"
              >
                View Tests
              </button>
              <span className="px-3 py-1 bg-green-100 text-green-700 text-xs font-medium rounded-full">
                {insight.impact}
              </span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );

  /* -------------------------------
      MAIN RENDER
  -------------------------------- */
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <main className="max-w-7xl mx-auto px-6 py-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">
          AI Insights
        </h1>

        {/* Tabs */}
        <div className="flex gap-8 border-b border-gray-200 mb-8">
          {['all', 'opportunities', 'patterns', 'segments'].map((tab) => (
            <button
              key={tab}
              onClick={() => setCurrentView(tab)}
              className={`pb-4 text-sm font-semibold capitalize border-b-2 transition-all ${
                currentView === tab
                  ? 'border-blue-600 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              {tab === 'all' ? 'All Insights' : tab}
            </button>
          ))}
        </div>

        {/* Insights */}
        {filteredInsights.length > 0 ? (
          renderInsights()
        ) : (
          <div className="text-gray-500 font-medium">
            No insights available for this category.
          </div>
        )}

        {/* Back Button */}
        <button
          onClick={() => navigate("/Pagename")}
          className="mt-8 flex items-center gap-2 px-5 py-2.5 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 font-semibold text-gray-700 shadow-sm"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Dashboard
        </button>
      </main>
    </div>
  );
}
