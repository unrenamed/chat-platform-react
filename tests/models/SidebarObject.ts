import { Locator, Page } from "@playwright/test";

export class SidebarObject {
  readonly conversationsItem: Locator;
  readonly friendsItem: Locator;
  readonly connectionsItem: Locator;
  readonly settingsItem: Locator;
  readonly callsItem: Locator;
  readonly logoutItem: Locator;

  constructor(page: Page) {
    this.conversationsItem = page.getByTestId("conversations");
    this.friendsItem = page.getByTestId("friends");
    this.connectionsItem = page.getByTestId("connections");
    this.settingsItem = page.getByTestId("settings");
    this.callsItem = page.getByTestId("calls");
    this.logoutItem = page.getByTestId("logout");
  }
}
