import React from "react";

export default function SmartSetupCard() {
  return (
    <div className="w-80 bg-gradient-to-br from-purple-50 to-pink-50 border-2 border-purple-200 rounded-lg p-6">
      <h3 className="font-semibold text-lg mb-4">Smart Setup</h3>

      <ul className="space-y-3 text-sm text-gray-700 mb-6">
        <li>• Tests need ~14 days for significance.</li>
        <li>• AI insights personalized to your page.</li>
        <li>• Helps you pick best elements to test.</li>
      </ul>
    </div>
  );
}
