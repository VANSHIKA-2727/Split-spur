export default function Sidebar() {
  const screens = [
    "Home",
    "Dashboard",
    "Analytics",
    "AB Testing",
    "User Settings",
  ];

  return (
    <div className="w-64 bg-white shadow-lg h-screen p-6">
      <h2 className="text-xl font-bold mb-6">Screens</h2>

      <ul className="space-y-3">
        {screens.map((item, idx) => (
          <li
            key={idx}
            className="p-3 hover:bg-gray-100 rounded-lg cursor-pointer font-medium"
          >
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}
