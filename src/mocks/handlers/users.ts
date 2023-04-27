import { rest } from "msw";

export default [
  rest.get("http://localhost:3001/api/users/check", (_, res, ctx) =>
    res(ctx.delay(200), ctx.status(200))
  ),
];
