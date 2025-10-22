import test, { expect } from "@playwright/test";

test.describe("[Heroku App] [Dynamic Loading]", () => {
  test("Get by text/role", async ({ page }) => {
    const url = "https://the-internet.herokuapp.com/";
    await page.goto(url);
    const link = page.getByRole("link", { name: "Dynamic Loading" });
    await link.click();
    const heading = page.getByRole("heading", {
      level: 3,
    });
    const expectedText = "Dynamically Loaded Page Elements";
    await expect(heading).toHaveText(expectedText);

    const example1 = page.getByText("Example 1", {
      exact: false,
    });
    await expect(example1).toBeInViewport();
  });

  test("Get By label", async ({ page }) => {
    const url = "https://the-internet.herokuapp.com/login";
    await page.goto(url);
    await page.getByLabel("Username").fill("tomsmith");
    await page.getByLabel("Password").fill("SuperSecretPassword!");
    await page.getByRole("button", { name: "Login" }).click();
    // await page.getByTitle('submit')
    // await page.getByAltText('')
  });

  // test("Advanced locator", async ({ page }) => {
  //   const url = "https://anatoly-karpovich.github.io/demo-login-form/";
  //   await page.goto(url);

  //   const form = page.locator("form", {
  //     // hasText: "",
  //     // hasNotText: "",
  //     has: page.locator("input#userName"),
  //   });
  //   const usernameInput = form.locator("input#userName");
  // });

  test("Codegen", async ({ page }) => {
    //npx playwright codegen https://anatoly-karpovich.github.io/demo-login-form/
    await page.goto("https://anatoly-karpovich.github.io/demo-login-form/");
    await page.getByRole("button", { name: "Register", exact: false }).click();
    await page.locator("#userNameOnRegister").click();
    await page.locator("#userNameOnRegister").fill("ololo@gmail.com");
    await page.locator("#userNameOnRegister").press("Tab");
    await page.locator("#passwordOnRegister").fill("SuperSecretPassword1");
    await page.locator("#passwordOnRegister").press("ArrowLeft");
    await page.locator("#passwordOnRegister").press("ArrowLeft");
    await page.locator("#passwordOnRegister").press("ArrowLeft");
    await page.locator("#passwordOnRegister").press("ArrowLeft");
    await page.locator("#passwordOnRegister").press("ArrowLeft");
    await page.locator("#passwordOnRegister").press("ArrowLeft");
    await page.locator("#passwordOnRegister").click();
    await page.locator("#passwordOnRegister").dblclick();
    await page.locator("#passwordOnRegister").fill("SuperPasword123!");
    await page.getByRole("button", { name: "Register" }).click();
    await page.locator("#backOnRegister").click();
  });

  test("Waits with expect", async ({ page }) => {
    const url = "https://the-internet.herokuapp.com/dynamic_loading";
    await page.goto(url);
    await page.locator(`a[href="/dynamic_loading/2"]`).click();
    await page.getByRole("button", { name: "Start" }).click();
    // const text = await page.locator("#finish").getByRole("heading", { level: 4 }).innerText();
    // console.log(text);
    const heading = page.locator("#finish").getByRole("heading", { level: 4 });
    // await expect(heading).toBeVisible({ timeout: 20000 });
    const loader = page.locator("#loading");
    await expect(loader).toBeVisible();
    // const isDisplayed = await loader.isVisible();
    // console.log(isDisplayed);
    await expect(loader, "Waiting for load bar to disappear").toBeVisible({ visible: false, timeout: 20000 });
    await expect(heading).toHaveText("Hello World!");
  });

  test("Explicit wait", async ({ page }) => {
    await page.goto("https://the-internet.herokuapp.com/dynamic_loading");
    await page.getByRole("link", { name: "Example 1" }).click();
    await page.getByRole("button", { name: "Start" }).click();
    const heading = page.locator("#finish h4");
    // await heading.waitFor({ state: "visible", timeout: 5000 });
    await expect(heading).toHaveText("Hello World!");
  });

  test("Custom waits", async ({ page }) => {
    await page.goto("https://the-internet.herokuapp.com/dynamic_controls");
    await page.getByRole("button", { name: "Remove" }).click();

    // const checkboxSelector = 'input[label="blah"]';
    //input[label="blah"] - checkbox hides
    //"#checkbox-example > button"
    //p#message - is visible

    await page.waitForFunction(
      (selectors: { checkbox: string; button: string; label: string }) => {
        const checkbox = document.querySelector(selectors.checkbox);
        // const checkbox = document.querySelector(checkboxSelector);
        const buttonText = document.querySelector(selectors.button)?.textContent;
        const message = document.querySelector(selectors.label)?.textContent;

        return !checkbox && buttonText === "Add" && message === "It's gone!";
      },
      { checkbox: 'input[label="blah"]', button: "#checkbox-example > button", label: "p#message" },
      { timeout: 10000 },
    );
  });

  test("Soft", async ({ page }) => {
    await page.goto("https://the-internet.herokuapp.com/checkboxes");
    const title = page.locator("h3");

    await expect.soft(title, 'Check "Checkboxes" title').toHaveText("Checkboxes1");
    const form = page.locator("form#checkboxes");
    const formText = await form.innerText();
    const checkboxesTexts = formText.split("\n").map((el) => el.trim());
    expect.soft(checkboxesTexts[0], 'Check text content for "Checkbox 1"').toBe("Checkbox 1");
    expect.soft(checkboxesTexts[1], 'Check text content for "Checkbox 2"').toBe("Checkbox 2");
  });
});