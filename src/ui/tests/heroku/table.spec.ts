import test, { expect } from "@playwright/test";

test.describe("[Heroku App] Table", () => {
  const url = "https://the-internet.herokuapp.com/";

  test("Single Locator with more than 1 element", async ({ page }) => {
    await page.goto(url);
    const allLikns = page.locator("ul li a");

    const linksWithAInText = allLikns.filter({ hasText: "a" });
    const firstElement = allLikns.first();

    console.log(await firstElement.innerText());
    const lastElement = allLikns.last();

    console.log(await lastElement.innerText());

    const secondElement = allLikns.nth(1);
    console.log(await secondElement.innerText());

    const numberOfLinks = await allLikns.count();
    const numberOfFilteredLinks = await linksWithAInText.count();
    console.log(numberOfLinks);
    console.log(numberOfFilteredLinks);

    await expect(allLikns).toHaveCount(44);
  });

  test("Array of Locators", async ({ page }) => {
    await page.goto(url);
    const allLikns = page.locator("ul li a");
    const arrayOfLinks = await allLikns.all();

    const texts = await Promise.all(arrayOfLinks.map((link) => link.innerText()));
    console.log(texts);

    // for (const link of arrayOfLinks) {
    //   console.log(await link.innerText());
    // }
  });

  test("Parse table data", async ({ page }) => {
    const expectedTable = [
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
    await page.goto("https://the-internet.herokuapp.com/tables");
    const table = page.locator("#table1");

    const headersLocators = await table.locator("th").all();
    headersLocators.pop();
    const headers = await Promise.all(headersLocators.map((el) => el.innerText()));

    const tableRows = await table.locator("tbody tr").all();
    const tableData: Record<string, string>[] = [];
    for (const row of tableRows) {
      const cellLocators = row.locator("td").filter({ hasNot: page.locator("a") });
      const cells = await cellLocators.allInnerTexts();

      const rowData = headers.reduce<Record<string, string>>((result, header, i) => {
        result[header] = cells[i] ?? "";
        return result;
      }, {});
      tableData.push(rowData);
    }

    expect(expectedTable.length, `Number of rows in table should be ${expectedTable.length}`).toBe(tableData.length);
    expectedTable.forEach((el, i) => {
      expect(el, `Expected table row should be equal to actual`).toEqual(tableData[i]);
    });
  });
});