// Разработать тест со следующими шагами:
// https://anatoly-karpovich.github.io/demo-shopping-cart/
//   - добавить продукты 2,4,6,8,10
//   - завалидировать бейдж с количеством
//   - открыть чекаут
//   - завалидировать сумму и продукты
//   - ввести все найденные вами промокоды (вспоминаем первую лекцию)
//   - завалидировать конечную сумму
//   - зачекаутиться
//   - завалидировать сумму

import test, { expect, Page } from "@playwright/test";

enum Promocodes {
  DISCOUNT20 = "HelloThere",
  DISCOUNT15 = "15-PERCENT-FOR-CSS",
  DISCOUNT10 = "HOT-COURSE",
  DISCOUNT10_BASIC = "10-PERCENT-FOR-REDEEM",
  DISCOUNT8 = "NO-PYTHON",
  DISCOUNT7 = "JAVA-FOR-BOOMERS",
  DISCOUNT5 = "5-PERCENT-FOR-UTILS",
}

const URL = "https://anatoly-karpovich.github.io/demo-shopping-cart/"

test.describe("[UI] [Demo Shopping Cart] [E2E]", async () => {
  test("Successful checkout with 5 products", async ({ page }) => {
    await page.goto(URL);

    //Add product
    await getAddToCardButton("Product 2", page).click();
    await getAddToCardButton("Product 4", page).click();
    await getAddToCardButton("Product 6", page).click();
    await getAddToCardButton("Product 8", page).click();
    await getAddToCardButton("Product 10", page).click();

    const [price2, price4, price6, price8, price10] = await Promise.all([
      getProductPrice("Product 2", page),
      getProductPrice("Product 4", page),
      getProductPrice("Product 6", page),
      getProductPrice("Product 8", page),
      getProductPrice("Product 10", page),
    ]);

    //Get total price
    const totalPrice = price2 + price4 + price6 + price8 + price10;

    //Check count
    await expect(page.locator("#badge-number")).toHaveText("5");

    //Go to shopping cart
    await page.locator("#shopping-cart-btn").click();

    //Check count in Shopping Cart
    await expect(page.locator("#amount-of-products-in-cart")).toHaveText("5");

    //Check name of products
    await expect(page.locator("h5")).toContainText([
      "Product 2",
      "Product 4",
      "Product 6",
      "Product 8",
      "Product 10",
    ]);

    //Check total price
    await expect(page.locator("#total-price")).toHaveText(
      `$${totalPrice.toFixed(2)}`
    );
    await expect(page.locator("#total-price")).toHaveText(`$5650.00`);

    //Add promo
    await addPromo(Promocodes.DISCOUNT20, page);
    await addPromo(Promocodes.DISCOUNT15, page);
    await addPromo(Promocodes.DISCOUNT10, page);
    await addPromo(Promocodes.DISCOUNT8, page);
    await addPromo(Promocodes.DISCOUNT7, page);
    await addPromo(Promocodes.DISCOUNT5, page);
    await addPromo(Promocodes.DISCOUNT10_BASIC, page);

    //Check price after discount
    const finalDiscount = await getDiscount(page);
    const finalPriceWithDiscount = totalPrice * (1 - finalDiscount / 100);
    const discount = totalPrice - finalPriceWithDiscount;
    await expect(page.locator("#total-price")).toHaveText(
      `$${finalPriceWithDiscount.toFixed(2)} (-$${discount})`
    );

    //Go to checkout
    await page.locator("#continue-to-checkout-button").click();
    await expect(page.locator("span.text-muted")).toHaveText(
      `$${finalPriceWithDiscount.toFixed(2)}`
    );
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

async function addPromo(promo: Promocodes, page: Page) {
  await page.waitForSelector("#rebate-input");
  await page.locator("#rebate-input").fill(promo);
  await page.getByRole("button", { name: "Redeem" }).click();
  await page.waitForTimeout(500);
}

async function getDiscount(page: Page) {
  const formDiscount = page.locator("#rebates-container");
  const dataDiscount = formDiscount
      .locator("#rebates-list")
      .locator("small");
  const textDiscount = await dataDiscount.allTextContents();
  return textDiscount.reduce(
    (sum: number, text) => sum + +text.replace("-", "").replace("%", ""),
    0
  );
}
