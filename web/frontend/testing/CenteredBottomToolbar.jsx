import React from "react";
import ToolbarItem from "./ToolbarItem";
import { Undo2, Redo2, HelpCircle, Eye, Sun, Save, Trash2 } from "lucide-react";

export default function CenteredBottomToolbar({
  onUndo,
  onRedo,
  onHelp,
  onPreview,
  onGoals,
  onSaveDraft,
  onDeleteDraft,
  onLaunchTest,
}) {
  return (
    <div className="bg-white border-t px-6 py-3">
      <div className="w-full flex justify-center">
        <div className="flex items-center gap-3">
          <ToolbarItem icon={<Undo2 size={18} />} text="Undo" onClick={onUndo} />
          <ToolbarItem icon={<Redo2 size={18} />} text="Redo" onClick={onRedo} />
          <ToolbarItem icon={<HelpCircle size={18} />} text="Help" onClick={onHelp} />
          <ToolbarItem icon={<Eye size={18} />} text="Preview" onClick={onPreview} />
          <ToolbarItem icon={<Sun size={18} />} text="Goals" onClick={onGoals} />
          <ToolbarItem icon={<Save size={18} />} text="Save Draft" onClick={onSaveDraft} />
          <ToolbarItem icon={<Trash2 size={18} />} text="Delete" onClick={onDeleteDraft} />

          <button
            onClick={onLaunchTest}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-blue-700"
          >
            Launch Test
          </button>
        </div>
      </div>
    </div>
  );
}
