// Разработайте смоук тест-сьют с тестами на REGISTER на странице
// https://anatoly-karpovich.github.io/demo-login-form/

// Требования:
//     Username: обязательное, от 3 до 40 символов включительно,
//      запрещены префиксные/постфиксные пробелы, как и имя состоящее из одних пробелов
//     Password: обязательное, от 8 до 20 символов включительно,
//      необходима хотя бы одна буква в верхнем и нижнем регистрах, пароль из одних пробелов запрещен


import test, { expect } from "@playwright/test";

test.describe("[UI] [Demo login form] REGISTER", () => {
  
    const validCredentials = {
    username: "AdminUser",
    password: "AdminUser",
  };

  const validNamesMinLengts = {
    username_1: "Adm",
    password_1: "AdminPas",
  };

  const validNamesMaxLengts = {
    username_2: "20characters$Yg7@Lp2",
    password_2: "40characters#Rw9pTxV!eLjM2$CgQnaZxu@Fb1WhEtK",
  };

  const errorMessageLocator = "#errorMessageOnRegister";

  test.beforeEach(async ({ page }) => {
    await page.goto("https://anatoly-karpovich.github.io/demo-login-form/");

    const registerOnLogin = page.locator("//input[@id='registerOnLogin']");
    await registerOnLogin.click();
  });

  test("Should register with valid credentials", async ({ page }) => {
    await page.locator("//input[@id='userNameOnRegister']").fill(validCredentials.username);
    await page.locator("//input[@id='passwordOnRegister']").fill(validCredentials.password);

    const registerButton = page.locator("//input[@id='register']");
    await registerButton.click();

    const notification = page.locator(errorMessageLocator);
    await expect(notification).toHaveText("Successfully registered! Please, click Back to return on login page");
  });

  test("Check the registration with MIN length characters", async ({ page }) => {
    await page.locator("//input[@id = 'userNameOnRegister']").fill(validNamesMinLengts.username_1);
    await page.locator("//input[@id='passwordOnRegister']").fill(validNamesMinLengts.password_1);

    const registerButton = page.locator("//input[@id='register']");
    await registerButton.click();

    const errorText = page.locator("//*[@id = 'errorMessageOnRegister']");
    await expect(errorText).toHaveText("Successfully registered! Please, click Back to return on login page");
  });

  test("Check the registration with MAX length characters", async ({ page }) => {
    await page.locator("//input[@id = 'userNameOnRegister']").fill(validNamesMaxLengts.username_2);
    await page.locator("//input[@id='passwordOnRegister']").fill(validNamesMaxLengts.password_2);

    const registerButton = page.locator("//input[@id='register']");
    await registerButton.click();

    const errorText = page.locator("//*[@id = 'errorMessageOnRegister']");
    await expect(errorText).toHaveText("Successfully registered! Please, click Back to return on login page");
  });

  test ("Should register with empty fields", async ({ page }) => {
    
    const registerButton = page.locator("//input[@id='register']");
    await registerButton.click();

    const notification = page.locator(errorMessageLocator);
    await expect(notification).toHaveText("Please, provide valid data");
  });

  test("Should not register with valid Username containing prefix space", async ({page}) => {
    await page.locator("#userNameOnRegister").fill(" " + validCredentials.username);
    await page.locator("#passwordOnRegister").fill(validCredentials.password);
    await page.locator("#register").click();

    const notification = page.locator(errorMessageLocator);
    await expect(notification).toContainText("Prefix and postfix spaces are not allowed");
  });

  test("Should not register with valid Username containing postfix space", async ({page}) => {
    await page.locator("#userNameOnRegister").fill(validCredentials.username + " ");
    await page.locator("#passwordOnRegister").fill(validCredentials.password);
    await page.locator("#register").click();

    const notification = page.locator(errorMessageLocator);
    await expect(notification).toContainText("Prefix and postfix spaces are not allowed");
  });

});



