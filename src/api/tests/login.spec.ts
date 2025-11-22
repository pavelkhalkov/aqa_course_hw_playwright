/*

***HW-24****

Написать смоук API тест на логин
  - создать и проверить схему
  - проверить статус
  - проверить наличие токена в хедерах
  
*/

import { test, expect } from "@playwright/test";
import { apiConfig } from "config/apiConfig";
import { credentials } from "config/env";
import { loginSchema } from "data/schemas/products/login.schema";
import { STATUS_CODES } from "data/statusCodes";
import { validateJsonSchema } from "utils/validation/validateSchema.utils"; 

test.describe("[API] [Auth] [Login]", () => {
  test("Should successfully login with valid credentials", async ({request}) => {
    const loginResponse = await request.post(apiConfig.baseURL + apiConfig.endpoints.login,
      {
        data: credentials,
        headers: { "content-type": "application/json" },
      }
    );

    //Assert
    const loginBody = await loginResponse.json();
    const headers = loginResponse.headers();
    const token = headers["authorization"]!;

    const expectedUser = {
      _id: "68ee9c43cee966e51e23576d",
      username: "admin@example.com",
      firstName: "Admin",
      lastName: "Admin",
      roles: ["ADMIN"],
      createdOn: "2025/10/14 18:53:55",
    };

    // Check status: 200 OK
    await test.step("Should verify status code login", async () => {
      expect.soft(loginResponse.status()).toBe(STATUS_CODES.OK);
    });

    //Check scheme
    await test.step("Should validate response JSON schema", async () => {
      validateJsonSchema(loginBody, loginSchema);
    });

    //Check response fields
    await test.step("Should verify response fields", async () => {
      expect.soft(loginBody.IsSuccess, "IsSuccess should be true").toBe(true);
      expect.soft(loginBody.ErrorMessage, "ErrorMessage should be null").toBe(null);
      expect.soft(loginBody.User.username, "Username in response should match credentials").toBe(credentials.username);
      expect.soft(loginBody.User).toMatchObject(expectedUser);
      expect.soft(token, "Auth token should be present in response").toBeTruthy();
    });
  });
});
