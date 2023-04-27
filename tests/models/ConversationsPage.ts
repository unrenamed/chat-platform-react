import { Page } from "@playwright/test";
import { SidebarObject } from "./SidebarObject";

export class ConversationsPage {
  readonly page: Page;
  readonly sidebar: SidebarObject;

  constructor(page: Page) {
    this.page = page;
    this.sidebar = new SidebarObject(page);
  }
}
