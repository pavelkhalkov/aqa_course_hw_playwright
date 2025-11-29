// import { ICredentials } from "data/types/credentials.types";
// import { SalesPortalPage } from "./salesPortal.page";
// import { Locator } from "@playwright/test";
// import { expect } from "@playwright/test";

// export class SignInPage extends SalesPortalPage {
//   readonly emailInput = this.page.locator("#emailinput");
//   readonly passwordInput = this.page.locator("#passwordinput");
//   readonly loginButton = this.page.locator("button[type='submit']");

//   readonly uniqueElement: Locator = this.loginButton;

// async waitForOpened() {
//   await expect(this.emailInput).toBeVisible()
// }

//   async fillCredentials(credentials: Partial<ICredentials>) {
//     if (credentials.username) await this.emailInput.fill(credentials.username);
//     if (credentials.password)
//       await this.passwordInput.fill(credentials.password);
//   }

//   async clickLoginButton() {
//     await this.loginButton.click();
//   }

//   async signIn(creds: ICredentials) {
//     await this.fillCredentials(creds);
//     await this.clickLoginButton();
//   }
// }


import { ICredentials } from "data/types/credentials.types";
import { SalesPortalPage } from "./salesPortal.page";
import { logStep } from "utils/report/logStep.utils";

export class LoginPage extends SalesPortalPage {
  readonly emailInput = this.page.locator("#emailinput");
  readonly passwordInput = this.page.locator("#passwordinput");
  readonly loginButton = this.page.locator("button[type='submit']");
  readonly uniqueElement = this.page.locator("#signInPage");


  @logStep("Fill credentials")
  async fillCredentials(credentials: Partial<ICredentials>) {
    if (credentials.username) await this.emailInput.fill(credentials.username);
    if (credentials.password) await this.passwordInput.fill(credentials.password);
  }

  @logStep("Click on login button")
  async clickLogin() {
    await this.loginButton.click();
  }
}