import React, { useState } from "react";

export default function DurationDropdown({ label, value, onChange }) {
  const [open, setOpen] = useState(false);

  const options = [
    "7 Days", "10 Days", "14 Days", "21 Days",
    "30 Days", "45 Days", "60 Days",
  ];

  return (
    <div className="relative">
      <label className="block text-sm font-medium mb-2">{label}</label>

      <div
        className="border rounded-lg p-3 bg-white cursor-pointer"
        onClick={() => setOpen(!open)}
      >
        {value}
      </div>

      {open && (
        <div className="absolute mt-1 bg-white border rounded-lg w-full shadow max-h-40 overflow-y-auto z-20">
          {options.map((opt) => (
            <div
              key={opt}
              className="p-2 hover:bg-gray-100 cursor-pointer"
              onClick={() => {
                onChange(opt);
                setOpen(false);
              }}
            >
              {opt}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
