import React, { useState } from 'react';
import { ChevronDown, Lightbulb, Target, Zap } from 'lucide-react';
import Navbar from '../components/Navbar';

const TestCreationFlow = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [testType, setTestType] = useState('');
  const [showDropdown, setShowDropdown] = useState(false);
  const [showSuccessMetricDropdown, setShowSuccessMetricDropdown] = useState(false);
  const [showTargetAudienceDropdown, setShowTargetAudienceDropdown] = useState(false);
  const [showTrafficSplitDropdown, setShowTrafficSplitDropdown] = useState(false);
  const [testName, setTestName] = useState('');
  const [pageUrl, setPageUrl] = useState('');
  const [successMetric, setSuccessMetric] = useState('Conversion Rate');
  const [targetAudience, setTargetAudience] = useState('Desktop Users');
  const [trafficSplit, setTrafficSplit] = useState('50/50 (Control vs Variant)');
  const [customControl, setCustomControl] = useState('');
  const [customVariant, setCustomVariant] = useState('');

  const testTypes = [
    { value: 'full-page', label: 'Full Page Testing' },
    { value: 'fragmented', label: 'Fragmented Testing' },
    { value: 'targeted', label: 'Targeted Testing' }
  ];

  const successMetrics = [
    'Conversion Rate',
    'Engagement Time'
  ];

  const targetAudiences = [
    'Desktop Users',
    'Mobile Users'
  ];

  const trafficSplits = [
    '50/50 (Control vs Variant)',
    '80/20 (Control vs Variant)',
    'Custom Ratio'
  ];

  const steps = [
    { num: 1, label: 'Test Setup' },
    { num: 2, label: 'Variant Creation' },
    { num: 3, label: 'Test Setup' }
  ];

  const handleTestTypeSelect = (type) => {
    setTestType(type);
    setShowDropdown(false);
  };

  const handleNextStep = () => {
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
     
      <div className="max-w-4xl mx-auto px-6 py-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 mb-1">Create New Test</h1>
          <p className="text-sm text-gray-500 mb-8">With AI Recommendations</p>
        </div>

        <div className="flex items-center justify-between mb-12">
          {steps.map((step, idx) => (
            <React.Fragment key={step.num}>
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium ${
                  currentStep === step.num 
                    ? 'bg-blue-600 text-white' 
                    : currentStep > step.num
                    ? 'bg-teal-600 text-white'
                    : 'bg-gray-200 text-gray-600'
                }`}>
                  {step.num}
                </div>
                <span className="text-sm font-medium text-gray-700">{step.label}</span>
              </div>
              {idx < steps.length - 1 && (
                <div className={`flex-1 h-0.5 mx-4 ${
                  currentStep > step.num ? 'bg-teal-600' : 'bg-gray-200'
                }`}></div>
              )}
            </React.Fragment>
          ))}
        </div>

        {currentStep === 1 && (
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
            <h2 className="text-lg font-semibold mb-1">Test Setup</h2>
            <p className="text-sm text-gray-500 mb-6">Configure your test parameters</p>

            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Test Name
                </label>
                <input
                  type="text"
                  placeholder="e.g., Homepage Hero - Value Proposition Copy"
                  value={testName}
                  onChange={(e) => setTestName(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Test Type
                </label>
                <div className="relative">
                  <button
                    onClick={() => setShowDropdown(!showDropdown)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md flex items-center justify-between hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <span className={testType ? 'text-gray-900' : 'text-gray-400'}>
                      {testType ? testTypes.find(t => t.value === testType)?.label : 'Full Page Testing'}
                    </span>
                    <ChevronDown className="w-4 h-4 text-gray-400" />
                  </button>
                  
                  {showDropdown && (
                    <div className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-md shadow-lg">
                      {testTypes.map((type) => (
                        <button
                          key={type.value}
                          onClick={() => handleTestTypeSelect(type.value)}
                          className="w-full px-3 py-2 text-left hover:bg-gray-50 first:rounded-t-md last:rounded-b-md"
                        >
                          {type.label}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
                <p className="text-xs text-gray-500 mt-1">
                  Full Page Testing requires 2 variants
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Page URL
                </label>
                <input
                  type="text"
                  placeholder="https://example.com"
                  value={pageUrl}
                  onChange={(e) => setPageUrl(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
          </div>
        )}

        {currentStep === 2 && testType === 'full-page' && (
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
            <h2 className="text-lg font-semibold mb-1">Full Page Variant Creation</h2>
            <p className="text-sm text-gray-500 mb-6">Create complete page variations for testing</p>

            <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
              <h3 className="font-medium text-gray-900 mb-4">Control Page Preview</h3>
              
              <div className="border-2 border-teal-400 rounded-lg bg-teal-50 h-80 flex items-center justify-center relative">
                <div className="absolute right-3 top-3 w-2 h-20 bg-gray-400 rounded"></div>
                <p className="text-gray-500">Preview</p>
              </div>
              
              <div className="flex justify-end mt-4">
                <button className="px-4 py-2 bg-blue-600 text-white rounded text-sm font-medium hover:bg-blue-700">
                  Close Preview
                </button>
              </div>
            </div>
          </div>
        )}

        {currentStep === 2 && testType === 'fragmented' && (
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
            <h2 className="text-lg font-semibold mb-1">Fragment Variant Creation</h2>
            <p className="text-sm text-gray-500 mb-6">Test specific sections of your page</p>

            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Control (Original Page)
                </label>
                <div className="mb-2">
                  <label className="block text-xs text-gray-600 mb-1">Page URL</label>
                  <input
                    type="text"
                    placeholder="https://yousite.com"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <button className="text-xs text-blue-600 font-medium mb-4">Show Preview</button>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-4">
                  Select Fragment to Test
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <button className="p-4 border-2 border-gray-200 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-all">
                    <div className="w-8 h-8 bg-gray-100 rounded mx-auto mb-2 flex items-center justify-center">
                      <Target className="w-4 h-4 text-gray-600" />
                    </div>
                    <div className="text-sm font-medium">Hero Section</div>
                  </button>
                  <button className="p-4 border-2 border-gray-200 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-all">
                    <div className="w-8 h-8 bg-gray-100 rounded mx-auto mb-2 flex items-center justify-center">
                      <Zap className="w-4 h-4 text-gray-600" />
                    </div>
                    <div className="text-sm font-medium">Product Grid</div>
                  </button>
                  <button className="p-4 border-2 border-gray-200 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-all">
                    <div className="w-8 h-8 bg-gray-100 rounded mx-auto mb-2 flex items-center justify-center">
                      <Target className="w-4 h-4 text-gray-600" />
                    </div>
                    <div className="text-sm font-medium">Navigation Bar</div>
                  </button>
                  <button className="p-4 border-2 border-gray-200 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-all">
                    <div className="w-8 h-8 bg-gray-100 rounded mx-auto mb-2 flex items-center justify-center">
                      <Zap className="w-4 h-4 text-gray-600" />
                    </div>
                    <div className="text-sm font-medium">CTA Section</div>
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Variant Fragment
                </label>
                <div className="border border-gray-300 rounded-md p-4 bg-gray-50">
                  <p className="text-sm text-gray-500 text-center">
                    Upload Code
                  </p>
                  <div className="text-xs text-gray-400 text-center mt-1">OR</div>
                  <textarea
                    placeholder="Paste your variant HTML code here..."
                    rows={4}
                    className="w-full px-3 py-2 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {currentStep === 2 && testType === 'targeted' && (
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
            <h2 className="text-lg font-semibold mb-1">Targeted Element Variants</h2>
            <p className="text-sm text-gray-500 mb-6">Test specific elements on your page</p>

            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Control (Original Page)
                </label>
                <div className="grid grid-cols-2 gap-3 mb-3">
                  <div>
                    <label className="block text-xs text-gray-600 mb-1">Headline</label>
                    <input
                      type="text"
                      placeholder="Get Started Today"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-gray-600 mb-1">CTA Text</label>
                    <input
                      type="text"
                      placeholder="Sign Up Now"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <span className="text-xs text-gray-600">#510656</span>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Variant
                </label>
                <div className="grid grid-cols-2 gap-3 mb-3">
                  <div>
                    <label className="block text-xs text-gray-600 mb-1">Headline</label>
                    <input
                      type="text"
                      placeholder="Start Your Journey Today"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-gray-600 mb-1">CTA Text</label>
                    <input
                      type="text"
                      placeholder="Get Started Free"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-purple-700 rounded-full"></div>
                  <span className="text-xs text-gray-600">#3B82F3</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {currentStep === 3 && (
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
            <h2 className="text-lg font-semibold mb-1">Goal & Audience</h2>
            <p className="text-sm text-gray-500 mb-6">Define success metrics and target audience</p>

            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Success Metric
                </label>
                <div className="relative">
                  <button
                    onClick={() => setShowSuccessMetricDropdown(!showSuccessMetricDropdown)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md flex items-center justify-between hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-left"
                  >
                    <span className="text-gray-900">{successMetric}</span>
                    <ChevronDown className="w-4 h-4 text-gray-400" />
                  </button>
                  
                  {showSuccessMetricDropdown && (
                    <div className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-md shadow-lg">
                      {successMetrics.map((metric) => (
                        <button
                          key={metric}
                          onClick={() => {
                            setSuccessMetric(metric);
                            setShowSuccessMetricDropdown(false);
                          }}
                          className={`w-full px-3 py-2 text-left hover:bg-gray-50 first:rounded-t-md last:rounded-b-md ${
                            successMetric === metric ? 'bg-teal-50' : ''
                          }`}
                        >
                          {metric}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Target Audience
                </label>
                <div className="relative">
                  <button
                    onClick={() => setShowTargetAudienceDropdown(!showTargetAudienceDropdown)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md flex items-center justify-between hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-left"
                  >
                    <span className="text-gray-900">{targetAudience}</span>
                    <ChevronDown className="w-4 h-4 text-gray-400" />
                  </button>
                  
                  {showTargetAudienceDropdown && (
                    <div className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-md shadow-lg">
                      {targetAudiences.map((audience) => (
                        <button
                          key={audience}
                          onClick={() => {
                            setTargetAudience(audience);
                            setShowTargetAudienceDropdown(false);
                          }}
                          className={`w-full px-3 py-2 text-left hover:bg-gray-50 first:rounded-t-md last:rounded-b-md ${
                            targetAudience === audience ? 'bg-teal-50' : ''
                          }`}
                        >
                          {audience}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Traffic Split
                </label>
                <div className="relative">
                  <button
                    onClick={() => setShowTrafficSplitDropdown(!showTrafficSplitDropdown)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md flex items-center justify-between hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-left"
                  >
                    <span className="text-gray-900">{trafficSplit}</span>
                    <ChevronDown className="w-4 h-4 text-gray-400" />
                  </button>
                  
                  {showTrafficSplitDropdown && (
                    <div className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-md shadow-lg">
                      {trafficSplits.map((split) => (
                        <button
                          key={split}
                          onClick={() => {
                            setTrafficSplit(split);
                            setShowTrafficSplitDropdown(false);
                          }}
                          className={`w-full px-3 py-2 text-left hover:bg-gray-50 first:rounded-t-md last:rounded-b-md ${
                            trafficSplit === split ? 'bg-teal-50' : ''
                          }`}
                        >
                          {split}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {trafficSplit === 'Custom Ratio' && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    Control
                  </label>
                  <div className="flex items-center gap-3">
                    <input
                      type="text"
                      placeholder="Control"
                      value={customControl}
                      onChange={(e) => setCustomControl(e.target.value)}
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <span className="text-gray-500">/</span>
                    <input
                      type="text"
                      placeholder="Variant"
                      value={customVariant}
                      onChange={(e) => setCustomVariant(e.target.value)}
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {currentStep === 3 && (
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-5 mb-6">
            <div className="flex items-start gap-3 mb-4">
              <Zap className="w-5 h-5 text-blue-600 mt-0.5" />
              <div className="flex-1">
                <h3 className="font-medium text-gray-900 mb-1">Traffic Split</h3>
                <p className="text-sm text-gray-600">
                  Choose how traffic is distributed between variants
                </p>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div className="bg-white p-4 rounded-lg border border-blue-200">
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-8 h-8 bg-blue-600 rounded flex items-center justify-center">
                    <Zap className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <div className="font-medium text-sm">Equal Split</div>
                    <div className="text-xs text-gray-500">(50/50)</div>
                  </div>
                </div>
                <ul className="text-xs text-gray-700 space-y-1">
                  <li>• Best for statistical accuracy</li>
                  <li>• Recommended for most tests</li>
                </ul>
              </div>

              <div className="bg-white p-4 rounded-lg border border-blue-200">
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-8 h-8 bg-blue-600 rounded flex items-center justify-center">
                    <Target className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <div className="font-medium text-sm">Weighted Split</div>
                    <div className="text-xs text-gray-500">(80/20)</div>
                  </div>
                </div>
                <ul className="text-xs text-gray-700 space-y-1">
                  <li>• Control gets majority traffic</li>
                  <li>• Safer for testing major changes</li>
                </ul>
              </div>

              <div className="bg-white p-4 rounded-lg border border-blue-200">
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-8 h-8 bg-blue-600 rounded flex items-center justify-center">
                    <Lightbulb className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <div className="font-medium text-sm">Custom Ratio</div>
                    <div className="text-xs text-gray-500">(Control/Variant)</div>
                  </div>
                </div>
                <ul className="text-xs text-gray-700 space-y-1">
                  <li>• Set your own percentages</li>
                </ul>
              </div>
            </div>
          </div>
        )}

        <div className="bg-purple-50 border border-purple-200 rounded-lg p-5 mb-6">
          <div className="flex items-start gap-3">
            <Lightbulb className="w-5 h-5 text-purple-600 mt-0.5" />
            <div className="flex-1">
              <h3 className="font-medium text-gray-900 mb-2">
                {currentStep === 1 && 'AI Suggestions'}
                {currentStep === 2 && testType === 'full-page' && 'AI Page Analysis'}
                {currentStep === 2 && testType === 'fragmented' && 'AI Fragment Suggestions'}
                {currentStep === 2 && testType === 'targeted' && 'AI Target Suggestions'}
                {currentStep === 3 && 'AI Traffic Recommendation'}
              </h3>
              <p className="text-sm text-gray-600 mb-3">
                {currentStep === 1 && 'Based on similar pages, popular full page tests include:'}
                {currentStep === 2 && testType === 'full-page' && 'Recommendations for full page optimization'}
                {currentStep === 2 && testType === 'fragmented' && 'Optimization ideas for this section'}
                {currentStep === 2 && testType === 'targeted' && 'Optimization suggestions for your variants'}
                {currentStep === 3 && 'Based on your traffic'}
              </p>
              
              <div className="space-y-2">
                {currentStep === 1 && (
                  <>
                    <div className="bg-white p-3 rounded border border-purple-100">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-sm font-medium">Simplified vs. Feature-Rich Layout</span>
                        <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded">High Impact</span>
                      </div>
                      <p className="text-xs text-gray-600">
                        Minimal design often increases focus and conversions by 30-34%
                      </p>
                    </div>
                    <div className="bg-white p-3 rounded border border-purple-100">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-sm font-medium">Single Column vs. Multi-Column Layout</span>
                        <span className="text-xs bg-yellow-100 text-yellow-700 px-2 py-0.5 rounded">Medium Impact</span>
                      </div>
                      <p className="text-xs text-gray-600">
                        Layout changes can significantly impact time-on-site and engagement
                      </p>
                    </div>
                  </>
                )}
                
                {currentStep === 2 && testType === 'full-page' && (
                  <div className="bg-white p-3 rounded border border-purple-100">
                    <div className="flex items-start gap-2">
                      <Lightbulb className="w-4 h-4 text-purple-600 mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="text-sm font-medium mb-1">Layout suggestion:</p>
                        <p className="text-xs text-gray-600">
                          Consider a side-by-side hero layout. Similar pages see 23% higher engagement.
                        </p>
                        <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded inline-block mt-2">High Impact</span>
                      </div>
                    </div>
                  </div>
                )}

                {currentStep === 2 && testType === 'fragmented' && (
                  <>
                    <div className="bg-white p-3 rounded border border-purple-100">
                      <div className="flex items-start gap-2">
                        <Lightbulb className="w-4 h-4 text-purple-600 mt-0.5 flex-shrink-0" />
                        <div>
                          <p className="text-sm font-medium mb-1">Keep Image and text balance</p>
                          <p className="text-xs text-gray-600">Visual-to-text ratio is key in click-rate</p>
                        </div>
                      </div>
                    </div>
                    <div className="bg-white p-3 rounded border border-purple-100">
                      <div className="flex items-start gap-2">
                        <Lightbulb className="w-4 h-4 text-purple-600 mt-0.5 flex-shrink-0" />
                        <div>
                          <p className="text-sm font-medium mb-1">Simplify heading hierarchy</p>
                          <p className="text-xs text-gray-600">Reduce font size if your text heading is larger than subtext</p>
                        </div>
                      </div>
                    </div>
                  </>
                )}

                {currentStep === 2 && testType === 'targeted' && (
                  <div className="bg-white p-3 rounded border border-purple-100">
                    <div className="flex items-start gap-2">
                      <Lightbulb className="w-4 h-4 text-purple-600 mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="text-sm font-medium mb-1">High Contrasts Buttons</p>
                        <p className="text-xs text-gray-600">Keep all colors in control of the user</p>
                      </div>
                    </div>
                  </div>
                )}

                {currentStep === 3 && (
                  <div className="bg-white p-3 rounded border border-purple-100">
                    <div className="flex items-start gap-2">
                      <Lightbulb className="w-4 h-4 text-purple-600 mt-0.5 flex-shrink-0" />
                      <p className="text-sm text-gray-700">
                        Confirm: based on url can we display number of visitors a day on one side and duration (14 days) displayed with (optimal for 80% confidence)
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {currentStep === 1 && (
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-5 mb-6">
            <div className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-blue-600 mt-0.5" />
              <div className="flex-1">
                <h3 className="font-medium text-gray-900 mb-2">Effectiveness Predictor</h3>
                <p className="text-sm text-gray-600 mb-3">
                  Real-time score as you select test type and goal
                </p>
                <div className="flex items-center gap-3 mb-2">
                  <div className="flex-1 bg-gray-200 rounded-full h-2">
                    <div className="bg-blue-600 h-2 rounded-full" style={{width: '30%'}}></div>
                  </div>
                  <span className="text-sm font-medium text-gray-700">30%</span>
                </div>
                <p className="text-xs text-blue-700 font-medium">
                  Add more details to improve test effectiveness
                </p>
              </div>
            </div>
          </div>
        )}

        {currentStep === 3 && (
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
            <h3 className="font-semibold text-gray-900 mb-4">Test Summary</h3>
            
            <div className="grid grid-cols-2 gap-x-8 gap-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Test Type:</span>
                <span className="font-medium text-gray-900">Full Page</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Target Audience:</span>
                <span className="font-medium text-gray-900">{targetAudience}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Success Metric:</span>
                <span className="font-medium text-gray-900">{successMetric}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Traffic Split:</span>
                <span className="font-medium text-gray-900">
                  {trafficSplit === 'Custom Ratio' && customControl && customVariant
                    ? `${customControl}/${customVariant}`
                    : trafficSplit.includes('50/50') 
                    ? '50/50'
                    : trafficSplit.includes('80/20')
                    ? '80/20'
                    : '50/50'}
                </span>
              </div>
            </div>
          </div>
        )}

        <div className="flex justify-between items-center">
          <button
            onClick={handlePrevStep}
            className="px-4 py-2 border border-gray-300 rounded text-sm font-medium hover:bg-gray-50 flex items-center gap-2"
          >
            ← {currentStep === 1 ? 'Back to Dashboard' : 'Previous'}
          </button>
          <div className="flex gap-3">
            <button className="px-4 py-2 border border-gray-300 rounded text-sm font-medium hover:bg-gray-50">
              Save as Draft
            </button>
            <button
              onClick={handleNextStep}
              className={`px-4 py-2 rounded text-sm font-medium text-white flex items-center gap-2 ${
                currentStep === 3 ? 'bg-teal-600 hover:bg-teal-700' : 'bg-blue-600 hover:bg-blue-700'
              }`}
            >
              {currentStep === 3 ? 'Launch Test' : 'Next Step →'}
            </button>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-gray-200">
          <div className="grid grid-cols-4 gap-8 text-sm">
            <div>
              <h4 className="font-semibold mb-3">Stay Updated</h4>
              <p className="text-gray-600 mb-2">Get the latest features and testing insights</p>
              <div className="flex gap-2">
                <input
                  type="email"
                  placeholder="you@email.com"
                  className="flex-1 px-3 py-1.5 border border-gray-300 rounded text-sm"
                />
                <button className="px-3 py-1.5 bg-blue-600 text-white rounded text-sm">→</button>
              </div>
            </div>
            <div>
              <h4 className="font-semibold mb-3">Product</h4>
              <ul className="space-y-2 text-gray-600">
                <li>Features</li>
                <li>Pricing</li>
                <li>Documentation</li>
                <li>API Reference</li>
                <li>Integrations</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-3">Product</h4>
              <ul className="space-y-2 text-gray-600">
                <li>About Us</li>
                <li>Blog</li>
                <li>Contact Us</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-3">Resources</h4>
              <ul className="space-y-2 text-gray-600">
                <li>Help</li>
                <li>Community</li>
                <li>Tutorials</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestCreationFlow;