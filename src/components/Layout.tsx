import { Link } from "react-router-dom";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-60 bg-white shadow-md p-6">
        <h2 className="text-xl font-bold mb-6">OPS-SIM</h2>
        <nav className="flex flex-col gap-4 text-gray-700 font-medium">
          <Link to="/" className="hover:text-blue-600 transition">Dashboard</Link>
          <Link to="/backlog" className="hover:text-blue-600 transition">Backlog</Link>
          <Link to="/decisions" className="hover:text-blue-600 transition">Decisions</Link>
          <Link to="/results" className="hover:text-blue-600 transition">Results</Link>
        </nav>
      </aside>

      {/* Main Area */}
      <div className="flex-1 flex flex-col">
        
        {/* Topbar */}
        <header className="h-16 bg-white shadow flex items-center px-6 justify-between">
          <h1 className="text-lg font-semibold">Product & Ops Simulation</h1>
          <div className="text-sm text-gray-600">
            v0.1 • MVP Build
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-6">
          {children}
        </main>
      </div>
    </div>
  );
}
