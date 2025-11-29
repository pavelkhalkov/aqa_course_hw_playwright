import { expect } from "@playwright/test";
import { LoginApi } from "api/api/login.api";
import { credentials } from "config/env";
import { STATUS_CODES } from "data/statusCodes";
import { ICredentials } from "data/types/credentials.types";
import { logStep } from "utils/report/logStep.utils";
import { validateResponse } from "utils/validation/validateResponse.utils";

export class LoginService {
  constructor(private loginApi: LoginApi) {}

  @logStep("Login as Admin via API")
  async loginAsAdmin(customCredentials?: ICredentials) {
    const response = await this.loginApi.login(customCredentials ?? credentials);
    validateResponse(response, {
      status: STATUS_CODES.OK,
      IsSuccess: true,
      ErrorMessage: null,
    });
    const headers = response.headers;
    const token = headers["authorization"]!;
    expect(token).toBeTruthy();

    return token;
  }
}