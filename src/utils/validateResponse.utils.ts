import { APIResponse, expect } from "@playwright/test";
import { validateJsonSchema } from "./schema.utils";

export async function validateResponse(
  response: APIResponse,
  expected: {
    status: number;
    schema?: object;
    IsSuccess?: boolean;
    ErrorMessage?: string | null;
  },
) {
  expect.soft(response.status(), `Response status should be ${expected.status}`).toBe(expected.status);
  const body = await response.json();
  if (body) {
    if (expected.schema) validateJsonSchema(body, expected.schema!);
    expect.soft(body.IsSuccess, `IsSuccess should be ${expected.IsSuccess}`).toBe(true);
    expect.soft(body.ErrorMessage, `ErrorMessage should be ${expected.ErrorMessage}`).toBe(null);
  }
}