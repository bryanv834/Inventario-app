const prisma = require("../prisma");
const { movementCreateSchema } = require("../validators/movement.schemas");

async function createMovement(req, res, next) {
  try {
    const data = movementCreateSchema.parse(req.body);

    const userId = req.user.sub; // viene del JWT middleware

    const result = await prisma.$transaction(async (tx) => {
      const product = await tx.product.findUnique({ where: { id: data.productId } });
      if (!product) {
        const err = new Error("Producto no existe");
        err.statusCode = 404;
        throw err;
      }

      const delta = data.type === "IN" ? data.quantity : -data.quantity;
      const newStock = product.stock + delta;

      if (newStock < 0) {
        const err = new Error("Stock insuficiente para salida");
        err.statusCode = 400;
        throw err;
      }

      const updatedProduct = await tx.product.update({
        where: { id: product.id },
        data: { stock: newStock },
      });

      const movement = await tx.movement.create({
        data: {
          type: data.type,
          quantity: data.quantity,
          note: data.note ?? null,
          userId,
          productId: product.id,
        },
      });

      return { movement, product: updatedProduct };
    });

    res.status(201).json(result);
  } catch (err) {
    next(err);
  }
}

async function listMovements(req, res, next) {
  try {
    const movements = await prisma.movement.findMany({
      orderBy: { createdAt: "desc" },
      include: {
        product: true,
        user: { select: { id: true, name: true, email: true } },
      },
      take: 100, // limita a 100 últimos
    });

    res.json(movements);
  } catch (err) {
    next(err);
  }
}

module.exports = { createMovement, listMovements };

