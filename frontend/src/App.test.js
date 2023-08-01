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

  // TODO: add network data test
});
