export default function PopBar() {
  return (
    <div className="h-16 bg-white shadow flex items-center px-6 justify-between">
      <h2 className="text-xl font-semibold">A/B Test Builder</h2>

      <button className="px-4 py-2 bg-blue-600 text-white rounded-lg">
        Save Test
      </button>
    </div>
  );
}
