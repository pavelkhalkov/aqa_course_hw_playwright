import { SalesPortalPage } from "../salesPortal.page";

export class DeleteProductModal extends SalesPortalPage {
  readonly modalContainer = this.page.locator("div[role='dialog']");
  readonly title = this.page.locator(".modal-title");
  readonly closeButton = this.modalContainer.locator("//button[aria-label='Close']")
  readonly cancelButton = this.modalContainer.getByRole("button", {name: "Cancel"})
  readonly deleteButton = this.modalContainer.getByRole("button", {name: "Yes, Delete"}) 

  uniqueElement = this.deleteButton;

  async clickClose() {
    await this.closeButton.click();
  }

  async clickDelete() {
    await this.deleteButton.click();
  }

  async clickCancel() {
    await this.cancelButton.click();
  }

  async waitForOpened() {
    await this.uniqueElement.waitFor({ state: "visible" });
  }

  async waitForClosed() {
    await this.uniqueElement.waitFor({ state: "hidden" });
  }
}
