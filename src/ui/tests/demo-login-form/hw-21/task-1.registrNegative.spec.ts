/* 
Создать тест сьют используя DDT подход с негативными тест-кейсами по регистрации на сайте
https://anatoly-karpovich.github.io/demo-login-form/

Требования:
Страница регистрации:
  Username: обязательное, от 3 до 40 символов включительно, запрещены префиксные/постфиксные пробелы, как и имя состоящее из одних пробелов
  Password: обязательное, от 8 до 20 символов включительно, необходима хотя бы одна буква в верхнем и нижнем регистрах, пароль из одних пробелов запрещен

Страница логина:
  Username: обязательное
  Password: обязательное
*/

import { test, expect } from "@playwright/test";

interface IRegistratioInvalidData {
  testName: string;
  username: string;
  password: string;
  errorText: string;
}

const regInvalidTestData: IRegistratioInvalidData[] = [
  {
    testName: "Error / Username is empty",
    username: "",
    password: "Password123",
    errorText: "Username is required",
  },
  {
    testName: "Error / Username should contain at least 3 characters",
    username: "Us",
    password: "Password123",
    errorText: "Username should contain at least 3 characters",
  },
  {
    testName: "Error / Username can't exceed 40 characters",
    username: "Fugiatdolorelaborisexcepteurduismollqqiteiu",
    password: "Password123",
    errorText: "Username can't exceed 40 characters",
  },
  {
    testName: "Error / Username with only spaces",
    username: "           ",
    password: "Password123",
    errorText: "Prefix and postfix spaces are not allowed is username",
  },
  {
    testName: "Error / Username starts with spaces",
    username: " User_valid",
    password: "Password123",
    errorText: "Prefix and postfix spaces are not allowed is username",
  },
  {
    testName: "Error / Username ends with spaces",
    username: "User_valid ",
    password: "Password123",
    errorText: "Prefix and postfix spaces are not allowed is username",
  },
  {
    testName: "Error / Password is empty",
    username: "User_valid",
    password: "",
    errorText: "Password is required",
  },
  {
    testName: "Error / Password with only spaces",
    username: "User_valid",
    password: "           ",
    errorText: "Password is required",
  },
  {
    testName: "Error / Password should contain at least one character in lower cases",
    username: "User_valid",
    password: "PASSWORD123",
    errorText: "Password should contain at least one character in lower case",
  },
  {
    testName: "Error / Username and Password fields are empty",
    username: "",
    password: "",
    errorText: "Please, provide valid data",
  },
  {
    testName: "Error / Password should contain at least 8 characters",
    username: "User_valid",
    password: "Passwor",
    errorText: "Password should contain at least 8 characters",
  },
  {
    testName: "Error / Password can't exceed 20 characters",
    username: "User_valid",
    password: "Esteuexcepteurssculpain",
    errorText: "Password can't exceed 20 characters",
  },
];

const URL = "https://anatoly-karpovich.github.io/demo-login-form/";

test.describe("[UI] Negative registration tests (DDT)", () => {
  for (const data of regInvalidTestData) {
    test(data.testName, async ({ page }) => {
      const registerOnLoginButton = page.locator('.loginForm input[value="Register"]');

      await page.goto(URL);
      await expect(registerOnLoginButton).toBeVisible();
      await registerOnLoginButton.click();

      const registerForm = page.locator(".registerForm");
      const registerFormTitle = registerForm.locator("#registerForm");
      await expect(registerFormTitle).toBeVisible();

      const userNameInput = registerForm.locator("input[type='text']");
      const passwordInput = registerForm.locator("input[type='password']");
      const registerButton = registerForm.locator(`input[type='submit']`);

      await page.evaluate(() => {document.querySelectorAll("input[maxlength]").forEach((el) => el.removeAttribute("maxlength"));
      });

      await userNameInput.fill(data.username);
      await passwordInput.fill(data.password);
      await registerButton.click();

      const errorMessage = page.locator("#errorMessageOnRegister");
      if (await errorMessage.count()) {
        await expect(errorMessage).toBeVisible();
        await expect(errorMessage).toHaveText(data.errorText);
       }
    });
  }
});
