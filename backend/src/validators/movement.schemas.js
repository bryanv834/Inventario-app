const { z } = require("zod");

const movementCreateSchema = z.object({
  productId: z.string().min(1),
  type: z.enum(["IN", "OUT"]),
  quantity: z.number().int().positive(),
  note: z.string().max(200).optional(),
});

module.exports = { movementCreateSchema };






