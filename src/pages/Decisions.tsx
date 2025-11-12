import { useSimulation } from "../context/SimulationContext";

export default function Decisions() {
  const { decisions, setDecisions } = useSimulation();

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Decisions</h1>

      <div className="space-y-6">

        {/* Decision 1 — Yes/No */}
        <div className="p-4 bg-white shadow rounded-xl border">
          <h2 className="font-semibold mb-2">Hire 1 more engineer?</h2>
          <div className="flex gap-4">
            <button
              className={`px-4 py-2 rounded ${
                decisions.hireEngineer === "Yes" ? "bg-blue-600 text-white" : "bg-gray-200"
              }`}
              onClick={() =>
                setDecisions({ ...decisions, hireEngineer: "Yes" })
              }
            >
              Yes
            </button>
            <button
              className={`px-4 py-2 rounded ${
                decisions.hireEngineer === "No" ? "bg-blue-600 text-white" : "bg-gray-200"
              }`}
              onClick={() =>
                setDecisions({ ...decisions, hireEngineer: "No" })
              }
            >
              No
            </button>
          </div>
        </div>

        {/* Decision 2 — Multiple Choice */}
        <div className="p-4 bg-white shadow rounded-xl border">
          <h2 className="font-semibold mb-2">
            What should the team focus on this sprint?
          </h2>

          <select
            className="border px-3 py-2 rounded"
            value={decisions.roadmapFocus}
            onChange={(e) =>
              setDecisions({
                ...decisions,
                roadmapFocus: e.target.value as
                  | "Performance"
                  | "New Features"
                  | "Bug Fixing"
                  | "",
              })
            }
          >
            <option value="">Select...</option>
            <option value="Performance">Performance</option>
            <option value="New Features">New Features</option>
            <option value="Bug Fixing">Bug Fixing</option>
          </select>
        </div>

        {/* Decision 3 — Slider */}
        <div className="p-4 bg-white shadow rounded-xl border">
          <h2 className="font-semibold mb-2">QA Automation Budget</h2>
          <input
            type="range"
            min={0}
            max={100}
            value={decisions.qaBudget}
            onChange={(e) =>
              setDecisions({
                ...decisions,
                qaBudget: Number(e.target.value),
              })
            }
            className="w-full"
          />
          <div className="text-sm text-gray-600 mt-2">
            Current budget: {decisions.qaBudget}%
          </div>
        </div>
      </div>
    </div>
  );
}
