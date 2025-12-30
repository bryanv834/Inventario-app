const prisma = require("../prisma");

async function lowStock(req, res, next) {
  try {
    const products = await prisma.product.findMany({
      where: {
        stock: { lte: prisma.product.fields.minStock }, // si esto falla en tu prisma, usa la opción B abajo
      },
      orderBy: [{ stock: "asc" }, { name: "asc" }],
    });

    res.json(products);
  } catch (err) {
    next(err);
  }
}

module.exports = { lowStock };
