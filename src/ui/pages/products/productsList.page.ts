import { IProductInTable } from "data/types/product.types";  
import { SalesPortalPage } from "../salesPortal.page";
import { MANUFACTURERS } from "data/salesPortal/products/manufacturers";
import { ProductDetailsModal } from "./details.modal"
 
export class ProductsListPage extends SalesPortalPage {
  readonly detailsModal = new ProductDetailsModal(this.page);

  readonly productsPageTitle = this.page.locator("h2.fw-bold");
  readonly addNewProductButton = this.page.locator('[name="add-button"]');
  readonly tableRow = this.page.locator("tbody tr");
  readonly tableRowByName = (productName: string) =>
  this.page.locator("table tbody tr", { has: this.page.locator("td", { hasText: productName }) });

  readonly tableRowByIndex = (index: number) => this.page.locator("table tbody tr").nth(index);
  readonly nameCell = (productName: string) => this.tableRowByName(productName).locator("td").nth(0);
  readonly priceCell = (productName: string) => this.tableRowByName(productName).locator("td").nth(1);
  readonly manufacturerCell = (productName: string) => this.tableRowByName(productName).locator("td").nth(2);

  readonly uniqueElement = this.addNewProductButton;

  readonly editButton = (productName: string) => this.tableRowByName(productName).getByTitle("Edit");
  readonly detailsButton = (productName: string) => this.tableRowByName(productName).getByTitle("Details");
  readonly deleteButton = (productName: string) => this.tableRowByName(productName).getByTitle("Delete");

  async clickAddNewProduct() {
    await this.addNewProductButton.click();
  }

   async sortByCreatedDesc() {
    const headerList = this.page.locator("th", { hasText: "Created On" });
    await headerList.click(); 
  }

  topRow() {
    return this.page.locator("table tbody tr").first();
  }

  async getProductData(productName: string): Promise<IProductInTable> {
    const [name, price, manufacturer, createdOn] = await this.tableRowByName(productName).locator("td").allInnerTexts();
    return {
      name: name!,
      price: +price!.replace("$", ""),
      manufacturer: manufacturer! as MANUFACTURERS,
      createdOn: createdOn!,
    };
  }

}