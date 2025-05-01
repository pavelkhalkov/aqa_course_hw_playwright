import test, { expect, Page } from "@playwright/test";

test.describe("[UI] [Demo Shopping Cart] [E2E]", async () => {
  test("Successfull checkout with 3 products", async ({ page }) => {
    await page.goto("https://anatoly-karpovich.github.io/demo-shopping-cart/");
    //card container selector = 'div.card'
    //button selector by product name = '//div[@class="card-body"][./h5[.="Product 1"]]//button'

    // const product1button = page
    //   .locator("div.card-body")
    //   .filter({
    //     has: page.getByText("Product 1", { exact: true }),
    //   })
    //   .getByRole("button", { name: "Add to card" });

    await getAddToCardButton("Product 1", page).click();
    await getAddToCardButton("Product 3", page).click();
    await getAddToCardButton("Product 5", page).click();

    // const prices = {
    //   product1: await getProductPrice("Product 1", page),
    //   product3: await getProductPrice("Product 3", page),
    //   product5: await getProductPrice("Product 5", page),
    // };

    const [price1, price3, price5] = await Promise.all([
      getProductPrice("Product 1", page),
      getProductPrice("Product 3", page),
      getProductPrice("Product 5", page),
    ]);

    const total = price1 + price3 + price5;

    await expect(page.locator("#badge-number")).toHaveText("3");

    await page.getByRole("button", { name: "Shopping Cart" }).click();

    await expect(page.locator("#total-price")).toHaveText(`$${total}.00`);
  });
});

function getAddToCardButton(productName: string, page: Page) {
  return page
    .locator("div.card-body")
    .filter({
      has: page.getByText(productName, { exact: true }),
    })
    .getByRole("button", { name: "Add to card" });
}

function getProductPriceSpan(productName: string, page: Page) {
  return page
    .locator("div.card-body")
    .filter({
      has: page.getByText(productName, { exact: true }),
    })
    .locator("span");
}

async function getProductPrice(productName: string, page: Page): Promise<number> {
  const productPriceSpan = getProductPriceSpan(productName, page);
  const priceText = await productPriceSpan.innerText();
  const price = priceText.replace("$", "");
  return +price;
}
