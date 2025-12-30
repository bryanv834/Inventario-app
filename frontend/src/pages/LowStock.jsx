import { useEffect, useState } from "react";
import http from "../api/http";
import Navbar from "../components/Navbar";

export default function LowStock() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    http.get("/api/reports/low-stock").then((res) => setItems(res.data));
  }, []);

  return (
    <div className="min-h-screen">
      <Navbar />

      <div className="max-w-5xl mx-auto p-4">
        <div className="glass neon-border p-4 rounded-2xl overflow-x-auto">
          <h2 className="font-display tracking-wide text-white mb-3">Stock Bajo</h2>

          <table className="w-full text-sm">
            <thead className="text-left text-white/60">
              <tr className="border-b border-white/10">
                <th className="py-2">Nombre</th>
                <th>SKU</th>
                <th>Stock</th>
                <th>Mín.</th>
              </tr>
            </thead>

            <tbody>
              {items.map((p) => (
                <tr key={p.id} className="border-t border-white/10 hover:bg-white/5 transition">
                  <td className="py-2 text-white">{p.name}</td>
                  <td className="text-white/80">{p.sku}</td>
                  <td className="text-pink-300 font-semibold">{p.stock}</td>
                  <td className="text-white/80">{p.minStock}</td>
                </tr>
              ))}

              {items.length === 0 && (
                <tr>
                  <td className="py-4 text-white/50" colSpan="4">
                    No hay productos con stock bajo
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
