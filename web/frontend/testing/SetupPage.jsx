import React from "react";
import InputField from "./InputField";
import DurationDropdown from "./DurationDropdownn";
import SmartSetupCard from "./SmartSetupCard";
import Footer from "./Footer";

export default function SetupPage({ testData, handleInputChange, setCurrentPage }) {
  const handleContinue = () => {
    if (!testData.url || !testData.url.trim()) {
      alert("Please enter a valid URL");
      return;
    }

    let finalUrl = testData.url.trim();
    if (!/^https?:\/\//.test(finalUrl)) finalUrl = "https://" + finalUrl;

    handleInputChange("url", finalUrl);
    setCurrentPage("editor");
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">

      <main className="flex-1 px-6 py-8">
        <div className="max-w-7xl mx-auto">
          
          <h1 className="text-3xl font-bold mb-2">Create New Test</h1>
          <p className="text-gray-600 mb-8">With AI Recommendations</p>

          <div className="flex gap-6">
            {/* LEFT CARD */}
            <div className="flex-1 bg-white rounded-lg shadow-sm p-8">
              <h2 className="text-xl font-semibold mb-6">Test Setup</h2>

              <div className="space-y-6">
                <InputField
                  label="Test Name"
                  placeholder="e.g., Homepage Hero Test"
                  value={testData.name}
                  onChange={(val) => handleInputChange("name", val)}
                />

                <InputField
                  label="Page URL"
                  placeholder="https://yourwebsite.com"
                  value={testData.url}
                  onChange={(val) => handleInputChange("url", val)}
                />

                <DurationDropdown
                  label="Test Duration"
                  value={testData.duration}
                  onChange={(val) => handleInputChange("duration", val)}
                />
              </div>
            </div>

            {/* RIGHT CARD */}
            <SmartSetupCard />
          </div>

          <div className="mt-8 flex justify-between">
            <button className="px-6 py-2 border rounded-lg">Back to Dashboard</button>

            <div className="flex gap-3">
              <button className="px-6 py-2 border rounded-lg">Save as Draft</button>
              <button
                className="px-6 py-2 bg-blue-600 text-white rounded-lg"
                onClick={handleContinue}
              >
                Continue to Visual Editor
              </button>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
