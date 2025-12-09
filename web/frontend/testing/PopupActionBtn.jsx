import React from "react";

export default function PopupActionBtn({ label, onClick }) {
  return (
    <button
      className="border rounded-md py-2 text-sm hover:bg-gray-50"
      onClick={onClick}
    >
      {label}
    </button>
  );
}
