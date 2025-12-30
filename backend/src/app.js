require("dotenv").config();
const categoriesRoutes = require("./routes/categories.routes");
const reportsRoutes = require("./routes/reports.routes");
const movementsRoutes = require("./routes/movements.routes");
const productsRoutes = require("./routes/products.routes");
const { requireAuth } = require("./middleware/auth.middleware");
const authRoutes = require("./routes/auth.routes");
const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");

const { errorHandler } = require("./middleware/error.middleware");

const app = express();

app.use(cors());
app.use(helmet());
app.use(morgan("dev"));
app.use(express.json());

app.get("/api/health", (req, res) => res.json({ ok: true }));
app.get("/api/me", requireAuth, (req, res) => {
  res.json({ user: req.user });
});
app.use("/api/auth", authRoutes);
app.use("/api/products", productsRoutes);
app.use("/api/movements", movementsRoutes);
app.use("/api/reports", reportsRoutes);
app.use("/api/categories", categoriesRoutes);
app.use(errorHandler);

module.exports = app;
