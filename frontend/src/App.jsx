import { Routes, Route, Navigate } from "react-router-dom";
import ProtectedRoute from "./auth/ProtectedRoute";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Products from "./pages/Products";
import Movements from "./pages/Movements";
import LowStock from "./pages/LowStock";

export default function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      <Route
        path="/products"
        element={
          <ProtectedRoute>
            <Products />
          </ProtectedRoute>
        }
      />

      <Route
        path="/movements"
        element={
          <ProtectedRoute>
            <Movements />
          </ProtectedRoute>
        }
      />

      <Route
        path="/low-stock"
        element={
          <ProtectedRoute>
            <LowStock />
          </ProtectedRoute>
        }
      />

      <Route path="/" element={<Navigate to="/products" replace />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

