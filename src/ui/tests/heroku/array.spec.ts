import test, { expect } from "@playwright/test";

test.describe("[UI] [Heroku] [Links]", async () => {
  test("Links array", async ({ page }) => {
    await page.goto("https://the-internet.herokuapp.com/");
    const links = await page.locator("li a").all();

    // const linksWithText = await links.filter(async (link) => {
    //   const linkText = await link.innerText();
    //   console.log(linkText.includes("B"));
    //   return linkText.includes("B");
    // });
    const liksWithB = [];
    for (const link of links) {
      const linkText = await link.innerText();
      if (linkText.includes("B")) liksWithB.push(link);
    }

    //const linksWithText = links.filter(async (el) => (await el.innerText()) !== "");
    // expect(linksWithText.length).toBe(45);

    const liksTextArray = await Promise.all(links.map((el) => el.innerText()));
    console.log(liksTextArray);
  });
});
