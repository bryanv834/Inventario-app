import { useEffect, useState } from "react";
import http from "../api/http";
import Navbar from "../components/Navbar";

export default function Movements() {
  const [products, setProducts] = useState([]);
  const [movs, setMovs] = useState([]);

  const [productId, setProductId] = useState("");
  const [type, setType] = useState("IN");
  const [quantity, setQuantity] = useState(1);
  const [note, setNote] = useState("");
  const [err, setErr] = useState("");

  async function load() {
    const p = await http.get("/api/products");
    setProducts(p.data);
    if (!productId && p.data[0]) setProductId(p.data[0].id);

    const m = await http.get("/api/movements");
    setMovs(m.data);
  }

  useEffect(() => {
    load();
  }, []);

  async function create(e) {
    e.preventDefault();
    setErr("");
    try {
      await http.post("/api/movements", {
        productId,
        type,
        quantity: Number(quantity),
        note: note || undefined,
      });
      setQuantity(1);
      setNote("");
      await load();
    } catch (e2) {
      setErr(e2?.response?.data?.message || "Error creando movimiento");
    }
  }

  return (
    <div className="min-h-screen">
      <Navbar />

      <div className="max-w-5xl mx-auto p-4 grid gap-4 md:grid-cols-3">
        {/* Form */}
        <form onSubmit={create} className="glass neon-border p-4 rounded-2xl md:col-span-1">
          <h2 className="font-display tracking-wide text-white mb-3">Nuevo movimiento</h2>

          <select
            className="w-full bg-black/20 border border-white/10 text-white rounded-xl p-2 mb-2 outline-none focus:border-cyan-300/40"
            value={productId}
            onChange={(e) => setProductId(e.target.value)}
          >
            {products.map((p) => (
              <option key={p.id} value={p.id}>
                {p.name}
              </option>
            ))}
          </select>

          <select
            className="w-full bg-black/20 border border-white/10 text-white rounded-xl p-2 mb-2 outline-none focus:border-cyan-300/40"
            value={type}
            onChange={(e) => setType(e.target.value)}
          >
            <option value="IN">IN (Entrada)</option>
            <option value="OUT">OUT (Salida)</option>
          </select>

          <input
            className="w-full bg-black/20 border border-white/10 text-white rounded-xl p-2 mb-2 outline-none focus:border-cyan-300/40"
            type="number"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
          />

          <input
            className="w-full bg-black/20 border border-white/10 text-white placeholder:text-white/40 rounded-xl p-2 mb-3 outline-none focus:border-cyan-300/40"
            placeholder="Nota (opcional)"
            value={note}
            onChange={(e) => setNote(e.target.value)}
          />

          {err && <div className="text-sm text-red-400 mb-2">{err}</div>}

          <button className="w-full py-2 rounded-xl bg-gradient-to-r from-indigo-500/40 to-cyan-500/25 border border-white/10 hover:border-white/20 hover:shadow-neon transition">
            Guardar
          </button>
        </form>

        {/* Table */}
        <div className="glass neon-border p-4 rounded-2xl md:col-span-2 overflow-x-auto">
          <h2 className="font-display tracking-wide text-white mb-3">Historial</h2>

          <table className="w-full text-sm">
            <thead className="text-left text-white/60">
              <tr className="border-b border-white/10">
                <th className="py-2">Fecha</th>
                <th>Producto</th>
                <th>Tipo</th>
                <th>Cant.</th>
                <th>Usuario</th>
                <th>Nota</th>
              </tr>
            </thead>

            <tbody>
              {movs.map((m) => (
                <tr key={m.id} className="border-t border-white/10 hover:bg-white/5 transition">
                  <td className="py-2 text-white/80">{new Date(m.createdAt).toLocaleString()}</td>
                  <td className="text-white">{m.product?.name}</td>
                  <td className={m.type === "OUT" ? "text-pink-300" : "text-cyan-300"}>
                    {m.type}
                  </td>
                  <td className="text-white/90">{m.quantity}</td>
                  <td className="text-white/80">{m.user?.name}</td>
                  <td className="text-white/60">{m.note || "-"}</td>
                </tr>
              ))}

              {movs.length === 0 && (
                <tr>
                  <td className="py-4 text-white/50" colSpan="6">
                    Sin movimientos
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
