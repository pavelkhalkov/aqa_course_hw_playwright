import { expect, Locator } from "@playwright/test";
import { BasePage } from "./base.page";
import { SALES_PORTAL_URL } from "config/env";
import { logStep } from "utils/report/logStep.utils";

export abstract class SalesPortalPage extends BasePage {
  readonly spinner = this.page.locator(".spinner-border");
  readonly toastMessage = this.page.locator(".toast-body");
  abstract readonly uniqueElement: Locator;

  @logStep("Wait for unique element opened")
  async waitForOpened() {
    await expect(this.uniqueElement).toBeVisible();
  //  await expect(this.spinner).toHaveCount(0);
  }

  @logStep("Open page")
 async open(route?: string) {
    await this.page.goto(SALES_PORTAL_URL + route);
  }

}