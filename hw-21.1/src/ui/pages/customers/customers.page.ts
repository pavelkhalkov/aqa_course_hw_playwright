import { ICustomer } from "types/customer.types";
import { SalesPortalPage } from "../salesPortal.page";
import { expect, Locator } from "@playwright/test";

export class CustomersPage extends SalesPortalPage {
  addNewCustomerButton = this.page.getByRole("button", { name: "Add Customer" })

 uniqueElement = this.addNewCustomerButton

async clickAddNewCustomer() {
  await this.addNewCustomerButton.click()
}

async getCustomerRowByEmail(email: string): Promise<Locator> {
  return this.page.locator(`//td[contains(text(), "${email}")]`);
}

async getFirstCustomerRow(): Promise<Locator> {
  return this.page.locator('table tbody tr').first();
}

async compareCreatedCustomerData(expectedCustomer: Partial<ICustomer>, receivedCustomerRowLocator: Locator): Promise<void> {
  const receivedObject = {
      email: await receivedCustomerRowLocator.locator('td:nth-child(1)').innerText(),
      name: await receivedCustomerRowLocator.locator('td:nth-child(2)').innerText(),
      country: await receivedCustomerRowLocator.locator('td:nth-child(3)').innerText(),
  };
  const expectedObject = {
      email: expectedCustomer.email,
      name: expectedCustomer.name,
      country: expectedCustomer.country,
  };
  expect(receivedObject).toEqual(expectedObject);
}
}
