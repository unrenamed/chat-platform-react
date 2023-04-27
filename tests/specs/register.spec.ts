import { test, expect } from "../test";

test.describe("missing form values", () => {
  test.beforeEach(async ({ registerPage }) => {
    await registerPage.submit();
  });

  test("username", async ({ registerPage }) => {
    await expect(registerPage.usernameInputError).toHaveText(
      "Username is Required"
    );
  });

  test("first name", async ({ registerPage }) => {
    await expect(registerPage.firstNameInputError).toHaveText(
      "First Name is Required"
    );
  });

  test("last name", async ({ registerPage }) => {
    await expect(registerPage.lastNameInputError).toHaveText(
      "Last Name is Required"
    );
  });

  test("password", async ({ registerPage }) => {
    await expect(registerPage.passwordInputError).toHaveText(
      "Password is Required"
    );
  });
});

test.describe("too short form values", () => {
  test.beforeEach(async ({ registerPage }) => {
    await registerPage.setUsername("U");
    await registerPage.setFirstName("F");
    await registerPage.setLastName("L");
    await registerPage.setPassword("P");
    await registerPage.submit();
  });

  test("username", async ({ registerPage }) => {
    await expect(registerPage.usernameInputError).toHaveText(
      "Must be 3 characters long"
    );
  });

  test("first name", async ({ registerPage }) => {
    await expect(registerPage.firstNameInputError).toHaveText(
      "Must be 2 characters long"
    );
  });

  test("last name", async ({ registerPage }) => {
    await expect(registerPage.lastNameInputError).toHaveText(
      "Must be 2 characters long"
    );
  });

  test("password", async ({ registerPage }) => {
    await expect(registerPage.passwordInputError).toHaveText(
      "Must be at least 8 characters"
    );
  });
});

test.describe("too long form values", () => {
  test.beforeEach(async ({ registerPage }) => {
    await registerPage.setUsername("a".repeat(17));
    await registerPage.setFirstName("a".repeat(33));
    await registerPage.setLastName("a".repeat(33));
    await registerPage.setPassword("a".repeat(33));
    await registerPage.submit();
  });

  test("username", async ({ registerPage }) => {
    await expect(registerPage.usernameInputError).toHaveText(
      "Exceeds 16 characters"
    );
  });

  test("first name", async ({ registerPage }) => {
    await expect(registerPage.firstNameInputError).toHaveText(
      "Exceeds 32 characters"
    );
  });

  test("last name", async ({ registerPage }) => {
    await expect(registerPage.lastNameInputError).toHaveText(
      "Exceeds 32 characters"
    );
  });

  test("password", async ({ registerPage }) => {
    await expect(registerPage.passwordInputError).toHaveText(
      "Max characters is 32"
    );
  });
});

test.describe("username already exists", () => {
  test.beforeEach(async ({ registerPage, worker, rest }) => {
    await worker.use(
      rest.get("http://localhost:3001/api/users/check", (_, res, ctx) =>
        res(ctx.delay(200), ctx.status(409))
      )
    );

    await registerPage.setUsername("titakote");
    await registerPage.setFirstName("Cassandra");
    await registerPage.setLastName("Franco");
    await registerPage.setPassword("Pa$$w0rd!");
    await registerPage.submit();
  });

  test("show validation error", async ({ registerPage }) => {
    await expect(registerPage.usernameInputError).toHaveText(
      "Username already exists"
    );
  });
});

test.describe("show/hide password", () => {
  test.beforeEach(async ({ registerPage }) => {
    await registerPage.setPassword("a".repeat(10));
  });

  test("hidden by default", async ({ registerPage }) => {
    await expect(registerPage.passwordInput).toHaveAttribute(
      "type",
      "password"
    );
  });

  test("show", async ({ registerPage }) => {
    await registerPage.showPassword();
    await expect(registerPage.passwordInput).toHaveAttribute("type", "text");
  });

  test("hide", async ({ registerPage }) => {
    await registerPage.showPassword();
    await registerPage.hidePassword();
    await expect(registerPage.passwordInput).toHaveAttribute(
      "type",
      "password"
    );
  });
});

test.describe("register user", () => {
  test.beforeEach(async ({ registerPage }) => {
    await registerPage.setUsername("titakote");
    await registerPage.setFirstName("Cassandra");
    await registerPage.setLastName("Franco");
    await registerPage.setPassword("Pa$$w0rd!");
    await registerPage.submit();
  });

  test("show redirect to login", async ({ loginPage }) => {
    await loginPage.page.waitForURL("**/login");
  });

  test("show success toast", async ({ page }) => {
    await expect(page.getByText("Account Created!")).toBeInViewport();
  });
});

test.describe("register fails", () => {
  test.beforeEach(async ({ registerPage, worker, rest }) => {
    await worker.use(
      rest.post("http://localhost:3001/api/auth/register", (_, res, ctx) =>
        res(ctx.delay(200), ctx.status(500))
      )
    );

    await registerPage.setUsername("titakote");
    await registerPage.setFirstName("Cassandra");
    await registerPage.setLastName("Franco");
    await registerPage.setPassword("Pa$$w0rd!");
    await registerPage.submit();
  });

  test("show error toast", async ({ registerPage }) => {
    await expect(
      registerPage.page.getByText("Error creating user")
    ).toBeInViewport();
  });
});

test("login text", async ({ registerPage }) => {
  await expect(registerPage.footer).toHaveText(
    "Already have an account? Login"
  );
});

test("login link", async ({ registerPage }) => {
  await registerPage.clickOnLoginLink();
  await expect(registerPage.page).toHaveURL(/login/);
});
