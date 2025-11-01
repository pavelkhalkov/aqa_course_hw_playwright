import { test, expect } from "fixtures/api.fixture";
import { getProductSchema } from "data/schemas/products/get.schema";
import { STATUS_CODES } from "data/statusCodes";
import { validateResponse } from "utils/validation/validateResponse.utils";

test.describe("[API] [Sales Portal] [Products]", () => {
  let id = "";
  let token = "";

  test.afterEach(async ({ productsApiService }) => {
    await productsApiService.delete(token, id);
  });

  test("Get Product By Id", async ({ loginApiService, productsApiService, productsApi }) => {
    //TODO: Preconditions
    token = await loginApiService.loginAsAdmin();
    const product = await productsApiService.create(token);
    id = product._id;

    //TODO: Action

    const getProductResponse = await productsApi.getById(id, token);
    validateResponse(getProductResponse, {
      status: STATUS_CODES.OK,
      schema: getProductSchema,
      IsSuccess: true,
      ErrorMessage: null,
    });
    //TODO: Assert
    expect(getProductResponse.body.Product).toEqual(product);
  });
});