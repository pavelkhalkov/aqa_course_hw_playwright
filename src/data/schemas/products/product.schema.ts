import { MANUFACTURERS } from "data/salesPortal/products/manufacturers";

export const productSchema = {
  type: "object",
  properties: {
    _id: { type: "string" },
    name: {
      type: "string",
    },
    amount: {
      type: "number",
    },
    price: {
      type: "number",
    },
    createdOn: {
      type: "string",
    },
    notes: {
      type: "string",
    },
    manufacturer: {
      type: "string",
      enum: Object.values(MANUFACTURERS),
    },
  },
  required: ["_id", "name", "amount", "price", "manufacturer", "createdOn"],
  additionalProperties: false,
};