// Создайте ОДИН смоук тест со следующими шагами:

// 1. Переход на страницу https://anatoly-karpovich.github.io/demo-registration-form/
// 2. Заполните форму регистрации
// 3. Проверьте , что пользователь успешно зарегистрирован

import { test, expect } from "@playwright/test";

test.describe("[UI] Registration", () => {
  const validCredentials = {
    firstname: "Al",
    lastname: "Koch",
    adress: "Kansas, New Mauricio, 95922 Pagac Dam",
    email: "user@gmail.com",
    phone: "123456789",
    country: "UK",
    gender: "male",
    hobbies1: "Travelling",
    hobbies2: "Movies",
    language: "British",
    skills: ["JavaScript", "Python", "Ruby"],
    yearOfBirth: "1989",
    monthOfBirth: "December",
    dayOfBirth: "15",
    password: "password1",
  };

  test.beforeEach(async ({ page }) => {
    await page.goto(
      "https://anatoly-karpovich.github.io/demo-registration-form/"
    );
  });

  //registration form fields
  const fieldFirstname = "#firstName";
  const fieldLastname = "#lastName";
  const textareaAddress = "#address";
  const fieldEmail = "#email";
  const fieldPhone = "#phone";
  const dropdownCountry = "#country";
  const radioGender = `input[name='gender'][value='${validCredentials.gender}']`;
  const checkboxHobbies1 = `input[class='hobby'][value='${validCredentials.hobbies1}']`;
  const checkboxHobbies2 = `input[class='hobby'][value='${validCredentials.hobbies2}']`;
  const fieldLanguage = "#language";
  const dropdownSkills = "#skills";
  const dropdownYear = "#year";
  const dropdownMonth = "#month";
  const dropdownDay = "#day";
  const fieldPassword = "#password";
  const fieldPasswordConfirm = "#password-confirm";
  const buttonSubmit = "button[type='submit']";

  test("Smoke | Should registrate with valid credentials", async ({ page }) => {
    await page.locator(fieldFirstname).fill(validCredentials.firstname);
    await page.locator(fieldLastname).fill(validCredentials.lastname);
    await page.locator(textareaAddress).fill(validCredentials.adress);
    await page.locator(fieldEmail).fill(validCredentials.email);
    await page.locator(fieldPhone).fill(validCredentials.phone);
    await page.locator(dropdownCountry).selectOption({ value: validCredentials.country });
    await page.locator(radioGender).check();
    await page.locator(checkboxHobbies1).check();
    await page.locator(checkboxHobbies2).check();
    await page.locator(fieldLanguage).fill(validCredentials.language);
    await page.locator(dropdownSkills).selectOption(validCredentials.skills);
    await page
      .locator(dropdownYear)
      .selectOption({ value: validCredentials.yearOfBirth });
    await page
      .locator(dropdownMonth)
      .selectOption({ value: validCredentials.monthOfBirth });
    await page
      .locator(dropdownDay)
      .selectOption({ value: validCredentials.dayOfBirth });
    await page.locator(fieldPassword).fill(validCredentials.password);
    await page.locator(fieldPasswordConfirm).fill(validCredentials.password);

    await page.locator(buttonSubmit).click();

    //assert
    await expect(page.locator("h2")).toHaveText("Registration Details");
    await expect(page.locator("#fullName")).toHaveText(
      `${validCredentials.firstname} ${validCredentials.lastname}`
    );
    await expect(page.locator("#address")).toHaveText(
      `${validCredentials.adress}`
    );
    await expect(page.locator("#email")).toHaveText(
      `${validCredentials.email}`
    );
    await expect(page.locator("#phone")).toHaveText(
      `${validCredentials.phone}`
    );
    await expect(page.locator("#country")).toHaveText(
      `${validCredentials.country}`
    );
    await expect(page.locator("#gender")).toHaveText(
      `${validCredentials.gender}`
    );
    await expect(page.locator("#language")).toHaveText(
      `${validCredentials.language}`
    );
    await expect(page.locator("#skills")).toHaveText(
      `${validCredentials.skills.join(", ")}`
    );
    await expect(page.locator("#hobbies")).toHaveText(
      `${validCredentials.hobbies1}, ${validCredentials.hobbies2}`
    );
    await expect(page.locator("#dateOfBirth")).toHaveText(
      `${validCredentials.dayOfBirth} ${validCredentials.monthOfBirth} ${validCredentials.yearOfBirth} `
    );
    const passwordMask = await page.locator("#password").innerText();
    await expect(passwordMask).toBe(
      "*".repeat(validCredentials.password.length)
    );
  });
});