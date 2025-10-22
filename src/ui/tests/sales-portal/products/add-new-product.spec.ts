import test, { expect } from "@playwright/test";
import { credentials } from "config/env";
import { NOTIFICATIONS } from "data/salesPortal/notifications";
import { generateProductData } from "data/salesPortal/products/generateProductData";
// import { MANUFACTURERS } from "data/salesPortal/products/manufacturers";
// import { IProduct } from "data/types/product.types";
import { HomePage } from "ui/pages/home.page";
import { AddNewProductPage } from "ui/pages/products/addNewProduct.page";
import { ProductsListPage } from "ui/pages/products/productsList.page";

// const productData: IProduct = {
//   name: "Product" + Date.now(),
//   manufacturer: MANUFACTURERS.GOOGLE,
//   price: 1,
//   amount: 2,
//   notes: "test notes",
// };

test.describe("[Sales Portal] [Products]", async () => {
  test.skip("Add new product OLD", async ({ page }) => {
    const homePage = new HomePage(page);
    const productsListPage = new ProductsListPage(page);
    const addNewProductPage = new AddNewProductPage(page);

    // const spinner = page.locator(".spinner-border");
    // const toastMessage = page.locator(".toast-body");

    //login page
    const emailInput = page.locator("#emailinput");
    const passwordInput = page.locator("#passwordinput");
    const loginButton = page.locator("button[type='submit']");

    //home page
    // const welcomeText = page.locator(".welcome-text");
    // const productsButton = page.locator("#products-from-home");

    //products list
    // const productsPageTitle = page.locator("h2.fw-bold");
    // const addNewProductButton = page.locator('[name="add-button"]');
    // const productInTable = (productName: string) => page.locator(`//table/tbody/tr[./td[text()="${productName}"]]`);

    //add new product page
    // const addNewProductPageTitle = page.locator("h2.page-title-text");
    // const nameInput = page.locator("#inputName");
    // const manufacturerSelect = page.locator("#inputManufacturer");
    // const priceInput = page.locator("#inputPrice");
    // const amountInput = page.locator("#inputAmount");
    // const notesInput = page.locator("#textareaNotes");
    // const saveNewProductButton = page.locator("#save-new-product");

    // await page.goto(salesPortalUrl); //fix
    await homePage.open();
    await expect(emailInput).toBeVisible();
    await emailInput.fill(credentials.username);
    await passwordInput.fill(credentials.password);
    await loginButton.click();

    await homePage.waitForOpened();
    // await expect(welcomeText).toBeVisible();
    // await expect(spinner).toHaveCount(0);

    // await productsButton.click();
    await homePage.clickOnViewModule("Products");
    // await expect(productsPageTitle).toHaveText("Products List ");
    // await expect(spinner).toHaveCount(0);
    await productsListPage.waitForOpened();

    // await addNewProductButton.click();
    await productsListPage.clickAddNewProduct();
    // await expect(addNewProductPageTitle).toHaveText("Add New Product ");
    // await expect(spinner).toHaveCount(0);
    await addNewProductPage.waitForOpened();
    // await nameInput.fill(productData.name);
    // await manufacturerSelect.selectOption(productData.manufacturer);
    // await priceInput.fill(productData.price.toString());
    // await amountInput.fill(productData.amount.toString());
    // await notesInput.fill(productData.notes!);
    const productData = generateProductData();
    await addNewProductPage.fillForm(productData);
    // await saveNewProductButton.click();
    await addNewProductPage.clickSave();

    // await expect(productsPageTitle).toHaveText("Products List ");
    // await expect(spinner).toHaveCount(0);
    await productsListPage.waitForOpened();

    await expect(productsListPage.toastMessage).toContainText(NOTIFICATIONS.PRODUCT_CREATED);
    await expect(productsListPage.tableRowByName(productData.name)).toBeVisible();
  });

  test("Add new product", async ({ page }) => {
    const homePage = new HomePage(page);
    const productsListPage = new ProductsListPage(page);
    const addNewProductPage = new AddNewProductPage(page);

    //login page
    const emailInput = page.locator("#emailinput");
    const passwordInput = page.locator("#passwordinput");
    const loginButton = page.locator("button[type='submit']");

    await homePage.open();

    await expect(emailInput).toBeVisible();
    await emailInput.fill(credentials.username);
    await passwordInput.fill(credentials.password);
    await loginButton.click();

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
  });
});

//locators !
//waiterForPage !
//product data generator
//teardown