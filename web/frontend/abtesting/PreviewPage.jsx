import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

function PreviewPage() {
  const location = useLocation();
  const navigate = useNavigate();

  const pageUrl = location.state?.pageUrl || "https://example.com";
  const testName = location.state?.testName || "Untitled Test";

  return (
    <div className="w-full h-screen flex flex-col">
      {/* TOP NAV */}
      <div className="w-full bg-white px-6 py-4 border-b shadow-sm flex justify-between items-center">
        <h2 className="text-xl font-semibold">Visual Editor – {testName}</h2>

        <button
          onClick={() => navigate("/")}
          className="px-4 py-2 border rounded-lg hover:bg-gray-100"
        >
          Back
        </button>
      </div>

      {/* MAIN AREA: Left = Preview, Right = Suggestions */}
      <div className="flex flex-1">

        {/* LEFT SIDE — WEBSITE PREVIEW */}
        <div className="w-[70%] bg-gray-100 flex justify-center items-center">
          <iframe
            src={pageUrl}
            className="w-[95%] h-[95%] bg-white border rounded-xl shadow-md"
            sandbox="allow-same-origin allow-scripts allow-popups allow-forms"
          ></iframe>
        </div>

        {/* RIGHT SIDE — PANELS */}
        <div className="w-[30%] bg-white border-l p-4 overflow-y-auto">
          <h3 className="text-lg font-semibold mb-3">AI Suggestions</h3>

          <div className="space-y-4">
            <div className="border rounded-lg p-3">
              <p>Add testimonials to Variant B for trust.</p>
              <button className="mt-2 px-4 py-1 bg-blue-600 text-white rounded">
                Apply
              </button>
            </div>

            <div className="border rounded-lg p-3">
              <p>Add a cart button to Variant A for higher conversion.</p>
              <button className="mt-2 px-4 py-1 bg-blue-600 text-white rounded">
                Apply
              </button>
            </div>
          </div>

          <h3 className="text-lg font-semibold mt-6 mb-2">Recent Changes</h3>
          <ul className="list-disc ml-6 text-gray-600">
            <li>CTA changed from Blue → Black</li>
            <li>Brand banner auto-scroll enabled</li>
          </ul>
        </div>
      </div>

      {/* BOTTOM TOOLBAR */}
      <div className="w-full bg-white border-t p-3 flex justify-between">
        <div className="flex gap-3">
          <button className="px-3 py-1 border rounded">Undo</button>
          <button className="px-3 py-1 border rounded">Redo</button>
          <button className="px-3 py-1 border rounded">Preview</button>
        </div>

        <button className="px-6 py-2 bg-purple-600 text-white rounded-lg">
          Launch Test 
        </button>
      </div>
    </div>
  );
}

export default PreviewPage;
