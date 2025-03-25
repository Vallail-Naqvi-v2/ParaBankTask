import { Page, Locator, expect } from "@playwright/test";

interface BillPaymentDetails {
  payeeName: string;
  payeeStreet: string;
  payeeCity: string;
  payeeState: string;
  payeeZipCode: string;
  payeePhoneNumber: string;
  payeeAccountNumber: string;
  verifyAccount: string;
  amount: string;
}

export class BillPayPage {
  readonly page: Page;

  private sendPaymentButton: Locator;
  private payeeNameInput: Locator;
  private payeeAddressStreetInput: Locator;
  private payeeAddressCityInput: Locator;
  private payeeAddressStateInput: Locator;
  private payeeAddressZipCodeInput: Locator;
  private payeePhoneNumberInput: Locator;
  private payeeAccountNumberInput: Locator;
  private verifyAccountInput: Locator;
  private amountInput: Locator;
  private paymentSuccessHeading: Locator;
  private billPayLink: Locator;

  constructor(page: Page) {
    this.page = page;

    // Initialize locators for the bill payment page elements
    this.sendPaymentButton = page.locator('input[type="button"][value="Send Payment"]');
    this.billPayLink = page.locator('a[name="Bill Pay"]');
    this.payeeNameInput = page.locator('input[name="payee.name"]');
    this.payeeAddressStreetInput = page.locator('input[name="payee.address.street"]');
    this.payeeAddressCityInput = page.locator('input[name="payee.address.city"]');
    this.payeeAddressStateInput = page.locator('input[name="payee.address.state"]');
    this.payeeAddressZipCodeInput = page.locator('input[name="payee.address.zipCode"]');
    this.payeePhoneNumberInput = page.locator('input[name="payee.phoneNumber"]');
    this.payeeAccountNumberInput = page.locator('input[name="payee.accountNumber"]');
    this.verifyAccountInput = page.locator('input[name="verifyAccount"]');
    this.amountInput = page.locator('input[name="amount"]');
    this.paymentSuccessHeading = page.locator('h1:has-text("Bill Payment Complete")');
  }

  /**
   * Verifies if the bill payment page is loaded by checking the visibility of the "Send Payment" button.
   */
  async verifyBillPayPage() {
    await expect(this.sendPaymentButton).toBeVisible();
  }

  /**
   * Fills out the bill payment form with provided payment details and submits the form.
   * @param paymentDetails - Contains the payment information to be filled in the form.
   */
  async fillBillPaymentDetails(paymentDetails: BillPaymentDetails) {
    await this.payeeNameInput.fill(paymentDetails.payeeName);
    await this.payeeAddressStreetInput.fill(paymentDetails.payeeStreet);
    await this.payeeAddressCityInput.fill(paymentDetails.payeeCity);
    await this.payeeAddressStateInput.fill(paymentDetails.payeeState);
    await this.payeeAddressZipCodeInput.fill(paymentDetails.payeeZipCode);
    await this.payeePhoneNumberInput.fill(paymentDetails.payeePhoneNumber);
    await this.payeeAccountNumberInput.fill(paymentDetails.payeeAccountNumber);
    await this.verifyAccountInput.fill(paymentDetails.verifyAccount);
    await this.amountInput.fill(paymentDetails.amount);
    await this.sendPaymentButton.click();
  }

  /**
   * Verifies if the payment was successful by checking the visibility of the "Bill Payment Complete" heading.
   * @returns {boolean} - Returns true if the success message is visible.
   */
  async verifyPaymentSuccess() {
    await this.paymentSuccessHeading.waitFor();
    return this.paymentSuccessHeading.isVisible();
  }
  /**

   * @returns the success message
   */
  async getSuccessMessage() {
    const result = await this.paymentSuccessHeading.textContent();
    console.log(result);
    return result;
  }
}
