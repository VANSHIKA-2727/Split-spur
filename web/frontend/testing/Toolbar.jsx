import React from "react";
import { Undo2, Redo2, HelpCircle, Eye, Sun, Save, Trash2 } from "lucide-react";

export default function Toolbar() {
  return (
    <div className="bg-white border-t px-6 py-3 flex justify-center">
      <div className="flex items-center gap-3">
        <Item icon={<Undo2 size={18} />} text="Undo" />
        <Item icon={<Redo2 size={18} />} text="Redo" />
        <Item icon={<HelpCircle size={18} />} text="Help" />
        <Item icon={<Eye size={18} />} text="Preview" />
        <Item icon={<Sun size={18} />} text="Goals" />
        <Item icon={<Save size={18} />} text="Save Draft" />
        <Item icon={<Trash2 size={18} />} text="Delete Draft" />
      </div>
    </div>
  );
}

const Item = ({ icon, text }) => (
  <div className="flex items-center gap-2 border px-4 py-2 rounded-md cursor-pointer hover:bg-gray-50">
    {icon}
    <span className="text-sm">{text}</span>
  </div>
);
