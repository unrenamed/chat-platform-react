import { Locator, Page } from "@playwright/test";

export class LoginPage {
  readonly page: Page;
  readonly usernameInput: Locator;
  readonly passwordInput: Locator;
  readonly submitButton: Locator;
  readonly registerLink: Locator;
  readonly footer: Locator;

  constructor(page: Page) {
    this.page = page;
    this.usernameInput = page.getByLabel("Username");
    this.passwordInput = page.getByLabel("Password");
    this.submitButton = page.getByRole("button", { name: "Login" });
    this.registerLink = page.getByRole("link", { name: "Register" });
    this.footer = page.getByTestId("footer");
  }

  async goto() {
    await this.page.goto("/login");
  }

  async setUsername(username: string) {
    await this.usernameInput.fill(username);
  }

  async setPassword(password: string) {
    await this.passwordInput.fill(password);
  }

  async submit() {
    await this.submitButton.click();
  }

  async clickRegisterLink() {
    await this.registerLink.click();
  }
}
