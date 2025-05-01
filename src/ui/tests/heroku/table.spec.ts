import test, { expect } from "@playwright/test";

const expected = [
  {
    "Last Name": "Smith",
    "First Name": "John",
    Email: "jsmith@gmail.com",
    Due: "$50.00",
    "Web Site": "http://www.jsmith.com",
  },
  {
    "Last Name": "Bach",
    "First Name": "Frank",
    Email: "fbach@yahoo.com",
    Due: "$51.00",
    "Web Site": "http://www.frank.com",
  },
  {
    "Last Name": "Doe",
    "First Name": "Jason",
    Email: "jdoe@hotmail.com",
    Due: "$100.00",
    "Web Site": "http://www.jdoe.com",
  },
  {
    "Last Name": "Conway",
    "First Name": "Tim",
    Email: "tconway@earthlink.net",
    Due: "$50.00",
    "Web Site": "http://www.timconway.com",
  },
];

test.describe("[UI] [Heroku] [Table]", async () => {
  test("Check table 1", async ({ page }) => {
    await page.goto("https://the-internet.herokuapp.com/tables");
    const table = page.locator("#table1");
    const headers = await table.locator("thead th").allInnerTexts();
    headers.pop();

    const rows = await table.locator("tbody tr").all();

    const actualTableData = await Promise.all(
      rows.map(async (row) => {
        const cellTexts = await row.locator("td").allInnerTexts();
        cellTexts.pop();

        return cellTexts.reduce((rowObject, cell, index) => {
          rowObject[headers[index]] = cell;
          return rowObject;
        }, {} as Record<string, string>);
      })
    );

    // expect(actualTableData[0]).toMatchObject(expected[0]);

    expect(actualTableData.length, `Number of rows in actual table should be equal to expected`).toBe(expected.length);
    actualTableData.forEach((rowObject, index) => {
      expect.soft(rowObject).toMatchObject(expected[index]);
    });
  });
});
