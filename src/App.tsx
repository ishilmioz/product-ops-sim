import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import { SimulationProvider } from "./context/SimulationContext";


import Dashboard from "./pages/Dashboard";
import Backlog from "./pages/Backlog";
import Decisions from "./pages/Decisions";
import Results from "./pages/Results";

function App() {
  return (
    <Router>
      <SimulationProvider>
        <Layout>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/backlog" element={<Backlog />} />
            <Route path="/decisions" element={<Decisions />} />
            <Route path="/results" element={<Results />} />
          </Routes>
        </Layout>
      </SimulationProvider>
    </Router>
  );
}


export default App;
