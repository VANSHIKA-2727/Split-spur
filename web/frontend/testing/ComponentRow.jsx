import React from "react";

export default function ComponentRow({ label }) {
  return (
    <div className="p-1 hover:bg-gray-50 rounded cursor-pointer">
      {label}
    </div>
  );
}
