import { test as base, expect } from "@playwright/test";
import { HomePage } from "ui/pages/home.page";
import { SignInPage } from "ui/pages/signIn.page";
import { AddNewProductPage } from "ui/pages/products/addNewProduct.page";
import { ProductsListPage } from "ui/pages/products/productsList.page";

interface IPages {
  signInPage: SignInPage;
  homePage: HomePage;
  productsListPage: ProductsListPage;
  addNewProductPage: AddNewProductPage;
}

export const test = base.extend<IPages>({
  signInPage: async ({ page }, use) => {
    await use(new SignInPage(page));
  },
  homePage: async ({ page }, use) => {
    await use(new HomePage(page));
  },
  productsListPage: async ({ page }, use) => {
    await use(new ProductsListPage(page));
  },
  addNewProductPage: async ({ page }, use) => {
    await use(new AddNewProductPage(page));
  },
});

export { expect };
