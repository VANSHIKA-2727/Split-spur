import React, { useState, useEffect } from 'react';
import { TrendingUp, Users, Target, ArrowLeft } from 'lucide-react';
import Navbar from '../components/Navbar';
import { useNavigate } from "react-router-dom";

const Analyticspage = () => {
  const [activeTab, setActiveTab] = useState('trends');
  const navigate = useNavigate();

  // ------------------------------------------------
  // 🟢 BACKEND STATE
  // ------------------------------------------------
  const [tests, setTests] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTests = async () => {
      try {
        const res = await fetch('/api/tests');
        const data = await res.json();
        setTests(data);
      } catch (err) {
        console.error('Failed to fetch analytics data', err);
      } finally {
        setLoading(false);
      }
    };

    fetchTests();
  }, []);

  // ------------------------------------------------
  // 🧠 DERIVED ANALYTICS (TEMP LOGIC)
  // ------------------------------------------------
  const totalVisitors = tests.reduce((sum, t) => sum + (t.visitors || 0), 0);
  const totalConversions = Math.floor(totalVisitors * 0.155); // ~15.5%
  const conversionRate = totalVisitors
    ? ((totalConversions / totalVisitors) * 100).toFixed(2)
    : '0.00';

  const avgLift = tests.length
    ? `+${(8 + Math.random() * 6).toFixed(1)}%`
    : '+0%';

  const stats = [
    { label: 'Total Visitors', value: totalVisitors.toLocaleString(), icon: Users },
    { label: 'Total Conversions', value: totalConversions.toLocaleString(), icon: Target },
    { label: 'Conversion Rate', value: `${conversionRate}%`, icon: TrendingUp },
    { label: 'Avg Test Lift', value: avgLift, icon: TrendingUp }
  ];

  // ------------------------------------------------
  // TEMP STATIC DATA (until tracking is implemented)
  // ------------------------------------------------
  const testVelocityData = [
    { device: 'Desktop', avgLift: '+14.2%', convRate: '18.4%', performance: 85, tests: Math.max(1, tests.length - 1) },
    { device: 'Mobile', avgLift: '+12.8%', convRate: '15.7%', performance: 60, tests: 1 }
  ];

  const trendData = [
    { month: 'Jan', desktop: 35, mobile: 25 },
    { month: 'Feb', desktop: 45, mobile: 30 },
    { month: 'Mar', desktop: 50, mobile: 35 },
    { month: 'Apr', desktop: 65, mobile: 40 },
    { month: 'May', desktop: 70, mobile: 50 },
    { month: 'Jun', desktop: 40, mobile: 30 }
  ];

  const conversionRateData = [
    { date: 'Jan', rate: 14.2 },
    { date: 'Feb', rate: 14.8 },
    { date: 'Mar', rate: 15.1 },
    { date: 'Apr', rate: 15.3 },
    { date: 'May', rate: 15.6 },
    { date: 'Jun', rate: 15.66 }
  ];

  // ------------------------------------------------
  // LOADING STATE
  // ------------------------------------------------
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

  // ------------------------------------------------
  // UI
  // ------------------------------------------------
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900 mb-1">Analytics Overview</h1>
          <p className="text-sm text-gray-500">
            Comprehensive analytics across all your A/B tests
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-4 gap-4 mb-8">
          {stats.map((stat, idx) => (
            <div key={idx} className="bg-white rounded-lg border border-gray-200 p-5">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-gray-600">{stat.label}</span>
                <stat.icon className="w-4 h-4 text-gray-400" />
              </div>
              <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
            </div>
          ))}
        </div>

        {/* Tabs */}
        <div className="flex gap-6 border-b border-gray-200 mb-6">
          {['trends', 'velocity', 'devices'].map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`pb-3 px-1 text-sm font-medium border-b-2 transition-colors ${
                activeTab === tab
                  ? 'border-blue-600 text-blue-600'
                  : 'border-transparent text-gray-600 hover:text-gray-900'
              }`}
            >
              {tab === 'trends'
                ? 'Trends'
                : tab === 'velocity'
                ? 'Test Velocity'
                : 'Devices'}
            </button>
          ))}
        </div>

        {/* Trends */}
        {activeTab === 'trends' && (
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h2 className="text-lg font-semibold mb-4">Conversion Rate Trends</h2>
            <p className="text-sm text-gray-500">
              This chart will reflect real-time conversion data once tracking is live.
            </p>
          </div>
        )}

        {/* Velocity */}
        {activeTab === 'velocity' && (
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h2 className="text-lg font-semibold mb-4">Test Velocity</h2>
            <p className="text-sm text-gray-600">
              Total tests created: <strong>{tests.length}</strong>
            </p>
          </div>
        )}

        {/* Devices */}
        {activeTab === 'devices' && (
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            {testVelocityData.map((device, idx) => (
              <div key={idx} className="mb-6">
                <h3 className="font-semibold text-gray-900">{device.device}</h3>
                <p className="text-sm text-gray-500">
                  Avg Lift: {device.avgLift} • Conversion Rate: {device.convRate}
                </p>
              </div>
            ))}
          </div>
        )}

        {/* Back Button */}
        <button
          onClick={() => navigate("/Pagename")}
          className="mt-6 flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 font-medium text-gray-700"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Dashboard
        </button>
      </div>
    </div>
  );
};

export default Analyticspage;
