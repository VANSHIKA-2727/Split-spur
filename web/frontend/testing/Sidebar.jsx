import React from "react";

export default function SidebarCard({ text }) {
  return (
    <div className="border p-3 rounded-lg bg-orange-50 mb-2">
      <p className="text-sm mb-2">{text}</p>
      <button className="w-full bg-blue-600 text-white py-1 rounded text-sm">
        Apply
      </button>
    </div>
  );
}
