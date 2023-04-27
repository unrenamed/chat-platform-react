import { test } from "../test";

test.describe("app sidebar", () => {
  test("conversations", async ({ page, conversationsPage }) => {
    await conversationsPage.sidebar.friendsItem.click();
    await conversationsPage.sidebar.conversationsItem.click();
    await conversationsPage.page.waitForURL("**/conversations");
  });

  test("friends", async ({ conversationsPage }) => {
    await conversationsPage.sidebar.friendsItem.click();
    await conversationsPage.page.waitForURL("**/friends");
  });

  test("connections", async ({ conversationsPage }) => {
    await conversationsPage.sidebar.connectionsItem.click();
    await conversationsPage.page.waitForURL("**/connections");
  });

  test("settings", async ({ conversationsPage }) => {
    await conversationsPage.sidebar.settingsItem.click();
    await conversationsPage.page.waitForURL("**/settings");
  });

  test("calls", async ({ conversationsPage }) => {
    await conversationsPage.sidebar.callsItem.click();
    await conversationsPage.page.waitForURL("**/calls");
  });

  test("logout", async ({ conversationsPage }) => {
    await conversationsPage.sidebar.logoutItem.click();
    await conversationsPage.page.waitForURL("**/login");
  });
});
