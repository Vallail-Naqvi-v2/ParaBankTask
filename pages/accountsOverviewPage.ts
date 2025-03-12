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
  // Function to get all table rows
  async getTableRows() {
    return this.accountTable.locator("tbody tr"); // Get all rows in tbody
  }

  // Function to get cell values of a specific row
  async getRowCells(rowIndex: number) {
    const rows = await this.getTableRows(); // Await the rows first
    const row = rows.nth(rowIndex); // Then access the nth row
    return row.locator("td").allTextContents(); // Get the text contents of all cells
  }

  // Function to get the footer text
  async getFooterText() {
    return this.accountTable.locator("tfoot tr td").textContent();
  }
}
