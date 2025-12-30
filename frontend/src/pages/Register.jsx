import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";

export default function Register() {
  const { register } = useAuth();
  const nav = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState("");

  async function onSubmit(e) {
    e.preventDefault();
    setErr("");
    try {
      await register(name, email, password);
      nav("/products");
    } catch (e2) {
      setErr(e2?.response?.data?.message || "Error al registrar");
    }
  }

  return (
    <div className="min-h-screen grid place-items-center p-4">
      <form
        onSubmit={onSubmit}
        className="w-full max-w-sm glass neon-border p-6 rounded-2xl"
      >
        <h1 className="font-display tracking-wider text-2xl text-white">
          REGISTER<span className="text-cyan-300"> INVENTARIO</span>
        </h1>
        <p className="text-white/60 text-sm mt-1 mb-5">
          Crea tu cuenta para empezar
        </p>

        <label className="text-sm text-white/70">Nombre</label>
        <input
          className="w-full bg-black/20 border border-white/10 text-white placeholder:text-white/40 rounded-xl p-2 mt-1 mb-3 outline-none focus:border-cyan-300/40"
          placeholder="Tu nombre"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <label className="text-sm text-white/70">Email</label>
        <input
          className="w-full bg-black/20 border border-white/10 text-white placeholder:text-white/40 rounded-xl p-2 mt-1 mb-3 outline-none focus:border-cyan-300/40"
          placeholder="tu@email.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <label className="text-sm text-white/70">Contraseña</label>
        <input
          type="password"
          className="w-full bg-black/20 border border-white/10 text-white placeholder:text-white/40 rounded-xl p-2 mt-1 mb-2 outline-none focus:border-cyan-300/40"
          placeholder="••••••••"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        {err && <div className="text-sm text-pink-300 mt-2 mb-2">{err}</div>}

        <button className="w-full mt-3 py-2 rounded-xl bg-gradient-to-r from-indigo-500/40 to-cyan-500/25 border border-white/10 hover:border-white/20 hover:shadow-neon transition text-white">
          Crear cuenta
        </button>

        <p className="text-sm mt-4 text-white/70">
          ¿Ya tienes cuenta?{" "}
          <Link className="text-cyan-300 hover:text-cyan-200" to="/login">
            Login
          </Link>
        </p>
      </form>
    </div>
  );
}
