import { useEffect, useState } from "react";
import { useSimulation } from "../context/SimulationContext";


const tasks = [
  { id: 1, title: "Add user onboarding flow", effort: 8 },
  { id: 2, title: "Improve dashboard load time", effort: 5 },
  { id: 3, title: "Add automated reporting", effort: 13 },
  { id: 4, title: "Fix settings page bugs", effort: 3 },
];


export default function Results() {
const { decisions, sprintAssignments } = useSimulation();
  const [results, setResults] = useState({
    delivery: 0,
    delayRisk: 0,
    burnout: 0,
    quality: 0,
  });

useEffect(() => {
  let delivery = 60;
  let delay = 30;
  let burnout = 40;
  let quality = 50;

  const hireEngineer = decisions.hireEngineer;
  const focus = decisions.roadmapFocus;
  const qaBudget = decisions.qaBudget;

  // --- Sprint effort hesaplama ---
  const sprintCapacity = 20; // her sprint için kapasite (story point)

  const sprint1Effort = tasks
    .filter((t) => sprintAssignments[t.id] === "Sprint 1")
    .reduce((sum, t) => sum + t.effort, 0);

  const sprint2Effort = tasks
    .filter((t) => sprintAssignments[t.id] === "Sprint 2")
    .reduce((sum, t) => sum + t.effort, 0);

  const overCommit1 = Math.max(0, sprint1Effort - sprintCapacity) / sprintCapacity; // 0–∞
  const overCommit2 = Math.max(0, sprint2Effort - sprintCapacity) / sprintCapacity;

  const overCommitTotal = overCommit1 + overCommit2;

  // --- Hire engineer effect ---
  if (hireEngineer === "Yes") {
    delivery += 15;
    burnout -= 20;
  } else if (hireEngineer === "No") {
    delivery -= 10;
    burnout += 15;
  }

  // --- Roadmap focus effect ---
  if (focus === "Performance") {
    delay -= 15;
    delivery += 5;
  } else if (focus === "New Features") {
    delivery += 12;
    quality -= 5;
  } else if (focus === "Bug Fixing") {
    quality += 15;
    delay += 5;
  }

  // --- QA Budget effect ---
  const qaFactor = qaBudget / 100;

  quality += qaFactor * 20;
  delay -= qaFactor * 10;
  delivery += qaFactor * 5;
  burnout -= qaFactor * 10;

  // --- Overcommit effect (BURASI BACKLOG ETKİSİ) ---
  if (overCommitTotal > 0) {
    // kapasiteyi aştıkça delivery düşsün, delay & burnout artsın
    delivery -= overCommitTotal * 25;
    delay += overCommitTotal * 30;
    burnout += overCommitTotal * 35;
  }

  // Round + clamp
  delivery = Math.min(100, Math.max(0, Math.round(delivery)));
  delay = Math.min(100, Math.max(0, Math.round(delay)));
  burnout = Math.min(100, Math.max(0, Math.round(burnout)));
  quality = Math.min(100, Math.max(0, Math.round(quality)));

  setResults({
    delivery,
    delayRisk: delay,
    burnout,
    quality,
  });
}, [decisions, sprintAssignments]);



 return (
  <div>
    <h1 className="text-2xl font-bold mb-6">Results</h1>

    {/* Debug / explanation of current decisions */}
    <div className="mb-6 p-4 bg-white rounded-xl border shadow text-sm text-gray-700">
      <div className="font-semibold mb-2">Current decisions</div>
      <div>Hire engineer: <span className="font-medium">{decisions.hireEngineer || "Not decided"}</span></div>
      <div>Roadmap focus: <span className="font-medium">{decisions.roadmapFocus || "Not decided"}</span></div>
      <div>QA budget: <span className="font-medium">{decisions.qaBudget}%</span></div>
    </div>
          <div className="mt-3 text-xs text-gray-500">
        Sprint 1 effort:{" "}
        <span className="font-medium">
          {tasks
            .filter((t) => sprintAssignments[t.id] === "Sprint 1")
            .reduce((sum, t) => sum + t.effort, 0)}{" "}
          pts
        </span>{" "}
        • Sprint 2 effort:{" "}
        <span className="font-medium">
          {tasks
            .filter((t) => sprintAssignments[t.id] === "Sprint 2")
            .reduce((sum, t) => sum + t.effort, 0)}{" "}
          pts
        </span>{" "}
        (capacity: 20 pts / sprint)
      </div>


    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      <ResultCard
        title="Delivery Success"
        value={results.delivery}
        color="bg-blue-500"
      />
      <ResultCard
        title="Delay Risk"
        value={results.delayRisk}
        color="bg-red-500"
      />
      <ResultCard
        title="Burnout Risk"
        value={results.burnout}
        color="bg-yellow-500"
      />
      <ResultCard
        title="Quality Confidence"
        value={results.quality}
        color="bg-green-500"
      />
    </div>
  </div>
);

}

function ResultCard({ title, value, color }: any) {
  return (
    <div className="p-6 bg-white shadow rounded-xl border">
      <div className="text-gray-600 text-sm mb-2">{title}</div>
      <div className="flex items-center gap-2">
        <div className={`w-3 h-3 rounded-full ${color}`} />
        <div className="text-xl font-bold">{value}%</div>
      </div>
    </div>
  );
}
