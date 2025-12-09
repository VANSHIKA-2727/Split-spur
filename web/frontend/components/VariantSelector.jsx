export default function VariantSelector({ selected, setSelected }) {
  return (
    <div className="flex gap-4 mb-4">
      {["Variant A", "Variant B"].map((v, i) => (
        <button
          key={i}
          className={`px-5 py-2 rounded-lg border ${
            selected === v
              ? "bg-blue-600 text-white"
              : "bg-white text-gray-700"
          }`}
          onClick={() => setSelected(v)}
        >
          {v}
        </button>
      ))}
    </div>
  );
}
