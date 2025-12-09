import React, { useState } from 'react';
import { Mail, Lock } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function SplitspurSignup() {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  
  // State for subscribe (not used in this form, but we'll leave it)
  const [subscribeEmail, setSubscribeEmail] = useState('');
  
  // <-- Added state for success/error messages
  const [message, setMessage] = useState(''); 
  
  const navigate = useNavigate();

  // <-- Updated function to be async and handle API call
  const handleCreateAccount = async (e) => {
    e.preventDefault();
    setMessage(''); // Clear previous messages

    // --- 1. Frontend Validation ---
    if (password !== confirmPassword) {
      setMessage('Error: Passwords do not match.');
      return;
    }
    if (!agreedToTerms) {
      setMessage('Error: You must agree to the Terms of Service.');
      return;
    }

    // --- 2. Send data to Backend API ---
    try {
      // <-- THIS URL IS NOW RELATIVE TO USE THE VITE PROXY
      const response = await fetch('/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        // Send fullName as 'name', as expected by the backend
        body: JSON.stringify({
          name: fullName, 
          email: email,
          password: password,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        // --- 3. Handle Success ---
        setMessage('Success! Account created. Redirecting to login...');
        // Clear the form
        setFullName('');
        setEmail('');
        setPassword('');
        setConfirmPassword('');
        setAgreedToTerms(false);
        
        // Wait 2 seconds and navigate to the login page
        setTimeout(() => {
          navigate('/'); // Navigate to the Sign In page
        }, 2000);

      } else {
        // --- 4. Handle Server Errors ---
        // (e.g., "Email already in use")
        setMessage(`Error: ${data.error}`);
      }
    } catch (error) {
      // --- 5. Handle Network Errors ---
      console.error('Failed to fetch:', error);
      setMessage('Error: Could not connect to the server. Is it running?');
    }
  };

  // This function isn't used by the sign-up form, leaving as is
  const handleSubscribe = (e) => {
    e.preventDefault();
    console.log('Subscribed with:', subscribeEmail);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-black rounded-lg"></div>
            <span className="text-xl font-semibold">Splitspur</span>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex items-center justify-center px-6 py-12">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <div className="w-20 h-20 bg-black rounded-2xl mx-auto mb-6"></div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Welcome to Splitspur</h1>
            <p className="text-gray-600">AI-powered A/B testing for smarter decisions</p>
          </div>

          {/* Signup Form */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
            <div className="mb-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-1">Create your account</h2>
              <p className="text-sm text-gray-600">Get started with your free trial</p>
            </div>

            {/* Form is now a <form> tag with onSubmit */}
            <form onSubmit={handleCreateAccount} className="space-y-4">
              {/* Full Name */}
              <div>
                <label htmlFor="fullname" className="block text-sm font-medium text-gray-900 mb-2">
                  Full Name
                </label>
                <input
                  type="text"
                  id="fullname"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="Name"
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required // <-- Added HTML validation
                />
              </div>

              {/* Email */}
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-900 mb-2">
                  Work Email
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="your@email.com"
                    className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required // <-- Added HTML validation
                  />
                </div>
              </div>

              {/* Password */}
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-900 mb-2">
                  Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                 <input
  type="password"
  id="password"
  value={password}
  onChange={(e) => setPassword(e.target.value)} // <-- Fixed!
  placeholder="Enter Your Password"
  className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
  required
/>
                </div>
              </div>

              {/* Confirm Password */}
              <div>
                <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-900 mb-2">
                  Confirm Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="password"
                    id="confirmPassword"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Re-enter Your Password"
                    className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required // <-- Added HTML validation
                  />
                </div>
              </div>

              {/* Terms Checkbox */}
              <div className="flex items-start gap-2">
                <input
                  type="checkbox"
                  id="terms"
                  checked={agreedToTerms}
                  onChange={(e) => setAgreedToTerms(e.target.checked)}
                  className="mt-1 w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                />
                <label htmlFor="terms" className="text-sm text-gray-600">
                  I agree to Splitspur's{' '}
                  <a href="#" className="text-blue-600 hover:text-blue-700">Terms of Service</a>
                  {' '}and{' '}
                  <a href="#" className="text-blue-600 hover:text-blue-700">Privacy Policy</a>
                </label>
              </div>

              {/* --- Display Message Area --- */}
              {message && (
                <p className={`text-sm ${message.startsWith('Error:') ? 'text-red-600' : 'text-green-600'}`}>
                  {message}
                </p>
              )}

              {/* Create Account Button */}
              <button
                type="submit" // <-- Changed from onClick to submit
                className="w-full bg-blue-600 text-white py-3 rounded-md font-medium hover:bg-blue-700 transition mt-2"
              >
                Create Account
              </button>

              {/* Sign In Link */}
              <p className="text-center text-sm text-gray-600 mt-4">
                Already have an account?{' '}
                <button
                  type="button" // <-- Added type="button"
                  onClick={() => navigate('/')} // 👈 redirects to Login
                  className="text-blue-600 hover:text-blue-700 font-medium"
                >
                  Sign In
                </button>
              </p>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
}