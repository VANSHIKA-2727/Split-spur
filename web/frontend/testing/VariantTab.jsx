import React from "react";

export default function VariantTab({ label, color, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`px-4 py-2 flex items-center gap-2 rounded-t-lg font-medium ${bgFromColor(color)}`}
    >
      <div className={`w-2 h-2 rounded-full ${dotFromColor(color)}`}></div>
      {label}
    </button>
  );
}

function bgFromColor(color) {
  if (color === "pink") return "bg-pink-100";
  if (color === "orange") return "bg-orange-100";
  return "bg-gray-200";
}

function dotFromColor(color) {
  if (color === "pink") return "bg-pink-500";
  if (color === "orange") return "bg-orange-500";
  return "bg-black";
}
