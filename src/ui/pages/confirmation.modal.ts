import { logStep } from "utils/report/logStep.utils";
import { BaseModal } from "./base.modal";

export class ConfirmationModal extends BaseModal {
  readonly uniqueElement = this.page.locator('[name="confirmation-modal"]');

  readonly title = this.uniqueElement.locator("h5");
  readonly confirmButton = this.uniqueElement.locator("button.btn-danger");
  readonly cancelButton = this.uniqueElement.locator("button.btn-secondary");
  readonly closeButton = this.uniqueElement.locator("button.btn-close");
  readonly confirmationMessage = this.uniqueElement.locator("div.modal-body p");

  @logStep("Click close button on Modal form")
  async clickClose() {
    await this.closeButton.click();
  }
@logStep("Click cancel button on Modal form")
  async clickCancel() {
    await this.cancelButton.click();
  }
@logStep("Click confirm button on Modal form")
  async clickConfirm() {
    await this.confirmButton.click();
  }
}