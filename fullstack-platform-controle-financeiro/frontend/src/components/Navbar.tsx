import { Link } from "react-router-dom";
import "../styles/navbar.css";

export default function Navbar() {
  return (
    <nav className="navbar">
      <h2>💰 Controle Financeiro</h2>

      <div className="nav-links">
        <Link to="/dashboard">Dashboard</Link>
        <Link to="/transactions">Transações</Link>
        <Link to="/settings">Configurações</Link>
      </div>
    </nav>
  );
}
