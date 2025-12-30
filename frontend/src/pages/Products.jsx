import { useEffect, useState } from "react";
import http from "../api/http";
import Navbar from "../components/Navbar";

export default function Products() {
  const [items, setItems] = useState([]);
  const [err, setErr] = useState("");

  // form create
  const [name, setName] = useState("");
  const [sku, setSku] = useState("");
  const [price, setPrice] = useState(0);
  const [stock, setStock] = useState(0);
  const [minStock, setMinStock] = useState(0);

  // edit modal
  const [editing, setEditing] = useState(null);
  const [eName, setEName] = useState("");
  const [eSku, setESku] = useState("");
  const [ePrice, setEPrice] = useState(0);
  const [eStock, setEStock] = useState(0);
  const [eMinStock, setEMinStock] = useState(0);

  async function load() {
    const res = await http.get("/api/products");
    setItems(res.data);
  }

  useEffect(() => {
    load();
  }, []);

  async function create(e) {
    e.preventDefault();
    setErr("");
    try {
      await http.post("/api/products", {
        name,
        sku,
        price: Number(price),
        stock: Number(stock),
        minStock: Number(minStock),
      });
      setName("");
      setSku("");
      setPrice(0);
      setStock(0);
      setMinStock(0);
      await load();
    } catch (e2) {
      setErr(e2?.response?.data?.message || "Error creando producto");
    }
  }

  function openEdit(p) {
    setEditing(p);
    setEName(p.name);
    setESku(p.sku);
    setEPrice(Number(p.price));
    setEStock(Number(p.stock));
    setEMinStock(Number(p.minStock));
  }

  async function saveEdit() {
    setErr("");
    try {
      await http.put(`/api/products/${editing.id}`, {
        name: eName,
        sku: eSku,
        price: Number(ePrice),
        stock: Number(eStock),
        minStock: Number(eMinStock),
      });
      setEditing(null);
      await load();
    } catch (e2) {
      setErr(e2?.response?.data?.message || "Error actualizando producto");
    }
  }

  async function remove(id) {
    if (!confirm("¿Eliminar este producto?")) return;
    setErr("");
    try {
      await http.delete(`/api/products/${id}`);
      await load();
    } catch (e2) {
      setErr(e2?.response?.data?.message || "Error eliminando producto");
    }
  }

  return (
    <div className="min-h-screen">
      <Navbar />

      <div className="max-w-5xl mx-auto p-4 grid gap-4 md:grid-cols-3">
        {/* Form */}
        <form onSubmit={create} className="glass neon-border p-4 rounded-2xl md:col-span-1">
          <h2 className="font-display tracking-wide text-white mb-3">Nuevo producto</h2>

          <input
            className="w-full bg-black/20 border border-white/10 text-white placeholder:text-white/40 rounded-xl p-2 mb-2 outline-none focus:border-cyan-300/40"
            placeholder="Nombre"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <input
            className="w-full bg-black/20 border border-white/10 text-white placeholder:text-white/40 rounded-xl p-2 mb-2 outline-none focus:border-cyan-300/40"
            placeholder="SKU"
            value={sku}
            onChange={(e) => setSku(e.target.value)}
          />

          <input
            className="w-full bg-black/20 border border-white/10 text-white placeholder:text-white/40 rounded-xl p-2 mb-2 outline-none focus:border-cyan-300/40"
            placeholder="Precio"
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />

          <input
            className="w-full bg-black/20 border border-white/10 text-white placeholder:text-white/40 rounded-xl p-2 mb-2 outline-none focus:border-cyan-300/40"
            placeholder="Stock"
            type="number"
            value={stock}
            onChange={(e) => setStock(e.target.value)}
          />

          <input
            className="w-full bg-black/20 border border-white/10 text-white placeholder:text-white/40 rounded-xl p-2 mb-3 outline-none focus:border-cyan-300/40"
            placeholder="Stock mínimo"
            type="number"
            value={minStock}
            onChange={(e) => setMinStock(e.target.value)}
          />

          {err && <div className="text-sm text-red-400 mb-2">{err}</div>}

          <button className="w-full py-2 rounded-xl bg-gradient-to-r from-indigo-500/40 to-cyan-500/25 border border-white/10 hover:border-white/20 hover:shadow-neon transition">
            Guardar
          </button>
        </form>

        {/* Table */}
        <div className="glass neon-border p-4 rounded-2xl md:col-span-2 overflow-x-auto">
          <h2 className="font-display tracking-wide text-white mb-3">Productos</h2>

          <table className="w-full text-sm">
            <thead className="text-left text-white/60">
              <tr className="border-b border-white/10">
                <th className="py-2">Nombre</th>
                <th>SKU</th>
                <th>Stock</th>
                <th>Mín.</th>
                <th></th>
              </tr>
            </thead>

            <tbody>
              {items.map((p) => (
                <tr key={p.id} className="border-t border-white/10 hover:bg-white/5 transition">
                  <td className="py-2 text-white">{p.name}</td>
                  <td className="text-white/80">{p.sku}</td>
                  <td className={p.stock <= p.minStock ? "text-pink-300 font-semibold" : "text-white/90"}>
                    {p.stock}
                  </td>
                  <td className="text-white/80">{p.minStock}</td>
                  <td className="text-right whitespace-nowrap">
                    <button
                      onClick={() => openEdit(p)}
                      className="px-3 py-1 rounded-xl border border-white/10 text-white/80 hover:text-white hover:bg-white/10 transition mr-2"
                    >
                      Editar
                    </button>
                    <button
                      onClick={() => remove(p.id)}
                      className="px-3 py-1 rounded-xl border border-white/10 text-pink-300 hover:bg-pink-500/10 transition"
                    >
                      Eliminar
                    </button>
                  </td>
                </tr>
              ))}

              {items.length === 0 && (
                <tr>
                  <td className="py-4 text-white/50" colSpan="5">
                    Sin productos
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal editar */}
      {editing && (
        <div className="fixed inset-0 bg-black/60 grid place-items-center p-4">
          <div className="glass neon-border w-full max-w-lg rounded-2xl p-4">
            <div className="flex items-center">
              <h3 className="font-display tracking-wide text-white">Editar producto</h3>
              <div className="flex-1" />
              <button className="text-white/60 hover:text-white" onClick={() => setEditing(null)}>
                ✕
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mt-3">
              <input className="bg-black/20 border border-white/10 text-white rounded-xl p-2 outline-none focus:border-cyan-300/40"
                value={eName} onChange={(e) => setEName(e.target.value)} />
              <input className="bg-black/20 border border-white/10 text-white rounded-xl p-2 outline-none focus:border-cyan-300/40"
                value={eSku} onChange={(e) => setESku(e.target.value)} />
              <input className="bg-black/20 border border-white/10 text-white rounded-xl p-2 outline-none focus:border-cyan-300/40"
                type="number" value={ePrice} onChange={(e) => setEPrice(e.target.value)} />
              <input className="bg-black/20 border border-white/10 text-white rounded-xl p-2 outline-none focus:border-cyan-300/40"
                type="number" value={eStock} onChange={(e) => setEStock(e.target.value)} />
              <input className="bg-black/20 border border-white/10 text-white rounded-xl p-2 outline-none focus:border-cyan-300/40"
                type="number" value={eMinStock} onChange={(e) => setEMinStock(e.target.value)} />
            </div>

            {err && <div className="text-sm text-red-400 mt-2">{err}</div>}

            <div className="flex gap-2 mt-4 justify-end">
              <button onClick={() => setEditing(null)} className="px-4 py-2 rounded-xl border border-white/10 text-white/80 hover:bg-white/10 transition">
                Cancelar
              </button>
              <button onClick={saveEdit} className="px-4 py-2 rounded-xl bg-gradient-to-r from-indigo-500/40 to-cyan-500/25 border border-white/10 hover:border-white/20 hover:shadow-neon transition text-white">
                Guardar cambios
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
