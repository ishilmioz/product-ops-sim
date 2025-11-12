export default function Dashboard() {
  const metrics = [
    { label: "Delivery Confidence", value: "72%", color: "bg-blue-500" },
    { label: "Delay Risk", value: "28%", color: "bg-red-500" },
    { label: "Team Velocity", value: "34 pts", color: "bg-green-500" },
    { label: "Scope Stability", value: "81%", color: "bg-yellow-500" },
  ];

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Dashboard</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {metrics.map((m) => (
          <div
            key={m.label}
            className="p-6 rounded-xl shadow bg-white flex flex-col gap-3 border"
          >
            <span className="text-gray-600 text-sm">{m.label}</span>
            <div className="flex items-center gap-2">
              <div className={`w-3 h-3 rounded-full ${m.color}`}></div>
              <span className="text-xl font-semibold">{m.value}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
