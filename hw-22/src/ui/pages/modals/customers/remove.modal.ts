import { expect } from "@playwright/test";
import { Modal } from "./modal.page";

export class RemoveCustomerModal extends Modal {
    readonly uniqueElement = this.page.locator(`div[role="dialog"]`);
  
    readonly title = this.uniqueElement.locator(".modal-title");
    readonly modalContainer = this.page.locator(`div[role="dialog"]`);
    readonly removeButton = this.modalContainer.getByRole("button", { name: "Yes, Delete" });
    readonly cancelButton = this.modalContainer.getByRole("button", { name: "Cancel" });
    readonly closeButton = this.uniqueElement.locator('button[aria-label="Close"]');
 
async clickRemove() {
    await this.removeButton.click();
    }
  
async clickCancel() {
    await this.cancelButton.click();
    }

async close() {
    await this.closeButton.click();
    await expect(this.uniqueElement).not.toBeVisible();
    }
}
