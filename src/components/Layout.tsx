import { Link, useLocation } from "react-router-dom";

const navItems = [
  { to: "/", label: "Dashboard" },
  { to: "/backlog", label: "Backlog" },
  { to: "/decisions", label: "Decisions" },
  { to: "/results", label: "Results" },
];

export default function Layout({ children }: { children: React.ReactNode }) {
  const location = useLocation();

  return (
    <div className="flex min-h-screen w-screen bg-slate-950">
      <aside className="w-64 bg-slate-900 text-slate-100 p-6 flex flex-col">
        <h2 className="text-2xl font-bold tracking-tight mb-8">OPS-SIM</h2>

        <nav className="flex flex-col gap-2 text-sm font-medium">
          {navItems.map((item) => {
            const active = location.pathname === item.to;
            return (
              <Link
                key={item.to}
                to={item.to}
                className={
                  "rounded-lg px-3 py-2 transition " +
                  (active
                    ? "bg-slate-700 text-white"
                    : "text-slate-200 hover:bg-slate-800 hover:text-white")
                }
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="mt-auto pt-6 text-xs text-slate-400">
          Product & Ops Simulation
        </div>
      </aside>

      <div className="flex-1 flex flex-col bg-slate-50">
        <header className="h-16 bg-white/80 backdrop-blur border-b border-slate-200 flex items-center px-6 justify-between">
          <h1 className="text-lg font-semibold text-slate-900">
            Product & Ops Simulation
          </h1>
          <div className="text-xs text-slate-500">
            v0.1 • AI-assisted build
          </div>
        </header>

        <main className="flex-1 p-6">
          {children}
        </main>
      </div>
    </div>
  );
}
