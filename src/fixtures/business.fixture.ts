// import { test as base, expect } from "fixtures/pages.fixture";
// import { credentials, SALES_PORTAL_URL } from "config/env";

// export const test = base.extend<{
//   loginAsAdmin: () => Promise<void>;
// }>({
//   loginAsAdmin: async ({ page, homePage }, use) => {
//     await use(async () => {
//       const emailInput = page.locator("#emailinput");
//       const passwordInput = page.locator("#passwordinput");
//       const loginButton = page.locator("button[type='submit']");

//       await page.goto(SALES_PORTAL_URL);
//       await emailInput.fill(credentials.username);
//       await passwordInput.fill(credentials.password);
//       await loginButton.click();

//       await homePage.waitForOpened();
//     });
//   },
// });

// export { expect };

//====

// src/fixtures/business.fixture.ts
import { test as apiBase } from "fixtures/api.fixture";
import { LoginUIService } from "ui/service/login.ui-service";
import { HomeUIService } from "ui/service/home.ui-service"; 
import { ProductsListUIService } from "ui/service/productsList.ui-service"; 
import { AddNewProductUIService } from "ui/service/addNewProduct.ui-service"; 
import { ProductsListPage } from "ui/pages/products/productsList.page";
import { HomePage } from "ui/pages/home.page";
import { credentials, SALES_PORTAL_URL } from "config/env";
import { AddNewProductPage } from "ui/pages/products";

type BusinessFixtures = {
  loginUIService: LoginUIService;
  homeUIService: HomeUIService;
  productsListUIService: ProductsListUIService;
  addNewProductUIService: AddNewProductUIService;
  productsListPage: ProductsListPage;
  addNewProductPage: AddNewProductPage; 
  homePage: HomePage;
  loginAsAdmin: () => Promise<void>;
};

export const test = apiBase.extend<BusinessFixtures>({
  loginUIService: async ({ page }, use) => {
    await use(new LoginUIService(page));
  },

  homeUIService: async ({ page }, use) => {
    await use(new HomeUIService(page));
  },

  productsListUIService: async ({ page }, use) => {
    await use(new ProductsListUIService(page));
  },

  addNewProductUIService: async ({ page }, use) => {
    await use(new AddNewProductUIService(page));
  },

  addNewProductPage: async ({ page }, use) => { await use(new AddNewProductPage(page)); }, 

  productsListPage: async ({ page }, use) => {
    await use(new ProductsListPage(page));
  },

  homePage: async ({ page }, use) => {
    await use(new HomePage(page));
  },

  // 🔹 фикстура для логина администратора
  loginAsAdmin: async ({ page, homePage }, use) => {
    await use(async () => {
      const emailInput = page.locator("#emailinput");
      const passwordInput = page.locator("#passwordinput");
      const loginButton = page.locator("button[type='submit']");

      await page.goto(SALES_PORTAL_URL);
      await emailInput.fill(credentials.username);
      await passwordInput.fill(credentials.password);
      await loginButton.click();

      await homePage.waitForOpened();
    });
  },
});

export { expect } from "@playwright/test";
