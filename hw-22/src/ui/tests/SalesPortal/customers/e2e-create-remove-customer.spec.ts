import  { test, expect } from "fixtures/businessSteps.fixture";
import { EMPTY_TABLE_ROW_TEXT, NOTIFICATIONS } from "data/notifications.data";
import { generateCustomerData } from "data/customers/generateCustomer.data";

test.describe("[UI] [E2E] [Sales Portal]", async () => {
  test("Should add and remove customer", async ({ loginAsLocalUser, homePage, customersPage, addNewCustomerPage }) => {
    await loginAsLocalUser()
    await homePage.waitForOpened();
    await homePage.clickModuleButton("Customers");
    await customersPage.waitForOpened();
    await customersPage.clickAddNewCustomer();
    await addNewCustomerPage.waitForOpened();
    const data = generateCustomerData();
    await addNewCustomerPage.fillInputs(data);
    await addNewCustomerPage.clickSaveNewCustomer();
    await customersPage.waitForOpened();
    await customersPage.waitForNotification(NOTIFICATIONS.CUSTOMER_CREATED);
    const firstCustomerRow = await customersPage.getFirstCustomerRow();
    await customersPage.compareCreatedCustomerData(data, firstCustomerRow);
    await customersPage.clickTableAction(data.email, "delete");
    await customersPage.removeCustomerModal.waitForOpened();
    await customersPage.removeCustomerModal.clickRemove();
    await customersPage.removeCustomerModal.waitForClosed();
    await customersPage.waitForOpened();
    await customersPage.waitForNotification(NOTIFICATIONS.CUSTOMER_DELETED);
    await expect(customersPage.tableRowByEmail(data.email)).not.toBeVisible();
    customersPage.search(data.email);
    await expect(customersPage.emptyTableRow).toHaveText(EMPTY_TABLE_ROW_TEXT);
  });
})
