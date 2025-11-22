import { IProduct } from "data/types/product.types";
import { SalesPortalPage } from "./salesPortal.page";

export class EditProductPage extends SalesPortalPage {
  readonly title = this.page.locator("#title h2");
  readonly nameInput = this.page.locator("#inputName");
  readonly manufacturerSelect = this.page.locator("#inputManufacturer");
  readonly priceInput = this.page.locator("#inputPrice");
  readonly amountInput = this.page.locator("#inputAmount");
  readonly notesInput = this.page.locator("#textareaNotes");
  readonly saveChangesBtn = this.page.locator("#save-product-changes");
  readonly deleteProductBtn = this.page.locator("delete-product-btn");

  readonly uniqueElement = this.title;

  async fillForm(productData: Partial<IProduct>) {
    if (productData.name) await this.nameInput.fill(productData.name);
    if (productData.manufacturer) await this.manufacturerSelect.selectOption(productData.manufacturer);
    if (productData.price) await this.priceInput.fill(productData.price.toString());
    if (productData.amount) await this.amountInput.fill(productData.amount.toString());
    if (productData.notes) await this.notesInput.fill(productData.notes);
  }

  async clickSaveChanges() {
    await this.saveChangesBtn.click();
  }

  async clickDelete() {
    await this.deleteProductBtn.click();
  }
}
