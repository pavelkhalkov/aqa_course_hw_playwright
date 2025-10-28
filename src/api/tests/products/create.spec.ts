import test, { expect } from "@playwright/test";
import { apiConfig } from "config/apiConfig";
import { credentials } from "config/env";
import { generateProductData } from "data/salesPortal/products/generateProductData";
import { createProductSchema } from "data/schemas/products/create.schema";
import { STATUS_CODES } from "data/statusCodes";
import _ from "lodash";
import { validateResponse } from "utils/validateResponse.utils";

const { baseURL, endpoints } = apiConfig;

test.describe("[API] [Sales Portal] [Products]", () => {
  let id = "";
  let token = "";

  test.afterEach(async ({ request }) => {
    const response = await request.delete(`${baseURL}${endpoints.products}/${id}`, {
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    expect(response.status()).toBe(STATUS_CODES.DELETED);
  });

  test("Create Product", async ({ request }) => {
    //TODO: Create product
    //Token
    //Body with unique name

    //TODO: Token

    //POST, content-type: json
    //body: from env

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
    token = headers["authorization"]!;
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

    const createProductBody = await createProductResponse.json();
    await validateResponse(createProductResponse, {
      status: STATUS_CODES.CREATED,
      schema: createProductSchema,
      IsSuccess: true,
      ErrorMessage: null,
    });

    const actualProductData = createProductBody.Product;

    expect(_.omit(actualProductData, ["_id", "createdOn"])).toEqual(productData);

    id = actualProductData._id;
  });
});