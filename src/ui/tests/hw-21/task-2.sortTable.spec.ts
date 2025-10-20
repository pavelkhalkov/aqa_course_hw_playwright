/* 
//Task 2
Создать функцию getTableRow(page, email), которая возвращает строку в таблице по емейлу.
Например:
getTableRow(page, 'jsmith@gmail.com') => {
  "Last Name": "Smith",
  "First Name": "John",
  "Email": "jsmith@gmail.com",
  "Due": "$50.00",
  "Web Site": "http://www.jsmith.com"
}
Создайте тест, проверяющий данную функцию, используя все емейлы из таблицы 
Сайт: https://anatoly-karpovich.github.io/test-automation-sandbox/
*/

import { test, expect, Page } from "@playwright/test";

interface RowData {
  email: string;
  firstName: string;
  lastName: string;
  salary: string;
  age: string;
  occupation: string;
}

async function getTableRow(page: Page, email: string): Promise<RowData> {
  const table = page.locator(".MuiTableContainer-root table");
  await expect(table).toBeVisible();

  const emailCell = table
    .locator(`tbody td:nth-child(1):text-is("${email}")`)
    .first();
  await expect(emailCell, `Email cell '${email}' not found`).toHaveCount(1);

  const row = emailCell.locator("xpath=ancestor::tr[1]");
  const cells = row.locator("td");

  const emailText = await cells.nth(0).innerText(); 
  const firstName = await cells.nth(1).innerText();
  const lastName = await cells.nth(2).innerText(); 
  const salary = await cells.nth(3).innerText(); 
  const age = await cells.nth(4).innerText(); 
  const occupation = await cells.nth(5).innerText(); 

  return { email: emailText, firstName, lastName, salary, age, occupation };
}

test.describe("[UI]: Automation Sandbox table", () => {
  const URL = "https://anatoly-karpovich.github.io/test-automation-sandbox/";

  const expectedTable: RowData[] = [
    {
      email: "john.doe@example.com",
      firstName: "John",
      lastName: "Doe",
      salary: "$55,000",
      age: "29",
      occupation: "AQA Engineer",
    },
    {
      email: "sarah.smith@example.com",
      firstName: "Sarah",
      lastName: "Smith",
      salary: "$72,000",
      age: "34",
      occupation: "Frontend Developer",
    },
    {
      email: "alex.johnson@example.com",
      firstName: "Alex",
      lastName: "Johnson",
      salary: "$64,000",
      age: "31",
      occupation: "Backend Developer",
    },
    {
      email: "linda.williams@example.com",
      firstName: "Linda",
      lastName: "Williams",
      salary: "$48,000",
      age: "26",
      occupation: "Manual Tester",
    },
    {
      email: "michael.brown@example.com",
      firstName: "Michael",
      lastName: "Brown",
      salary: "$89,000",
      age: "41",
      occupation: "Team Lead",
    },
  ];

  test("Should find user by email", async ({ page }) => {
    
    await page.goto(URL);
    await page.locator("#sortable-table").click();
    await expect(page.locator(".MuiTableContainer-root table")).toBeVisible();

    for (const expectedRow of expectedTable) {
    const actualRow = await getTableRow(page, expectedRow.email);
    expect(actualRow).toEqual(expectedRow);
    }
  });
});
