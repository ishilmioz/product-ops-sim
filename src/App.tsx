import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Backlog from "./pages/Backlog";
import Decisions from "./pages/Decisions";
import Results from "./pages/Results";

function App() {
  return (
    <Router>
      <div style={{ display: "flex", height: "100vh" }}>
        {/* Sidebar */}
        <nav style={{
          width: "220px",
          background: "#f3f3f3",
          padding: "20px",
          display: "flex",
          flexDirection: "column",
          gap: "10px"
        }}>
          <Link to="/">Dashboard</Link>
          <Link to="/backlog">Backlog</Link>
          <Link to="/decisions">Decisions</Link>
          <Link to="/results">Results</Link>
        </nav>

        {/* Main content */}
        <main style={{ flex: 1, padding: "20px" }}>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/backlog" element={<Backlog />} />
            <Route path="/decisions" element={<Decisions />} />
            <Route path="/results" element={<Results />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;