import { IProductInTable } from "data/types/product.types";  
import { SalesPortalPage } from "../salesPortal.page";
import { MANUFACTURERS } from "data/salesPortal/products/manufacturers";
import { ProductDetailsModal } from "./details.modal"
import { DeleteProductModal } from "./delete.modal";

export class ProductsListPage extends SalesPortalPage {
  readonly detailsModal = new ProductDetailsModal(this.page);
  readonly deleteProductModal = new DeleteProductModal(this.page)
  
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

    async clickTableAction(productName: string, action: "details" | "edit" | "delete") {
    const buttons = {
      edit: this.detailsButton(productName),
      details: this.editButton(productName),
      delete: this.deleteButton(productName),
    };

    await buttons[action].click();
  }

  async getAllProductsData(): Promise<IProductInTable[]> {
  const rows = this.page.locator("table tbody tr");
  const count = await rows.count();
  const products: IProductInTable[] = [];

  for (let i = 0; i < count; i++) {
    const cells = await rows.nth(i).locator("td").allInnerTexts();
    const [name, price, manufacturer, createdOn] = cells;
    products.push({
      name: name!,
      price: +price!.replace("$", ""),
      manufacturer: manufacturer! as MANUFACTURERS,
      createdOn: createdOn!,
    });
  }

  return products;
}

}