import React, { useState } from 'react';
import {  useNavigate } from 'react-router-dom';
import Navbar1 from '../components/Navbar1.jsx';

export default function FeaturesPage() {
  const [email, setEmail] = useState('');
const navigate = useNavigate();
  const features = [
    {
      title: 'AI-Powered Insights',
      description: 'Get intelligent test recommendations based on your data patterns and industry benchmarks.',
      icon: 'blue',
      points: [
        'Pattern recognition across tests',
        'Industry benchmark comparisons',
        'Automated winning strategy detection',
        'Predictive analytics for test outcomes'
      ]
    },
    {
      title: 'Real-Time Monitoring',
      description: 'Track test performance live with instant notifications when significance is reached.',
      icon: 'purple',
      points: [
        'Live dashboard updates',
        'Instant significance alerts',
        'Performance threshold monitoring',
        'Custom notification triggers'
      ]
    },
    {
      title: 'True Win Statistics',
      description: 'Built-in statistical rigor ensures you only deploy real winners, not false positives.',
      icon: 'teal',
      points: [
        'Bayesian statistical analysis',
        'Sequential testing support',
        'False positive protection',
        'Confidence interval calculations'
      ]
    },
    {
      title: 'Visual Test Builder',
      description: 'Create A/B tests with our intuitive wizard - no coding required.',
      icon: 'purple',
      points: [
        'Drag-and-drop interface',
        'AI-powered variant suggestions',
        'Mobile preview mode',
        'Visual diff previews'
      ]
    },
    {
      title: 'Advanced Analytics',
      description: 'Deep dive into demographic data, time-series trends, and segment performance.',
      icon: 'teal',
      points: [
        'Multi-dimensional analysis',
        'Custom segment creation',
        'Time-series visualizations',
        'Cohort analysis tools'
      ]
    },
    {
      title: 'Easy Integration',
      description: 'Quick setup for Shopify, WooCommerce, and custom platforms via simple JS snippet.',
      icon: 'blue',
      points: [
        'One-line code integration',
        'No-code Shopify app',
        'WooCommerce plugin',
        'REST API access'
      ]
    },
    {
      title: 'Conversion Tracking',
      description: 'Track micro and macro conversions with flexible goal configuration.',
      icon: 'teal',
      points: [
        'Multiple goal tracking',
        'Custom event tracking',
        'Revenue attribution',
        'Funnel analysis'
      ]
    },
    {
      title: 'Lightning Fast',
      description: 'Sub-50ms response times ensure zero impact on user experience.',
      icon: 'blue',
      points: [
        'Global CDN deployment',
        'Edge computing optimization',
        'Minimal bundle size',
        'Async loading patterns'
      ]
    },
    {
      title: 'Enterprise Security',
      description: 'SOC 2 compliant with end-to-end encryption and data privacy controls.',
      icon: 'purple',
      points: [
        'SOC 2 Type II certified',
        'GDPR & CCPA compliant',
        'End-to-end encryption',
        'Role-based access control'
      ]
    }
  ];

  const handleEmailSubmit = (e) => {
    e.preventDefault();
    console.log('Email submitted:', email);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar1 />

      {/* Hero Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center px-4 py-2 bg-purple-100 text-purple-700 rounded-full text-sm mb-8">
            <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
              <path fillRule="evenodd" d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z" clipRule="evenodd" />
            </svg>
            Simple, Transparent Pricing
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Everything you need for powerful A/B testing
          </h1>
          <p className="text-lg text-gray-600">
            From AI-powered insights to enterprise security, Splitspur delivers the complete toolkit for data-driven decision making.
          </p>
        </div>
      </section>

      {/* Features Grid */}
      <section className="pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-3 gap-6">
            {features.map((feature, index) => {
              const iconColors = {
                blue: 'bg-blue-600',
                purple: 'bg-purple-600',
                teal: 'bg-teal-600'
              };
              
              return (
                <div
                  key={index}
                  className="bg-white rounded-lg p-6 border border-gray-200 shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className={`w-10 h-10 ${iconColors[feature.icon]} rounded flex items-center justify-center mb-4`}>
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{feature.title}</h3>
                  <p className="text-gray-600 mb-4 text-sm">{feature.description}</p>
                  <ul className="space-y-2">
                    {feature.points.map((point, pointIndex) => (
                      <li key={pointIndex} className="flex items-start text-sm text-gray-600">
                        <span className="mr-2">•</span>
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-blue-50">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Ready to start winning?
          </h2>
          <p className="text-gray-600 mb-8">
            Join hundreds of teams already using Splitspur to make data-driven decisions.
          </p>
          <button 
      className="bg-blue-600 text-white px-8 py-3 rounded hover:bg-blue-700 font-medium"
    
      onClick={() => navigate('/Loginpage')} 
    >
      Start Free Trial
    </button>
        </div>
      </section>

      {/* Footer */}
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
                  <button 
  onClick={() => navigate('/Start')}
  className="text-gray-700 hover:text-gray-900"
>
  Features
</button>
          <button 
  onClick={() => navigate('/Pricing')}
  className="text-gray-700 hover:text-gray-900"
>
  Pricing
</button>
<button 
  onClick={() => navigate('/Features')}
  className="text-gray-700 hover:text-gray-900"
>
  Documentation
</button>
                <li><a href="#" className="hover:text-gray-900">API Reference</a></li>
                <li><a href="#" className="hover:text-gray-900">Integrations</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-4">Product</h3>
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