import { IProduct } from "data/types/product.types";
import { expect, test } from "fixtures/business.fixture";

test.describe("[Sales Portal] [Products]", () => {
  let id = "";
  let token = "";

  const fields = ["name", "price", "manufacturer"] as (keyof IProduct)[];
  for (const field of fields) {
    test(`Search by ${field} field`, async ({ loginUIService, productsApiService, productsListUIService }) => {
      token = await loginUIService.loginAsAdmin();
      const product = await productsApiService.create(token);
      id = product._id;
      await productsListUIService.open();
      await productsListUIService.search(String(product[field]));
      await productsListUIService.assertProductInTable(product.name, { visible: true });
    });
  }

  test.afterEach(async ({ productsApiService }) => {
    if (id) await productsApiService.delete(token, id);
    id = "";
  });
  test.skip("Search by name", async ({
    loginUIService,
    productsApiService,
    productsListUIService,
    productsListPage,
  }) => {
    /*
    login
    create product via api
    go to products list page
    search by product name
    verify product in table
    */
    token = await loginUIService.loginAsAdmin();
    const product = await productsApiService.create(token);
    await productsListUIService.open();
    await productsListUIService.search(product.name);
    await expect(productsListPage.tableRowByName(product.name)).toBeVisible();
  });

  test.skip("Search by price", async ({
    loginUIService,
    productsApiService,
    productsListUIService,
    productsListPage,
  }) => {
    token = await loginUIService.loginAsAdmin();
    const product = await productsApiService.create(token);
    await productsListUIService.open();
    await productsListUIService.search(product.price.toString());
    await expect(productsListPage.tableRowByName(product.name)).toBeVisible();
  });

  test.skip("Search by manufacturer", async ({
    loginUIService,
    productsApiService,
    productsListUIService,
    productsListPage,
  }) => {
    token = await loginUIService.loginAsAdmin();
    const product = await productsApiService.create(token);
    await productsListUIService.open();
    await productsListUIService.search(product.manufacturer);
    await expect(productsListPage.tableRowByName(product.name)).toBeVisible();
  });
});