import { Locator, Page } from "@playwright/test";

/**
 * @author Vallail N
 */

export class RegisterPage {
  readonly page: Page;
  private firstNameInput: Locator;
  private lastNameInput: Locator;
  private streetInput: Locator;
  private cityInput: Locator;
  private stateInput: Locator;
  private zipCodeInput: Locator;
  private phoneNumberInput: Locator;
  private ssnInput: Locator;
  private usernameInput: Locator;
  private passwordInput: Locator;
  private repeatedPasswordInput: Locator;
  private submitButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.firstNameInput = page.locator('input[name="customer.firstName"]');
    this.lastNameInput = page.locator('input[name="customer.lastName"]');
    this.streetInput = page.locator('input[name="customer.address.street"]');
    this.cityInput = page.locator('input[name="customer.address.city"]');
    this.stateInput = page.locator('input[name="customer.address.state"]');
    this.zipCodeInput = page.locator('input[name="customer.address.zipCode"]');
    this.phoneNumberInput = page.locator('input[name="customer.phoneNumber"]');
    this.ssnInput = page.locator('input[name="customer.ssn"]');
    this.usernameInput = page.locator('input[name="customer.username"]');
    this.passwordInput = page.locator('input[name="customer.password"]');
    this.repeatedPasswordInput = page.locator('input[name="repeatedPassword"]');
    this.submitButton = page.locator('input[type="submit"][value="Register"]');
  }
  async fillRegistrationForm({
    firstName,
    lastName,
    street,
    city,
    state,
    zipCode,
    phoneNumber,
    ssn,
    username,
    password,
  }: {
    firstName: string;
    lastName: string;
    street: string;
    city: string;
    state: string;
    zipCode: string;
    phoneNumber: string;
    ssn: string;
    username: string;
    password: string;
  }) {
    await this.firstNameInput.fill(firstName);
    await this.lastNameInput.fill(lastName);
    await this.streetInput.fill(street);
    await this.cityInput.fill(city);
    await this.stateInput.fill(state);
    await this.zipCodeInput.fill(zipCode);
    await this.phoneNumberInput.fill(phoneNumber);
    await this.ssnInput.fill(ssn);
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.repeatedPasswordInput.fill(password);
  }

  async submitForm() {
    await this.submitButton.click();
  }
}
