import { expect } from "@playwright/test";
import { Modal } from "./modal.page";

export class FilterModal extends Modal {
  readonly uniqueElement = this.page.locator(`div[role="dialog"]`);

  readonly title = this.uniqueElement.locator(".modal-title");
  readonly applyButton = this.uniqueElement.getByRole("button", { name: "Apply" });
  readonly clearFiltersButton = this.uniqueElement.getByRole("button", { name: "Clear Filters" });
  readonly closeButton = this.uniqueElement.locator('button[aria-label="Close"]');

  readonly checkbox = (name: string) => this.uniqueElement.locator(`input[value="${name}"]`);

  async checkFilters(...value: string[]) {
    for (const v of value) {
      await this.checkbox(v).check();
    }
  }

  async clickApply() {
    await this.applyButton.click();
  }

  async clickClearFilters() {
    await this.clearFiltersButton.click();
  }

  async close() {
    await this.closeButton.click();
    await expect(this.uniqueElement).not.toBeVisible();
  }
}
