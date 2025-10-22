import { faker } from "@faker-js/faker";
import { IProduct } from "data/types/product.types";
import { getRandomEnumValue } from "utils/enum.utils";
import { MANUFACTURERS } from "./manufacturers";

export function generateProductData(params?: Partial<IProduct>): IProduct {
  return {
    name: faker.commerce.product() + faker.number.int({ min: 1, max: 100000 }),
    manufacturer: getRandomEnumValue(MANUFACTURERS),
    price: faker.number.int({ min: 1, max: 99999 }),
    amount: faker.number.int({ min: 0, max: 999 }),
    notes: faker.string.alphanumeric({ length: 250 }),
    ...params,
  };
}