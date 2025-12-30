const router = require("express").Router();
const { requireAuth } = require("../middleware/auth.middleware");
const {
  listCategories,
  createCategory,
  updateCategory,
  deleteCategory,
} = require("../controllers/categories.controller");

router.use(requireAuth);

router.get("/", listCategories);
router.post("/", createCategory);
router.put("/:id", updateCategory);
router.delete("/:id", deleteCategory);

module.exports = router;
