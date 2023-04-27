import { test, expect } from "../test";

test.describe("login user", () => {
  test.beforeEach(async ({ loginPage }) => {
    await loginPage.setUsername("titakote");
    await loginPage.setPassword("Pa$$w0rd!");
    await loginPage.submit();
  });

  test("redirect to conversations", async ({ loginPage }) => {
    await loginPage.page.waitForURL("**/conversations");
  });
});

test("register text", async ({ loginPage }) => {
  await expect(loginPage.footer).toHaveText("Don't have an account? Register");
});

test("register link", async ({ loginPage }) => {
  await loginPage.clickRegisterLink();
  await expect(loginPage.page).toHaveURL(/register/);
});
