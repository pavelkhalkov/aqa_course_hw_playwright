import { expect, Page } from "@playwright/test";
import { apiConfig } from "config/apiConfig";
import { generateProductData } from "data/salesPortal/products/generateProductData";
import { STATUS_CODES } from "data/statusCodes";
import { IProduct, IProductResponse } from "data/types/product.types";
import _ from "lodash";
import { AddNewProductPage, ProductsListPage } from "ui/pages/products";
import { logStep } from "utils/report/logStep.utils";

export class AddNewProductUIService {
  addNewProductPage: AddNewProductPage;
  productsListPage: ProductsListPage;

  constructor(private page: Page) {
    this.addNewProductPage = new AddNewProductPage(page);
    this.productsListPage = new ProductsListPage(page);
  }

  @logStep("Open add new product page")
  async open() {
    await this.addNewProductPage.open("products/add");
    await this.addNewProductPage.waitForOpened();
  }

   @logStep("Create a product through user interface")
  async create(productData?: Partial<IProduct>) {
    const data = generateProductData(productData);
    await this.addNewProductPage.fillForm(data);
    const response = await this.addNewProductPage.interceptResponse<IProductResponse, any>(
      apiConfig.endpoints.products,
      this.addNewProductPage.clickSave.bind(this.addNewProductPage),
    );
    expect(response.status).toBe(STATUS_CODES.CREATED);
    expect(_.omit(response.body.Product, "_id", "createdOn")).toEqual(data);

    await this.productsListPage.waitForOpened();
    return response.body.Product;
  }
}