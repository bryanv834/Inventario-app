const { z } = require("zod");

const productCreateSchema = z.object({
  name: z.string().min(2),
  sku: z.string().min(2),
  price: z.number().nonnegative().optional(),
  stock: z.number().int().nonnegative().optional(),
  minStock: z.number().int().nonnegative().optional(),
  categoryId: z.string().optional().nullable(),
});

const productUpdateSchema = productCreateSchema.partial();

module.exports = { productCreateSchema, productUpdateSchema };
