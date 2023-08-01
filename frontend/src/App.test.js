import { render, screen } from "@testing-library/react";
import App from "./App";

describe("main app tests", () => {
  test("it renders expected text", () => {
    render(<App />);
    const serverTime = screen.getByText(/Server time/);
    const timeDifference = screen.getByText(
      /Time difference between client and server/,
    );

    expect(serverTime).toBeInTheDocument();
    expect(timeDifference).toBeInTheDocument();
  });

  test("it renders time server data", async () => {
    render(<App />);

    const serverTime = await screen.findByText(/500/);
    expect(serverTime).toBeInTheDocument();
  });

  test("it renders metric server data", async () => {
    render(<App />);

    const serverTime = await screen.findByText(
      /# HELP http_request_duration_seconds Duration of HTTP requests in seconds/,
    );
    expect(serverTime).toBeInTheDocument();
  });
});
