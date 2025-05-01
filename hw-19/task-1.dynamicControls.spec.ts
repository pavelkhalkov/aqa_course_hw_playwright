// Разработать тест со следующими шагами:
//   - открыть https://the-internet.herokuapp.com/
//   - перейти на страницу Dynamic Controls
//   - Дождаться появления кнопки Remove
//   - Завалидировать текста в заголовке страницы
//   - Чекнуть чекбокс
//   - Кликнуть по кнопке Remove
//   - Дождаться исчезновения чекбокса
//   - Проверить наличие кнопки Add
//   - Завалидировать текст It's gone!
//   - Кликнуть на кнопку Add
//   - Дождаться появления чекбокса
//   - Завалидировать текст It's back!

import test, { expect } from "@playwright/test";

test.describe("[UI] Dynamic Controls", async () => {
    test("Should auto-wait for dynamic content to appear", async ({ page }) => {
        await page.goto("https://the-internet.herokuapp.com/")
        await page.getByRole("link", { name: "Dynamic Controls"}).click()   

        const buttonRemove = page.getByRole("button", { name: "Remove" })
        const mainTitle = page.getByRole("heading", { name: "Dynamic Controls" })
        const paragraphText = page.locator("div.example > p");
        const subheader = page.getByRole("heading", { name: "Remove/add" });
        
        await expect(mainTitle).toHaveText("Dynamic Controls");
        await expect (paragraphText).toHaveText("This example demonstrates when elements (e.g., checkbox, input field, etc.) are changed asynchronously.")
        await expect(subheader).toHaveText("Remove/add");
        await expect(buttonRemove).toBeVisible();

        const checkboxRemoveAdd = page.locator("input[type='checkbox']") 
        await expect(checkboxRemoveAdd).toBeVisible();
        await checkboxRemoveAdd.check();

        await buttonRemove.click();
        await expect(checkboxRemoveAdd).toBeHidden();
        await expect(buttonRemove).toBeHidden();

        const buttonAdd = page.getByRole("button", { name: "Add" });
        await expect(buttonAdd).toBeVisible();

        const textMessage = page.locator("p#message");
        await expect(textMessage).toHaveText("It's gone!");
    })
})
