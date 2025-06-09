import { ICustomer } from "types/customer.types";
import { SalesPortalPage } from "../salesPortal.page";
import { expect, Locator } from "@playwright/test";
import { FilterModal } from "../modals/customers/filter.modal";
import { RemoveCustomerModal } from "../modals/customers/remove.modal";


export class CustomersPage extends SalesPortalPage {
  
  //modals
  readonly filterModal = new FilterModal(this.page);
  readonly removeCustomerModal = new RemoveCustomerModal(this.page);
  
  //header menu
  readonly addNewCustomerButton = this.page.getByRole("button", { name: "Add Customer" })
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


async clickTableAction(
    customerEmail: string,
    action: "edit" | "details" | "delete"
  ) {
    const buttons = {
      edit: this.editButton(customerEmail),
      details: this.detailsButton(customerEmail),
      delete: this.deleteButton(customerEmail),
    };

    await buttons[action].click();
  }

  //search
  readonly searchInput = this.page.locator('input[type="search"]');
  readonly searchButton = this.page.locator("#search-customer");
  readonly chipButton = this.page.locator(".chip");
  readonly searchChipButton = this.page.locator('div[data-chip-customers="search"]');

  //filter - modal window
  readonly filterButton = this.page.getByRole("button", { name: "Filter" });

  //table -headers
  readonly tableHeader = this.page.locator("#table-customers th div");
  readonly emailHeader = this.tableHeader.filter({ hasText: "Email" });
  readonly nameHeader = this.tableHeader.filter({ hasText: "Name" });
  readonly countryHeader = this.tableHeader.filter({ hasText: "Country" });
  readonly createdOnHeader = this.tableHeader.filter({ hasText: "Created On" });

  //table -row
  readonly tableRow = this.page.locator("#table-customers tbody tr");
  readonly tableRowByEmail = (email: string) => this.tableRow.filter({ has: this.page.getByText(email) });
  readonly emailCell = (email: string) => this.tableRowByEmail(email).locator("td").nth(0);
  readonly nameCell = (email: string) => this.tableRowByEmail(email).locator("td").nth(1);
  readonly countryCell = (email: string) => this.tableRowByEmail(email).locator("td").nth(2);
  readonly createdOnCell = (email: string) => this.tableRowByEmail(email).locator("td").nth(3);
  readonly editButton = (email: string) => this.tableRowByEmail(email).getByTitle("Edit");
  readonly detailsButton = (email: string) => this.tableRowByEmail(email).getByTitle("Details");
  readonly deleteButton = (email: string) => this.tableRowByEmail(email).getByTitle("Delete");
  readonly emptyTableRow = this.page.locator("td.fs-italic");


  async fillSearch(value: string | number) {
    await this.searchInput.fill(String(value));
  }

  async clickSearch() {
    await this.searchButton.click();
  }

  async search(value: string | number) {
    await this.fillSearch(value);
    await this.clickSearch();
    await this.waitForOpened();
  }
  }


