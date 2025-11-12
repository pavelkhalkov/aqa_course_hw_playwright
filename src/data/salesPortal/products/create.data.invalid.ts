import { IProduct } from "data/types/product.types";

export const createProductInvalidData: { title: string; checkingData: Partial<IProduct>}[] = [
    {
    title: "Create product with whitespace-only name",
    checkingData: { name: "   " },
  },
  {
    title: "Create product with name of 2 alphanumerical characters",
    checkingData: { name: "Ab" },
  },
  {
    title: "Create product with name of 41 alphanumerical characters",
    checkingData: { name: "A".repeat(41) },
  },
  {
    title: "Create product with multiple spaces between words in name",
    checkingData: { name: "Abc   Jhbahksdd" },
  },

  {
    title: "Create product without manufacturer",
    checkingData: { manufacturer: undefined },
  },
  {
    title: "Create product without price",
    checkingData: { price: undefined },
  },
  {
    title: "Create product with price = 0",
    checkingData: { price: 0 },
  },
  {
    title: "Create product with price < 0",
    checkingData: { price: -100 },
  },
  {
    title: "Create product with price = 100_000",
    checkingData: { price: 100_000 },
  },
  {
    title: "Create product without amount",
    checkingData: { amount: undefined },
  },
  {
    title: "Create product with amount < 0",
    checkingData: { amount: -10 },
  },
  {
    title: "Create product with amount = 1_000",
    checkingData: { amount: 1_000 },
  },
  {
    title: "Create product with notes containing '<' symbol",
    checkingData: { notes: "Test < invalid note" },
  },
  {
    title: "Create product with notes containing '>' symbol",
    checkingData: { notes: "Test > invalid note" },
  },
  {
    title: "Create product with invalid data types: string in price field",
    checkingData: { price: "1000" as unknown as number },
  },
  {
    title: "Create product with invalid data types: string in amount field",
    checkingData: { amount: "256" as unknown as number },
  },
];
