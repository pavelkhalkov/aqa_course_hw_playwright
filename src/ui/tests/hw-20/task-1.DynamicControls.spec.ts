/* 
Разработать тест со следующими шагами:
  - открыть https://the-internet.herokuapp.com/
  - перейти на страницу Dynamic Controls
  - Дождаться появления кнопки Remove
  - Завалидировать текста в заголовке страницы
  - Чекнуть чекбокс
  - Кликнуть по кнопке Remove
  - Дождаться исчезновения чекбокса 
  - Проверить наличие кнопки Add
  - Завалидировать текст It's gone!
  - Кликнуть на кнопку Add
  - Дождаться появления чекбокса
  - Завалидировать текст It's back!
*/

import { test, expect } from "@playwright/test";

enum TEXT {
  TITLE = "Dynamic Controls",
  SUBTITLE = "This example demonstrates when elements (e.g., checkbox, input field, etc.) are changed asynchronously.",
  IT_IS_GONE = "It's gone!",
  IT_IS_BACK = "It's back!",
}

test.describe("[UI] Dynamic Controls", () => {
  test("Should auto-wait for dynamic content to appear", async ({ page }) => {
    const URL = "https://the-internet.herokuapp.com/";
    const mainTitle = page.getByRole("heading", { name: "Dynamic Controls" });
    const subTitle = page.locator("div > p");
    const removeButton = page.getByRole("button", { name: "Remove" });
    const checkboxRemoveAdd = page.locator("div#checkbox");
    const checkboxUpdate = page.locator("input#checkbox");
    const loading = page.locator("div#loading");
    const addButton = page.getByRole("button", { name: "Add" });
    const textMessage = page.locator("p#message");

    await page.goto(URL);
    await page.getByRole("link", { name: "Dynamic Controls" }).click();

    await expect(removeButton).toBeInViewport();
    await expect(mainTitle).toHaveText(TEXT.TITLE);
    await expect(subTitle).toHaveText(TEXT.SUBTITLE);
    await expect(checkboxRemoveAdd).toBeVisible();

    await removeButton.click();

    await expect(loading).toBeInViewport();
    await expect(checkboxRemoveAdd).toBeHidden();
    await expect(addButton).toBeVisible();
    await expect(textMessage).toHaveText(TEXT.IT_IS_GONE);

    await addButton.click();

    await expect(checkboxUpdate).toBeVisible();
    await expect(textMessage).toHaveText(TEXT.IT_IS_BACK);
  });
});
