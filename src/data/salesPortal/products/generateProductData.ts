import { faker } from "@faker-js/faker";
import { IProduct, IProductFromResponse } from "data/types/product.types";
import { getRandomEnumValue } from "utils/enum.utils";
import { MANUFACTURERS } from "./manufacturers";
import { ObjectId } from "bson";

export function generateProductData(params?: Partial<IProduct>): IProduct {
  return {
    name: faker.commerce.product() + faker.number.int({ min: 1, max: 100000 }),
    amount: faker.number.int({ min: 0, max: 999 }),
    price: faker.number.int({ min: 1, max: 99999 }),
    manufacturer: getRandomEnumValue(MANUFACTURERS),
   notes: faker.string.alphanumeric({ length: 250 }),
    ...params,
  };
}

export function generateProductResponseData(overrides: Partial<IProduct> = {}): IProductFromResponse {
  const base = generateProductData(overrides);
  return {
    _id: new ObjectId().toHexString(),
    name: base.name,
    amount: base.amount,
    price: base.price,
    manufacturer: base.manufacturer,
    createdOn: new Date().toISOString(),
    notes: base.notes ?? "",
  };
}
