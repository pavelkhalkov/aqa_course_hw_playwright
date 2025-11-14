import { Locator } from "@playwright/test";
import { SalesPortalPage } from "./salesPortal.page";
import { OrdersMetrics, ModuleName, } from "data/types/home.types";
import numeral from "numeral";

export type HomeModuleButton = "Products" | "Customers" | "Orders";

export class HomePage extends SalesPortalPage {
  readonly welcomeText = this.page.locator(".welcome-text");
  readonly productsButton = this.page.locator("#products-from-home");
  readonly customersButton = this.page.locator("#customers-from-home");
  readonly ordersButton = this.page.locator("#orders-from-home");
  readonly uniqueElement = this.welcomeText;

  async clickOnViewModule(module: HomeModuleButton) {
    const moduleButtons: Record<HomeModuleButton, Locator> = {
      Products: this.productsButton,
      Customers: this.customersButton,
      Orders: this.ordersButton,
    };

    await moduleButtons[module].click();
  }

  //Business Metrics Overview
  readonly totalOrders = this.page.locator("#total-orders-container .card-text");
  readonly totalRevenue = this.page.locator("#total-revenue-container .card-text");
  readonly totalNewCustomers = this.page.locator("#total-customers-container .card-text");
  readonly averageOrderValue = this.page.locator("#avg-orders-value-container .card-text");
  readonly totalCanceledOrders = this.page.locator("#canceled-orders-container .card-text");

   async getMetricsOrders(): Promise<OrdersMetrics> {
    // получаем  текст из  metrics
    const [totalOrders, totalRevenue, totalCanceledOrders, averageOrderValue] = await Promise.all([
      this.totalOrders.innerText(), 
      this.totalRevenue.innerText(),
      this.totalCanceledOrders.innerText(),
      this.averageOrderValue.innerText(),
    ]);
    return {
      totalOrders: +totalOrders, 
      totalRevenue: numeral(totalRevenue.trim()).value() ?? 0,
      totalCanceledOrders: +totalCanceledOrders,
      averageOrderValue: numeral(averageOrderValue.trim()).value() ?? 0,
    };
  }
}