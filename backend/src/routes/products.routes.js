const router = require("express").Router();
const { requireAuth } = require("../middleware/auth.middleware");
const {
  listProducts,
  createProduct,
  updateProduct,
  deleteProduct,
} = require("../controllers/products.controller");

router.use(requireAuth);

router.get("/", listProducts);
router.post("/", createProduct);
router.put("/:id", updateProduct);
router.delete("/:id", deleteProduct);

module.exports = router;
