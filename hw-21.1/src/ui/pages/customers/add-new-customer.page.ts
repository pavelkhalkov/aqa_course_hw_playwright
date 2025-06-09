import { ICustomer } from "types/customer.types";
import { SalesPortalPage } from "../salesPortal.page";
import { Locator } from "@playwright/test";

export class AddNewCustomerPage extends SalesPortalPage {
  emailInput = this.page.locator("#inputEmail");
  nameInput = this.page.locator("#inputName");
  countryInput = this.page.locator("#inputCountry");
  cityInput = this.page.locator("#inputCity");
  streetInput = this.page.locator("#inputStreet");
  houseInput = this.page.locator("#inputHouse");
  flatInput = this.page.locator("#inputFlat");
  phoneInput = this.page.locator("#inputPhone");
  notesInput = this.page.locator("#textareaNotes");
  saveNewCustomerButton = this.page.locator("#save-new-customer");

  uniqueElement = this.saveNewCustomerButton;

  async fillInputs(customer: Partial<ICustomer>) {
    customer.email && (await this.emailInput.fill(customer.email));
    customer.name && (await this.nameInput.fill(customer.name));
    customer.country && (await this.countryInput.selectOption(customer.country));
    customer.city && (await this.cityInput.fill(customer.city));
    customer.street && (await this.streetInput.fill(customer.street));
    customer.house && (await this.houseInput.fill(customer.house.toString()));
    customer.flat && (await this.flatInput.fill(customer.flat.toString()));
    customer.phone && (await this.phoneInput.fill(customer.phone));
    customer.notes && (await this.notesInput.fill(customer.notes));
  }

  async clickSaveNewCustomer() {
    await this.saveNewCustomerButton.click();
  }
}
