export default function EditorPanel({ selected }) {
  return (
    <div className="bg-white p-4 rounded-lg shadow">
      <h3 className="font-semibold mb-4">Editing: {selected}</h3>

      <div className="space-y-3">
        <button className="w-full border p-3 rounded-lg hover:bg-gray-100">
          Change Text
        </button>

        <button className="w-full border p-3 rounded-lg hover:bg-gray-100">
          Change Image
        </button>

        <button className="w-full border p-3 rounded-lg hover:bg-gray-100">
          Change Button Color
        </button>

        <button className="w-full border p-3 rounded-lg hover:bg-gray-100">
          Hide Element
        </button>
      </div>
    </div>
  );
}
