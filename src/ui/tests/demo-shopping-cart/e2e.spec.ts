import { expect, Page, test } from "@playwright/test";

interface ICardData {
  name: string;
  price: number;
  amount: number;
}
const desiredProducts: ICardData[] = [
  {
    name: "Product 2",
    price: 200,
    amount: 1,
  },
  {
    name: "Product 4",
    price: 750,
    amount: 1,
  },
  {
    name: "Product 6",
    price: 1200,
    amount: 1,
  },
  {
    name: "Product 8",
    price: 1500,
    amount: 1,
  },
  {
    name: "Product 10",
    price: 2000,
    amount: 1,
  },
];

interface IPromocode {
  name: string;
  rebate: number;
}
const promocodes: IPromocode[] = [
  { name: "10-PERCENT-FOR-REDEEM", rebate: 10 },
  { name: "NO-PYTHON", rebate: 8 },
  { name: "JAVA-FOR-BOOMERS", rebate: 7 },
  { name: "5-PERCENT-FOR-UTILS", rebate: 5 },
  { name: "HOT-COURSE", rebate: 10 },
  { name: "15-PERCENT-FOR-CSS", rebate: 15 },
  { name: "HelloThere", rebate: 20 },
];

test.describe("[Demo Shopping Cart]", () => {
  test("E2E", async ({ page }) => {
    /*
    https://anatoly-karpovich.github.io/demo-shopping-cart/
  - добавить продукты 2,4,6,8,10 !
  - завалидировать бейдж с количеством !
  - открыть чекаут !
  - завалидировать сумму и продукты !
  - ввести все найденные вами промокоды (вспоминаем первую лекцию) !
  - завалидировать конечную сумму !
  - зачекаутиться
  - завалидировать сумму
  */

    const badge = page.locator("#badge-number");
    const shoppingCard = page.locator("#shopping-cart-btn");
    const checkoutTitle = page.locator("span.text-primary");

    await page.goto("https://anatoly-karpovich.github.io/demo-shopping-cart/");

    const desiredProductNames = desiredProducts.map((p) => p.name);

    await addProducts(page, desiredProductNames);
    await expect(badge, `Should have ${desiredProductNames.length} in badge`).toHaveText(
      desiredProductNames.length.toString(),
    );

    await shoppingCard.click();
    await expect(checkoutTitle).toBeVisible();

    const expectedTotalPrice = desiredProducts.reduce((sum, { price }) => sum + price, 0);
    const totalPriceLabel = page.locator("#total-price");
    await expect(totalPriceLabel, `Should have ${expectedTotalPrice} in total price`).toHaveText(
      `$${expectedTotalPrice.toFixed(2)}`,
    );

    // const product2Data = await getCardDataInCheckout(page, "Product 2");
    const actualProductsInCheckout = await getCardsData(page, desiredProductNames);
    desiredProducts.forEach((product, index) => expect(actualProductsInCheckout[index]).toEqual(product));

    await applyPromocodes(page, promocodes);

    const appliedPromocodes = await getAppliedPromocodes(page);
    appliedPromocodes.forEach((code, i) => expect(code).toEqual(promocodes[i]));

    const fullRebate = appliedPromocodes.reduce((sum, { rebate }) => sum + rebate, 0) / 100;
    const totalWithPromocodes = expectedTotalPrice * (1 - fullRebate);
    const rebateValue = expectedTotalPrice * fullRebate;

    await expect(totalPriceLabel).toHaveText(`$${totalWithPromocodes.toFixed(2)} (-$${rebateValue.toFixed(1)})`);

    const continueToCheckoutButton = page.locator("#continue-to-checkout-button");

    await continueToCheckoutButton.click();

    const totalOnCheckout = page.locator("span.text-muted");
    const finalCheckoutTitle = page.locator("h4 span.text-primary");
    const finalCheckoutBadge = page.locator("h4 span.badge");

    await expect(totalOnCheckout).toHaveText(`$${totalWithPromocodes.toFixed(2)}`);
    await expect(finalCheckoutTitle).toHaveText("Checkout");
    await expect(finalCheckoutBadge).toHaveText(desiredProducts.length.toString());
    await expect(badge).toHaveText("0");
  });
});

function addProductButton(page: Page, productName: string) {
  return page
    .locator(".card-body")
    .filter({ has: page.locator(".card-title", { hasText: productName }) })
    .getByRole("button", { name: "Add to card" });
}

async function addProducts(page: Page, productNames: string[]) {
  for (const product of productNames) {
    const p = addProductButton(page, product);
    await p.click();
  }
}

function productCardByName(page: Page, productName: string) {
  return page.locator("ul li > div[data-product-id]").filter({ has: page.locator("h5", { hasText: productName }) });
}

async function getCardDataInCheckout(page: Page, productName: string): Promise<ICardData> {
  const card = productCardByName(page, productName);
  const titleLabel = card.locator("h5");
  const priceLabel = card.locator("span.text-muted");
  const amountLabel = card.locator(`span[data-id="product-amount-in-shopping-cart"]`);

  const [name, price, amount] = await Promise.all([titleLabel, priceLabel, amountLabel].map((el) => el.innerText()));
  return {
    name: name!,
    price: +price!.replace("$", ""),
    amount: +amount!,
  };
}

async function getCardsData(page: Page, productsNames: string[]): Promise<ICardData[]> {
  return await Promise.all(productsNames.map((name) => getCardDataInCheckout(page, name)));
}

async function enterPromocode(page: Page, code: IPromocode): Promise<void> {
  //find locators for input field and button
  const input = page.locator("#rebate-input");
  const redeemButton = page.locator("#apply-promocode-button");
  //enter promocode

  await input.fill(code.name);
  //click redeed
  await redeemButton.click();
  //wait for spinner to gone

  await waitForSpinner(page);
}

async function waitForSpinner(page: Page) {
  const spinner = page.locator(".spinner-border");
  // await expect(spinner).toBeVisible({ visible: false });
  // await expect(spinner).not.toBeVisible();
  await expect(spinner).toBeHidden();
}

async function applyPromocodes(page: Page, codes: IPromocode[]) {
  for (const code of codes) {
    await enterPromocode(page, code);
  }
}

async function getAppliedPromocodes(page: Page): Promise<IPromocode[]> {
  const promocodeContainers = await page.locator("#rebates-list li").all();

  const results = [];

  for (const container of promocodeContainers) {
    const nameLocator = container.locator("span");
    const rebateLocator = container.locator("small");

    const [name, rebate] = await Promise.all([nameLocator, rebateLocator].map((el) => el.innerText()));
    results.push({
      name: name!,
      rebate: +rebate!.replaceAll(/[-%]/g, ""),
    });
  }
  return results;
}