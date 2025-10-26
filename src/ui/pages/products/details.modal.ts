import { IProductDetails } from "data/types/product.types";
import { SalesPortalPage } from "../salesPortal.page";
import { MANUFACTURERS } from "data/salesPortal/products/manufacturers";

export class ProductDetailsModal extends SalesPortalPage {
  readonly uniqueElement = this.page.locator("#ProductDetailsModal");

  readonly title = this.uniqueElement.locator("h5");
  readonly closeButton = this.uniqueElement.locator("button.btn-close");
  readonly editButton = this.uniqueElement.locator("button.btn-primary");
  readonly cancelButton = this.uniqueElement.locator("button.btn-secondary");

  readonly productValue = this.uniqueElement.locator("p");

  async clickClose() {
    await this.closeButton.click();
  }

  async clickCancel() {
    await this.cancelButton.click();
  }

  async clickEdit() {
    await this.editButton.click();
  }

  async getData(): Promise<IProductDetails> {
    const [name, amount, price, manufacturer, createdOn, notes] = await this.productValue.allInnerTexts();

    return {
      name: name!,
      amount: +amount!,
      price: +price!,
      manufacturer: manufacturer! as MANUFACTURERS,
      createdOn: createdOn!,
      notes: notes === "-" ? "" : notes!,
    };
  }
}