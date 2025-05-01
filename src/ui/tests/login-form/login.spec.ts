import test, { expect } from "@playwright/test";

/*

  Требования:
  Страница регистрации:
  Username: обязательное, от 3 до 40 символов включительно, 
    запрещены префиксные/постфиксные пробелы, как и имя состоящее из одних пробелов,
  Password: обязательное, от 8 до 20 символов включительно, 
    необходима хотя бы одна буква в верхнем и нижнем регистрах, пароль из одних пробелов запрещен
*/

// test.describe("[UI] [Demo Login Form] Registration", () => {
//   test("Successfully registered with min valid data", async ({ page }) => {
//     await page.goto("https://anatoly-karpovich.github.io/demo-login-form/");
//     await page.locator("#registerOnLogin").click();
//     await page.locator("#userNameOnRegister").fill("aB!");
//     await page.locator("#passwordOnRegister").fill("123AAbb!");
//     await page.locator("#register").click();
//     await expect(page.locator("#errorMessageOnRegister")).toHaveText(
//       "Successfully registered! Please, click Back to return on login page"
//     );
//   });

//   test("Successfully registered with max valid data", async ({ page }) => {
//     await page.goto("https://anatoly-karpovich.github.io/demo-login-form/");
//     await page.locator("#registerOnLogin").click();
//     await page.locator("#userNameOnRegister").fill("aB!11111111111111111111");
//     await page.locator("#passwordOnRegister").fill("123AAbb!111111111111");
//     await page.locator("#register").click();
//     await expect(page.locator("#errorMessageOnRegister")).toHaveText(
//       "Successfully registered! Please, click Back to return on login page"
//     );
//   });
// });

interface IRegistrationTestData {
  testName: string;
  username: string;
  password: string;
  message: string;
}

const registrationValidTestData: IRegistrationTestData[] = [
  {
    testName: "Successfully registered with max valid data",
    username: "aB!11111111111111111111",
    password: "123AAbb!111111111111",
    message: "Successfully registered! Please, click Back to return on login page",
  },
  {
    testName: "Successfully registered with min valid data",
    username: "aB!",
    password: "123AAbb!",
    message: "Successfully registered! Please, click Back to return on login page",
  },
];

test.describe("[UI] [Demo Login Form] [Registration] Positive scenarios", () => {
  // registrationValidTestData.forEach(({ testName, username, password, message }) => {
  //   test(testName, async ({ page }) => {
  //     await page.goto("https://anatoly-karpovich.github.io/demo-login-form/");
  //     await page.locator("#registerOnLogin").click();
  //     await page.locator("#userNameOnRegister").fill(username);
  //     await page.locator("#passwordOnRegister").fill(password);
  //     await page.locator("#register").click();
  //     await expect(page.locator("#errorMessageOnRegister")).toHaveText(message);
  //     const localStorageData = await page.evaluate((username: string) => {
  //       return window.localStorage.getItem(username);
  //     }, username);
  //     expect(localStorageData).toBeTruthy();
  //     const user = JSON.parse(localStorageData!);
  //     expect(user).toMatchObject({
  //       name: username,
  //       password,
  //     });
  //   });
  // });

  registrationValidTestData.forEach(({ testName, username, password, message }) => {
    test(testName, async ({ page }) => {
      await page.goto("https://anatoly-karpovich.github.io/demo-login-form/");
      await page.locator("#registerOnLogin").click();
      const form = page.locator(".registerForm");
      await form.locator("#userNameOnRegister").fill(username);
      await form.locator("#passwordOnRegister").fill(password);
      await form.locator("#register").click();
      await expect(form.locator("#errorMessageOnRegister")).toHaveText(message);
      const localStorageData = await page.evaluate((username: string) => {
        return window.localStorage.getItem(username);
      }, username);
      expect(localStorageData).toBeTruthy();
      const user = JSON.parse(localStorageData!);
      expect(user).toMatchObject({
        name: username,
        password,
      });
    });
  });
});
