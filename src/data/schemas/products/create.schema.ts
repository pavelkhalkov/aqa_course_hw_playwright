import { obligatoryFieldsSchema, obligatoryRequredFields } from "../core.schema";
import { productSchema } from "./product.schema";

export const createProductSchema = {
  type: "object",
  properties: {
    Product: productSchema,
    ...obligatoryFieldsSchema,
  },
  required: ["Product", ...obligatoryRequredFields],
};