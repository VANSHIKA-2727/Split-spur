import { useState } from 'react';
import { TrendingUp, ArrowLeft, Share2, Search, Filter, ChevronDown, X } from 'lucide-react';
import Navbar from '../components/Navbar';
import React from 'react'; // Make sure to import React

export default function SplitsurTestsDashboard() {
  const [sortBy, setSortBy] = useState('last_updated');
  const [showSortDropdown, setShowSortDropdown] = useState(false);
  const [showFilterDropdown, setShowFilterDropdown] = useState(false);
  
  // --- 1. STATE FOR FILTERS ---
  
  // State for the status tabs and search
  const [selectedStatus, setSelectedStatus] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');

  // State for the *dropdown* (what's ticked)
  const [selectedTestTypes, setSelectedTestTypes] = useState([]);
  const [selectedUplift, setSelectedUplift] = useState([]); // Renamed
  const [selectedConfidence, setSelectedConfidence] = useState([]);

  // State for *applied* filters (after clicking "Apply")
  const [appliedTestTypes, setAppliedTestTypes] = useState([]);
  const [appliedUplift, setAppliedUplift] = useState([]);
  const [appliedConfidence, setAppliedConfidence] = useState([]);


  // --- 2. UPDATED DATA & OPTIONS ---
  
  const tests = [
    {
      id: 1,
      title: 'Product Page - Add to Cart Button Color',
      status: 'Active',
      created: '2025-09-12',
      updated: '2025-10-30T09:00:00Z', 
      visitors: 12456,
      conversions: 1847,
      rate: '14.8%',
      leadingVariant: 'Variant B',
      uplift: '+10.2%',
      confidence: 77,
      type: 'full_page' // Updated type
    },
    {
      id: 2,
      title: 'Checkout Flow - Trust Badges Placement',
      status: 'Active',
      created: '2025-09-07',
      updated: '2025-10-30T06:00:00Z',
      visitors: 8234,
      conversions: 987,
      rate: '12%',
      leadingVariant: 'Variant A',
      uplift: '+4.7%', // Will be 'low_lift' (< 5%)
      confidence: 64, // Will be 'low_confidence' (< 70%)
      type: 'fragment' // Updated type
    },
    {
      id: 3,
      title: 'Homepage Hero - Value Proposition Copy',
      status: 'Active',
      created: '2025-09-02',
      updated: '2025-10-30T10:00:00Z',
      visitors: 18790,
      conversions: 3289,
      rate: '17.5%',
      leadingVariant: 'Variant B',
      uplift: '+21.4%', // Will be 'high_lift' (>= 15%)
      confidence: 92, // Will be 'high_confidence' (>= 90%)
      type: 'full_page' // Updated type
    },
    {
      id: 4,
      title: 'Pricing Page - Annual vs Monthly Toggle',
      status: 'Draft',
      created: '2025-10-15',
      updated: '2025-10-29T14:00:00Z',
      visitors: 0,
      conversions: 0,
      rate: '0%',
      leadingVariant: '-',
      uplift: '-',
      confidence: 0,
      type: 'targeted' // Updated type
    },
    {
      id: 5,
      title: 'Email Signup Form - Field Reduction',
      status: 'Completed',
      created: '2025-08-20',
      updated: '2025-09-15T00:00:00Z',
      visitors: 24567,
      conversions: 4821,
      rate: '19.6%',
      leadingVariant: 'Variant A',
      uplift: '+8.7%', // Will be 'medium_lift' (5-15%)
      confidence: 98, // Will be 'high_confidence' (>= 90%)
      type: 'fragment' // Updated type
    },
    {
      id: 6,
      title: 'Product Gallery - Image Layout',
      status: 'Completed',
      created: '2025-08-18',
      updated: '2025-09-20T00:00:00Z',
      visitors: 15678,
      conversions: 2134,
      rate: '13.6%',
      leadingVariant: 'Variant B',
      uplift: '+11.2%', // Will be 'medium_lift' (5-15%)
      confidence: 88, // Will be 'medium_confidence' (70-90%)
      type: 'full_page' // Updated type
    }
  ];

  const sortOptions = [
    { value: 'last_updated', label: 'Last Updated' },
    { value: 'created_date', label: 'Created Date' },
    { value: 'visitors', label: 'Visitors' },
    { value: 'highest_lift', label: 'Highest Lift' },
    { value: 'confidence', label: 'Confidence' }
  ];

  // --- NEW Filter Options ---
  const testTypeOptions = [
    { value: 'full_page', label: 'Full Page' },
    { value: 'fragment', label: 'Fragment' },
    { value: 'targeted', label: 'Targeted' },
  ];

  const upliftOptions = [
    { value: 'high_lift', label: 'High Lift (≥15%)' },
    { value: 'medium_lift', label: 'Medium Lift (5-15%)' },
    { value: 'low_lift', label: 'Low Lift (<5%)' },
  ];

  const confidenceOptions = [
    { value: 'high_confidence', label: 'High (≥90%)' },
    { value: 'medium_confidence', label: 'Medium (70-90%)' },
    { value: 'low_confidence', label: 'Low (<70%)' },
  ];

  // --- 3. UPDATED FILTER FUNCTIONS ---

  // Toggles for checkboxes
  const toggleTestType = (value) => {
    setSelectedTestTypes(prev => 
      prev.includes(value) ? prev.filter(v => v !== value) : [...prev, value]
    );
  };

  const toggleUplift = (value) => {
    setSelectedUplift(prev => 
      prev.includes(value) ? prev.filter(v => v !== value) : [...prev, value]
    );
  };

  const toggleConfidence = (value) => {
    setSelectedConfidence(prev => 
      prev.includes(value) ? prev.filter(v => v !== value) : [...prev, value]
    );
  };

  // Called when "Apply Filters" is clicked
  const applyFilters = () => {
    setAppliedTestTypes(selectedTestTypes);
    setAppliedUplift(selectedUplift);
    setAppliedConfidence(selectedConfidence);
    setShowFilterDropdown(false);
  };

  // Clears checkboxes *inside* the dropdown
  const clearDropdownFilters = () => {
    setSelectedTestTypes([]);
    setSelectedUplift([]);
    setSelectedConfidence([]);
  };

  // Clears all *applied* filters from the main page
  const clearAllFilters = () => {
    setAppliedTestTypes([]);
    setAppliedUplift([]);
    setAppliedConfidence([]);
    setSelectedTestTypes([]);
    setSelectedUplift([]);
    setSelectedConfidence([]);
  };

  // Removes a single applied filter tag
  const removeFilter = (type, value) => {
    switch (type) {
      case 'testType':
        const newTypes = appliedTestTypes.filter(v => v !== value);
        setAppliedTestTypes(newTypes);
        setSelectedTestTypes(newTypes);
        break;
      case 'uplift':
        const newUplift = appliedUplift.filter(v => v !== value);
        setAppliedUplift(newUplift);
        setSelectedUplift(newUplift);
        break;
      case 'confidence':
        const newConfidence = appliedConfidence.filter(v => v !== value);
        setAppliedConfidence(newConfidence);
        setSelectedConfidence(newConfidence);
        break;
      default:
        break;
    }
  };

  // Helper object to get labels from values (e.g., 'full_page' -> 'Full Page')
  const allFilterOptions = {
    ...testTypeOptions.reduce((acc, opt) => ({ ...acc, [opt.value]: opt.label }), {}),
    ...upliftOptions.reduce((acc, opt) => ({ ...acc, [opt.value]: opt.label }), {}),
    ...confidenceOptions.reduce((acc, opt) => ({ ...acc, [opt.value]: opt.label }), {}),
  };
  
  // Creates a flat list of all applied filters for easy rendering
  const appliedFiltersList = [
    ...appliedTestTypes.map(v => ({ type: 'testType', value: v, label: allFilterOptions[v] })),
    ...appliedUplift.map(v => ({ type: 'uplift', value: v, label: allFilterOptions[v] })),
    ...appliedConfidence.map(v => ({ type: 'confidence', value: v, label: allFilterOptions[v] })),
  ];


  // --- 4. FULL FILTERING & SORTING LOGIC ---

  const activeCount = tests.filter(t => t.status === 'Active').length;
  const draftCount = tests.filter(t => t.status === 'Draft').length;
  const completedCount = tests.filter(t => t.status === 'Completed').length;

  const tabs = [
    { name: 'All Tests', count: tests.length, status: 'All' },
    { name: 'Active', count: activeCount, status: 'Active' },
    { name: 'Draft', count: draftCount, status: 'Draft' },
    { name: 'Completed', count: completedCount, status: 'Completed' }
  ];

  // A. Filter by STATUS
  const filteredByStatus = tests.filter(test => {
    if (selectedStatus === 'All') {
      return true;
    }
    return test.status === selectedStatus;
  });

  // B. Filter by SEARCH
  const filteredBySearch = filteredByStatus.filter(test => {
    return test.title.toLowerCase().includes(searchTerm.toLowerCase());
  });
  
  // C. Filter by ADVANCED FILTERS
  const filteredByAdvanced = filteredBySearch.filter(test => {
    // 1. Check Test Type
    if (appliedTestTypes.length > 0 && !appliedTestTypes.includes(test.type)) {
      return false;
    }
  
    // 2. Check Uplift (Performance)
    if (appliedUplift.length > 0) {
      const upliftNum = parseFloat(test.uplift) || 0;
      let upliftMatch = false;
      if (appliedUplift.includes('high_lift') && upliftNum >= 15) upliftMatch = true;
      if (appliedUplift.includes('medium_lift') && upliftNum >= 5 && upliftNum < 15) upliftMatch = true;
      if (appliedUplift.includes('low_lift') && upliftNum < 5) upliftMatch = true;
      if (!upliftMatch) return false;
    }
  
    // 3. Check Confidence
    if (appliedConfidence.length > 0) {
      const confidenceNum = test.confidence;
      let confidenceMatch = false;
      if (appliedConfidence.includes('high_confidence') && confidenceNum >= 90) confidenceMatch = true;
      if (appliedConfidence.includes('medium_confidence') && confidenceNum >= 70 && confidenceNum < 90) confidenceMatch = true;
      if (appliedConfidence.includes('low_confidence') && confidenceNum < 70) confidenceMatch = true;
      if (!confidenceMatch) return false;
    }
  
    return true; // Passed all filters
  });
  
  // D. Finally, SORT the remaining list
  const sortedAndFilteredTests = [...filteredByAdvanced].sort((a, b) => {
    switch (sortBy) {
      case 'created_date':
        return new Date(b.created) - new Date(a.created);
      case 'visitors':
        return b.visitors - a.visitors;
      case 'highest_lift':
        const upliftA = parseFloat(a.uplift) || 0;
        const upliftB = parseFloat(b.uplift) || 0;
        return upliftB - upliftA;
      case 'confidence':
        return b.confidence - a.confidence;
      case 'last_updated':
      default:
        return new Date(b.updated) - new Date(a.updated);
    }
  });


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
          {/* ... Stats cards are unchanged ... */}
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
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="relative">
            {/* Sort Dropdown (unchanged) */}
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
            
            {/* --- 5. UPDATED FILTER DROPDOWN JSX --- */}
            {showFilterDropdown && (
              <div className="absolute right-0 mt-2 w-80 bg-white border border-gray-200 rounded-lg shadow-lg z-10 p-4">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-base font-semibold text-gray-900">Filter Tests</h3>
                  <button onClick={clearDropdownFilters} className="text-sm text-blue-600 hover:underline">
                    Clear
                  </button>
                </div>

                <div className="mb-4">
                  <h4 className="text-sm font-medium text-gray-700 mb-2">Test Type</h4>
                  <div className="space-y-2">
                    {testTypeOptions.map(option => (
                      <label key={option.value} className="flex items-center">
                        <input
                          type="checkbox"
                          checked={selectedTestTypes.includes(option.value)}
                          onChange={() => toggleTestType(option.value)}
                          className="mr-2 rounded"
                        />
                        <span className="text-sm text-gray-700">{option.label}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div className="mb-4">
                  <h4 className="text-sm font-medium text-gray-700 mb-2">Performance Level</h4>
                  <div className="space-y-2">
                    {upliftOptions.map(option => (
                      <label key={option.value} className="flex items-center">
                        <input
                          type="checkbox"
                          checked={selectedUplift.includes(option.value)}
                          onChange={() => toggleUplift(option.value)}
                          className="mr-2 rounded"
                        />
                        <span className="text-sm text-gray-700">{option.label}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div className="mb-4">
                  <h4 className="text-sm font-medium text-gray-700 mb-2">Confidence Level</h4>
                  <div className="space-y-2">
                    {confidenceOptions.map(option => (
                      <label key={option.value} className="flex items-center">
                        <input
                          type="checkbox"
                          checked={selectedConfidence.includes(option.value)}
                          onChange={() => toggleConfidence(option.value)}
                          className="mr-2 rounded"
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

        {/* Status Filter Tabs (unchanged) */}
        <div className="flex items-center gap-2 mb-4">
          {tabs.map((tab, index) => (
            <React.Fragment key={tab.status}>
              <button
                onClick={() => setSelectedStatus(tab.status)}
                className={`text-sm ${
                  selectedStatus === tab.status
                    ? 'font-bold text-blue-600'
                    : 'text-gray-600 hover:text-gray-800'
                }`}
              >
                {tab.name} ({tab.count})
              </button>
              {index < tabs.length - 1 && (
                <span className="text-sm text-gray-400">•</span>
              )}
            </React.Fragment>
          ))}
        </div>

        {/* --- 6. NEW: APPLIED FILTERS DISPLAY --- */}
        {appliedFiltersList.length > 0 && (
          <div className="flex items-center gap-2 mb-4 flex-wrap">
            <span className="text-sm font-medium text-gray-700">Applied Filters:</span>
            {appliedFiltersList.map(filter => (
              <span key={filter.value} className="flex items-center gap-1.5 px-2 py-1 bg-gray-200 text-gray-700 rounded-full text-sm">
                {filter.label}
                <button onClick={() => removeFilter(filter.type, filter.value)} className="hover:text-red-500">
                  <X className="w-3 h-3" />
                </button>
              </span>
            ))}
            <button
              onClick={clearAllFilters}
              className="text-sm text-blue-600 hover:underline"
            >
              Clear All
            </button>
          </div>
        )}


        {/* Tests List (Now renders sortedAndFilteredTests) */}
        <div className="space-y-4 mb-6">
          {sortedAndFilteredTests.length > 0 ? (
            sortedAndFilteredTests.map(test => (
              <div key={test.id} className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-md transition-shadow">
                {/* ... card content ... */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="text-lg font-semibold text-gray-900">{test.title}</h3>
                      <span className={`px-2 py-1 text-xs font-medium rounded ${getStatusBadgeClass(test.status)}`}>
                        {test.status}
                      </span>
                    </div>
                    {/* Updated to show a readable date */}
                    <p className="text-sm text-gray-600">Created {test.created} • Updated {new Date(test.updated).toLocaleDateString()}</p>
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
                  {test.status === 'Active' && (
                    <button className="px-4 py-2 bg-white text-gray-700 border border-gray-300 text-sm font-medium rounded-lg hover:bg-gray-50">
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
            ))
          ) : (
            // This 'empty' state is now much more useful
            <div className="text-center py-12 bg-white border border-gray-200 rounded-lg">
              <h3 className="text-lg font-medium text-gray-900">No tests found</h3>
              <p className="text-sm text-gray-600 mt-1">
                Your filters did not match any tests.
              </p>
              <button
                onClick={clearAllFilters}
                className="mt-4 px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700"
              >
                Clear All Filters
              </button>
            </div>
          )}
        </div>


        {/* Back Button */}
        <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium hover:bg-gray-50 mb-12">
          <ArrowLeft className="w-4 h-4" />
          Back to Dashboard
        </button>
      </main>

      {/* Footer (unchanged) */}
      <footer className="bg-white border-t border-gray-200 px-6 py-8">
        {/* ... footer content ... */}
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