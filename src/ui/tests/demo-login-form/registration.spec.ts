import test, { expect } from "@playwright/test";
import fs from "fs";
import path from "path";

const file = path.resolve(`${process.cwd()}/src/data/demo-login-form/userdata.json`);
const userData = JSON.parse(fs.readFileSync(file, "utf-8"));
// import userData from "../../data/demo-login-form/register.data";

test.describe("[Demo Login Form] Registration", () => {
  const url = "https://anatoly-karpovich.github.io/demo-login-form/";

  for (const { title, credentials, successMessage } of userData) {
    test(title, async ({ page }) => {
      await page.goto(url);
      const registerOnLoginButton = page.locator('.loginForm input[value="Register"]');
      await expect(registerOnLoginButton).toBeVisible();
      await registerOnLoginButton.click();
      const registerForm = page.locator(".registerForm");
      const registerFormTitle = registerForm.locator("#registerForm");
      await expect(registerFormTitle).toBeVisible();
      const userNameInput = registerForm.locator("input[type='text']");
      const passwordInput = registerForm.locator("input[type='password']");
      const registerButton = registerForm.locator(`input[type='submit']`);
      const successMessageLabel = registerForm.locator("h4");
      const { username, password } = credentials;
      await userNameInput.fill(username);
      await passwordInput.fill(password);
      await registerButton.click();
      await expect(successMessageLabel).toHaveText(successMessage);
    });
  }
});