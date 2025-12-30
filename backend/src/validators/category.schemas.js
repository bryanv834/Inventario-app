const { z } = require("zod");

const categoryCreateSchema = z.object({
  name: z.string().min(2),
});

const categoryUpdateSchema = categoryCreateSchema.partial();

module.exports = { categoryCreateSchema, categoryUpdateSchema };
