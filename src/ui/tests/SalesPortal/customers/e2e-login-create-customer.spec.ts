    import  { test } from "fixtures/businessSteps.fixture";
    import { NOTIFICATIONS } from "data/notifications.data";
    import { generateCustomerData } from "data/customers/generateCustomer.data";

    test.describe("[UI] [E2E] signIn and customer creation", async () => {
        test("Should create a new customer and verify creation notification and table entry", async ({ loginAsLocalUser, homePage, customersPage, addNewCustomerPage }) => {
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
    });
    });
