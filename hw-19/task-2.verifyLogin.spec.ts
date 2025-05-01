// Разработать тест со следующими шагами:
//  - Открыть url https://anatoly-karpovich.github.io/aqa-course-project/#
//  - Войти в приложения используя учетные данные test@gmail.com / 12345678 при этом:
//  - дождаться исчезновения спиннеров
//  - проверить действительно ли пользователь с логином Anatoly вошел в систему
//  - Проверить скриншотом боковое навигационное меню с выбранной страницей Home

import test, { expect }  from "@playwright/test";

test.describe("[UI] User authorisation", () => {
    const validCredentials = {
      email: "test@gmail.com",
      password: "12345678",
      username: "Anatoly",
    };
  
    test("Should log in with valid credentials", async ({ page }) => {
      await page.goto("https://anatoly-karpovich.github.io/aqa-course-project/#");
  
      const btnLogin = page.getByRole("button", { name: "Login" });
      await page.locator("#emailinput").fill(validCredentials.email);
      await page.locator("#passwordinput").fill(validCredentials.password);
      await btnLogin.click();
      const spinners = page.locator("div.spinner-border");
  
      const nameUser = page.getByRole("link", {
        name: validCredentials.username,
      });
  
      // await expect(spinners).toBeHidden();
      await expect(spinners).toHaveCount(0);
      await expect(nameUser).toBeVisible();
      await expect(nameUser).toHaveText(validCredentials.username);
  
      //"Visual test: Screenshot Sidebar"
      const sidebarLinkItem = page.getByRole("link", { name: "Home" });
      await expect(sidebarLinkItem).toHaveClass(/active/);
      await expect(page.locator("#sidebar")).toHaveScreenshot();
    });
  });