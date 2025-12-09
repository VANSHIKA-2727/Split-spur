import {
  Undo2,
  Redo2,
  HelpCircle,
  Eye,
  Sun,
  Save,
  Trash2,
} from "lucide-react";

const BottomToolbar = ({
  onUndo,
  onRedo,
  onHelp,
  onPreview,
  onGoals,
  onSaveDraft,
  onDeleteDraft,
  onLaunchTest,
}) => (
  <div className="bg-white border-t px-6 py-3">
    
    {/* ↓↓↓ EVERYTHING CENTERED ↓↓↓ */}
    <div className="w-full flex justify-center">
      <div className="flex items-center gap-3">

        <ToolbarItem icon={<Undo2 size={18} />} text="Undo" onClick={onUndo} />
        <ToolbarItem icon={<Redo2 size={18} />} text="Redo" onClick={onRedo} />
        <ToolbarItem icon={<HelpCircle size={18} />} text="Help" onClick={onHelp} />
        <ToolbarItem icon={<Eye size={18} />} text="Preview" onClick={onPreview} />
        <ToolbarItem icon={<Sun size={18} />} text="Goals Active" onClick={onGoals} />
        <ToolbarItem icon={<Save size={18} />} text="Save Draft" onClick={onSaveDraft} />
        <ToolbarItem icon={<Trash2 size={18} />} text="Delete Draft" onClick={onDeleteDraft} />

        {/* Launch Test Button */}
        <button
          onClick={onLaunchTest}
          className="bg-blue-600 text-white px-6 py-2 rounded-lg font-medium flex items-center gap-2 hover:bg-blue-700"
        >
          Launch Test
        </button>
      </div>
    </div>
  </div>
);

const ToolbarItem = ({ icon, text, onClick }) => (
  <div
    onClick={onClick}
    className="flex items-center gap-2 border px-4 py-2 rounded-md cursor-pointer hover:bg-gray-50"
  >
    {icon}
    <span>{text}</span>
  </div>
);

export default BottomToolbar;
