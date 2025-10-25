import { useState } from 'react';
import { TrendingUp, ArrowLeft, Share2, Search, Filter, ChevronDown, X } from 'lucide-react';
import Navbar from '../components/Navbar';

export default function SplitsurTestsDashboard() {
  const [sortBy, setSortBy] = useState('last_updated');
  const [showSortDropdown, setShowSortDropdown] = useState(false);
  const [showFilterDropdown, setShowFilterDropdown] = useState(false);
  const [selectedTestTypes, setSelectedTestTypes] = useState([]);
  const [selectedVariants, setSelectedVariants] = useState([]);
  const [selectedConfidence, setSelectedConfidence] = useState([]);

  const tests = [
    {
      id: 1,
      title: 'Product Page - Add to Cart Button Color',
      status: 'Active',
      created: '2025-09-12',
      updated: '2 hours ago',
      visitors: 12456,
      conversions: 1847,
      rate: '14.8%',
      leadingVariant: 'Variant B',
      uplift: '+10.2%',
      confidence: 77,
      type: 'A/B Test'
    },
    {
      id: 2,
      title: 'Checkout Flow - Trust Badges Placement',
      status: 'Active',
      created: '2025-09-07',
      updated: '5 hours ago',
      visitors: 8234,
      conversions: 987,
      rate: '12%',
      leadingVariant: 'Variant A',
      uplift: '+4.7%',
      confidence: 64,
      type: 'Multivariate'
    },
    {
      id: 3,
      title: 'Homepage Hero - Value Proposition Copy',
      status: 'Active',
      created: '2025-09-02',
      updated: '1 hour ago',
      visitors: 18790,
      conversions: 3289,
      rate: '17.5%',
      leadingVariant: 'Variant B',
      uplift: '+21.4%',
      confidence: 92,
      type: 'A/B Test'
    },
    {
      id: 4,
      title: 'Pricing Page - Annual vs Monthly Toggle',
      status: 'Draft',
      created: '2025-10-15',
      updated: 'Yesterday',
      visitors: 0,
      conversions: 0,
      rate: '0%',
      leadingVariant: '-',
      uplift: '-',
      confidence: 0,
      type: 'A/B Test'
    },
    {
      id: 5,
      title: 'Email Signup Form - Field Reduction',
      status: 'Completed',
      created: '2025-08-20',
      updated: '2025-09-15',
      visitors: 24567,
      conversions: 4821,
      rate: '19.6%',
      leadingVariant: 'Variant A',
      uplift: '+8.7%',
      confidence: 98,
      type: 'A/B Test'
    },
    {
      id: 6,
      title: 'Product Gallery - Image Layout',
      status: 'Completed',
      created: '2025-08-18',
      updated: '2025-09-20',
      visitors: 15678,
      conversions: 2134,
      rate: '13.6%',
      leadingVariant: 'Variant B',
      uplift: '+11.2%',
      confidence: 88,
      type: 'Multivariate'
    }
  ];

  const sortOptions = [
    { value: 'last_updated', label: 'Last Updated' },
    { value: 'created_date', label: 'Created Date' },
    { value: 'visitors', label: 'Visitors' },
    { value: 'highest_lift', label: 'Highest Lift' },
    { value: 'confidence', label: 'Confidence' }
  ];

  const testTypeOptions = [
    { value: 'ab_test', label: 'A/B Test' },
    { value: 'multivariate', label: 'Multivariate' },
    { value: 'personalized', label: 'Personalized' },
    { value: 'redirect', label: 'Redirect' }
  ];

  const variantOptions = [
    { value: 'high_uplift', label: 'High Uplift (+20%)' },
    { value: 'medium_uplift', label: 'Medium Uplift (+10%)' },
    { value: 'low_uplift', label: 'Low Uplift (+5%)' }
  ];

  const confidenceOptions = [
    { value: 'very_high', label: 'Very High (95%+)' },
    { value: 'high', label: 'High (90-94%)' },
    { value: 'medium', label: 'Medium (75-90%)' },
    { value: 'low', label: 'Low (<75%)' }
  ];

  const toggleTestType = (value) => {
    setSelectedTestTypes(prev => 
      prev.includes(value) ? prev.filter(v => v !== value) : [...prev, value]
    );
  };

  const toggleVariant = (value) => {
    setSelectedVariants(prev => 
      prev.includes(value) ? prev.filter(v => v !== value) : [...prev, value]
    );
  };

  const toggleConfidence = (value) => {
    setSelectedConfidence(prev => 
      prev.includes(value) ? prev.filter(v => v !== value) : [...prev, value]
    );
  };

  const applyFilters = () => {
    setShowFilterDropdown(false);
  };

  const activeCount = tests.filter(t => t.status === 'Active').length;
  const draftCount = tests.filter(t => t.status === 'Draft').length;
  const completedCount = tests.filter(t => t.status === 'Completed').length;

  const getStatusBadgeClass = (status) => {
    switch(status) {
      case 'Active':
        return 'bg-green-100 text-green-700';
      case 'Draft':
        return 'bg-yellow-100 text-yellow-700';
      case 'Completed':
        return 'bg-gray-200 text-gray-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-6">
        {/* Page Title */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-1">All Tests</h1>
          <p className="text-sm text-gray-600">Manage and monitor all your A/B tests in one place</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-4 gap-4 mb-6">
          <div className="bg-white rounded-lg border border-gray-200 p-5">
            <div className="text-sm text-gray-600 mb-1">Total Tests</div>
            <div className="text-3xl font-bold text-gray-900">{tests.length}</div>
          </div>
          <div className="bg-white rounded-lg border border-gray-200 p-5">
            <div className="text-sm text-gray-600 mb-1">Active Tests</div>
            <div className="text-3xl font-bold text-gray-900">{activeCount}</div>
          </div>
          <div className="bg-white rounded-lg border border-gray-200 p-5">
            <div className="text-sm text-gray-600 mb-1">Draft Tests</div>
            <div className="text-3xl font-bold text-gray-900">{draftCount}</div>
          </div>
          <div className="bg-white rounded-lg border border-gray-200 p-5">
            <div className="text-sm text-gray-600 mb-1">Completed</div>
            <div className="text-3xl font-bold text-gray-900">{completedCount}</div>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="flex gap-4 mb-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search Tests..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="relative">
            <button
              onClick={() => {
                setShowSortDropdown(!showSortDropdown);
                setShowFilterDropdown(false);
              }}
              className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium hover:bg-gray-50"
            >
              {sortOptions.find(opt => opt.value === sortBy)?.label}
              <ChevronDown className="w-4 h-4" />
            </button>
            {showSortDropdown && (
              <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-10">
                {sortOptions.map(option => (
                  <button
                    key={option.value}
                    onClick={() => {
                      setSortBy(option.value);
                      setShowSortDropdown(false);
                    }}
                    className="w-full text-left px-4 py-2 text-sm hover:bg-gray-50 first:rounded-t-lg last:rounded-b-lg"
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            )}
          </div>
          <div className="relative">
            <button
              onClick={() => {
                setShowFilterDropdown(!showFilterDropdown);
                setShowSortDropdown(false);
              }}
              className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium hover:bg-gray-50"
            >
              <Filter className="w-4 h-4" />
              Filter
            </button>
            {showFilterDropdown && (
              <div className="absolute right-0 mt-2 w-80 bg-white border border-gray-200 rounded-lg shadow-lg z-10 p-4">
                <div className="mb-4">
                  <h3 className="text-sm font-semibold text-gray-900 mb-2">Filter Tests</h3>
                </div>

                <div className="mb-4">
                  <h4 className="text-xs font-medium text-gray-700 mb-2">Test Type</h4>
                  <div className="space-y-2">
                    {testTypeOptions.map(option => (
                      <label key={option.value} className="flex items-center">
                        <input
                          type="checkbox"
                          checked={selectedTestTypes.includes(option.value)}
                          onChange={() => toggleTestType(option.value)}
                          className="mr-2"
                        />
                        <span className="text-sm text-gray-700">{option.label}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div className="mb-4">
                  <h4 className="text-xs font-medium text-gray-700 mb-2">Performance Level</h4>
                  <div className="space-y-2">
                    {variantOptions.map(option => (
                      <label key={option.value} className="flex items-center">
                        <input
                          type="checkbox"
                          checked={selectedVariants.includes(option.value)}
                          onChange={() => toggleVariant(option.value)}
                          className="mr-2"
                        />
                        <span className="text-sm text-gray-700">{option.label}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div className="mb-4">
                  <h4 className="text-xs font-medium text-gray-700 mb-2">Confidence Level</h4>
                  <div className="space-y-2">
                    {confidenceOptions.map(option => (
                      <label key={option.value} className="flex items-center">
                        <input
                          type="checkbox"
                          checked={selectedConfidence.includes(option.value)}
                          onChange={() => toggleConfidence(option.value)}
                          className="mr-2"
                        />
                        <span className="text-sm text-gray-700">{option.label}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <button
                  onClick={applyFilters}
                  className="w-full py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700"
                >
                  Apply Filters
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Filter Tags */}
        <div className="flex items-center gap-2 mb-4">
          <span className="text-sm text-gray-600">All Tests ({tests.length})</span>
          <span className="text-sm text-gray-400">•</span>
          <span className="text-sm text-gray-600">Active ({activeCount})</span>
          <span className="text-sm text-gray-400">•</span>
          <span className="text-sm text-gray-600">Draft ({draftCount})</span>
          <span className="text-sm text-gray-400">•</span>
          <span className="text-sm text-gray-600">Completed ({completedCount})</span>
        </div>

        {/* Tests List */}
        <div className="space-y-4 mb-6">
          {tests.map(test => (
            <div key={test.id} className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="text-lg font-semibold text-gray-900">{test.title}</h3>
                    <span className={`px-2 py-1 text-xs font-medium rounded ${getStatusBadgeClass(test.status)}`}>
                      {test.status}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600">Created {test.created} • Updated {test.updated}</p>
                </div>
                {test.status === 'Draft' && (
                  <button className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700">
                    Edit
                  </button>
                )}
                {test.status === 'Completed' && (
                  <button className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700">
                    View Report
                  </button>
                )}
              </div>

              <div className="grid grid-cols-5 gap-8">
                <div>
                  <div className="text-xs text-gray-600 mb-1">Visitors</div>
                  <div className="text-lg font-semibold text-gray-900">{test.visitors.toLocaleString()}</div>
                </div>
                <div>
                  <div className="text-xs text-gray-600 mb-1">Conversions</div>
                  <div className="text-lg font-semibold text-gray-900">{test.conversions.toLocaleString()}</div>
                </div>
                <div>
                  <div className="text-xs text-gray-600 mb-1">Rate</div>
                  <div className="text-lg font-semibold text-gray-900">{test.rate}</div>
                </div>
                <div>
                  <div className="text-xs text-gray-600 mb-1">Leading Variant</div>
                  <div className="flex items-center gap-1">
                    <span className="text-sm font-medium text-gray-900">{test.leadingVariant}</span>
                    {test.uplift !== '-' && (
                      <span className="text-sm font-medium text-green-600">{test.uplift}</span>
                    )}
                  </div>
                </div>
                <div>
                  <div className="text-xs text-gray-600 mb-1">Confidence</div>
                  {test.confidence > 0 ? (
                    <>
                      <div className="w-full bg-gray-200 rounded-full h-2 mb-1">
                        <div
                          className="bg-blue-600 h-2 rounded-full"
                          style={{ width: `${test.confidence}%` }}
                        ></div>
                      </div>
                      <span className="text-xs text-gray-600">{test.confidence}%</span>
                    </>
                  ) : (
                    <span className="text-sm text-gray-400">-</span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Back Button */}
        <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium hover:bg-gray-50 mb-12">
          <ArrowLeft className="w-4 h-4" />
          Back to Dashboard
        </button>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 px-6 py-8">
        <div className="max-w-7xl mx-auto grid grid-cols-4 gap-8">
          <div>
            <h4 className="font-semibold mb-3">Stay Updated</h4>
            <p className="text-sm text-gray-600 mb-2">Get the latest features and testing insights</p>
            <div className="flex gap-2">
              <input 
                type="email" 
                placeholder="your@email.com"
                className="flex-1 px-3 py-2 border border-gray-300 rounded text-sm"
              />
              <button className="px-4 py-2 bg-blue-600 text-white text-sm rounded hover:bg-blue-700">
                →
              </button>
            </div>
          </div>
          <div>
            <h4 className="font-semibold mb-3">Product</h4>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>Features</li>
              <li>Pricing</li>
              <li>Documentation</li>
              <li>API Reference</li>
              <li>Integrations</li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-3">Product</h4>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>About Us</li>
              <li>Blog</li>
              <li>Contact Us</li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-3">Resources</h4>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>Help</li>
              <li>Community</li>
              <li>Tutorials</li>
            </ul>
          </div>
        </div>
      </footer>
    </div>
  );
}