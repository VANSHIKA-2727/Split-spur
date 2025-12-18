import React, { useState } from 'react';
import { ArrowLeft, Search, Filter, ChevronDown, X } from 'lucide-react';
import Navbar from '../components/Navbar';
import { useNavigate } from 'react-router-dom';

export default function SplitsurTestsDashboard() {
  const navigate = useNavigate();
  const [sortBy, setSortBy] = useState('last_updated');
  const [showSortDropdown, setShowSortDropdown] = useState(false);
  const [showFilterDropdown, setShowFilterDropdown] = useState(false);
  
  // --- 1. STATE FOR FILTERS ---
  const [selectedStatus, setSelectedStatus] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');

  // State for the dropdown (what's ticked)
  const [selectedUplift, setSelectedUplift] = useState([]); 
  const [selectedConfidence, setSelectedConfidence] = useState([]);

  // State for applied filters (after clicking "Apply")
  const [appliedUplift, setAppliedUplift] = useState([]);
  const [appliedConfidence, setAppliedConfidence] = useState([]);

  const handleAction = (test) => {
  if (test.status === 'Draft') {
    // Redirect to the edit page
    
  } else {
    // Redirect to the report page
    navigate('/Viewreport');
  }
};

  // --- 2. DATA ---
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
      uplift: '+4.7%',
      confidence: 64,
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
      uplift: '+21.4%',
      confidence: 92,
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
      uplift: '+8.7%',
      confidence: 98,
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
      uplift: '+11.2%',
      confidence: 88,
    }
  ];

  const sortOptions = [
    { value: 'last_updated', label: 'Last Updated' },
    { value: 'created_date', label: 'Created Date' },
    { value: 'visitors', label: 'Visitors' },
    { value: 'highest_lift', label: 'Highest Lift' },
    { value: 'confidence', label: 'Confidence' }
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

  // --- 3. FILTER FUNCTIONS ---
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

  const applyFilters = () => {
    setAppliedUplift(selectedUplift);
    setAppliedConfidence(selectedConfidence);
    setShowFilterDropdown(false);
  };

  const clearDropdownFilters = () => {
    setSelectedUplift([]);
    setSelectedConfidence([]);
  };

  const clearAllFilters = () => {
    setAppliedUplift([]);
    setAppliedConfidence([]);
    setSelectedUplift([]);
    setSelectedConfidence([]);
    setSearchTerm('');
    setSelectedStatus('All');
  };

  const removeFilter = (type, value) => {
    if (type === 'uplift') {
      const newUplift = appliedUplift.filter(v => v !== value);
      setAppliedUplift(newUplift);
      setSelectedUplift(newUplift);
    } else if (type === 'confidence') {
      const newConfidence = appliedConfidence.filter(v => v !== value);
      setAppliedConfidence(newConfidence);
      setSelectedConfidence(newConfidence);
    }
  };

  const allFilterOptions = {
    ...upliftOptions.reduce((acc, opt) => ({ ...acc, [opt.value]: opt.label }), {}),
    ...confidenceOptions.reduce((acc, opt) => ({ ...acc, [opt.value]: opt.label }), {}),
  };
  
  const appliedFiltersList = [
    ...appliedUplift.map(v => ({ type: 'uplift', value: v, label: allFilterOptions[v] })),
    ...appliedConfidence.map(v => ({ type: 'confidence', value: v, label: allFilterOptions[v] })),
  ];

  // --- 4. FILTERING & SORTING LOGIC ---
  const activeCount = tests.filter(t => t.status === 'Active').length;
  const draftCount = tests.filter(t => t.status === 'Draft').length;
  const completedCount = tests.filter(t => t.status === 'Completed').length;

  const tabs = [
    { name: 'All Tests', count: tests.length, status: 'All' },
    { name: 'Active', count: activeCount, status: 'Active' },
    { name: 'Draft', count: draftCount, status: 'Draft' },
    { name: 'Completed', count: completedCount, status: 'Completed' }
  ];

  const filteredTests = tests.filter(test => {
    if (selectedStatus !== 'All' && test.status !== selectedStatus) return false;
    if (searchTerm && !test.title.toLowerCase().includes(searchTerm.toLowerCase())) return false;
    if (appliedUplift.length > 0) {
      const upliftNum = parseFloat(test.uplift) || 0;
      let upliftMatch = false;
      if (appliedUplift.includes('high_lift') && upliftNum >= 15) upliftMatch = true;
      if (appliedUplift.includes('medium_lift') && upliftNum >= 5 && upliftNum < 15) upliftMatch = true;
      if (appliedUplift.includes('low_lift') && upliftNum < 5) upliftMatch = true;
      if (!upliftMatch) return false;
    }
    if (appliedConfidence.length > 0) {
      const confidenceNum = test.confidence;
      let confidenceMatch = false;
      if (appliedConfidence.includes('high_confidence') && confidenceNum >= 90) confidenceMatch = true;
      if (appliedConfidence.includes('medium_confidence') && confidenceNum >= 70 && confidenceNum < 90) confidenceMatch = true;
      if (appliedConfidence.includes('low_confidence') && confidenceNum < 70) confidenceMatch = true;
      if (!confidenceMatch) return false;
    }
    return true;
  });

  const sortedTests = [...filteredTests].sort((a, b) => {
    switch (sortBy) {
      case 'created_date': return new Date(b.created) - new Date(a.created);
      case 'visitors': return b.visitors - a.visitors;
      case 'highest_lift': return (parseFloat(b.uplift) || 0) - (parseFloat(a.uplift) || 0);
      case 'confidence': return b.confidence - a.confidence;
      default: return new Date(b.updated) - new Date(a.updated);
    }
  });

  const getStatusBadgeClass = (status) => {
    switch(status) {
      case 'Active': return 'bg-green-100 text-green-700';
      case 'Draft': return 'bg-yellow-100 text-yellow-700';
      case 'Completed': return 'bg-gray-200 text-gray-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <main className="max-w-7xl mx-auto px-6 py-6">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-1">All Tests</h1>
          <p className="text-sm text-gray-600">Manage and monitor all your A/B tests in one place</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-4 gap-4 mb-8">
          <div className="bg-white rounded-lg border border-gray-200 p-5 shadow-sm">
            <div className="text-xs font-bold text-gray-400 uppercase mb-1">Total Tests</div>
            <div className="text-3xl font-bold text-gray-900">{tests.length}</div>
          </div>
          <div className="bg-white rounded-lg border border-gray-200 p-5 shadow-sm">
            <div className="text-xs font-bold text-gray-400 uppercase mb-1">Active</div>
            <div className="text-3xl font-bold text-gray-900 text-green-600">{activeCount}</div>
          </div>
          <div className="bg-white rounded-lg border border-gray-200 p-5 shadow-sm">
            <div className="text-xs font-bold text-gray-400 uppercase mb-1">Drafts</div>
            <div className="text-3xl font-bold text-gray-900 text-amber-500">{draftCount}</div>
          </div>
          <div className="bg-white rounded-lg border border-gray-200 p-5 shadow-sm">
            <div className="text-xs font-bold text-gray-400 uppercase mb-1">Completed</div>
            <div className="text-3xl font-bold text-gray-900 text-gray-500">{completedCount}</div>
          </div>
        </div>

        {/* Bubble Tabs Container */}
        <div className="bg-gray-200/50 p-1 rounded-xl w-fit flex gap-1 mb-6 border border-gray-200">
          {tabs.map((tab) => (
            <button
              key={tab.status}
              onClick={() => setSelectedStatus(tab.status)}
              className={`flex items-center gap-2 px-5 py-2 text-sm font-bold transition-all duration-200 rounded-lg ${
                selectedStatus === tab.status
                  ? 'bg-white text-blue-600 shadow-sm ring-1 ring-black/5'
                  : 'text-gray-500 hover:text-gray-800'
              }`}
            >
              {tab.name}
              <span className={`text-[10px] px-1.5 py-0.5 rounded-full font-black ${
                selectedStatus === tab.status ? 'bg-blue-100 text-blue-600' : 'bg-gray-300 text-gray-600'
              }`}>
                {tab.count}
              </span>
            </button>
          ))}
        </div>

        {/* Search and Sort/Filter */}
        <div className="flex gap-4 mb-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search Tests by title..."
              className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <div className="relative">
            <button
              onClick={() => { setShowSortDropdown(!showSortDropdown); setShowFilterDropdown(false); }}
              className="flex items-center gap-2 px-4 py-2.5 border border-gray-300 rounded-xl text-sm font-bold hover:bg-gray-50 bg-white"
            >
              {sortOptions.find(opt => opt.value === sortBy)?.label}
              <ChevronDown className="w-4 h-4" />
            </button>
            {showSortDropdown && (
              <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-xl shadow-lg z-20">
                {sortOptions.map(option => (
                  <button
                    key={option.value}
                    onClick={() => { setSortBy(option.value); setShowSortDropdown(false); }}
                    className="w-full text-left px-4 py-2 text-sm hover:bg-gray-50 first:rounded-t-lg last:rounded-b-lg font-medium text-gray-700"
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="relative">
            <button
              onClick={() => { setShowFilterDropdown(!showFilterDropdown); setShowSortDropdown(false); }}
              className={`flex items-center gap-2 px-4 py-2.5 border rounded-xl text-sm font-bold transition-colors ${appliedFiltersList.length > 0 ? 'bg-blue-50 border-blue-200 text-blue-700 shadow-sm shadow-blue-100' : 'bg-white border-gray-300 hover:bg-gray-50'}`}
            >
              <Filter className="w-4 h-4" />
              Filter {appliedFiltersList.length > 0 && `(${appliedFiltersList.length})`}
            </button>
            
            {showFilterDropdown && (
              <div className="absolute right-0 mt-2 w-72 bg-white border border-gray-200 rounded-xl shadow-xl z-20 p-5">
                <div className="flex justify-between items-center mb-4 pb-2 border-b border-gray-50">
                  <h3 className="text-xs font-black text-gray-400 uppercase tracking-widest">Filters</h3>
                  <button onClick={clearDropdownFilters} className="text-xs text-blue-600 font-bold hover:underline">
                    Reset
                  </button>
                </div>

                <div className="mb-5">
                  <h4 className="text-xs font-bold text-gray-700 mb-3">Performance (Uplift)</h4>
                  <div className="space-y-2">
                    {upliftOptions.map(option => (
                      <label key={option.value} className="flex items-center cursor-pointer group">
                        <input
                          type="checkbox"
                          checked={selectedUplift.includes(option.value)}
                          onChange={() => toggleUplift(option.value)}
                          className="mr-3 w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                        />
                        <span className="text-sm text-gray-600 group-hover:text-gray-900 font-medium">{option.label}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div className="mb-6">
                  <h4 className="text-xs font-bold text-gray-700 mb-3">Confidence Level</h4>
                  <div className="space-y-2">
                    {confidenceOptions.map(option => (
                      <label key={option.value} className="flex items-center cursor-pointer group">
                        <input
                          type="checkbox"
                          checked={selectedConfidence.includes(option.value)}
                          onChange={() => toggleConfidence(option.value)}
                          className="mr-3 w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                        />
                        <span className="text-sm text-gray-600 group-hover:text-gray-900 font-medium">{option.label}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <button
                  onClick={applyFilters}
                  className="w-full py-2.5 bg-blue-600 text-white text-sm font-bold rounded-lg hover:bg-blue-700 transition-colors shadow-md"
                >
                  Apply Filters
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Applied Filters Tags */}
        {appliedFiltersList.length > 0 && (
          <div className="flex items-center gap-2 mb-6 flex-wrap animate-in fade-in duration-300">
            <span className="text-[10px] font-black text-gray-400 uppercase tracking-tighter mr-1">Active:</span>
            {appliedFiltersList.map(filter => (
              <span key={filter.value} className="flex items-center gap-1.5 px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-[11px] font-bold ring-1 ring-blue-200">
                {filter.label}
                <button onClick={() => removeFilter(filter.type, filter.value)} className="hover:text-blue-900 transition-colors">
                  <X className="w-3 h-3" />
                </button>
              </span>
            ))}
            <button onClick={clearAllFilters} className="text-xs text-gray-400 font-bold hover:text-red-500 ml-1 transition-colors">
              CLEAR ALL
            </button>
          </div>
        )}

        {/* Tests List */}
        <div className="space-y-4 mb-12">
          {sortedTests.length > 0 ? (
            sortedTests.map(test => (
              <div key={test.id} className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-lg transition-all duration-200 group">
                <div className="flex items-start justify-between mb-6">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-lg font-bold text-gray-900 group-hover:text-blue-600 transition-colors">{test.title}</h3>
                      <span className={`px-2.5 py-0.5 text-[10px] font-black rounded uppercase tracking-wider ${getStatusBadgeClass(test.status)}`}>
                        {test.status}
                      </span>
                    </div>
                    <p className="text-xs text-gray-500 font-medium">
                      Created {test.created} • Updated {new Date(test.updated).toLocaleDateString()}
                    </p>
                  </div>
                  <button 
  onClick={() => handleAction(test)}
  className="px-6 py-2 bg-blue-600 text-white text-sm font-bold rounded-lg hover:bg-blue-700 transition-all shadow-sm active:scale-95"
>
  {test.status === 'Draft' ? 'Edit' : 'View Report'}
</button>
                </div>

                <div className="grid grid-cols-5 gap-6 p-4 bg-gray-50 rounded-xl border border-gray-100">
                  <div className="text-center md:text-left">
                    <div className="text-[10px] font-black text-gray-400 uppercase mb-1 tracking-wider">Visitors</div>
                    <div className="text-xl font-black text-gray-900">{test.visitors.toLocaleString()}</div>
                  </div>
                  <div className="text-center md:text-left border-l border-gray-200 pl-4">
                    <div className="text-[10px] font-black text-gray-400 uppercase mb-1 tracking-wider">Conversions</div>
                    <div className="text-xl font-black text-gray-900">{test.conversions.toLocaleString()}</div>
                  </div>
                  <div className="text-center md:text-left border-l border-gray-200 pl-4">
                    <div className="text-[10px] font-black text-gray-400 uppercase mb-1 tracking-wider">Rate</div>
                    <div className="text-xl font-black text-gray-900">{test.rate}</div>
                  </div>
                  <div className="text-center md:text-left border-l border-gray-200 pl-4">
                    <div className="text-[10px] font-black text-gray-400 uppercase mb-1 tracking-wider">Result</div>
                    <div className="flex items-center justify-center md:justify-start gap-1.5">
                      <span className="text-sm font-bold text-gray-700">{test.leadingVariant}</span>
                      {test.uplift !== '-' && <span className="text-sm font-black text-green-600">{test.uplift}</span>}
                    </div>
                  </div>
                  <div className="text-center md:text-left border-l border-gray-200 pl-4">
                    <div className="text-[10px] font-black text-gray-400 uppercase mb-1 tracking-wider">Confidence</div>
                    {test.confidence > 0 ? (
                      <div className="flex items-center gap-3">
                        <div className="flex-1 bg-gray-200 rounded-full h-2 hidden md:block overflow-hidden">
                          <div className="bg-blue-600 h-2 rounded-full transition-all duration-500" style={{ width: `${test.confidence}%` }}></div>
                        </div>
                        <span className="text-xs font-black text-blue-600">{test.confidence}%</span>
                      </div>
                    ) : <span className="text-sm text-gray-300">-</span>}
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-24 bg-white border-2 border-dashed border-gray-200 rounded-2xl">
              <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4">
                <Search className="w-8 h-8 text-gray-300" />
              </div>
              <h3 className="text-xl font-bold text-gray-900">No matching tests</h3>
              <p className="text-sm text-gray-500 mt-2 mb-8">Try adjusting your search terms or resetting the filters.</p>
              <button onClick={clearAllFilters} className="px-8 py-3 bg-blue-600 text-white text-sm font-bold rounded-xl hover:bg-blue-700 transition-all shadow-md active:scale-95">
                Clear All Filters
              </button>
            </div>
          )}
        </div>

        <button 
          onClick={() => navigate('/Pagename')}
          className="flex items-center gap-2 px-6 py-2.5 border border-gray-300 rounded-xl text-sm font-bold text-gray-700 hover:bg-white hover:shadow-sm transition-all mb-16"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Dashboard
        </button>
      </main>

      <footer className="bg-white border-t border-gray-200 px-6 py-12">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
          <div>
            <h4 className="font-black text-gray-900 mb-6 uppercase tracking-widest text-[10px]">Stay Updated</h4>
            <div className="flex gap-2">
              <input type="email" placeholder="your@email.com" className="flex-1 px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none" />
              <button className="px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-black transition-colors">→</button>
            </div>
          </div>
          <div>
            <h4 className="font-black text-gray-900 mb-6 uppercase tracking-widest text-[10px]">Product</h4>
            <ul className="space-y-3 text-sm text-gray-500 font-bold">
              <li className="hover:text-blue-600 cursor-pointer">Features</li>
              <li className="hover:text-blue-600 cursor-pointer">Pricing</li>
              <li className="hover:text-blue-600 cursor-pointer">API</li>
            </ul>
          </div>
          <div>
            <h4 className="font-black text-gray-900 mb-6 uppercase tracking-widest text-[10px]">Company</h4>
            <ul className="space-y-3 text-sm text-gray-500 font-bold">
              <li className="hover:text-blue-600 cursor-pointer">About</li>
              <li className="hover:text-blue-600 cursor-pointer">Blog</li>
              <li className="hover:text-blue-600 cursor-pointer">Privacy</li>
            </ul>
          </div>
          <div>
            <h4 className="font-black text-gray-900 mb-6 uppercase tracking-widest text-[10px]">Support</h4>
            <ul className="space-y-3 text-sm text-gray-500 font-bold">
              <li className="hover:text-blue-600 cursor-pointer">Help Center</li>
              <li className="hover:text-blue-600 cursor-pointer">Community</li>
              <li className="hover:text-blue-600 cursor-pointer">Status</li>
            </ul>
          </div>
        </div>
      </footer>
    </div>
  );
}