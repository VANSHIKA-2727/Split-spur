import React from "react";

export default function ToolbarItem({ icon, text, onClick }) {
  return (
    <div
      onClick={onClick}
      className="flex items-center gap-2 border px-4 py-2 rounded-md cursor-pointer hover:bg-gray-50"
    >
      {icon}
      <span className="text-sm">{text}</span>
    </div>
  );
}
