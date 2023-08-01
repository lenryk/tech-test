import { rest } from "msw";

export const handlers = [
  rest.get("*/time", (req, res, ctx) => {
    return res(
      ctx.json({
        properties: {
          epoch: {
            value: 500,
            description:
              "The current server time, in epoch seconds, at time of processing the request.",
            type: "number",
          },
        },
        required: ["epoch"],
        type: "object",
      }),
    );
  }),

  rest.get("*/metrics", (req, res, ctx) => {
    return res(
      ctx.text(`"# HELP http_request_duration_seconds Duration of HTTP requests in seconds
        # TYPE http_request_duration_seconds histogram
        # HELP http_requests_total Counter for total requests received
        # TYPE http_requests_total counter
        `),
    );
  }),
];
