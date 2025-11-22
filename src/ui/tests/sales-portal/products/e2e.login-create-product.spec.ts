/*

***HW-22***

Task 1
Написать Page Object класс для страницы Sign In:
  - email input
  - password input
  - login button
  - fillCredentials method
  - click on login button method

Task 2
Разработать е2е теста со следующими шагами:
 - Открыть Sales Portal локально поднятый в докере
 - Войти в приложения используя учетные данные указанные в readme к проекту
 - Создать продукт (модуль Products)
 - Верифицировать появившуюся нотификацию
 - Верифицировать созданный продукт в таблице (сравнить все имеющиеся поля, продукт должен быть самым верхним)

*/

import test, { expect } from "@playwright/test";
import { credentials } from "config/env";
import { NOTIFICATIONS } from "data/salesPortal/notifications";
import { generateProductData } from "data/salesPortal/products/generateProductData";
import { HomePage } from "ui/pages/home.page";
import { AddNewProductPage } from "ui/pages/products/addNewProduct.page";
import { ProductsListPage } from "ui/pages/products/productsList.page";
import { LoginPage } from "ui/pages/signIn.page"; 
import _ from "lodash"

test.describe("[E2E] SignIn and Product Creation", () => {
  test("Should sign in and create new product", async ({ page }) => {
    
    //Arrange 
    const loginPage = new LoginPage(page);
    const homePage = new HomePage(page);
    const productsListPage = new ProductsListPage(page);
    const addNewProductPage = new AddNewProductPage(page);
    const productData = generateProductData();

    await homePage.open();
    await loginPage.waitForOpened()
    await loginPage.fillCredentials(credentials);
    await loginPage.clickLogin()
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
