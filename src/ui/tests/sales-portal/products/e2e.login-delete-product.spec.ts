/*
Создайте e2e тест со следующими шагами:
1. Зайти на сайт Sales Portal
2. Залогиниться с вашими кредами 
3. Перейти на страницу Products List 
4. Перейти на страницу Add New Product 
5. Создать продукта
6. Проверить наличие продукта в таблице 


7. Кликнуть на кнопку "Delete" в таблице для созданного продукта 
8. В модалке удаления кликнуть кнопку Yes, Delete 
9. Дождаться исчезновения модалки и загрузки страницы 
10. Проверить, что продукт отсутствует в таблице

Вам понадобится:

- PageObject модалки удаления продукта
- Подключить модалку в PageObject страницы Products
- Использовать фикстуры
*/

import { test, expect } from "fixtures/pages.fixture";
import { credentials } from "config/env";
import { NOTIFICATIONS } from "data/salesPortal/notifications";
import { generateProductData } from "data/salesPortal/products/generateProductData";


test.describe("[E2E] SignIn and Product Creation", () => {
  test("Should sign in and create new product", async ({page, signInPage, homePage, productsListPage, addNewProductPage}) => {
    
    //Arrange
    const productData = generateProductData();

    await homePage.open();
    await signInPage.waitForOpened();
    await signInPage.signIn(credentials);
    await homePage.waitForOpened();
    await homePage.clickOnViewModule("Products");
    await productsListPage.waitForOpened();

    // Act
    await productsListPage.clickAddNewProduct();
    await addNewProductPage.waitForOpened();
    await addNewProductPage.fillForm(productData);
    await Promise.all([
        page.waitForLoadState("networkidle"), addNewProductPage.clickSave()
    ]);

    await productsListPage.waitForOpened();

    //Assert
    await productsListPage.toastMessage
    .filter({hasText: NOTIFICATIONS.PRODUCT_CREATED})
    .waitFor({ state: "hidden" })
    .catch(() => {})

    await expect(productsListPage.tableRowByName(productData.name)).toBeVisible();

    await productsListPage.clickTableAction(productData.name, "delete")
    await productsListPage.deleteProductModal.waitForOpened()
    await productsListPage.deleteProductModal.clickDelete()    
    await productsListPage.deleteProductModal.waitForClosed()
    await productsListPage.waitForOpened();
    await productsListPage.toastMessage
        .filter({hasText: NOTIFICATIONS.PRODUCT_DELETED})
        .waitFor({ state: "hidden" })
        .catch(() => {})

    await expect(productsListPage.tableRowByName(productData.name)).not.toBeVisible();

    await test.step("Verify Product is Deleted and not Visible in Table on Product Page", async () => {
    // Получаю все продукты из таблицы
    const allProductsData = await productsListPage.getAllProductsData();
    const isProductPresent = allProductsData.some((product) => product.name === productData.name);
    // Проверяю, что продукт отсутствует
    expect(isProductPresent).toBe(false)});
  });
});

