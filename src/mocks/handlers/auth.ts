import { rest } from "msw";

const signedUser = {
  id: 1,
  username: "titakote",
  email: null,
  firstName: "Cassandra",
  lastName: "Franco",
  profile: null,
  presence: null,
  peer: {
    id: "489a1a22-befd-4aa3-b85e-4cc3831fdcef",
  },
};

export default [
  rest.post("http://localhost:3001/api/auth/register", (_, res, ctx) =>
    res(ctx.delay(200), ctx.status(200))
  ),
  rest.post("http://localhost:3001/api/auth/login", (_, res, ctx) =>
    res(ctx.delay(200), ctx.status(200))
  ),
  rest.get("http://localhost:3001/api/auth/status", (_, res, ctx) =>
    res(ctx.delay(200), ctx.status(200), ctx.json(signedUser))
  ),
  rest.post("http://localhost:3001/api/auth/logout", (_, res, ctx) =>
    res(ctx.delay(200), ctx.status(200))
  ),
];
