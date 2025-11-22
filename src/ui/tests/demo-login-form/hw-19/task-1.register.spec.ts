/*  
Разработайте смоук тест-сьют с тестами на REGISTER на странице https://anatoly-karpovich.github.io/demo-login-form/

  Требования:
    Страница регистрации:
      Username: обязательное, от 3 до 40 символов включительно, запрещены префиксные/постфиксные пробелы, как и имя состоящее из одних пробелов
      Password: обязательное, от 8 до 20 символов включительно, необходима хотя бы одна буква в верхнем и нижнем регистрах, пароль из одних пробелов запрещен
    Страница логина:
      Username: обязательное
      Password: обязательное
*/

import test, { expect } from "@playwright/test";

interface ICredentials {
  username: string;
  password: string;
}

enum NOTIFICATIONS {
  REGISTER_SUCCESS = "Successfully registered! Please, click Back to return on login page",
  INVALID_REGISTER_ONLY_SPACE = "Please, provide valid data",
  INVALID_REGISTER_USER_NO_PREFIX_POSTFIX = "Prefix and postfix spaces are not allowed is username",
}

test.describe("[UI] [Demo login form] REGISTER", () => {
  const validCredentials: ICredentials = {
    username: "!Admin_User",
    password: "!Admin_User!",
  };

  const validMinLengths: ICredentials = {
    username: "!Ad",
    password: "!Admin_U",
  };

  const validMaxLengths: ICredentials = {
    username: "20characters$Yg7@Lp2",
    password: "40characters#Rw9pTxV!eLjM2$CgQnaZxu@Fb1W",
  };

  const invalidCredentials: ICredentials[] = [
    {
      username: "",
      password: "",
    },
    {
      username: " !Admin_User ",
      password: validCredentials.password,
    },
  ];

  test.beforeEach(async ({ page }) => {
    const URL = "https://anatoly-karpovich.github.io/demo-login-form/";
    await page.goto(URL);

    const registerOnLogin = page.locator("#registerOnLogin");
    await registerOnLogin.click();
  });

  test("Should login with valid credentials", async ({ page }) => {
    const userNameInput = page.locator("#userNameOnRegister");
    const passwordInput = page.locator("#passwordOnRegister");
    const registerButton = page.locator("#register");
    const notification = page.locator("#errorMessageOnRegister");

    await userNameInput.fill(validCredentials.username);
    await passwordInput.fill(validCredentials.password);
    await registerButton.click();
    await expect(notification).toHaveText(NOTIFICATIONS.REGISTER_SUCCESS);
  });

  test("Should registration with MIN length characters", async ({ page }) => {
    const userNameInput = page.locator("#userNameOnRegister");
    const passwordInput = page.locator("#passwordOnRegister");
    const registerButton = page.locator("#register");
    const notification = page.locator("#errorMessageOnRegister");

    await userNameInput.fill(validMinLengths.username);
    await passwordInput.fill(validMinLengths.password);
    await registerButton.click();
    await expect(notification).toHaveText(NOTIFICATIONS.REGISTER_SUCCESS);
  });

  test("Should registration with MAX length characters", async ({ page }) => {
    const userNameInput = page.locator("#userNameOnRegister");
    const passwordInput = page.locator("#passwordOnRegister");
    const registerButton = page.locator("#register");
    const notification = page.locator("#errorMessageOnRegister");

    await userNameInput.fill(validMaxLengths.username);
    await passwordInput.fill(validMaxLengths.password);
    await registerButton.click();
    await expect(notification).toHaveText(NOTIFICATIONS.REGISTER_SUCCESS);
  });

  test("Should NOT registration with empty fields", async ({ page }) => {
    const registerButton = page.locator("#register");
    const notification = page.locator("#errorMessageOnRegister");

    await registerButton.click();
    await expect(notification).toHaveText(NOTIFICATIONS.INVALID_REGISTER_ONLY_SPACE);
  });

  test("Should NOT registration with prefix and postfix spaces", async ({page}) => {
    const userNameInput = page.locator("#userNameOnRegister");
    const passwordInput = page.locator("#passwordOnRegister");
    const registerButton = page.locator("#register");
    const notification = page.locator("#errorMessageOnRegister");

    const { username, password } = invalidCredentials[1]!;
    await userNameInput.fill(username);
    await passwordInput.fill(password);

    await registerButton.click();
    await expect(notification).toHaveText(NOTIFICATIONS.INVALID_REGISTER_USER_NO_PREFIX_POSTFIX);
  });
});
