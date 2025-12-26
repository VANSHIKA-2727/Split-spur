import { useState, useEffect } from "react";
import { ArrowLeft } from "lucide-react";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";
import Footer from "../components/Footer.jsx";

export default function InsightsPage() {
  const [currentView, setCurrentView] = useState("all");
  const [insights, setInsights] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  // -------------------------------
  // FETCH INSIGHTS (SHOPIFY SAFE)
  // -------------------------------
  useEffect(() => {
    const fetchInsights = async () => {
      try {
        const res = await fetch("/api/insights");

        if (!res.ok) {
          throw new Error("Failed to fetch insights");
        }

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

  // -------------------------------
  // LOADING / ERROR
  // -------------------------------
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

  // -------------------------------
  // FILTER BY TAB
  // -------------------------------
  const filteredInsights =
    currentView === "all"
      ? insights
      : insights.filter((i) => i.type === currentView);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <main className="max-w-7xl mx-auto px-6 py-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">
          AI Insights
        </h1>

        {/* Tabs */}
        <div className="flex gap-8 border-b border-gray-200 mb-8">
          {["all", "opportunities", "patterns", "segments"].map((tab) => (
            <button
              key={tab}
              onClick={() => setCurrentView(tab)}
              className={`pb-4 text-sm font-semibold capitalize border-b-2 ${
                currentView === tab
                  ? "border-blue-600 text-blue-600"
                  : "border-transparent text-gray-500 hover:text-gray-700"
              }`}
            >
              {tab === "all" ? "All Insights" : tab}
            </button>
          ))}
        </div>

        {/* Insights List */}
        {filteredInsights.length === 0 ? (
          <div className="text-gray-500 font-medium">
            No insights available yet.
          </div>
        ) : (
          <div className="space-y-4">
            {filteredInsights.map((insight) => (
              <div
                key={insight.id}
                className="bg-blue-50 border border-blue-200 rounded-xl p-6"
              >
                <h3 className="text-lg font-semibold mb-2">
                  {insight.title}
                </h3>

                <p className="text-sm text-gray-700 mb-4">
                  {insight.description}
                </p>

                <div className="flex flex-wrap gap-4 text-sm">
                  {insight.metric && (
                    <span className="font-semibold">
                      Metric: {insight.metric}
                    </span>
                  )}

                  <span className="font-semibold">
                    Confidence: {insight.confidence}%
                  </span>

                  <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs">
                    {insight.impact}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Back */}
        <button
          onClick={() => navigate("/Pagename")}
          className="mt-8 flex items-center gap-2 px-5 py-2.5 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 font-semibold text-gray-700"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Dashboard
        </button>
        
      </main>
      <Footer />
    </div>
    
    
  );
}
