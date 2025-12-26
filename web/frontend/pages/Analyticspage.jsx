import React, { useState, useEffect } from "react";
import { TrendingUp, Users, Target, ArrowLeft } from "lucide-react";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";
import Footer from "../components/Footer.jsx";

const Analyticspage = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("trends");

  const [tests, setTests] = useState([]);
  const [reports, setReports] = useState({});
  const [loading, setLoading] = useState(true);

  /* -----------------------------------
      FETCH TESTS + REPORTS
  ----------------------------------- */
  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        const testsRes = await fetch("/api/tests");
        const testsData = await testsRes.json();
        setTests(testsData);

        const reportMap = {};

        await Promise.all(
          testsData.map(async (test) => {
            const res = await fetch(`/api/reports/${test.id}`);
            const data = await res.json();
            reportMap[test.id] = data;
          })
        );

        setReports(reportMap);
      } catch (err) {
        console.error("Failed to load analytics", err);
      } finally {
        setLoading(false);
      }
    };

    fetchAnalytics();
  }, []);

  /* -----------------------------------
      AGGREGATED METRICS
  ----------------------------------- */
  let totalVisitors = 0;
  let totalConversions = 0;
  let totalClicks = 0;

  tests.forEach((test) => {
    totalVisitors += test.visitors || 0;

    const report = reports[test.id];
    if (report) {
      totalConversions +=
        (report.A?.conversions || 0) + (report.B?.conversions || 0);
      totalClicks +=
        (report.A?.clicks || 0) + (report.B?.clicks || 0);
    }
  });

  const conversionRate = totalClicks
    ? ((totalConversions / totalClicks) * 100).toFixed(2)
    : "0.00";

  const stats = [
    {
      label: "Total Visitors",
      value: totalVisitors.toLocaleString(),
      icon: Users,
    },
    {
      label: "Total Conversions",
      value: totalConversions.toLocaleString(),
      icon: Target,
    },
    {
      label: "Conversion Rate",
      value: `${conversionRate}%`,
      icon: TrendingUp,
    },
    {
      label: "Active Tests",
      value: tests.length,
      icon: TrendingUp,
    },
  ];

  /* -----------------------------------
      LOADING
  ----------------------------------- */
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="flex items-center justify-center h-96 text-gray-500 font-bold">
          Loading analytics...
        </div>
      </div>
    );
  }

  /* -----------------------------------
      UI
  ----------------------------------- */
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900 mb-1">
            Analytics Overview
          </h1>
          <p className="text-sm text-gray-500">
            Real-time analytics across all your A/B tests
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-4 gap-4 mb-8">
          {stats.map((stat, idx) => (
            <div
              key={idx}
              className="bg-white rounded-lg border border-gray-200 p-5"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-gray-600">{stat.label}</span>
                <stat.icon className="w-4 h-4 text-gray-400" />
              </div>
              <div className="text-2xl font-bold text-gray-900">
                {stat.value}
              </div>
            </div>
          ))}
        </div>

        {/* Tabs */}
        <div className="flex gap-6 border-b border-gray-200 mb-6">
          {["trends", "tests"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`pb-3 px-1 text-sm font-medium border-b-2 ${
                activeTab === tab
                  ? "border-blue-600 text-blue-600"
                  : "border-transparent text-gray-600 hover:text-gray-900"
              }`}
            >
              {tab === "trends" ? "Overview" : "Test Breakdown"}
            </button>
          ))}
        </div>

        {/* Overview */}
        {activeTab === "trends" && (
          <div className="bg-white rounded-lg border p-6">
            <p className="text-gray-600">
              Analytics are computed from real user events (views, clicks,
              conversions) collected via your tracking engine.
            </p>
          </div>
        )}

        {/* Test Breakdown */}
        {activeTab === "tests" && (
          <div className="space-y-4">
            {tests.map((test) => {
              const r = reports[test.id];
              if (!r) return null;

              return (
                <div
                  key={test.id}
                  className="bg-white border rounded-lg p-5"
                >
                  <h3 className="font-semibold text-gray-900">
                    {test.testName}
                  </h3>
                  <p className="text-sm text-gray-500 mb-3">
                    Visitors: {test.visitors}
                  </p>

                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <strong>Variant A</strong>
                      <div>Conversions: {r.A.conversions}</div>
                      <div>Rate: {r.A.conversionRate.toFixed(2)}%</div>
                    </div>
                    <div>
                      <strong>Variant B</strong>
                      <div>Conversions: {r.B.conversions}</div>
                      <div>Rate: {r.B.conversionRate.toFixed(2)}%</div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Back */}
        <button
          onClick={() => navigate("/Pagename")}
          className="mt-8 flex items-center gap-2 px-4 py-2 bg-white border rounded hover:bg-gray-50"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Dashboard
        </button>

       
      </div>
        <Footer />
    </div>
  );
};

export default Analyticspage;
