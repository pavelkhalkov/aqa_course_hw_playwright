/*

***HW-24****

Написать смоук API тест на получение всех продуктов (без фильтрационных параметров) со следующими шагами:
  - Залогиниться 
  - Создать продукт и проверить 201й статус 
  - Получить все продукты 
  - Cоздать и проверить схему
  - Проверить статус 
  - Проверить, что в массиве тела респонса есть созданный продукт 
  - Проверить поля IsSuccess и ErrorMessage

*/

import { test, expect } from "@playwright/test";
import { apiConfig } from "config/apiConfig";
import { credentials } from "config/env";
import { STATUS_CODES } from "data/statusCodes";
import { generateProductData } from "data/salesPortal/products/generateProductData";
import { validateResponse } from "utils/validateResponse.utils";
import { productSchema } from "data/schemas/products/product.schema";
import { createProductSchema } from "data/schemas/products/create.schema";
import { validateJsonSchema } from "utils/schema.utils";
import { getAllProductSchema } from "data/schemas/products/allProduct.schema";

test.describe("[API] [Smoke] [Create Product]", () => {
  let id = "";
  let token = "";

   test.afterEach(async ({ request }) => {
    const response = await request.delete(`${apiConfig.baseURL}${apiConfig.endpoints.products}/${id}`, {
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    expect(response.status()).toBe(STATUS_CODES.DELETED);
  });

  //Sign In
  test("Should login with valid credentials", async ({ request }) => {
    const loginResponse = await request.post(
      apiConfig.baseURL + apiConfig.endpoints.login,
      {
        data: credentials,
        headers: { "content-type": "application/json" },
      }
    );

    const loginBody = await loginResponse.json();
    const headers = loginResponse.headers();
    token = headers["authorization"]!;

    expect.soft(loginResponse.status()).toBe(STATUS_CODES.OK);
    expect.soft(loginBody.IsSuccess).toBe(true);
    expect.soft(loginBody.ErrorMessage).toBe(null);
    expect.soft(loginBody.User.username).toBe(credentials.username);
    expect(token).toBeTruthy();

    //Create product 
    const productData = generateProductData();
    const createProductResponse = await request.post(apiConfig.baseURL + apiConfig.endpoints.products,
      {
        data: productData,
        headers: {
          Authorization: `Bearer ${token}`,
          "content-type": "application/json",
        },
      }
    );

    //Create and check scheme
    await validateResponse(createProductResponse, {
      status: STATUS_CODES.CREATED,
      schema: createProductSchema,
      IsSuccess: true,
      ErrorMessage: null,
    });

    const createProductBody = await createProductResponse.json();

    validateJsonSchema(createProductBody.Product, productSchema);
    id = createProductBody.Product._id;

    //Get all products
    const getAllProductResponse = await request.get(apiConfig.baseURL + apiConfig.endpoints.productsAll,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "content-type": "application/json",
        },
      }
    );

    //Check status
    expect.soft(getAllProductResponse.status()).toBe(STATUS_CODES.OK);

    const getAllBody = await getAllProductResponse.json();
    validateJsonSchema(getAllBody, getAllProductSchema);

    expect.soft(Array.isArray(getAllBody.Products), "Products should be an array").toBe(true);

    const haveNewProduct = getAllBody.Products.some((product: any) => product._id === id);
    expect.soft(haveNewProduct).toBe(true);
    expect.soft(getAllBody.IsSuccess, "IsSuccess should be true").toBe(true);
    expect.soft(getAllBody.ErrorMessage, "ErrorMessage should be null").toBeNull();
  });
});
