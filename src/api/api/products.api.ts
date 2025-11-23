import { IApiClient } from "api/apiClients/types";
import { apiConfig } from "config/apiConfig";
import { IRequestOptions } from "data/types/core.types";
import { IProduct, IProductResponse, IProductsResponse } from "data/types/product.types";
import { logStep } from "utils/report/logStep.utils";

export class ProductsApi {
  constructor(private apiClient: IApiClient) {}
  //post
  //put
  //get by id
  //get all
  //get with pagination
  //delete

  @logStep("POST /api/products")
  async create(product: IProduct, token: string) {
    const options: IRequestOptions = {
      baseURL: apiConfig.baseURL, //backend url
      url: apiConfig.endpoints.products, //endpoint address
      method: "post",
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      data: product,
    };
    return await this.apiClient.send<IProductResponse>(options);
  }

  @logStep("PUT /api/products/{id}")
  async update(_id: string, newProduct: IProduct, token: string) {
    const options: IRequestOptions = {
      baseURL: apiConfig.baseURL,
      url: apiConfig.endpoints.productById(_id),
      method: "put",
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      data: newProduct,
    };

    return await this.apiClient.send<IProductResponse>(options);
  }

  @logStep("GET /api/products/{id}")
  async getById(_id: string, token: string) {
    const options: IRequestOptions = {
      baseURL: apiConfig.baseURL,
      url: apiConfig.endpoints.productById(_id),
      method: "get",
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };

    return await this.apiClient.send<IProductResponse>(options);
  }

  @logStep("GET /api/products/all")
  async getAll(token: string) {
    const options: IRequestOptions = {
      baseURL: apiConfig.baseURL,
      url: apiConfig.endpoints.productsAll,
      method: "get",
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };

    return await this.apiClient.send<IProductsResponse>(options);
  }

  @logStep("DELETE /api/products")
  async delete(_id: string, token: string) {
    const options: IRequestOptions = {
      baseURL: apiConfig.baseURL,
      url: apiConfig.endpoints.productById(_id),
      method: "delete",
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };

    return await this.apiClient.send<null>(options);
  }
}