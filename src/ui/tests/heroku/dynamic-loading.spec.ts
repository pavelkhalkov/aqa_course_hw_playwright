import test, { expect } from "@playwright/test";

test.describe("[UI] [Heroku] Dynamic Loading", () => {
  test("get By Role", async ({ page }) => {
    //precondition (arrange)
    await page.goto("https://the-internet.herokuapp.com/");
    // const loginLink = page.locator('href="/dynamic_loading"');
    const dynamicLoadingLink = page.getByRole("link", { name: "Dynamic Loading", exact: true });
    await dynamicLoadingLink.click();
  });

  test("get By Text", async ({ page }) => {
    //precondition (arrange)
    await page.goto("https://the-internet.herokuapp.com/");
    // const loginLink = page.locator('href="/dynamic_loading"');
    const loginLing = page.getByText("Form Authentication", { exact: true });
    await loginLing.click();
    await page.getByRole("button", { name: "Login" }).click();
    await page.pause();
  });

  test("get By Label", async ({ page }) => {
    //precondition (arrange)
    await page.goto("https://the-internet.herokuapp.com/");
    // const loginLink = page.locator('href="/dynamic_loading"');
    const loginLing = page.getByText("Form Authentication", { exact: true });
    await loginLing.click();
    await page.getByLabel("Username").fill("tomsmith");
    await page.getByLabel("Password").fill("SuperSecretPassword!");
    await page.getByRole("button", { name: "Login" }).click();
    await page.pause();
  });

  test("get By Placeholder", async ({ page }) => {
    await page.goto("https://anatoly-karpovich.github.io/aqa-course-project/#");
    await page.getByPlaceholder("Enter a valid email address").fill("tomsmith");
    await page.getByPlaceholder("Enter password").fill("SuperSecretPassword!");
    await page.getByRole("button", { name: "Login" }).click();
  });

  test("Click start with auto-waiting", async ({ page }) => {
    //precondition (arrange)
    await page.goto("https://the-internet.herokuapp.com/");
    // const loginLink = page.locator('href="/dynamic_loading"');
    const dynamicLoadingLink = page.getByRole("link", { name: "Dynamic Loading", exact: true });
    await dynamicLoadingLink.click();
    await page.getByRole("link", { name: "Example 1" }).click();
    await page.getByRole("button", { name: "Start" }).click();
    const element = page.getByRole("heading", { name: "Hello World!" });
    // const message = await page.getByRole("heading", { name: "Hello World!" }).innerText();
    // expect(message).toBe("Hello World!");
    await expect(element).toBeVisible({ timeout: 20000 });
    await expect(element).toHaveText("Hello World!");
  });

  test("Click start with explicit waits", async ({ page }) => {
    //precondition (arrange)
    await page.goto("https://the-internet.herokuapp.com/");
    // const loginLink = page.locator('href="/dynamic_loading"');
    const dynamicLoadingLink = page.getByRole("link", { name: "Dynamic Loading", exact: true });
    await dynamicLoadingLink.click();
    await page.getByRole("link", { name: "Example 1" }).click();
    await page.getByRole("button", { name: "Start" }).click();
    const element = page.locator("#finish h4");
    await element.waitFor({ state: "visible", timeout: 20000 });
    const message = await element.innerText();
    expect(message).toBe("Hello World!");
    await expect(element).toHaveText("Hello World!");
  });

  test("Click start with pause", async ({ page }) => {
    await page.goto("https://the-internet.herokuapp.com/");
    const dynamicLoadingLink = page.getByRole("link", { name: "Dynamic Loading", exact: true });
    await dynamicLoadingLink.click();
    await page.getByRole("link", { name: "Example 1" }).click();
    await page.getByRole("button", { name: "Start" }).click();
    const element = page.locator("#finish h4");
    await page.waitForTimeout(20000);
    await expect(element).toHaveText("Hello World!");
  });

  test("Custom waits", async ({ page }) => {
    await page.goto("https://the-internet.herokuapp.com/dynamic_controls");
    await page.locator("#checkbox-example > button").click();

    //input[label="blah"] - checkbox
    //"#checkbox-example > button" - change text to "Add"
    //#checkbox-example > #message - visible

    await page.waitForFunction(
      () => {
        const checkbox = document.querySelector('input[label="blah"]');
        const buttonText = document.querySelector("#checkbox-example > button")?.textContent;
        const message = document.querySelector("#checkbox-example > #message")?.textContent;

        return !checkbox && buttonText === "Add" && message === "It's gone!";
      },
      "",
      {
        timeout: 10000,
      }
    );
  });

  test("test", async ({ page }) => {
    await page.goto("https://the-internet.herokuapp.com/");
    await page.getByRole("link", { name: "Form Authentication" }).click();
    await page.getByRole("textbox", { name: "Username" }).fill("tosmith");
    await page.getByRole("textbox", { name: "Password" }).fill("SuperSecretPassword!");
    await page.getByRole("button", { name: " Login" }).click();
    await expect(page.getByText("Your username is invalid! ×")).toBeVisible();
    await expect(page.getByRole("heading", { name: "Login Page" })).toBeVisible();
    await expect(page.locator("#flash")).toContainText("Your username is invalid! ×");
    await expect(page.getByRole("textbox", { name: "Username" })).toBeEmpty();
    await expect(page.getByRole("textbox", { name: "Password" })).toBeEmpty();
  });
});

test.describe("[UI] [Heroku] Form Authentication", () => {
  test.only("Visual Regression", async ({ page }) => {
    await page.goto("https://the-internet.herokuapp.com");
    const header = page.getByRole("heading", { name: "Welcome to the-internet" });
    await expect(header).toHaveScreenshot();
    await expect(page).toHaveScreenshot("dynamic-controls-removed.png");
  });
});
