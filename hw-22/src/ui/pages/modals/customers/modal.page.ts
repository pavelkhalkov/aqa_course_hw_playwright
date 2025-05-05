import { expect } from "@playwright/test";
import { SalesPortalPage } from "ui/pages/salesPortal.page";

export abstract class Modal extends SalesPortalPage {
  async waitForClosed() {
    await expect(this.uniqueElement).not.toBeVisible();
  }
}
