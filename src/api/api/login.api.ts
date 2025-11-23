import { IApiClient } from "api/apiClients/types";
import { apiConfig } from "config/apiConfig";
import { IRequestOptions } from "data/types/core.types";
import { ICredentials, ILoginResponse } from "data/types/credentials.types";
import { logStep } from "utils/report/logStep.utils";

export class LoginApi {
  constructor(private apiClient: IApiClient) {}

  @logStep("POST /api/login")
  async login(credentials: ICredentials) {
    const options: IRequestOptions = {
      baseURL: apiConfig.baseURL,
      url: apiConfig.endpoints.login,
      method: "post",
      headers: {
        "content-type": "application/json",
      },
      data: credentials,
    };

    return await this.apiClient.send<ILoginResponse>(options);
  }
}