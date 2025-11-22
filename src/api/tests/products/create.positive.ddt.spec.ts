/*

***HW-25 (Task 1)***

Используя DDT подход, напишите тест сьют для проверки эндпоинта создания продукта:
  - с позитивными проверками

  Используйте LoginApiService, ProductsApi, после каждого теста, где создастся продукт - удаляйте его.

  Требования:
  Name: обязательное, уникальное, Products's name should contain only 3-40 alphanumerical characters and one space between
  Manufacturer: обязательное
  Price: обязательное, Price should be in range 1-99999
  Amount: обязательное, Amount should be in range 0-999
  Notes: Notes should be in range 0-250 and without < or > symbols

*/

import { test, expect } from "fixtures/api.fixture";
import { createProductSchema } from "data/schemas/products/create.schema";
import { STATUS_CODES } from "data/statusCodes";
import { validateResponse } from "utils/validation/validateResponse.utils";
import { regValidTestData } from "data/salesPortal/products/create.data.valid";
import { makeUniqueName } from "data/salesPortal/products/makeUniqueName";
import _ from "lodash";


test.describe("[API] [Sales Portal] [Product: Positive]", () => {
  let id = "";
  let token = "";

  test.afterEach(async ({ productsApi }) => {
    if (id) await productsApi.delete(token, id);
    id = "";
  });

  regValidTestData.forEach(({ testName, validCreationProductData }) => {
    test(testName, async ({ loginApiService, productsApi }) => {
      token = await loginApiService.loginAsAdmin();

       let productData = validCreationProductData;
       if (productData.name) productData.name = makeUniqueName(productData.name);

       const createdProduct = await productsApi.create(productData, token);

       validateResponse(createdProduct, {
        status: STATUS_CODES.CREATED,
        schema: createProductSchema,
        IsSuccess: true,
        ErrorMessage: null,
      });

      id = createdProduct.body.Product._id;

      const actualProductData = createdProduct.body.Product;
      expect(_.omit(actualProductData, ["_id", "createdOn"])).toEqual(productData);
    });
  });
});
