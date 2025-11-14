import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar1 from '../components/Navbar1.jsx';

export default function PricingPage() {
  const [email, setEmail] = useState('');
  const navigate = useNavigate();

  const plans = [
    {
      name: 'Starter',
      price: 'x',
      period: 'per Month',
      description: 'Perfect for small teams getting started with A/B testing',
      features: [
        'Up to 3 active tests',
        'Unlimited monthly visitors',
        'Basic AI insights',
        '7-day Data Retention'
      ],
      buttonText: 'Start Free Trial',
      buttonStyle: 'border-2 border-gray-300 text-gray-700 hover:bg-gray-50',
      highlighted: false
    },
    {
      name: 'Professional',
      price: 'x',
      period: 'per Month',
      description: 'Perfect for small teams getting started with A/B testing',
      features: [
        'Unlimited active tests',
        '100,000 monthly visitors',
        'Advanced AI insights & recommendations',
        '90-day data retention'
      ],
      buttonText: 'Start Free Trial',
      buttonStyle: 'bg-blue-600 text-white hover:bg-blue-700',
      highlighted: true
    },
    {
      name: 'Enterprise',
      price: 'Custom',
      period: 'contact sales',
      description: 'For large teams with mission-critical testing needs',
      features: [
        'Unlimited everything',
        'Custom visitor plans',
        'Advanced AI insights & recommendations',
        'Unlimited data retention'
      ],
      buttonText: 'Contact Sales',
      buttonStyle: 'border-2 border-gray-300 text-gray-700 hover:bg-gray-50',
      highlighted: false
    }
  ];

  const faqs = [
    {
      question: 'How does the free trial work?',
      answer: 'All plans come with a 14-day free trial. No credit card required. You can cancel anytime during the trial period with no charges.'
    },
    {
      question: 'What happens if I exceed my visitor limit?',
      answer: "We'll notify you when you're approaching your limit. You can upgrade to a higher plan or we'll work with you on custom pricing that fits your needs."
    },
    {
      question: 'Can I change plans later?',
      answer: 'Yes! You can upgrade or downgrade at any time. Changes are prorated and reflected in your next billing cycle.'
    },
    {
      question: 'Is there a setup fee?',
      answer: 'No setup fees for any plan. We believe in transparent, simple pricing with no hidden costs.'
    }
  ];

  const handleEmailSubmit = (e) => {
    e.preventDefault();
    console.log('Email submitted:', email);
  };
  
  // New function to handle the 'Start Free Trial' click
  const handlePlanSelection = (planName) => {
    // For Professional, which is highlighted, we might want a different path or just go to signup
    // For this example, we'll navigate all "Start Free Trial" buttons to the Login page
    if (planName !== 'Enterprise') {
        navigate('/Loginpage');
    } else {
        // For Enterprise, you might want to open a contact form modal or a different page
        navigate('/ContactSales'); // Assuming you have a ContactSales route
    }
  }


  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar1 />

      {/* Hero Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <div className="inline-flex items-center px-4 py-2 bg-purple-100 text-purple-700 rounded-full text-sm mb-8">
            <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z"/>
            </svg>
            Simple, Transparent Pricing
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Plans That Grow With Your Business
          </h1>
          <p className="text-lg text-gray-600">
            Start free, scale as you grow. All plans include 14-day free trial with no credit card required.
          </p>
        </div>
      </section>

      {/* Pricing Cards - MODIFIED FOR HOVER EFFECT */}
      <section className="pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8">
            {plans.map((plan, index) => (
              <div
                key={index}
                // 💡 MODIFIED: Added hover:border-blue-500 and hover:shadow-lg
                className={`bg-white rounded-lg p-8 transition-all duration-300 cursor-pointer 
                  ${
                    plan.highlighted
                      ? 'border-2 border-blue-500 shadow-xl transform scale-105'
                      : 'border border-gray-200 shadow-md hover:border-blue-500 hover:shadow-lg'
                  }`}
                  // Optional: Make the entire card clickable
                  onClick={() => handlePlanSelection(plan.name)}
              >
                <div className="mb-6">
                  <div className="w-10 h-10 bg-blue-600 rounded flex items-center justify-center mb-4">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900">{plan.name}</h3>
                  <p className="text-gray-600 mt-2">
                    {plan.price}/{plan.period}
                  </p>
                </div>
                <p className="text-gray-600 mb-6">{plan.description}</p>
                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-start">
                      <span className="text-gray-600">• {feature}</span>
                    </li>
                  ))}
                </ul>
                <button
                  className={`w-full py-3 px-6 rounded font-medium transition-colors ${plan.buttonStyle}`}
                  // 💡 MODIFIED: Added handler to redirect on button click
                  onClick={() => handlePlanSelection(plan.name)}
                >
                  {plan.buttonText}
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">
              Frequently Asked Questions
            </h2>
            <p className="text-gray-600">
              Everything you need to know about our pricing
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            {faqs.map((faq, index) => (
              <div key={index} className="space-y-2">
                <div className="flex items-start">
                  <svg className="w-5 h-5 text-blue-600 mr-2 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">{faq.question}</h3>
                    <p className="text-gray-600">{faq.answer}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-blue-50">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Still have questions?
          </h2>
          <p className="text-gray-600 mb-8">
            Our team is here to help. Choose and start your free trial or get in touch with our sales team.
          </p>
          <button 
             className="bg-blue-600 text-white px-8 py-3 rounded hover:bg-blue-700 font-medium"
             // Assuming this also redirects to the contact sales page
             onClick={() => navigate('/ContactSales')}
          >
            Contact Sales
          </button>
        </div>
      </section>

      {/* Footer - CLEANED UP BUTTONS */}
      <footer className="bg-white border-t border-gray-200 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <h3 className="font-semibold text-gray-900 mb-4">Stay Updated</h3>
              <p className="text-sm text-gray-600 mb-4">
                Get the latest features and testing insights
              </p>
              <form onSubmit={handleEmailSubmit} className="flex">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-l focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                  type="submit"
                  className="bg-blue-600 text-white px-4 py-2 rounded-r hover:bg-blue-700"
                >
                  →
                </button>
              </form>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-4">Product</h3>
              <ul className="space-y-2 text-sm text-gray-600">
                  {/* Footer links should use Link component for proper routing */}
                  <li>
                    <button onClick={() => navigate('/Start')} className="text-gray-700 hover:text-gray-900">
                      Features
                    </button>
                  </li>
                  <li>
                    <button onClick={() => navigate('/Pricing')} className="text-gray-700 hover:text-gray-900">
                      Pricing
                    </button>
                  </li>
                  <li>
                    <button onClick={() => navigate('/Features')} className="text-gray-700 hover:text-gray-900">
                      Documentation
                    </button>
                  </li>
                  <li><a href="#" className="hover:text-gray-900">API Reference</a></li>
                  <li><a href="#" className="hover:text-gray-900">Integrations</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-4">Company</h3> {/* Changed from Product for clarity */}
              <ul className="space-y-2 text-sm text-gray-600">
                <li><a href="#" className="hover:text-gray-900">About Us</a></li>
                <li><a href="#" className="hover:text-gray-900">Blog</a></li>
                <li><a href="#" className="hover:text-gray-900">Contact Us</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-4">Resources</h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li><a href="#" className="hover:text-gray-900">Help</a></li>
                <li><a href="#" className="hover:text-gray-900">Community</a></li>
                <li><a href="#" className="hover:text-gray-900">Tutorials</a></li>
              </ul>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}