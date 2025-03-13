import { Locator, Page, expect } from "@playwright/test";

/**
 * @author Vallail N
 */

export class AccountsOverviewPage {
  readonly page: Page;
  private accountTable: Locator;

  constructor(page: Page) {
    this.accountTable = page.locator("#accountTable");
  }

  /**
   * @returns {Locator} The rows of the account table
   */
  async getTableRows() {
    return this.accountTable.locator("tbody tr");
  }

  /**
   * @param {number} rowIndex - The row index
   * @returns {Locator} The cells of the row at the specified index
   */
  async getRowCells(rowIndex: number) {
    const rows = await this.getTableRows();
    const row = rows.nth(rowIndex);
    return row.locator("td").allTextContents();
  }

  /**
   * @returns {string|null} The text content of the footer
   */
  async getFooterText() {
    return this.accountTable.locator("tfoot tr td").textContent();
  }
}
