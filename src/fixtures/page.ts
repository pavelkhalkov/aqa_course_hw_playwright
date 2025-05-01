import { Page } from "@playwright/test";
import { AddNewCustomerPage } from "ui/pages/customers/add-new-customer.page";
import { CustomersPage } from "ui/pages/customers/customers.page";
import { HomePage } from "ui/pages/home.page";

export class Pages {
  public homePage: HomePage;
  public customersPage: CustomersPage;
  public addNewCustomerPage: AddNewCustomerPage;
  constructor(protected page: Page) {
    this.homePage = new HomePage(page);
    this.customersPage = new CustomersPage(page);
    this.addNewCustomerPage = new AddNewCustomerPage(page);
  }
}
