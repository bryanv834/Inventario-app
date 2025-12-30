const router = require("express").Router();
const { requireAuth } = require("../middleware/auth.middleware");
const { createMovement, listMovements } = require("../controllers/movements.controller");

router.use(requireAuth);

router.get("/", listMovements);
router.post("/", createMovement);

module.exports = router;

