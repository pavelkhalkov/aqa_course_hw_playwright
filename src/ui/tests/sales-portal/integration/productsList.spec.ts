import { test, expect } from "fixtures/business.fixture";
import { generateProductResponseData } from "data/salesPortal/products/generateProductData"; 
import { SALES_PORTAL_URL } from "config/env";
import { apiConfig } from "config/apiConfig";
import { ProductsSortField, ProductsTableHeader } from "data/types/product.types";
import { SortOrder } from "data/types/core.types";
import _ from "lodash";
import { convertToDateAndTime } from "utils/date.utils";
import { TAGS } from "data/tags";

test.describe("[Integration] [Sales Portal] [Products] [Table Sorting]", () => {
  // test("Field: createdOn, direction: asc", async ({ loginAsAdmin, productsListPage, page, mock }) => {
  //   const product1 = generateProductResponseData();
  //   const product2 = generateProductResponseData();
  //   await mock.productsPage({
  //     Products: [product1, product2],
  //     IsSuccess: true,
  //     ErrorMessage: null,
  //     total: 1,
  //     page: 1,
  //     limit: 10,
  //     search: "",
  //     manufacturer: [],
  //     sorting: {
  //       sortField: "createdOn",
  //       sortOrder: "desc",
  //     },
  //   });

  //   await loginAsAdmin();
  //   await page.goto(SALES_PORTAL_URL + "products");
  //   await productsListPage.waitForOpened();

  //   await mock.productsPage({
  //     Products: [product1, product2],
  //     IsSuccess: true,
  //     ErrorMessage: null,
  //     total: 1,
  //     page: 1,
  //     limit: 10,
  //     search: "",
  //     manufacturer: [],
  //     sorting: {
  //       sortField: "createdOn",
  //       sortOrder: "asc",
  //     },
  //   });
  //   const request = await productsListPage.interceptRequest(
  //     apiConfig.endpoints.products,
  //     productsListPage.clickTableHeader.bind(productsListPage),
  //     "Created On",
  //   );

  //   await productsListPage.waitForOpened();
  //   expect(request.url()).toBe(
  //     `${apiConfig.baseURL}${apiConfig.endpoints.products}?sortField=createdOn&sortOrder=asc&page=1&limit=10`,
  //   );

  //   expect(productsListPage.tableHeaderArrow("Created On", { direction: "asc" })).toBeVisible();
  // });

  // test("Field: createdOn, direction: desc", async ({ loginAsAdmin, productsListPage, page, mock }) => {
  //   const product1 = generateProductResponseData();
  //   const product2 = generateProductResponseData();
  //   await mock.productsPage({
  //     Products: [product1, product2],
  //     IsSuccess: true,
  //     ErrorMessage: null,
  //     total: 1,
  //     page: 1,
  //     limit: 10,
  //     search: "",
  //     manufacturer: [],
  //     sorting: {
  //       sortField: "createdOn",
  //       sortOrder: "asc",
  //     },
  //   });

  //   await loginAsAdmin();
  //   await page.goto(SALES_PORTAL_URL + "products");
  //   await productsListPage.waitForOpened();

  //   await mock.productsPage({
  //     Products: [product1, product2],
  //     IsSuccess: true,
  //     ErrorMessage: null,
  //     total: 1,
  //     page: 1,
  //     limit: 10,
  //     search: "",
  //     manufacturer: [],
  //     sorting: {
  //       sortField: "createdOn",
  //       sortOrder: "desc",
  //     },
  //   });
  //   const request = await productsListPage.interceptRequest(
  //     apiConfig.endpoints.products,
  //     productsListPage.clickTableHeader.bind(productsListPage),
  //     "Created On",
  //   );

  //   await productsListPage.waitForOpened();
  //   expect(request.url()).toBe(
  //     `${apiConfig.baseURL}${apiConfig.endpoints.products}?sortField=createdOn&sortOrder=desc&page=1&limit=10`,
  //   );

  //   expect(productsListPage.tableHeaderArrow("Created On", { direction: "desc" })).toBeVisible();
  // });
  const directions = ["asc", "desc"] as SortOrder[];
  for (const header of ["Name", "Price", "Manufacturer", "Created On"] as ProductsTableHeader[]) {
    for (const direction of directions) {
      test(`Field: ${header}, direction: ${direction}`, {
          tag: [TAGS.VISUAL_REGRESSION, TAGS.SMOKE, TAGS.INTEGRATION, TAGS.PRODUCTS],
         },
        async ({ productsListPage, page, mock }) => {
        const headersMapper: Record<string, ProductsSortField> = {
          Name: "name",
          Price: "price",
          Manufacturer: "manufacturer",
          "Created On": "createdOn",
        };
        const product1 = generateProductResponseData();
        const product2 = generateProductResponseData();
        const products = [product1, product2];
        await mock.productsPage({
          Products: products,
          IsSuccess: true,
          ErrorMessage: null,
          total: 1,
          page: 1,
          limit: 10,
          search: "",
          manufacturer: [],
          sorting: {
            sortField: headersMapper[header]!,
            sortOrder: directions.find((el) => el !== direction)!,
          },
        });

        //await loginAsAdmin();
        await page.goto(SALES_PORTAL_URL + "products");
        await productsListPage.waitForOpened();

        await mock.productsPage({
          Products: products,
          IsSuccess: true,
          ErrorMessage: null,
          total: 1,
          page: 1,
          limit: 10,
          search: "",
          manufacturer: [],
          sorting: {
            sortField: headersMapper[header]!,
            sortOrder: direction,
          },
        });

        const request = await productsListPage.interceptRequest(
          apiConfig.endpoints.products,
          productsListPage.clickTableHeader.bind(productsListPage),
          header,
        );

        await productsListPage.waitForOpened();
        expect(request.url()).toBe(
          `${apiConfig.baseURL}${apiConfig.endpoints.products}?sortField=${headersMapper[header]}&sortOrder=${direction}&page=1&limit=10`,
        );

        await expect(productsListPage.tableHeaderArrow(header, { direction })).toBeVisible();

        const tableData = await productsListPage.getTableData();
        expect(tableData.length).toBe(products.length);
        tableData.forEach((product, i) => {
          const expected = _.omit(products[i], ["_id", "notes", "amount"]);
          expected.createdOn = convertToDateAndTime(expected.createdOn!);
          expect(product).toEqual(expected);
        });
      });
    }
  }
});