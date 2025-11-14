import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar1 from '../components/Navbar1.jsx';


// MODIFIED: Added 'onMenuClick' prop for the mobile hamburger button

const Header = ({ onMenuClick }) => {
  // Call the hook INSIDE the component
  const navigate = useNavigate(); 

  return (
    <header className="bg-white border-b border-gray-200 fixed top-0 left-0 right-0 z-50">
      <Navbar1 />
        {/* MODIFIED: Wired up the onClick event */}
        <button className="md:hidden p-2" onClick={onMenuClick}>
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      
    </header>
  );
};
const Sidebar = ({ activeSection, setActiveSection, isOpen, setIsOpen }) => {
  const sections = [
    'Getting Started',
    'Core Features',
    'Analysing Results',
    'Integrations',
    'FAQs & Troubleshooting'
  ];
  

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setIsOpen(false)}
        ></div>
      )}
      
      {/* Sidebar */}
      <aside className={`
        w-64 bg-gray-50 border-r border-gray-200 fixed left-0 top-16 bottom-0 overflow-y-auto z-40 transition-transform duration-300
        ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        <div className="flex items-center justify-between p-4 border-b border-gray-200 lg:hidden">
          <span className="font-semibold">Menu</span>
          <button onClick={() => setIsOpen(false)} className="p-1">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <nav className="p-6">
          {sections.map((section) => (
            <button
              key={section}
              onClick={() => {
                setActiveSection(section);
                setIsOpen(false); // Close sidebar on mobile after selection
              }}
              className={`w-full text-left px-4 py-3 mb-2 rounded transition-colors ${
                activeSection === section
                  ? 'bg-blue-100 text-blue-700 font-medium'
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              {section}
            </button>
          ))}
        </nav>
      </aside>
    </>
  );
};

const TableOfContents = ({ items, isVisible, setIsVisible }) => {
  if (!isVisible) {
    return (
      <button
        onClick={() => setIsVisible(true)}
        className="fixed right-4 top-24 bg-white border border-gray-300 rounded-lg p-3 shadow-lg hover:bg-gray-50 z-30 hidden lg:block"
        title="Show Table of Contents"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>
    );
  }

  return (
    <div className="hidden lg:block w-56 fixed right-8 top-32 max-h-[calc(100vh-12rem)] overflow-y-auto">
      <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <span className="text-sm font-semibold text-gray-900">On this page</span>
          <button
            onClick={() => setIsVisible(false)}
            className="p-1 hover:bg-gray-100 rounded"
            title="Hide Table of Contents"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <div className="text-sm space-y-2">
          {items.map((item, idx) => (
            <a
              key={idx}
              href={`#${item.toLowerCase().replace(/\s+/g, '-')}`}
              className="block py-2 text-gray-600 hover:text-blue-600 border-l-2 border-transparent hover:border-blue-600 pl-4 transition-colors"
            >
              {item}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};

// MODIFIED: Removed 'onBack' prop and button from all content components
const GettingStartedContent = () => (
  <div>
    <h1 className="text-4xl font-bold mb-2">Installing the Splitspur App</h1>
    <p className="text-gray-500 mb-8">Last Updated: 23rd October, 2025</p>
    
    <p className="text-gray-700 mb-8 leading-relaxed">
      Welcome to Splitspur! This guide will walk you through installing our A/B testing app on your Shopify store. You'll be ready to run your first test in under 5 minutes.
    </p>

    <section className="mb-10" id="step-1-find-splitspur-on-shopify-app-store">
      <h2 className="text-2xl font-bold mb-4">Step 1: Find Splitspur on Shopify App Store</h2>
      <p className="text-gray-700 mb-4">
        Navigate to the Shopify App Store and search for "Splitspur" or use the direct link from our website. Click the "Add app" button to begin installation.
      </p>
      <button className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
        Go To Shopify App Store
      </button>
    </section>

    <section className="mb-10" id="step-2-install-and-approve-permissions">
      <h2 className="text-2xl font-bold mb-4">Step 2: Install and Approve Permissions</h2>
      <p className="text-gray-700 mb-4">
        You'll be redirected to review the permissions Splitspur requires:
      </p>
      <div className="ml-6">
        <p className="font-semibold text-gray-900 mb-2">Required Access:</p>
        <ul className="list-disc ml-6 space-y-2 text-gray-700">
          <li>Theme templates: To insert A/B testing code</li>
          <li>Products and collections: To test product pages and listings</li>
          <li>Checkout settings: To track conversions and revenue</li>
          <li>Script tags: To load testing variants properly</li>
        </ul>
      </div>
      <p className="text-gray-700 mt-4">
        We prioritize your store's security and only request essential permissions for A/B testing functionality.
      </p>
    </section>

    <section className="mb-10" id="step-3-automatic-setup-verification">
      <h2 className="text-2xl font-bold mb-4">Step 3: Automatic Setup Verification</h2>
      <p className="text-gray-700 mb-4">After installation, our system automatically:</p>
      <ul className="list-disc ml-6 space-y-2 text-gray-700">
        <li>Validates script installation in your theme</li>
        <li>Checks for compatibility with your current theme</li>
        <li>Sets up basic tracking for key conversion events</li>
      </ul>
      <p className="text-gray-700 mt-4">
        If any issues are detected, we provide clear manual setup instructions.
      </p>
    </section>

    <section className="mb-10" id="step-4-create-your-first-test">
      <h2 className="text-2xl font-bold mb-4">Step 4: Create Your First Test</h2>
      <p className="text-gray-700 mb-4">
        Once verified, you'll be redirected to your Splitspur dashboard where you can immediately:
      </p>
      <ul className="list-disc ml-6 space-y-2 text-gray-700">
        <li>Create your first A/B test using our visual editor</li>
        <li>Browse AI-recommended test ideas</li>
        <li>Get familiar with the interface</li>
      </ul>
    </section>
  </div>
);

const CoreFeaturesContent = () => (
  <div>
    <h1 className="text-4xl font-bold mb-2">Core Features</h1>
    <p className="text-gray-500 mb-8">Last Updated: 23rd October, 2025</p>
    
    <p className="text-gray-700 mb-8 leading-relaxed">
      Splitspur provides everything Shopify merchants need to run professional A/B tests. Here are the core features available in your dashboard.
    </p>

    <section className="mb-10" id="visual-test-creation">
      <h2 className="text-2xl font-bold mb-4">1. Visual Test Creation</h2>
      <p className="text-gray-700 mb-4">
        Create tests without coding using our intuitive interface. Set up full-page tests, fragment-level tests, or targeted experiments with easy-to-use tools.
      </p>
      <div className="ml-6">
        <p className="font-semibold text-gray-900 mb-2">What you can test:</p>
        <ul className="list-disc ml-6 space-y-2 text-gray-700">
          <li>Full page layouts and designs</li>
          <li>Specific sections (hero, navigation, CTAs, product grids)</li>
          <li>Targeted audience experiences</li>
          <li>Button colors, text, images, and layouts</li>
        </ul>
      </div>
    </section>

    <section className="mb-10" id="ai-powered-insights">
      <h2 className="text-2xl font-bold mb-4">2. AI-Powered Insights</h2>
      <p className="text-gray-700 mb-4">
        Get intelligent recommendations and insights throughout your testing journey. Our AI analyzes your data to provide actionable suggestions.
      </p>
      <div className="ml-6">
        <p className="font-semibold text-gray-900 mb-2">AI features include:</p>
        <ul className="list-disc ml-6 space-y-2 text-gray-700">
          <li>Test effectiveness predictions</li>
          <li>Performance pattern detection</li>
          <li>Anomaly and issue detection</li>
          <li>Smart recommendations for next steps</li>
        </ul>
      </div>
    </section>

    <section className="mb-10" id="comprehensive-analytics">
      <h2 className="text-2xl font-bold mb-4">3. Comprehensive Analytics</h2>
      <p className="text-gray-700 mb-4">
        Track and analyze all your test results in one place with detailed reporting and visualization tools.
      </p>
      <div className="ml-6">
        <p className="font-semibold text-gray-900 mb-2">Analytics capabilities:</p>
        <ul className="list-disc ml-6 space-y-2 text-gray-700">
          <li>Conversion rate trends over time</li>
          <li>Variant performance comparison</li>
          <li>Device and segment analysis</li>
          <li>Statistical confidence tracking</li>
        </ul>
      </div>
    </section>

    <section className="mb-10" id="results-dashboard">
      <h2 className="text-2xl font-bold mb-4">4. Results Dashboard</h2>
      <p className="text-gray-700 mb-4">
        View clear, actionable results for every test with AI-generated insights and recommendations.
      </p>
      <div className="ml-6">
        <p className="font-semibold text-gray-900 mb-2">Results include:</p>
        <ul className="list-disc ml-6 space-y-2 text-gray-700">
          <li>Winner declaration with confidence levels</li>
          <li>Key findings and statistical notes</li>
          <li>Performance by device and user segment</li>
          <li>Exportable reports for sharing</li>
        </ul>
      </div>
    </section>

    <section className="mb-10" id="test-management">
      <h2 className="text-2xl font-bold mb-4">5. Test Management</h2>
      <p className="text-gray-700 mb-4">
        Easily manage all your tests from creation to completion with organized workflows.
      </p>
      <div className="ml-6">
        <p className="font-semibold text-gray-900 mb-2">Management features:</p>
        <ul className="list-disc ml-6 space-y-2 text-gray-700">
          <li>Centralized test dashboard</li>
          <li>Status tracking (draft, active, paused, completed)</li>
          <li>Progress monitoring</li>
          <li>Quick actions (pause, stop, view report)</li>
        </ul>
      </div>
    </section>

    <section className="mb-10" id="fragment-level-testing">
      <h2 className="text-2xl font-bold mb-4">6. Fragment-Level Testing</h2>
      <p className="text-gray-700 mb-4">
        Test specific components of your pages without affecting entire layouts. Perfect for optimizing individual elements.
      </p>
      <div className="ml-6">
        <p className="font-semibold text-gray-900 mb-2">Perfect for testing:</p>
        <ul className="list-disc ml-6 space-y-2 text-gray-700">
          <li>Hero sections and banners</li>
          <li>Navigation menus</li>
          <li>Product grids and cards</li>
          <li>Call-to-action buttons</li>
          <li>Trust badges and social proof</li>
        </ul>
      </div>
    </section>
  </div>
);

const AnalysingResultsContent = () => (
  <div>
    <h1 className="text-4xl font-bold mb-2">Analyzing Results</h1>
    <p className="text-gray-500 mb-8">Last Updated: 23rd October, 2025</p>
    
    <p className="text-gray-700 mb-8 leading-relaxed">
      Learn how to interpret your A/B test results and make data-driven decisions with Splitspur's comprehensive analytics tools.
    </p>

    <section className="mb-10" id="results-dashboard-overview">
      <h2 className="text-2xl font-bold mb-4">1. Results Dashboard Overview</h2>
      <p className="text-gray-700 mb-4">
        When you view a completed test, you'll see these main sections:
      </p>
      <div className="space-y-6 ml-6">
        <div>
          <p className="font-semibold text-gray-900">Test Summary</p>
          <ul className="list-disc ml-6 space-y-1 text-gray-700 mt-2">
            <li>Overall winner with confidence level</li>
            <li>Test duration and total visitors</li>
            <li>Key performance metrics</li>
          </ul>
        </div>
        <div>
          <p className="font-semibold text-gray-900">AI Insights Panel</p>
          <ul className="list-disc ml-6 space-y-1 text-gray-700 mt-2">
            <li>Key findings that drove performance</li>
            <li>Statistical significance with confidence over segments</li>
            <li>Recommendations for next steps</li>
          </ul>
        </div>
        <div>
          <p className="font-semibold text-gray-900">Conversion Rate Over Time</p>
          <ul className="list-disc ml-6 space-y-1 text-gray-700 mt-2">
            <li>Line chart showing daily performance</li>
            <li>Highlights key turning points</li>
            <li>Shows when results stabilized</li>
          </ul>
        </div>
      </div>
    </section>

    <section className="mb-10" id="understanding-key-metrics">
      <h2 className="text-2xl font-bold mb-4">2. Understanding Key Metrics</h2>
      <p className="text-gray-700 mb-4">
        When you view a completed test, you'll see these main sections:
      </p>
      <div className="space-y-4 ml-6">
        <div>
          <p className="font-semibold text-gray-900">Confidence Level</p>
          <ul className="list-disc ml-6 space-y-1 text-gray-700 mt-2">
            <li>95%+: Results are statistically significant</li>
            <li>75-94%: Results are promising but need more data</li>
            <li>Below 75%: Consider running test longer</li>
          </ul>
        </div>
        <div>
          <p className="font-semibold text-gray-900">Improvement Percentage</p>
          <ul className="list-disc ml-6 space-y-1 text-gray-700 mt-2">
            <li>Shows how much better the variant performed</li>
            <li>Calculated vs the control variant</li>
            <li>Example: +16.2% means 16.2% better than original</li>
          </ul>
        </div>
      </div>
    </section>

    <section className="mb-10" id="using-ai-insights">
      <h2 className="text-2xl font-bold mb-4">3. Using AI Insights</h2>
      <div className="space-y-4 ml-6">
        <div>
          <p className="font-semibold text-gray-900">Key Findings</p>
          <ul className="list-disc ml-6 space-y-1 text-gray-700 mt-2">
            <li>Headline copy extensibly drove performance</li>
            <li>New CTA button variants worked better</li>
            <li>Highlights patterns in user behavior</li>
          </ul>
        </div>
        <div>
          <p className="font-semibold text-gray-900">Statistical Notes</p>
          <ul className="list-disc ml-6 space-y-1 text-gray-700 mt-2">
            <li>Sample size adequacy warnings</li>
            <li>Notes consistency across user segments</li>
            <li>Flags any data concerns</li>
          </ul>
        </div>
      </div>
    </section>

    <section className="mb-10" id="making-decisions">
      <h2 className="text-2xl font-bold mb-4">4. Making Decisions</h2>
      <div className="space-y-4 ml-6">
        <div>
          <p className="font-semibold text-gray-900">When to Implement Changes</p>
          <ul className="list-disc ml-6 space-y-1 text-gray-700 mt-2">
            <li>Implement winning variant using implement Changes button</li>
            <li>Consider segment-specific implementations</li>
            <li>Monitor post-implementation performance</li>
          </ul>
        </div>
        <div>
          <p className="font-semibold text-gray-900">When Results Are Unclear</p>
          <ul className="list-disc ml-6 space-y-1 text-gray-700 mt-2">
            <li>Run test longer to gather more data</li>
            <li>Check performance by device and user type</li>
            <li>Review AI insights for hidden patterns</li>
          </ul>
        </div>
      </div>
    </section>

    <section className="mb-10" id="exporting-results">
      <h2 className="text-2xl font-bold mb-4">5. Exporting Results</h2>
      <div className="ml-6">
        <p className="font-semibold text-gray-900 mb-2">Available Formats:</p>
        <ul className="list-disc ml-6 space-y-1 text-gray-700">
          <li>PDF reports for sharing with team</li>
          <li>Spreadsheet data for stakeholders</li>
        </ul>
      </div>
    </section>
  </div>
);

const IntegrationsContent = () => (
  <div>
    <h1 className="text-4xl font-bold mb-2">Integrations</h1>
    <p className="text-gray-500 mb-8">Last Updated: 23rd October, 2025</p>
    
    <p className="text-gray-700 mb-8 leading-relaxed">
      Splitspur seamlessly integrates with your existing Shopify store and analytics tools.
    </p>

    <section className="mb-10" id="shopify-integration">
      <h2 className="text-2xl font-bold mb-4">1. Shopify Integration</h2>
      <div className="space-y-4 ml-6">
        <div>
          <p className="font-semibold text-gray-900">Quick Setup</p>
          <ul className="list-disc ml-6 space-y-1 text-gray-700 mt-2">
            <li>One-click installation from Shopify App Store</li>
            <li>Automatic script injection into your theme</li>
            <li>No coding or technical setup required</li>
          </ul>
        </div>
        <div>
          <p className="font-semibold text-gray-900">Data Access</p>
          <ul className="list-disc ml-6 space-y-1 text-gray-700 mt-2">
            <li>Theme files to insert testing code</li>
            <li>Product and collection data</li>
            <li>Order information to track conversions</li>
            <li>Customer data for segmentation</li>
          </ul>
        </div>
        <div>
          <p className="font-semibold text-gray-900">Theme Compatibility</p>
          <ul className="list-disc ml-6 space-y-1 text-gray-700 mt-2">
            <li>Works with all major Shopify themes</li>
            <li>Compatible with Online Store 2.0</li>
            <li>Support custom and third-party themes</li>
          </ul>
        </div>
      </div>
    </section>

    <section className="mb-10" id="data-tracking">
      <h2 className="text-2xl font-bold mb-4">2. Data Tracking</h2>
      <div className="space-y-4 ml-6">
        <div>
          <p className="font-semibold text-gray-900">Conversion Tracking</p>
          <ul className="list-disc ml-6 space-y-1 text-gray-700 mt-2">
            <li>Automatic purchase and order tracking</li>
            <li>Real-time conversion monitoring</li>
            <li>Goal completion tracking</li>
          </ul>
        </div>
        <div>
          <p className="font-semibold text-gray-900">Analytics Integration</p>
          <ul className="list-disc ml-6 space-y-1 text-gray-700 mt-2">
            <li>Built-in analytics dashboard</li>
            <li>Export data to external tools</li>
            <li>Historical trend analysis</li>
          </ul>
        </div>
      </div>
    </section>

    <section className="mb-10" id="platform-compatibility">
      <h2 className="text-2xl font-bold mb-4">3. Platform Compatibility</h2>
      <div className="space-y-4 ml-6">
        <div>
          <p className="font-semibold text-gray-900">Browser Support</p>
          <ul className="list-disc ml-6 space-y-1 text-gray-700 mt-2">
            <li>Chrome, Safari, Firefox, Edge</li>
            <li>Mobile and desktop browsers</li>
            <li>Progressive Web App compatible</li>
          </ul>
        </div>
        <div>
          <p className="font-semibold text-gray-900">Device Support</p>
          <ul className="list-disc ml-6 space-y-1 text-gray-700 mt-2">
            <li>Desktop computers</li>
            <li>Mobile devices</li>
            <li>Tablets</li>
          </ul>
        </div>
      </div>
    </section>

    <section className="mb-10" id="privacy-&-security">
      <h2 className="text-2xl font-bold mb-4">4. Privacy & Security</h2>
      <div className="space-y-4 ml-6">
        <div>
          <p className="font-semibold text-gray-900">Data Protection</p>
          <ul className="list-disc ml-6 space-y-1 text-gray-700 mt-2">
            <li>GDPR compliant data handling</li>
            <li>Secure data encryption</li>
            <li>Regular security updates</li>
          </ul>
        </div>
        <div>
          <p className="font-semibold text-gray-900">Permission Management</p>
          <ul className="list-disc ml-6 space-y-1 text-gray-700 mt-2">
            <li>Transparent permission requests</li>
            <li>Minimal required permissions</li>
            <li>Easy permission revocation</li>
          </ul>
        </div>
      </div>
    </section>

    <section className="mb-10" id="technical-requirements">
      <h2 className="text-2xl font-bold mb-4">5. Technical Requirements</h2>
      <div className="space-y-4 ml-6">
        <div>
          <p className="font-semibold text-gray-900">Store Requirements</p>
          <ul className="list-disc ml-6 space-y-1 text-gray-700 mt-2">
            <li>Active Shopify plan</li>
            <li>Online store enabled</li>
            <li>Theme editor access</li>
          </ul>
        </div>
        <div>
          <p className="font-semibold text-gray-900">Performance</p>
          <ul className="list-disc ml-6 space-y-1 text-gray-700 mt-2">
            <li>No impact on site speed</li>
            <li>Lightweight loading</li>
            <li>Automatic performance monitoring</li>
          </ul>
        </div>
      </div>
    </section>
  </div>
);

const FAQsContent = () => (
  <div>
    <h1 className="text-4xl font-bold mb-2">FAQs & Troubleshooting</h1>
    <p className="text-gray-500 mb-8">Last Updated: 23rd October, 2025</p>
    
    <p className="text-gray-700 mb-8 leading-relaxed">
      Find answers to common questions and solutions to technical issues.
    
    </p>

    <section className="mb-10" id="getting-started-faqs">
      <h2 className="text-2xl font-bold mb-4">1. Getting Started</h2>
      
      <div className="space-y-6 ml-6">
        <div>
          <p className="font-semibold text-gray-900 mb-2">Q. How do I install Splitspur?</p>
          <p className="text-gray-700">A. Install directly from the Shopify App Store. Click "Add app" and follow the installation steps.</p>
        </div>
        
        <div>
          <p className="font-semibold text-gray-900 mb-2">Q. What permissions does Splitspur need?</p>
          <p className="text-gray-700">A. We need access to your theme files to insert testing code and order data to track conversions.</p>
        </div>
      </div>
    </section>

    <section className="mb-10" id="test-creation-faqs">
      <h2 className="text-2xl font-bold mb-4">2. Test Creation</h2>
      
      <div className="space-y-6 ml-6">
        <div>
          <p className="font-semibold text-gray-900 mb-2">Q. How do I create my first test?</p>
          <p className="text-gray-700">A. Click "Create New Test" and follow the three-step process: setup, variant creation, and goal configuration.</p>
        </div>
        
        <div>
          <p className="font-semibold text-gray-900 mb-2">Q. What types of tests can I run?</p>
          <p className="text-gray-700">A. Full-page tests, fragment tests for specific sections, and targeted tests for different audiences.</p>
        </div>
        
        <div>
          <p className="font-semibold text-gray-900 mb-2">Q. Can I save tests as drafts?</p>
          <p className="text-gray-700">A. Yes, use the "Save as Draft" button to save your progress and return later.</p>
        </div>
      </div>
    </section>

    <section className="mb-10" id="results-&-data-faqs">
      <h2 className="text-2xl font-bold mb-4">3. Results & Data</h2>
      
      <div className="space-y-6 ml-6">
        <div>
          <p className="font-semibold text-gray-900 mb-2">Q. What does the confidence percentage mean?</p>
          <p className="text-gray-700">A. It indicates how reliable your results are. 95% or higher is considered statistically significant.</p>
        </div>
        
        <div>
          <p className="font-semibold text-gray-900 mb-2">Q. Why is my test still running without a winner?</p>
          <p className="text-gray-700">A. You may need more visitors or time. We recommend 1,000+ visitors per variant for reliable results.</p>
        </div>
        
        <div>
          <p className="font-semibold text-gray-900 mb-2">Q. How do I interpret AI insights?</p>
          <p className="text-gray-700">A. The AI analyzes your results and provides plain-English explanations of what worked and why.</p>
        </div>
      </div>
    </section>

    <section className="mb-10" id="technical-issues-faqs">
      <h2 className="text-2xl font-bold mb-4">4. Technical Issues</h2>
      
      <div className="space-y-6 ml-6">
        <div>
          <p className="font-semibold text-gray-900 mb-2">Q. My test isn't showing on the live site</p>
          <div className="text-gray-700">
            <ul className="list-disc ml-6 space-y-1 mt-2">
              <li>Check if the test is active and running</li>
              <li>Clear your browser cache</li>
              <li>Verify the URL in test settings matches your live page</li>
            </ul>
          </div>
        </div>
        
        <div>
          <p className="font-semibold text-gray-900 mb-2">Q. Conversion tracking seems incorrect</p>
          <div className="text-gray-700">
            <ul className="list-disc ml-6 space-y-1 mt-2">
              <li>Verify your goal settings</li>
              <li>Check that test pages are correctly specified</li>
              <li>Ensure proper installation</li>
            </ul>
          </div>
        </div>
        
        <div>
          <p className="font-semibold text-gray-900 mb-2">Q. Can't pause or stop a test</p>
          <div className="text-gray-700">
            <ul className="list-disc ml-6 space-y-1 mt-2">
              <li>Make sure you have the required permissions</li>
              <li>Try refreshing the page</li>
              <li>Contact support if problem continues</li>
            </ul>
          </div>
        </div>
      </div>
    </section>

    <section className="mb-10" id="account-&-billing-faqs">
      <h2 className="text-2xl font-bold mb-4">5. Account & Billing</h2>
      
      <div className="space-y-6 ml-6">
        <div>
          <p className="font-semibold text-gray-900 mb-2">Q. How do I change my plan?</p>
          <p className="text-gray-700">A. Go to Settings &gt; Billing to view and manage your subscription plan.</p>
        </div>
        
        <div>
          <p className="font-semibold text-gray-900 mb-2">Q. Where can I find my billing information?</p>
          <p className="text-gray-700">A. All billing details are available in Settings &gt; Billing section.</p>
        </div>
        
        <div>
          <p className="font-semibold text-gray-900 mb-2">Q. Need More Help?</p>
          <p className="text-gray-700">A. Contact our support team through the help section in your dashboard. We're here to help you get the most out of your testing.</p>
        </div>
      </div>
    </section>
  </div>
);


// --- ADDED THIS SECTION ---

// 1. Define the Table of Contents items for each section
// These must match the 'id' props in your content components
const tocItems = {
  'Getting Started': [
    'Step 1: Find Splitspur on Shopify App Store',
    'Step 2: Install and Approve Permissions',
    'Step 3: Automatic Setup Verification',
    'Step 4: Create Your First Test',
  ],
  'Core Features': [
    'Visual Test Creation',
    'AI-Powered Insights',
    'Comprehensive Analytics',
    'Results Dashboard',
    'Test Management',
    'Fragment-Level Testing',
  ],
  'Analysing Results': [
    'Results Dashboard Overview',
    'Understanding Key Metrics',
    'Using AI Insights',
    'Making Decisions',
    'Exporting Results',
  ],
  'Integrations': [
    'Shopify Integration',
    'Data Tracking',
    'Platform Compatibility',
    'Privacy & Security',
    'Technical Requirements',
  ],
  'FAQs & Troubleshooting': [
    'Getting Started FAQs',
    'Test Creation FAQs',
    'Results & Data FAQs',
    'Technical Issues FAQs',
    'Account & Billing FAQs',
  ],
};

// 2. Create the helper function to render the correct content
const renderActiveContent = (activeSection) => {
  switch (activeSection) {
    case 'Getting Started':
      return <GettingStartedContent />;
    case 'Core Features':
      return <CoreFeaturesContent />;
    case 'Analysing Results':
      return <AnalysingResultsContent />;
    case 'Integrations':
      return <IntegrationsContent />;
    case 'FAQs & Troubleshooting':
      return <FAQsContent />;
    default:
      return <GettingStartedContent />; // Default to 'Getting Started'
  }
};

// 3. Create the main page component that you are exporting
const Features = () => {
  // State for the active sidebar section
  const [activeSection, setActiveSection] = useState('Getting Started');
  // State for the mobile sidebar visibility
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  // State for the Table of Contents visibility
  const [isTocVisible, setIsTocVisible] = useState(true);

  // Get the ToC items for the currently active section
  const currentTocItems = tocItems[activeSection] || [];

  return (
    <div className="min-h-screen bg-white">
      {/* The Header is fixed at the top */}
      <Header onMenuClick={() => setIsSidebarOpen(true)} />

      {/* The Sidebar is fixed on the left */}
      <Sidebar
        activeSection={activeSection}
        setActiveSection={setActiveSection}
        isOpen={isSidebarOpen}
        setIsOpen={setIsSidebarOpen}
      />

      {/* The Main Content Area */}
      {/* We add padding-top to account for the fixed header */}
      {/* We add padding-left (on large screens) for the sidebar */}
      {/* We add padding-right (on large screens) for the Table of Contents */}
      <main className="pt-16 lg:pt-20 lg:pl-64 lg:pr-56">
        <div className="max-w-3xl mx-auto px-6 py-12">
          {/* Render the correct content based on the active section */}
          {renderActiveContent(activeSection)}
        </div>
      </main>

      {/* The Table of Contents is fixed on the right (large screens only) */}
      <TableOfContents
        items={currentTocItems}
        isVisible={isTocVisible}
        setIsVisible={setIsTocVisible}
      />
    </div>
  );
};

// 4. Export the main page component
export default Features;