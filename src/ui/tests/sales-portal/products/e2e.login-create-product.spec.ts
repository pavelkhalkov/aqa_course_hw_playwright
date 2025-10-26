import test, { expect } from "@playwright/test";
import { credentials } from "config/env";
import { NOTIFICATIONS } from "data/salesPortal/notifications";
import { generateProductData } from "data/salesPortal/products/generateProductData";
import { HomePage } from "ui/pages/home.page";
import { AddNewProductPage } from "ui/pages/products/addNewProduct.page";
import { ProductsListPage } from "ui/pages/products/productsList.page";
import { SignInPage } from "ui/pages/signIn.page";
import { ProductDetailsModal } from "ui/pages/products/details.modal";
import _ from "lodash"

test.describe("[E2E] SignIn and Product Creation", async () => {
  test("Should sign in and create new product", async ({ page }) => {
    const signInPage = new SignInPage(page);
    const homePage = new HomePage(page);
    const productsListPage = new ProductsListPage(page);
    const addNewProductPage = new AddNewProductPage(page);
    const productDetailsModal = new ProductDetailsModal(page)

    await homePage.open();
    await expect(signInPage.emailInput).toBeVisible();
    await signInPage.signIn({username: credentials.username,password: credentials.password});

    await homePage.waitForOpened();
    await homePage.clickOnViewModule("Products");
    await productsListPage.waitForOpened();
    await productsListPage.clickAddNewProduct();
    await addNewProductPage.waitForOpened();

    const productData = generateProductData();
    await addNewProductPage.fillForm(productData);
    await addNewProductPage.clickSave();
    await productsListPage.waitForOpened();
    await expect(productsListPage.toastMessage).toContainText(NOTIFICATIONS.PRODUCT_CREATED);
    await expect(productsListPage.tableRowByName(productData.name)).toBeVisible();

    await productsListPage.detailsButton(productData.name).click();
    const { detailsModal } = productsListPage;
    await detailsModal.waitForOpened();
    const actual = await detailsModal.getData();
    expect(_.omit(actual, ["createdOn"])).toEqual(productData);

    await productDetailsModal.clickClose()
    await productsListPage.sortByCreatedDesc();
    const top = productsListPage.topRow();
    await expect(top).toBeVisible();
    await expect(top).toContainText(productData.name);

  });
});
