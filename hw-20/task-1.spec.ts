// Создать тест сьют используя DDT (Data-Driven Testing - тестовые данные хранятся отдельно от тестового скрипта)
// подход с негативными тест-кейсами по регистрации на сайте
// https://anatoly-karpovich.github.io/demo-login-form/

// Требования:
// Страница регистрации:
//   Username: обязательное, от 3 до 40 символов включительно, запрещены префиксные/постфиксные пробелы, как и имя состоящее из одних пробелов
//   Password: обязательное, от 8 до 20 символов включительно, необходима хотя бы одна буква в верхнем и нижнем регистрах, пароль из одних пробелов запрещен

// Страница логина:
//   Username: обязательное
//   Password: обязательное

import test, { expect } from "@playwright/test";

interface IRegistrationInvalidData {
    testName: string;
    username: string;
    password: string;
    message: string;
  }

const URL = "https://anatoly-karpovich.github.io/demo-login-form/"

const regInvalidTestData: IRegistrationInvalidData[] = [
  {
    testName: "Error / Username is empty",
    username: "",
    password: "Password123",
    message: "Username is required",
  },
  {
    testName: "Error / Username should contain at least 3 characters",
    username: "ab",
    password: "Password123",
    message: "Username should contain at least 3 characters",
  },
  {
    testName: "Error / Username can't exceed 40 characters",
    username: "a".repeat(41),
    password: "Password123",
    message: "Username can't exceed 40 characters",
  },
  {
    testName: "Error / Username with only spaces",
    username: "   ",
    password: "Password123",
    message: "Username is required",
  },
  {
    testName: "Error / Username starts with spaces",
    username: "  user",
    password: "Password123",
    message: "Prefix and postfix spaces are not allowed is username",
  },
  {
    testName: "Error / Username ends with spaces",
    username: "user  ",
    password: "Password123",
    message: "Prefix and postfix spaces are not allowed is username",
  },

  {
    testName: "Error / Password with only spaces",
    username: "AdminUser",
    password: "        ",
    message: "Please, provide valid data",
  },

  {
    testName: "Error / Password should contain at least one character in lower cases",
    username: "AdminUser",
    password: "LOWERCASE",
    message: "Please, provide valid data",
  },    
  {
    testName: "Error / Password should contain at least one character in uper cases",
    username: "AdminUser",
    password: "lowercase",
    message: "Please, provide valid data",
  },
  {
    testName: "Error / Password can't exceed 20 characters",
    username: "validUser",
    password: "A".repeat(21),
    message: "Password can't exceed 40 characters",
  },

  {
    testName: "Error / Username and Password are empty",
    username: "  ",
    password: "     ",
    message: "Please, provide valid data",
  },
];

test.describe("Negative Registration Tests", async () => {
    regInvalidTestData.forEach(({ username, password, message }, index) => {
    test(`Case ${index + 1}: ${message}`, async ({ page }) => {
      await page.goto(URL);
      const registerButton = page.locator("#registerOnLogin");
      await registerButton.click();

      if (password.length > 20) {
        await page.evaluate(() => {
          const input = document.getElementById("passwordOnRegister");
          if (input) input.removeAttribute("maxlength");
        });
      
        await page.evaluate((value) => {
          const input = document.getElementById("passwordOnRegister") as HTMLInputElement;
          if (input) input.value = value;
        }, password);
      } else {
        await page.fill("#passwordOnRegister", password);
      }
      
      await page.locator("#userNameOnRegister").fill(username);
      await page.locator("#passwordOnRegister").fill(password);
      await page.locator("#register").click();

      const errorText = page.locator("#errorMessageOnRegister");
      await expect(errorText).toBeVisible();
    });
  });
});
