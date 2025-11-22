import { test, expect } from "fixtures/business.fixture";
import { generateProductResponseData } from "data/salesPortal/products/generateProductData";
import _ from "lodash";
import { SALES_PORTAL_URL } from "config/env";
import { convertToFullDateAndTime } from "utils/date.utils";

test.describe("[Integration] [Sales Portal] [Products]", () => {
  test("Product Details", async ({ loginAsAdmin, productsListPage, page,  mock }) => {
    const expectedProductResponse = generateProductResponseData();
    await mock.productsPage({
      Products: [expectedProductResponse],
      IsSuccess: true,
      ErrorMessage: null,
      total: 1,
      page: 1,
      limit: 10,
      search: "",
      manufacturer: [],
      sorting: {
        sortField: "createdOn",
        sortOrder: "desc",
      },
    });

    await mock.productDetailsModal({
      Product: expectedProductResponse,
      IsSuccess: true,
      ErrorMessage: null,
    });

    await loginAsAdmin();
    await page.goto(SALES_PORTAL_URL + "products");
    await productsListPage.waitForOpened();
    await productsListPage.clickAction(expectedProductResponse.name, "details");
    const { detailsModal } = productsListPage;
    await detailsModal.waitForOpened();
    const actual = await detailsModal.getData();
    expect(actual).toEqual({
      ..._.omit(expectedProductResponse, ["_id"]),
      createdOn: convertToFullDateAndTime(expectedProductResponse.createdOn),
    });
  });
});