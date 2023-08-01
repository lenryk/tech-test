require("dotenv").config();
const url = `${process.env.URL}:${process.env.PORT}/time`;

describe("The router", () => {
  test("it returns 403 error without authorization header", async () => {
    const res = await fetch(url);

    expect(res.status).toBe(403);
    const jsonResponse = await res.json();
    expect(jsonResponse.message).toEqual("Unauthorized request");
  });

  test("it returns 200 with authorization header", async () => {
    const res = await fetch(url, {
      headers: { Authorization: process.env.SECRET },
    });

    expect(res.status).toBe(200);
    const jsonResponse = await res.json();
    expect(jsonResponse.properties.epoch.description).toEqual(
      "The current server time, in epoch seconds, at time of processing the request.",
    );
  });

  test("it returns the correct server time", async () => {
    const res = await fetch(url, {
      headers: { Authorization: process.env.SECRET },
    });

    expect(res.status).toBe(200);
    const jsonResponse = await res.json();
    expect(jsonResponse.properties.epoch.value).toEqual(
      Math.trunc(Date.now() / 1000),
    );
  });
});
