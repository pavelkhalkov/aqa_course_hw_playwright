import test, { expect } from "@playwright/test";
import { apiConfig } from "config/apiConfig";
import { credentials } from "config/env";
import { generateProductData } from "data/salesPortal/products/generateProductData";
import { createProductSchema } from "data/schemas/products/create.schema";
import { STATUS_CODES } from "data/statusCodes";
import { IProductFromResponse } from "data/types/product.types";
import { validateResponse } from "utils/validateResponse.utils";

const { baseURL, endpoints } = apiConfig;

test.describe("[API] [Sales Portal] [Products]", () => {
  test("Delete Product", async ({ request }) => {
    const loginResponse = await request.post(baseURL + endpoints.login, {
      data: credentials,
      headers: {
        "content-type": "application/json",
      },
    });
    const loginBody = await loginResponse.json();
    expect.soft(loginResponse.status()).toBe(STATUS_CODES.OK);
    expect.soft(loginBody.IsSuccess).toBe(true);
    expect.soft(loginBody.ErrorMessage).toBe(null);
    expect.soft(loginBody.User.username).toBe(credentials.username);

    const headers = loginResponse.headers();
    const token = headers["authorization"]!;
    expect(token).toBeTruthy();

    //TODO: create product

    const productData = generateProductData();
    const createProductResponse = await request.post(baseURL + endpoints.products, {
      data: productData,
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    await validateResponse(createProductResponse, {
      status: STATUS_CODES.CREATED,
      schema: createProductSchema,
      IsSuccess: true,
      ErrorMessage: null,
    });
    const createProductBody = await createProductResponse.json();

    const id = createProductBody.Product._id;

    const response = await request.delete(`${baseURL}${endpoints.productById(id)}`, {
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    expect(response.status()).toBe(STATUS_CODES.DELETED);
  });

  test("Delete all products", async ({ request }) => {
    const loginResponse = await request.post(baseURL + endpoints.login, {
      data: credentials,
      headers: {
        "content-type": "application/json",
      },
    });
    const headers = loginResponse.headers();
    const token = headers["authorization"]!;

    const productsResponse = await request.get(`${baseURL}${endpoints.productsAll}`, {
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    const body = await productsResponse.json();

    const ids = body.Products.map((product: IProductFromResponse) => product._id);
    for (const id of ids) {
      const response = await request.delete(`${baseURL}${endpoints.productById(id)}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      expect.soft(response.status()).toBe(STATUS_CODES.DELETED);
    }
  });
});