import React from 'react';
import { Zap, CheckCircle, BarChart3, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function SplitspurLanding() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-black rounded"></div>
            <span className="text-xl font-bold">Splitspur</span>
          </div>
          <nav className="hidden md:flex items-center gap-8">
            <a href="#features" className="text-gray-700 hover:text-gray-900">Features</a>
            <a href="#pricing" className="text-gray-700 hover:text-gray-900">Pricing</a>
            <a href="#docs" className="text-gray-700 hover:text-gray-900">Documentation</a>
          </nav>
          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate('/Loginpage')}
              className="px-4 py-2 text-gray-700 hover:text-gray-900"
            >
              Login
            </button>
            <button
              onClick={() => navigate('/Signup')}
              className="px-5 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
            >
              Sign Up
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="max-w-6xl mx-auto px-6 py-20 text-center">
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 text-blue-700 rounded-full text-sm mb-8">
          <Zap className="w-4 h-4" />
          <span>Trusted by 15,000 Shopify Stores</span>
        </div>

        <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
          AI-Powered A/B Testing for<br />Shopify Stores
        </h1>

        <p className="text-xl text-gray-600 mb-10 max-w-2xl mx-auto">
          Test smarter, convert faster with AI-driven experimentation that actually works.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            onClick={() => navigate('/Loginpage')}
            className="px-8 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition font-medium"
          >
            Start Testing
          </button>
          <button className="px-8 py-3 bg-white text-gray-700 rounded-md border border-gray-300 hover:border-gray-400 transition font-medium">
            Book Live Demo
          </button>
        </div>
      </section>

      {/* Why Splitspur Section */}
      <section id="features" className="max-w-6xl mx-auto px-6 py-16">
        <h2 className="text-3xl font-bold text-center mb-12">Why Splitspur is the Smarter Choice</h2>

        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-200">
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
              <Zap className="w-6 h-6 text-purple-600" />
            </div>
            <h3 className="text-xl font-semibold mb-3">AI-Powered Insights</h3>
            <p className="text-gray-600">
              Get intelligent recommendations on what to test and why, powered by advanced machine learning.
            </p>
          </div>

          <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-200">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
              <CheckCircle className="w-6 h-6 text-green-600" />
            </div>
            <h3 className="text-xl font-semibold mb-3">True Win Reliability</h3>
            <p className="text-gray-600">
              Statistical rigor built-in. We notify you of winners when you have real, trustworthy significance.
            </p>
          </div>

          <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-200">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
              <BarChart3 className="w-6 h-6 text-blue-600" />
            </div>
            <h3 className="text-xl font-semibold mb-3">Real-Time Analytics</h3>
            <p className="text-gray-600">
              Monitor test performance live with clear, actionable metrics that anyone can understand.
            </p>
          </div>
        </div>
      </section>

      {/* Workflow Section */}
      <section className="max-w-6xl mx-auto px-6 py-16">
        <div className="text-center mb-4">
          <span className="inline-block px-4 py-1 bg-gray-200 text-gray-700 rounded-full text-sm">Simple Process</span>
        </div>
        <h2 className="text-3xl font-bold text-center mb-4">From Hypothesis to Proven Winner</h2>
        <p className="text-gray-600 text-center mb-12 max-w-2xl mx-auto">
          Our streamlined workflow helps you test ideas faster and with more confidence.
        </p>

        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              step: 1,
              title: "Create Your Test",
              desc: "Use our AI-powered wizard to set up tests in minutes. Get suggestions on what elements to test for maximum impact."
            },
            {
              step: 2,
              title: "Let AI Optimize",
              desc: "Our multi-armed bandit algorithm automatically shifts traffic to better-performing variants while gathering data."
            },
            {
              step: 3,
              title: "Deploy the Winner",
              desc: "Get notified when we find a True Win with statistical significance. Implement with one click and measure the lift."
            },
          ].map(({ step, title, desc }) => (
            <div key={step} className="bg-white p-8 rounded-lg shadow-sm border border-gray-200 relative">
              <div className="w-12 h-12 bg-blue-600 text-white rounded-lg flex items-center justify-center text-xl font-bold mb-4">
                {step}
              </div>
              <h3 className="text-xl font-semibold mb-3">{title}</h3>
              <p className="text-gray-600">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-blue-600 text-white py-16 my-16">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-12 text-center">
            <div>
              <Zap className="w-10 h-10 mx-auto mb-4" />
              <div className="text-4xl font-bold mb-2">10,000+</div>
              <div className="text-blue-100">AI-Generated Insights</div>
            </div>
            <div>
              <div className="w-10 h-10 mx-auto mb-4 flex items-center justify-center">
                <div className="w-8 h-10 border-4 border-white rounded-full"></div>
              </div>
              <div className="text-4xl font-bold mb-2">47% Faster</div>
              <div className="text-blue-100">Time to Significance</div>
            </div>
            <div>
              <div className="w-10 h-10 mx-auto mb-4 flex items-center justify-center">
                <ArrowRight className="w-10 h-10" />
              </div>
              <div className="text-4xl font-bold mb-2">+34%</div>
              <div className="text-blue-100">Average Conversion Lift</div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="max-w-6xl mx-auto px-6 py-16">
        <div className="text-center mb-4">
          <span className="inline-block px-4 py-1 bg-gray-200 text-gray-700 rounded-full text-sm">Customer Stories</span>
        </div>
        <h2 className="text-3xl font-bold text-center mb-12">Loved by Teams Worldwide</h2>

        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              stars: 5,
              quote:
                "Splitspur's AI insights helped us increase conversions by 47% in just 3 months. The True Win® feature gives us confidence we never had before.",
              name: "Sarah Chen",
              title: "Head of Growth, TechCorp"
            },
            {
              stars: 4,
              quote: "The AI optimization is a game changer. We're maximizing revenue like never before.",
              name: "Marcus Rodriguez",
              title: "VP Product, ShopFlow"
            },
            {
              stars: 4,
              quote: "Best testing platform we've used. Setup is straightforward and the insights are actually actionable.",
              name: "Emily Zhang",
              title: "Marketing Director, RetailPlus"
            },
          ].map(({ stars, quote, name, title }, i) => (
            <div key={i} className="bg-white p-8 rounded-lg shadow-sm border border-gray-200">
              <div className="flex mb-4">
                {[...Array(stars)].map((_, i) => (
                  <span key={i} className="text-yellow-400 text-xl">★</span>
                ))}
              </div>
              <p className="text-gray-700 mb-6">"{quote}"</p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gray-300 rounded-full"></div>
                <div>
                  <div className="font-semibold">{name}</div>
                  <div className="text-sm text-gray-500">{title}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 mt-20">
        <div className="max-w-6xl mx-auto px-6 py-12">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <h3 className="font-semibold mb-4">Stay Updated</h3>
              <p className="text-sm text-gray-600 mb-4">Get the latest guides and testing insights</p>
              <div className="flex gap-2">
                <input
                  type="email"
                  placeholder="your@email.com"
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Product</h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li><a href="#" className="hover:text-gray-900">Features</a></li>
                <li><a href="#" className="hover:text-gray-900">Pricing</a></li>
                <li><a href="#" className="hover:text-gray-900">Documentation</a></li>
                <li><a href="#" className="hover:text-gray-900">API Reference</a></li>
                <li><a href="#" className="hover:text-gray-900">Integrations</a></li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Company</h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li><a href="#" className="hover:text-gray-900">About Us</a></li>
                <li><a href="#" className="hover:text-gray-900">Blog</a></li>
                <li><a href="#" className="hover:text-gray-900">Contact Us</a></li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Resources</h3>
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
