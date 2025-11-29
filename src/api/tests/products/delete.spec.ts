import { test, expect } from "fixtures/api.fixture";
import { STATUS_CODES } from "data/statusCodes";
import { TAGS } from "data/tags";

test.describe("[API] [Sales Portal] [Products]", () => {
  test("Delete Product",  {
      tag: [TAGS.SMOKE, TAGS.REGRESSION, TAGS.API, TAGS.PRODUCTS]
      },
    async ({ loginApiService, productsApiService, productsApi }) => {
    //arrange
    const token = await loginApiService.loginAsAdmin();
    const createdProduct = await productsApiService.create(token);
    const id = createdProduct._id;
    //act
    const response = await productsApi.delete(id, token);
    //assert
    expect(response.status).toBe(STATUS_CODES.DELETED);
  });
});