import { NavLink, Outlet } from "react-router-dom";
import "../../styles/layout.css";

export default function AppLayout() {
  return (
    <div className="app-layout">
      <aside className="sidebar">
        <h2>💰 Finance</h2>

        <nav>
          <NavLink to="/dashboard">📊 Dashboard</NavLink>
          <NavLink to="/transactions">🧾 Transações</NavLink>
        </nav>
      </aside>

      <main className="content">
        <Outlet />
      </main>
    </div>
  );
}
