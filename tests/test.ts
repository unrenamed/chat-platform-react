import { test as base, expect } from "@playwright/test";
import { rest } from "msw";
import type { MockServiceWorker, Config } from "playwright-msw";
import { createWorkerFixture } from "playwright-msw";
import handlers from "../src/mocks/handlers";
import { ConversationsPage, LoginPage, RegisterPage } from "./models";

type TestFactory = {
  worker: MockServiceWorker;
  rest: typeof rest;
  registerPage: RegisterPage;
  loginPage: LoginPage;
  conversationsPage: ConversationsPage;
};

const testFactory = (config?: Config) =>
  base.extend<TestFactory>({
    worker: createWorkerFixture(handlers, config),
    rest,
    registerPage: async ({ page }, use) => {
      const registerPage = new RegisterPage(page);
      registerPage.goto();
      await use(registerPage);
    },
    loginPage: async ({ page }, use) => {
      const loginPage = new LoginPage(page);
      loginPage.goto();
      await use(loginPage);
    },
    conversationsPage: async ({ page }, use) => {
      const loginPage = new LoginPage(page);
      loginPage.goto();
      await loginPage.setUsername("titakote");
      await loginPage.setPassword("Pa$$w0rd!");
      await loginPage.submit();
      await page.waitForURL("**/conversations");
      const conversationsPage = new ConversationsPage(page);
      await use(conversationsPage);
    },
  });

const test = testFactory();

export { testFactory, test, expect };
