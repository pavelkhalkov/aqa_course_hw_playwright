import { test as ui } from "./pages.fixture";
import { test as api } from "./api.fixture";
import { test as mock } from "./mock.fixture";
import { mergeTests, expect } from "@playwright/test";

const test = mergeTests(ui, api, mock);

export { test, expect };
