import { SALES_PORTAL_URL, USER_LOGIN, USER_PASSWORD } from "config/evnironment";
import { test as base } from "./pages.fixture";

interface IBusinessSteps {
  loginAsLocalUser(): Promise<void>;
}

export const test = base.extend<IBusinessSteps>({
  loginAsLocalUser: async ({ page, homePage }, use) => {
    await use(async () => {
      await page.goto(SALES_PORTAL_URL);
      await page.locator("#emailinput").fill(USER_LOGIN);
      await page.locator("#passwordinput").fill(USER_PASSWORD);
      await page.getByRole("button", { name: "Login" }).click();
      await homePage.waitForOpened();
    });
  },
});

export { expect } from "@playwright/test";
