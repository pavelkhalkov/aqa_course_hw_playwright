import { productSchema } from "./product.schema";

export const getAllProductSchema = {
  type: "object",
  properties: {
    Products: {
      type: "array",
      items: productSchema,
      minItems: 0,
    },
  },
  required: ["Products"],
};