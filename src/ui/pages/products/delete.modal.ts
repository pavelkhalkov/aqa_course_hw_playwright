import { logStep } from "utils/report/logStep.utils";
import { SalesPortalPage } from "../salesPortal.page";

export class DeleteProductModal extends SalesPortalPage {
  readonly modalContainer = this.page.locator("div[role='dialog']");
  readonly title = this.page.locator(".modal-title");
  readonly closeButton = this.modalContainer.locator("//button[aria-label='Close']")
  readonly cancelButton = this.modalContainer.getByRole("button", {name: "Cancel"})
  readonly deleteButton = this.modalContainer.getByRole("button", {name: "Yes, Delete"}) 

  uniqueElement = this.deleteButton;

  @logStep("Click close button on Product modal form")
  async clickClose() {
    await this.closeButton.click();
  }

  @logStep("Click delete button on Product modal form")
  async clickDelete() {
    await this.deleteButton.click();
  }

  @logStep("Click cancel button on Product modal form")
  async clickCancel() {
    await this.cancelButton.click();
  }

  @logStep("Wait for open on the Product modal form")
  async waitForOpened() {
    await this.uniqueElement.waitFor({ state: "visible" });
  }
@logStep("Wait for close on the Product modal form")
  async waitForClosed() {
    await this.uniqueElement.waitFor({ state: "hidden" });
  }
}
