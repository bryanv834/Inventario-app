const router = require("express").Router();
const { requireAuth } = require("../middleware/auth.middleware");
const { lowStock } = require("../controllers/reports.controller");

router.use(requireAuth);

router.get("/low-stock", lowStock);

module.exports = router;
