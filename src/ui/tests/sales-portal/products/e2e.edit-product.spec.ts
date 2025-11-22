/*

***HW-27***

Реализовать е2е тест со следующими шагами:
  - залогиниться
  - Создать продукт через API
  - Перейти на страницу Edit Product
  - Заполнить поля валидными данными
  - Сохранить продукт
  - Проверить продукт в таблице
  - Открыть модалку деталей продукта
  - Проверить данные в модалке

  За собой удаляем продукт через апи, разумеется:)

  */

import { test } from "fixtures/business.fixture";
import { generateProductData } from "data/salesPortal/products/generateProductData";

test.describe("[E2E] [UI] [Products] [Edit]", () => {
  let id = "";
  let token = "";

  test.afterEach(async ({ productsApiService }) => {
    if (id) await productsApiService.delete(token, id);
    id = "";
  });

  test("Update product with services", async ({ loginUIService, productsApiService, productsListUIService, editProductPage, productsListPage }) => {
    token = await loginUIService.loginAsAdmin();
    const createdProduct = await productsApiService.create(token);
    id = createdProduct._id;

    await productsListUIService.open();
    await productsListUIService.openEditModal(createdProduct.name);

    const updatedProduct = generateProductData({
      name: createdProduct.name + "changed",
    });

    await editProductPage.fillForm(updatedProduct);
    await editProductPage.clickSaveChanges();
    await productsListPage.waitForOpened();

    await productsListUIService.assertProductInTable(updatedProduct.name, { visible: true });
    const actualProductData = await productsListPage.getProductData( updatedProduct.name );
    productsListUIService.assertProductTableDataGenerated( actualProductData, updatedProduct );

    await productsListUIService.openDetailsModal(updatedProduct.name);
    const productInModal = await productsListPage.detailsModal.getData();
    productsListUIService.assertDetailsDataGenerated(productInModal, updatedProduct);
  });
});
