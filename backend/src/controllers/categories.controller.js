const prisma = require("../prisma");
const { categoryCreateSchema, categoryUpdateSchema } = require("../validators/category.schemas");

async function listCategories(req, res, next) {
  try {
    const categories = await prisma.category.findMany({
      orderBy: { name: "asc" },
    });
    res.json(categories);
  } catch (err) {
    next(err);
  }
}

async function createCategory(req, res, next) {
  try {
    const data = categoryCreateSchema.parse(req.body);

    const category = await prisma.category.create({
      data: { name: data.name },
    });

    res.status(201).json(category);
  } catch (err) {
    next(err);
  }
}

async function updateCategory(req, res, next) {
  try {
    const id = req.params.id;
    const data = categoryUpdateSchema.parse(req.body);

    const category = await prisma.category.update({
      where: { id },
      data: { ...(data.name !== undefined ? { name: data.name } : {}) },
    });

    res.json(category);
  } catch (err) {
    next(err);
  }
}

async function deleteCategory(req, res, next) {
  try {
    const id = req.params.id;

    // opcional: evitar borrar si hay productos usando esa categoría
    const count = await prisma.product.count({ where: { categoryId: id } });
    if (count > 0) return res.status(409).json({ message: "No se puede eliminar: hay productos en esta categoría" });

    await prisma.category.delete({ where: { id } });
    res.json({ ok: true });
  } catch (err) {
    next(err);
  }
}

module.exports = { listCategories, createCategory, updateCategory, deleteCategory };
