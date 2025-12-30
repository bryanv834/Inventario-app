import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";

export default function Navbar() {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const item = ({ isActive }) =>
    `px-3 py-2 rounded-xl text-sm transition
     ${isActive ? "bg-white/10 text-white shadow-neon" : "text-white/70 hover:text-white hover:bg-white/10"}`;

  return (
    <div className="sticky top-0 z-50 border-b border-white/10 bg-black/30 backdrop-blur-xl">
      <div className="max-w-5xl mx-auto p-3 flex items-center gap-2">
        <div className="font-display tracking-wider text-white">
          INVENTARIO<span className="text-cyan-300">.X</span>
        </div>

        <div className="flex gap-1 ml-3">
          <NavLink to="/products" className={item}>Productos</NavLink>
          <NavLink to="/movements" className={item}>Movimientos</NavLink>
          <NavLink to="/low-stock" className={item}>Stock Bajo</NavLink>
        </div>

        <div className="flex-1" />

        <button
          onClick={() => { logout(); navigate("/login"); }}
          className="px-3 py-2 rounded-xl text-sm bg-gradient-to-r from-indigo-500/30 to-cyan-500/20 border border-white/10 hover:border-white/20 hover:shadow-neon transition"
        >
          Salir
        </button>
      </div>
    </div>
  );
}
