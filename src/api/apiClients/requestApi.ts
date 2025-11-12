import { APIRequestContext, APIResponse } from "@playwright/test";
import { IRequestOptions, IResponse } from "data/types/core.types";
import { BaseApiClient } from "./baseApiClient";
import _ from "lodash";

export class RequestApi extends BaseApiClient {
  constructor(private requestContext: APIRequestContext) {
    super();
  }

  private response: APIResponse | undefined;

  async send<T extends object | null>(options: IRequestOptions): Promise<IResponse<T>> {
    try {
      const url = options.baseURL + options.url;
      const fetchOptions = _.omit(options, ["baseURL", "url"]);
      this.response = await this.requestContext.fetch(url, fetchOptions);

      if (this.response.status() >= 500) throw new Error("Request failed with status " + this.response.status());
      return await this.transformResponse();
    } catch (err) {
      console.log((err as Error).message);
      throw err;
    }
  }

  protected async transformResponse() {
    let body;
    const contentType = this.response!.headers()["content-type"] || "";
    if (contentType.includes("application/json")) {
      body = await this.response!.json();
    } else {
      body = await this.response!.text();
    }

    return {
      status: this.response!.status(),
      body,
      headers: this.response!.headers(),
    };
  }
}