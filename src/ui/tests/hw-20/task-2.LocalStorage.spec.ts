/*
Разработать тест со следующими шагами:
  - открыть https://anatoly-karpovich.github.io/demo-login-form/
  - Засунуть в localStorage браузера данные test@gmail.com / SecretPw123!@# для логина на сайт
  - Залогиниться с данными что вы вставили в localStorage
  - Завалидировать успешный логин

  Рекоммендации:
  - Для доступа к localStorage используйте https://playwright.dev/docs/evaluating
*/

import test, { expect } from "@playwright/test";

interface ICredentials {
  username: string;
  password: string;
}

test.describe("[UI] Local Storage", () => {

  const validCredentials: ICredentials = {
    username: "test@gmail.com",
    password: "SecretPw123!@#",
  };

  test("Should login via localStorage", async ({ page }) => {
    const URL = "https://anatoly-karpovich.github.io/demo-login-form/";
    const loginForm = page.locator("#loginForm");

    await page.goto(URL);
    expect(loginForm).toBeVisible();

    await page.evaluate(() => localStorage.clear());
    await page.evaluate(
      ({ username, password }) => {
        localStorage.setItem(
          username,
          JSON.stringify({ name: username, password: password })
        );
      },
      {
        username: validCredentials.username,
        password: validCredentials.password,
      }
    );

    await page.reload();

    const usernameInput = page.locator("#userName");
    const passwordInput = page.locator("#password");
    const loginButton = page.locator("#submit");
    const successNotification = page.locator("#successMessage");

    await usernameInput.fill(validCredentials.username);
    await passwordInput.fill(validCredentials.password);
    await loginButton.click();
    await expect(successNotification).toBeVisible();
    await expect(successNotification).toHaveText(`Hello, ${validCredentials.username}!`);
  });
});
