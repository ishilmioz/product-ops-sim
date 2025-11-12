import { createContext, useContext, useState } from "react";

type DecisionsState = {
  hireEngineer: "Yes" | "No" | "";
  roadmapFocus: "Performance" | "New Features" | "Bug Fixing" | "";
  qaBudget: number;
};

type SimulationContextType = {
  decisions: DecisionsState;
  setDecisions: (d: DecisionsState) => void;
  sprintAssignments: { [key: number]: string };
  setSprintAssignments: (s: { [key: number]: string }) => void;
};

const SimulationContext = createContext<SimulationContextType | undefined>(
  undefined
);

export function SimulationProvider({ children }: { children: React.ReactNode }) {
const [decisions, setDecisions] = useState<DecisionsState>({
    hireEngineer: "",
    roadmapFocus: "",
    qaBudget: 50,
  });

  const [sprintAssignments, setSprintAssignments] = useState<{ [key: number]: string }>({});

  return (
    <SimulationContext.Provider
      value={{ decisions, setDecisions, sprintAssignments, setSprintAssignments }}
    >
      {children}
    </SimulationContext.Provider>
  );
}

export function useSimulation() {
  const ctx = useContext(SimulationContext);
  if (!ctx) {
    throw new Error("useSimulation must be used within SimulationProvider");
  }
  return ctx;
}
