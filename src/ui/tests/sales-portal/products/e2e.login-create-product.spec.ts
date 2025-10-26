import test, { expect } from "@playwright/test";
import { credentials } from "config/env";
import { NOTIFICATIONS } from "data/salesPortal/notifications";
import { generateProductData } from "data/salesPortal/products/generateProductData";
import { HomePage } from "ui/pages/home.page";
import { AddNewProductPage } from "ui/pages/products/addNewProduct.page";
import { ProductsListPage } from "ui/pages/products/productsList.page";
import { SignInPage } from "ui/pages/signIn.page";
import _ from "lodash"

test.describe("[E2E] SignIn and Product Creation", () => {
  test("Should sign in and create new product", async ({ page }) => {
    
    //Arrange 
    const signInPage = new SignInPage(page);
    const homePage = new HomePage(page);
    const productsListPage = new ProductsListPage(page);
    const addNewProductPage = new AddNewProductPage(page);
    const productData = generateProductData();

    await homePage.open();
    await signInPage.waitForOpened()
    await signInPage.signIn(credentials);
    await homePage.waitForOpened();
    await homePage.clickOnViewModule("Products");
    await productsListPage.waitForOpened();

    // Act
    await productsListPage.clickAddNewProduct();
    await addNewProductPage.waitForOpened();
    await addNewProductPage.fillForm(productData);
    await Promise.all([
      page.waitForLoadState("networkidle"),
      addNewProductPage.clickSave(),
    ]);

    await productsListPage.waitForOpened();

    //Assert
    await expect(productsListPage.toastMessage).toHaveText(NOTIFICATIONS.PRODUCT_CREATED);
    await expect(productsListPage.tableRowByName(productData.name)).toBeVisible();
    
    await productsListPage.detailsButton(productData.name).click();
    const { detailsModal } = productsListPage;
    await detailsModal.waitForOpened();
    const actual = await detailsModal.getData();
    expect(_.omit(actual, ["createdOn"])).toEqual(productData);
    await detailsModal.clickClose()

    await productsListPage.sortByCreatedDesc();
    const top = productsListPage.topRow();
    await expect(top).toBeVisible();
    await expect(top).toContainText(productData.name);

  });
});
