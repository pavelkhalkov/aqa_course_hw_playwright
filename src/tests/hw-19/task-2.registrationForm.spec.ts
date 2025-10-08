/* 
Создайте ОДИН смоук тест со следующими шагами:

1. Переход на страницу https://anatoly-karpovich.github.io/demo-registration-form/
2. Заполните форму регистрации
3. Проверьте, что пользователь успешно зарегистрирован 
*/

import test, { expect } from "@playwright/test";

test.describe("[UI] Registration form", () => {
  const validCredentials = {
    firstname: "John",
    lastname: "Smith",
    address: "Kansas, New Mauricio, 95922 Pagac Dam",
    emailAddress: "user@admin.com",
    phone: "+9955262231",
    country: "UK",
    gender: "male",
    hobbies1: "Travelling",
    hobbies2: "Movies",
    language: "Spanish",
    skills: ["JavaScript", "Python", "Ruby"],
    yearOfBirth: "1989",
    monthOfBirth: "December",
    dayOfBirth: "15",
    password: "user12345",
    confirmPassword: "user12345",
  };

  test.beforeEach(async ({ page }) => {
    await page.goto(
      "https://anatoly-karpovich.github.io/demo-registration-form/"
    );
  });

  test("Should registration with valid credetials", async ({ page }) => {

    const firstnameField = page.locator("#firstName");
    const lastnameField = page.locator("#lastName");
    const addressText = page.locator("#address");
    const emailField = page.locator("#email");
    const phoneField = page.locator("#phone");
    const countryDropdown = page.locator("#country");
    const radioGender = page.locator("input[name='gender'][value='male']");
    const checkboxHobbies1 = page.locator("input[class='hobby'][value='Travelling']");
    const checkboxHobbies2 = page.locator("input[class='hobby'][value='Movies']");
    const languageField = page.locator("#language");
    const skillsDropdown = page.locator("#skills");
    const yearDropdown = page.locator("#year");
    const monthDropdown = page.locator("#month");
    const dayDropdown = page.locator("#day");
    const passwordField = page.locator("#password");
    const confirmPasswordField = page.locator("#password-confirm");
    const submitButton = page.locator("button[type='submit']");

    //Registration Details
    const registrationHeader = page.locator("//div[@class='container mt-4']/h2")
    const fullName = page.locator("#fullName");
    const address = page.locator("#address");
    const email = page.locator("#email");
    const phone = page.locator("#phone");
    const country = page.locator("#country");
    const gender = page.locator("#gender");
    const language = page.locator("#language");
    const skills = page.locator("#skills");
    const hobbies = page.locator("#hobbies");
    const dateOfBirth = page.locator("#dateOfBirth");
    const password = page.locator("#password");

    await firstnameField.fill(validCredentials.firstname);
    await lastnameField.fill(validCredentials.lastname);
    await addressText.fill(validCredentials.address);
    await emailField.fill(validCredentials.emailAddress);
    await phoneField.fill(validCredentials.phone);
    await countryDropdown.selectOption({ value: validCredentials.country });
    await radioGender.check();
    await checkboxHobbies1.check();
    await checkboxHobbies2.check();
    await languageField.fill(validCredentials.language);
    await skillsDropdown.selectOption(validCredentials.skills);
    await yearDropdown.selectOption(validCredentials.yearOfBirth);
    await monthDropdown.selectOption(validCredentials.monthOfBirth);
    await dayDropdown.selectOption(validCredentials.dayOfBirth);
    await passwordField.fill(validCredentials.password);
    await confirmPasswordField.fill(validCredentials.confirmPassword);
    await submitButton.click();

    await expect(registrationHeader).toHaveText("Registration Details");
    await expect(fullName).toHaveText(`${validCredentials.firstname} ${validCredentials.lastname}`);
    await expect(address).toHaveText(validCredentials.address);
    await expect(email).toHaveText(validCredentials.emailAddress);
    await expect(phone).toHaveText(validCredentials.phone);
    await expect(country).toHaveText(validCredentials.country);
    await expect(gender).toHaveText(validCredentials.gender);
    await expect(language).toHaveText(validCredentials.language);
    await expect(skills).toHaveText(validCredentials.skills.join(", "));
    await expect(hobbies).toHaveText(`${validCredentials.hobbies1}, ${validCredentials.hobbies2}`);
    await expect(dateOfBirth).toHaveText(`${validCredentials.dayOfBirth} ${validCredentials.monthOfBirth} ${validCredentials.yearOfBirth}`);
    await expect(password).toContainText("*");
  });
});
