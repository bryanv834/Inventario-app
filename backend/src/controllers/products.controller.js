const prisma = require("../prisma");
const { productCreateSchema, productUpdateSchema } = require("../validators/product.schemas");

async function listProducts(req, res, next) {
  try {
    const q = (req.query.q || "").toString().trim();

    const products = await prisma.product.findMany({
      where: q
        ? {
            OR: [
              { name: { contains: q, mode: "insensitive" } },
              { sku: { contains: q, mode: "insensitive" } },
            ],
          }
        : undefined,
      orderBy: { createdAt: "desc" },
      include: { category: true },
    });

    res.json(products);
  } catch (err) {
    next(err);
  }
}

async function createProduct(req, res, next) {
  try {
    const data = productCreateSchema.parse(req.body);

    const product = await prisma.product.create({
      data: {
        name: data.name,
        sku: data.sku,
        price: data.price ?? 0,
        stock: data.stock ?? 0,
        minStock: data.minStock ?? 0,
        categoryId: data.categoryId ?? null,
      },
      include: { category: true },
    });

    res.status(201).json(product);
  } catch (err) {
    next(err);
  }
}

async function updateProduct(req, res, next) {
  try {
    const id = req.params.id;
    const data = productUpdateSchema.parse(req.body);

    const product = await prisma.product.update({
      where: { id },
      data: {
        ...(data.name !== undefined ? { name: data.name } : {}),
        ...(data.sku !== undefined ? { sku: data.sku } : {}),
        ...(data.price !== undefined ? { price: data.price } : {}),
        ...(data.stock !== undefined ? { stock: data.stock } : {}),
        ...(data.minStock !== undefined ? { minStock: data.minStock } : {}),
        ...(data.categoryId !== undefined ? { categoryId: data.categoryId } : {}),
      },
      include: { category: true },
    });

    res.json(product);
  } catch (err) {
    next(err);
  }
}

async function deleteProduct(req, res, next) {
  try {
    const id = req.params.id;

    await prisma.product.delete({ where: { id } });

    res.json({ ok: true });
  } catch (err) {
    next(err);
  }
}

module.exports = { listProducts, createProduct, updateProduct, deleteProduct };
