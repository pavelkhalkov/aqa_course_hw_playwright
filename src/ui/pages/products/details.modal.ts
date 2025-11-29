import { IProductDetails } from "data/types/product.types";
import { SalesPortalPage } from "../salesPortal.page";
import { MANUFACTURERS } from "data/salesPortal/products/manufacturers";
import { logStep } from "utils/report/logStep.utils";

export class ProductDetailsModal extends SalesPortalPage {
  readonly uniqueElement = this.page.locator("#ProductDetailsModal");
  readonly title = this.uniqueElement.locator("h5");
  readonly closeButton = this.uniqueElement.locator("button.btn-close");
  readonly editButton = this.uniqueElement.locator("button.btn-primary");
  readonly cancelButton = this.uniqueElement.locator("button.btn-secondary");
 
  readonly productValue = this.uniqueElement.locator("p");

  @logStep("Click close button on product details modal from")
  async clickClose() {
    await this.closeButton.click();
  }

  @logStep("Click cancel button on product details modal")
  async clickCancel() {
    await this.cancelButton.click();
  }
@logStep("Click edit button on product details modal")
  async clickEdit() {
    await this.editButton.click();
  }
@logStep("Get data on product details modal")
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