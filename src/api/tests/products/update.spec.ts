import { test, expect } from "fixtures/api.fixture";
import { generateProductData } from "data/salesPortal/products/generateProductData";
import { createProductSchema } from "data/schemas/products/create.schema";
import { STATUS_CODES } from "data/statusCodes";
import _ from "lodash";
import { validateResponse } from "utils/validation/validateResponse.utils";

test.describe("[API] [Sales Portal] [Products]", () => {
  let id = "";
  let token = "";

  test.afterEach(async ({ productsApiService }) => {
    await productsApiService.delete(token, id);
  });

  test("Update product", async ({ loginApiService, productsApiService, productsApi }) => {
    //TODO: Preconditions
    token = await loginApiService.loginAsAdmin();
    const createdProduct = await productsApiService.create(token);
    id = createdProduct._id;

    //TODO: Action
    const updatedProductData = generateProductData();
    const updatedProductResponse = await productsApi.update(id, updatedProductData, token);

    //TODO: Assert
    validateResponse(updatedProductResponse, {
      status: STATUS_CODES.OK,
      schema: createProductSchema,
      IsSuccess: true,
      ErrorMessage: null,
    });

    const updatedProduct = updatedProductResponse.body.Product;
    expect(_.omit(updatedProduct, ["_id", "createdOn"])).toEqual(updatedProductData);
    expect(id).toBe(updatedProduct._id);
  });
});