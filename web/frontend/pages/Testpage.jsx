import React, { useState, useEffect } from 'react';
import { ArrowLeft, Search, Filter } from 'lucide-react';
import Navbar from '../components/Navbar';
import { useNavigate } from 'react-router-dom';
import Footer from '../components/Footer.jsx';

export default function SplitsurTestsDashboard() {
  const navigate = useNavigate();

  const [tests, setTests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedStatus, setSelectedStatus] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');

  // ----------------------------------------
  // Fetch tests
  // ----------------------------------------
  const fetchTests = async () => {
    try {
      const res = await fetch('/api/tests');
      const data = await res.json();

      const mappedTests = data.map(test => ({
        id: test.id,
        title: test.testName,
        status: test.status || 'Draft',
        created: test.createdAt,
        visitors: test.visitors || 0,
      }));

      setTests(mappedTests);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTests();
  }, []);

  // ----------------------------------------
  // Actions
  // ----------------------------------------
  const launchTest = async (id) => {
    await fetch(`/api/tests/${id}/launch`, { method: 'PATCH' });
    fetchTests();
  };

  const stopTest = async (id) => {
    await fetch(`/api/tests/${id}/stop`, { method: 'PATCH' });
    fetchTests();
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="h-96 flex items-center justify-center text-gray-500">
          Loading tests...
        </div>
      </div>
    );
  }

  // ----------------------------------------
  // Counts
  // ----------------------------------------
  const totalCount = tests.length;
  const runningCount = tests.filter(t => t.status === 'Running').length;
  const draftCount = tests.filter(t => t.status === 'Draft').length;
  const stoppedCount = tests.filter(t => t.status === 'Stopped').length;

  const tabs = [
    { label: `All (${totalCount})`, value: 'All' },
    { label: `Running (${runningCount})`, value: 'Running' },
    { label: `Draft (${draftCount})`, value: 'Draft' },
    { label: `Stopped (${stoppedCount})`, value: 'Stopped' },
  ];

  const filteredTests = tests.filter(test => {
    if (selectedStatus !== 'All' && test.status !== selectedStatus) return false;
    if (searchTerm && !test.title.toLowerCase().includes(searchTerm.toLowerCase())) return false;
    return true;
  });

  // ----------------------------------------
  // UI
  // ----------------------------------------
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <main className="max-w-7xl mx-auto px-6 py-6">
        <h1 className="text-2xl font-bold">All Tests</h1>
        <p className="text-sm text-gray-500 mb-6">
          Create, launch, and analyze your A/B tests
        </p>

        {/* Search */}
        <div className="bg-white border rounded-xl px-4 py-3 flex items-center gap-2 mb-4">
          <Search size={18} className="text-gray-400" />
          <input
            type="text"
            placeholder="Search tests..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full outline-none text-sm"
          />
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-6 flex-wrap">
          {tabs.map(tab => (
            <button
              key={tab.value}
              onClick={() => setSelectedStatus(tab.value)}
              className={`px-4 py-1.5 rounded-full text-sm border ${
                selectedStatus === tab.value
                  ? 'bg-black text-white'
                  : 'bg-white text-gray-600'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Test Cards */}
        <div className="space-y-4">
          {filteredTests.map(test => (
            <div
              key={test.id}
              className="bg-white border rounded-xl p-5 flex justify-between items-center"
            >
              <div>
                <h3 className="font-semibold">{test.title}</h3>

                <span
                  className={`text-xs font-medium px-2 py-1 rounded-full ${
                    test.status === 'Running'
                      ? 'bg-green-100 text-green-700'
                      : test.status === 'Draft'
                      ? 'bg-gray-100 text-gray-600'
                      : 'bg-red-100 text-red-600'
                  }`}
                >
                  {test.status}
                </span>
              </div>

              <div className="flex gap-2">
                {test.status === 'Draft' && (
                  <>
                    <button
                      onClick={() => navigate(`/Testcreatepage?id=${test.id}`)}
                      className="px-4 py-2 border rounded-lg text-sm"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => launchTest(test.id)}
                      className="px-4 py-2 bg-green-600 text-white rounded-lg text-sm"
                    >
                      Launch
                    </button>
                  </>
                )}

                {test.status === 'Running' && (
                  <>
                    <button
                      onClick={() => navigate(`/Viewreport?id=${test.id}`)}
                      className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm"
                    >
                      View Report
                    </button>
                    <button
                      onClick={() => stopTest(test.id)}
                      className="px-4 py-2 border text-red-600 rounded-lg text-sm"
                    >
                      Stop
                    </button>
                  </>
                )}

                {test.status === 'Stopped' && (
                  <button
                    onClick={() => navigate(`/Viewreport?id=${test.id}`)}
                    className="px-4 py-2 bg-gray-800 text-white rounded-lg text-sm"
                  >
                    View Report
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Back */}
        <button
          onClick={() => navigate('/Pagename')}
          className="mt-10 flex items-center gap-2 px-5 py-2 border rounded-lg bg-white"
        >
          <ArrowLeft size={16} /> Back
        </button>
      </main>
      <Footer />
    </div>
  );
}
