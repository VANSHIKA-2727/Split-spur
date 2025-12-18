import React, { useState } from 'react';
import { 
  ChevronDown, 
  Target, 
  X, 
  Layers, 
  ShoppingCart, 
  Heart, 
  Image as ImageIcon, 
  Share2, 
  MousePointerClick, 
  Link as LinkIcon,
  Globe,
  AlertCircle
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const TestCreationFlow = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);

  // Step 1 State
  const [testName, setTestName] = useState('');
  const [variantAUrl, setVariantAUrl] = useState('');
  const [variantBUrl, setVariantBUrl] = useState('');
  const [testType, setTestType] = useState('full-page');

  // Step 3 State
  const [selectedGoals, setSelectedGoals] = useState([]);
  const [targetAudience, setTargetAudience] = useState('Desktop Users');
  const [trafficSplit, setTrafficSplit] = useState('50/50 (Control vs Variant)');
  const [customPercentage, setCustomPercentage] = useState(50); 

  // UI State
  const [showTargetAudienceDropdown, setShowTargetAudienceDropdown] = useState(false);
  const [showTrafficSplitDropdown, setShowTrafficSplitDropdown] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showDraftModal, setShowDraftModal] = useState(false);

  // Helper to ensure URL is valid for iframe
  const formatUrl = (url) => {
    if (!url) return '';
    if (!/^https?:\/\//i.test(url)) return `https://${url}`;
    return url;
  };

  const goals = [
    { id: 'form', label: 'Form Submissions', icon: <Layers size={18} /> },
    { id: 'product', label: 'Product Interactions', icon: <ShoppingCart size={18} /> },
    { id: 'wishlist', label: 'Wishlist Actions', icon: <Heart size={18} /> },
    { id: 'carousel', label: 'Carousel Interactions', icon: <Layers size={18} /> },
    { id: 'accordion', label: 'Accordion Expands', icon: <Layers size={18} /> },
    { id: 'image', label: 'Image Clicks', icon: <ImageIcon size={18} /> },
    { id: 'social', label: 'Social Media Clicks', icon: <Share2 size={18} /> },
    { id: 'internal', label: 'Internal Navigation', icon: <MousePointerClick size={18} /> },
    { id: 'external', label: 'External Link Clicks', icon: <LinkIcon size={18} /> }
  ];

  const targetAudiences = ['Desktop Users', 'Mobile Users', 'All Visitors'];
  const trafficSplits = ['50/50 (Control vs Variant)', '80/20 (Control vs Variant)', 'Custom Ratio'];

  const steps = [
    { num: 1, label: 'Test Setup' },
    { num: 2, label: 'Variant Preview' },
    { num: 3, label: 'Goals & Traffic' }
  ];

  const toggleGoal = (id) => {
    setSelectedGoals(prev =>
      prev.includes(id) ? prev.filter(g => g !== id) : [...prev, id]
    );
  };

  const handleNextStep = () => {
    if (currentStep < 3) setCurrentStep(currentStep + 1);
  };

  const handlePrevStepClick = () => {
    if (currentStep === 1) navigate('/Pagename');
    else setCurrentStep(currentStep - 1);
  };

  const handleLaunchTest = () => {
    if (currentStep === 3) setShowSuccessModal(true);
    else handleNextStep();
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-20 font-sans">
      <div className="max-w-4xl mx-auto px-6 py-8">

        {/* Header */}
        <div className="mb-8">
            <h1 className="text-2xl font-bold text-gray-900">Create New Test</h1>
            <p className="text-sm text-gray-500">Step {currentStep} of 3</p>
        </div>

        {/* Stepper */}
        <div className="flex items-center justify-between mb-12">
          {steps.map((step, idx) => (
            <React.Fragment key={step.num}>
              <div className="flex items-center gap-3">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium transition-all duration-300
                  ${currentStep === step.num ? 'bg-blue-600 text-white shadow-lg ring-4 ring-blue-100' :
                    currentStep > step.num ? 'bg-teal-600 text-white' :
                    'bg-gray-200 text-gray-600'}`}
                >
                  {step.num}
                </div>
                <span className={`text-sm font-medium ${currentStep === step.num ? 'text-blue-600' : 'text-gray-500'}`}>
                    {step.label}
                </span>
              </div>
              {idx < steps.length - 1 && (
                <div className={`flex-1 h-0.5 mx-4 ${currentStep > step.num ? 'bg-teal-600' : 'bg-gray-200'}`} />
              )}
            </React.Fragment>
          ))}
        </div>

        {/* STEP 1 — Test Setup */}
        {currentStep === 1 && (
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 mb-6">
            <h2 className="text-lg font-semibold mb-1 text-gray-900">Test Setup</h2>
            <p className="text-sm text-gray-500 mb-8">Configure your test parameters</p>
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium mb-2 text-gray-700">Test Name</label>
                <input
                  type="text"
                  value={testName}
                  onChange={(e) => setTestName(e.target.value)}
                  placeholder="e.g. Homepage Hero CTA Test"
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2 text-gray-700">Variant A URL (Control)</label>
                <div className="relative">
                  <input
                    type="text"
                    value={variantAUrl}
                    onChange={(e) => setVariantAUrl(e.target.value)}
                    placeholder="example.com/a"
                    className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                  />
                  <Globe className="absolute left-3 top-3 text-gray-400" size={18} />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2 text-gray-700">Variant B URL (Variation)</label>
                <div className="relative">
                  <input
                    type="text"
                    value={variantBUrl}
                    onChange={(e) => setVariantBUrl(e.target.value)}
                    placeholder="example.com/b"
                    className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                  />
                  <Globe className="absolute left-3 top-3 text-gray-400" size={18} />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* STEP 2 — Variant Preview (X-FRAME / IFRAME) */}
        {currentStep === 2 && (
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 mb-6">
            <div className="flex justify-between items-start mb-6">
              <div>
                <h2 className="text-lg font-semibold text-gray-900">Variant Preview</h2>
                <p className="text-sm text-gray-500">Verify your landing pages load correctly.</p>
              </div>
              <div className="flex items-center gap-2 text-amber-600 bg-amber-50 px-3 py-1.5 rounded-lg border border-amber-100">
                <AlertCircle size={14} />
                <span className="text-[11px] font-medium">Some sites block iframe previews</span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-6">
              {/* Variant A Iframe */}
              <div className="space-y-3">
                <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest">Variant A (Control)</h3>
                <div className="h-96 border rounded-xl overflow-hidden bg-gray-100 relative group">
                  {variantAUrl ? (
                    <iframe 
                      src={formatUrl(variantAUrl)} 
                      title="Variant A Preview" 
                      className="w-full h-full border-none bg-white"
                      sandbox="allow-scripts allow-same-origin"
                    />
                  ) : (
                    <div className="absolute inset-0 flex flex-col items-center justify-center text-gray-400 p-4">
                      <ImageIcon size={48} className="mb-2 opacity-20" />
                      <p className="text-xs font-medium">No URL provided in Step 1</p>
                    </div>
                  )}
                </div>
              </div>

              {/* Variant B Iframe */}
              <div className="space-y-3">
                <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest">Variant B (Variation)</h3>
                <div className="h-96 border rounded-xl overflow-hidden bg-gray-100 relative group">
                  {variantBUrl ? (
                    <iframe 
                      src={formatUrl(variantBUrl)} 
                      title="Variant B Preview" 
                      className="w-full h-full border-none bg-white"
                      sandbox="allow-scripts allow-same-origin"
                    />
                  ) : (
                    <div className="absolute inset-0 flex flex-col items-center justify-center text-gray-400 p-4">
                      <ImageIcon size={48} className="mb-2 opacity-20" />
                      <p className="text-xs font-medium">No URL provided in Step 1</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* STEP 3 — Goals & Traffic */}
        {currentStep === 3 && (
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 mb-6">
            <h2 className="text-lg font-semibold mb-1 text-gray-900">Goals & Traffic</h2>
            
            {/* Goals - Grid */}
            <div className="mb-10 mt-6">
              <label className="block text-sm font-semibold mb-4 text-gray-700">Select Conversion Goals</label>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                {goals.map((goal) => (
                  <button
                    key={goal.id}
                    onClick={() => toggleGoal(goal.id)}
                    className={`p-4 border rounded-xl text-sm flex items-center gap-3 transition-all
                      ${selectedGoals.includes(goal.id)
                        ? 'border-blue-600 bg-blue-50 text-blue-700 ring-1 ring-blue-600'
                        : 'border-gray-200 hover:border-blue-300 hover:bg-gray-50'}`}
                  >
                    {goal.icon}
                    <span className="font-medium">{goal.label}</span>
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-8">
                <div className="relative">
                    <label className="block text-sm font-semibold mb-2 text-gray-700">Target Audience</label>
                    <button
                        onClick={() => setShowTargetAudienceDropdown(!showTargetAudienceDropdown)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg flex justify-between items-center bg-white hover:border-blue-400 transition-all"
                    >
                        <span className="text-sm">{targetAudience}</span>
                        <ChevronDown size={16} />
                    </button>
                    {showTargetAudienceDropdown && (
                        <div className="absolute z-30 w-full border mt-2 rounded-lg bg-white shadow-xl py-1">
                        {targetAudiences.map((a) => (
                            <button
                            key={a}
                            onClick={() => {
                                setTargetAudience(a);
                                setShowTargetAudienceDropdown(false);
                            }}
                            className="block w-full text-left px-4 py-3 hover:bg-blue-50 text-sm font-medium text-gray-700"
                            >
                            {a}
                            </button>
                        ))}
                        </div>
                    )}
                </div>

                <div className="relative">
                    <label className="block text-sm font-semibold mb-2 text-gray-700">Traffic Distribution</label>
                    <button
                        onClick={() => setShowTrafficSplitDropdown(!showTrafficSplitDropdown)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg flex justify-between items-center bg-white hover:border-blue-400 transition-all"
                    >
                        <span className="text-sm">{trafficSplit}</span>
                        <ChevronDown size={16} />
                    </button>
                    {showTrafficSplitDropdown && (
                        <div className="absolute z-30 w-full border mt-2 rounded-lg bg-white shadow-xl py-1">
                        {trafficSplits.map((s) => (
                            <button
                            key={s}
                            onClick={() => {
                                setTrafficSplit(s);
                                if (s === '50/50 (Control vs Variant)') setCustomPercentage(50);
                                if (s === '80/20 (Control vs Variant)') setCustomPercentage(80);
                                setShowTrafficSplitDropdown(false);
                            }}
                            className="block w-full text-left px-4 py-3 hover:bg-blue-50 text-sm font-medium text-gray-700"
                            >
                            {s}
                            </button>
                        ))}
                        </div>
                    )}

                    {trafficSplit === 'Custom Ratio' && (
                        <div className="mt-4 p-6 bg-gray-50 rounded-xl border border-gray-200 animate-in fade-in duration-300">
                            <div className="flex justify-between items-center mb-6">
                                <div className="text-center">
                                    <span className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest">Control (A)</span>
                                    <span className="text-2xl font-black text-blue-600">{customPercentage}%</span>
                                </div>
                                <div className="h-10 w-px bg-gray-300"></div>
                                <div className="text-center">
                                    <span className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest">Variation (B)</span>
                                    <span className="text-2xl font-black text-teal-600">{100 - customPercentage}%</span>
                                </div>
                            </div>
                            <input
                                type="range"
                                min="0"
                                max="100"
                                step="1"
                                value={customPercentage}
                                onChange={(e) => setCustomPercentage(parseInt(e.target.value))}
                                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                            />
                        </div>
                    )}
                </div>
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mt-12 pt-8 border-t border-gray-200">
          <button
            onClick={handlePrevStepClick}
            className="w-full sm:w-auto px-8 py-3 border border-gray-300 rounded-xl text-sm font-semibold text-gray-600 hover:bg-white hover:shadow-md transition-all active:scale-95"
          >
            {currentStep === 1 ? '← Back to Dashboard' : '← Previous Step'}
          </button>

          <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
            <button
              onClick={() => setShowDraftModal(true)}
              className="px-8 py-3 border border-gray-300 rounded-xl text-sm font-semibold text-gray-600 hover:bg-white hover:shadow-md transition-all"
            >
              Save Draft
            </button>
            <button
              onClick={handleLaunchTest}
              className={`px-10 py-3 text-white rounded-xl font-bold shadow-lg transition-all transform active:scale-95
                ${currentStep === 3 ? 'bg-teal-600 hover:bg-teal-700 shadow-teal-200' : 'bg-blue-600 hover:bg-blue-700 shadow-blue-200'}`}
            >
              {currentStep === 3 ? 'Launch Test' : 'Next Step →'}
            </button>
          </div>
        </div>

        {/* Success Modal */}
        {showSuccessModal && (
            <div className="fixed inset-0 bg-gray-900/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
              <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full border-t-8 border-teal-500 relative animate-in zoom-in-95">
                <button onClick={() => setShowSuccessModal(false)} className="absolute top-4 right-4 text-gray-300 hover:text-gray-900">
                    <X size={24} />
                </button>
                
                <h2 className="text-2xl font-bold text-gray-900 mb-2 text-center">Test Launched!</h2>
                <p className="text-gray-500 text-sm text-center mb-6">Your experiment is now active and collecting data.</p>
                
                <div className="bg-gray-50 rounded-xl p-4 mb-8 space-y-2 border border-gray-100 text-sm">
                    <div className="flex justify-between">
                        <span className="text-gray-500 font-medium">Test Name:</span>
                        <span className="font-bold text-gray-800">{testName || 'Untitled'}</span>
                    </div>
                    <div className="flex justify-between">
                        <span className="text-gray-500 font-medium">Distribution:</span>
                        <span className="font-bold text-teal-600">
                            {trafficSplit === 'Custom Ratio' ? `${customPercentage}% / ${100 - customPercentage}%` : trafficSplit.split(' ')[0]}
                        </span>
                    </div>
                </div>

                <div className="flex gap-3 mt-6">
                  <button
                    onClick={() => navigate("/Pagename")}
                    className="flex-1 py-3 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 transition-all shadow-lg text-sm"
                  >
                    View Dashboard
                  </button>
                  <button
                    onClick={() => {
                      setShowSuccessModal(false);
                      setCurrentStep(1);
                    }}
                    className="flex-1 py-3 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 transition-all shadow-lg text-sm"
                  >
                    Create New Test 
                  </button>
                </div>
              </div>
            </div>
        )}

        {/* Draft Modal */}
        {showDraftModal && (
            <div className="fixed inset-0 bg-gray-900/40 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full border-t-8 border-blue-600 relative">
                <button onClick={() => setShowDraftModal(false)} className="absolute top-4 right-4 text-gray-300 hover:text-gray-900">
                    <X size={24} />
                </button>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Draft Saved Successfully</h2>
                <p className="text-gray-500 text-sm mb-8 leading-relaxed">You can return to complete this test setup at any time from your dashboard.</p>
                <div className="flex gap-3">
                    <button
                        onClick={() => setShowDraftModal(false)}
                        className="flex-1 px-4 py-3 border border-gray-200 rounded-xl text-sm font-bold text-gray-700"
                    >
                        Continue Editing
                    </button>
                    <button
                        onClick={() => navigate("/Pagename")}
                        className="flex-1 px-4 py-3 bg-blue-600 text-white rounded-xl font-bold"
                    >
                        Go to Dashboard
                    </button>
                </div>
            </div>
            </div>
        )}
      </div>
    </div>
  ); 
};

export default TestCreationFlow;