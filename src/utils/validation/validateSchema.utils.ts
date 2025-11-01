import { expect } from "@playwright/test";
import Ajv from "ajv";

export function validateJsonSchema(body: object, schema: object) {
  const ajv = new Ajv();
  const validate = ajv.compile(schema);

  const isValid = validate(body);

  expect.soft(isValid, `Response body should match JSON schema`).toBe(true);

  if (isValid) {
    console.log("Data is valid according to the schema.");
  } else {
    console.log("Data is not valid according to the schema.");
    console.log(validate.errors);
  }
}