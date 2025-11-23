import { Page } from "@playwright/test";
import { HomeModuleButton, HomePage } from "ui/pages/home.page";
import { ProductsListPage } from "ui/pages/products/productsList.page";
import { logStep } from "utils/report/logStep.utils";

export class HomeUIService {
  homePage: HomePage;
  productsListPage: ProductsListPage;
  constructor(private page: Page) {
    this.homePage = new HomePage(page);
    this.productsListPage = new ProductsListPage(page);
  }

@logStep("Open module on Home page")
  async openModule(moduleName: HomeModuleButton) {
    await this.homePage.clickOnViewModule(moduleName);

    if (moduleName === "Products") {
      await this.productsListPage.waitForOpened();
    }
  }

  @logStep ("Open Home page and wait for loading")
    async openAsLoggedInUser() {
    await this.homePage.open();
    await this.homePage.waitForOpened();
  }
}