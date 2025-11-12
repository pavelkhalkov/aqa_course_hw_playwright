/*

***HW-25 (Task 2)***

Используя DDT подход, напишите тест сьют для проверки эндпоинта создания продукта:
  - с негативыми проверками

*/

import { test, expect } from "fixtures/api.fixture";
import { STATUS_CODES } from "data/statusCodes";
import { ERROR_NOTIFICATIONS } from "data/salesPortal/notifications";
import { validateResponse } from "utils/validation/validateResponse.utils";
import { invalidCreationProductSchema } from "data/schemas/products/invalidCreate.schema";
import { generateProductData } from "data/salesPortal/products/generateProductData";
import { createProductInvalidData } from "data/salesPortal/products/create.data.invalid";

test.describe("[API] [Sales Portal] [Product: Negative]", () => {
    let token = "";

    test.beforeEach(async ({ loginApiService }) => {
      token = await loginApiService.loginAsAdmin();
    });

    for (const { title, checkingData } of createProductInvalidData) {
      test(title, async ({ productsApi }) => {
        const productData = generateProductData(checkingData);
        const response = await productsApi.create(productData, token);

        validateResponse(response, {
          status: STATUS_CODES.BAD_REQUEST,
          IsSuccess: false,
          ErrorMessage: ERROR_NOTIFICATIONS.INCORRECT_REQUEST_BODY,
          schema: invalidCreationProductSchema,
        });

        await test.step("Verify status code", async () => {
          expect.soft(response.status).toBe(STATUS_CODES.BAD_REQUEST);
        });

        await test.step("Verify IsSuccess is false", async () => {
          expect.soft(response.body.IsSuccess).toBe(false);
        });

        await test.step("Verify error message", async () => {
          expect.soft(response.body.ErrorMessage).toBe(ERROR_NOTIFICATIONS.INCORRECT_REQUEST_BODY);
        });

        await test.step("Verify that the body matches the error schema", async () => {
          expect.soft(response.body).toMatchObject({
            IsSuccess: false,
            ErrorMessage: expect.any(String),
          });
        });
      });
    }
  });
//});
