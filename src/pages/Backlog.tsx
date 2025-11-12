import { useSimulation } from "../context/SimulationContext";

export default function Backlog() {
  const tasks = [
    { id: 1, title: "Add user onboarding flow", effort: 8, impact: "High", risk: "Medium" },
    { id: 2, title: "Improve dashboard load time", effort: 5, impact: "Medium", risk: "Low" },
    { id: 3, title: "Add automated reporting", effort: 13, impact: "High", risk: "High" },
    { id: 4, title: "Fix settings page bugs", effort: 3, impact: "Low", risk: "Low" },
  ];

  const { sprintAssignments, setSprintAssignments } = useSimulation();

  const handleSprintChange = (taskId: number, sprint: string) => {
    setSprintAssignments({
      ...sprintAssignments,
      [taskId]: sprint,
    });
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6 text-slate-900">Backlog</h1>

      <div className="space-y-4">
        {tasks.map((task) => (
          <div
  key={task.id}
  className="p-4 bg-white shadow rounded-xl border border-slate-100 flex justify-between items-center"
>
  <div>
    <div className="font-semibold text-lg text-slate-900">{task.title}</div>
    <div className="text-sm text-slate-500">
      Effort: {task.effort} pts • Impact: {task.impact} • Risk: {task.risk}
    </div>
  </div>

  <select
    className="border rounded px-3 py-2 text-sm text-slate-800 bg-white"
    value={sprintAssignments[task.id] || ""}
    onChange={(e) => handleSprintChange(task.id, e.target.value)}
  >
    <option value="">Assign sprint</option>
    <option value="Sprint 1">Sprint 1</option>
    <option value="Sprint 2">Sprint 2</option>
    <option value="Later">Later</option>
  </select>
</div>

        ))}
      </div>
    </div>
  );
}