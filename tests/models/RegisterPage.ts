import { Locator, Page } from "@playwright/test";

export class RegisterPage {
  readonly page: Page;
  readonly usernameInput: Locator;
  readonly firstNameInput: Locator;
  readonly lastNameInput: Locator;
  readonly passwordInput: Locator;
  readonly usernameInputError: Locator;
  readonly firstNameInputError: Locator;
  readonly lastNameInputError: Locator;
  readonly passwordInputError: Locator;
  readonly submitButton: Locator;
  readonly loginLink: Locator;
  readonly footer: Locator;

  constructor(page: Page) {
    this.page = page;
    this.usernameInput = page.getByLabel("Username");
    this.firstNameInput = page.getByLabel("First Name");
    this.lastNameInput = page.getByLabel("Last Name");
    this.passwordInput = page.getByLabel("Password");
    this.usernameInputError = page.getByTestId("username-error");
    this.firstNameInputError = page.getByTestId("first-name-error");
    this.lastNameInputError = page.getByTestId("last-name-error");
    this.passwordInputError = page.getByTestId("password-error");
    this.submitButton = page.getByRole("button", { name: "Create My Account" });
    this.loginLink = page.getByRole("link", { name: "Login" });
    this.footer = page.getByTestId("footer");
  }

  async goto() {
    await this.page.goto("/register");
  }

  async setUsername(username: string) {
    await this.usernameInput.fill(username);
  }

  async setFirstName(firstName: string) {
    await this.firstNameInput.fill(firstName);
  }

  async setLastName(lastName: string) {
    await this.lastNameInput.fill(lastName);
  }

  async setPassword(password: string) {
    await this.passwordInput.fill(password);
  }

  async submit() {
    await this.submitButton.click();
  }

  async showPassword() {
    await this.page.getByTestId("show-password").click();
  }

  async hidePassword() {
    await this.page.getByTestId("hide-password").click();
  }

  async clickOnLoginLink() {
    await this.loginLink.click();
  }
}
