import { render, screen } from "@testing-library/react";
import Section from "./index";

describe("section component tests", () => {
  test("it renders time section correctly", () => {
    render(
      <Section isLoading={false} name="time">
        <h1>Inner heading</h1>
      </Section>,
    );
    const innerHeading = screen.getByText(/Inner heading/);
    expect(innerHeading).toBeInTheDocument();
  });

  test("it display loading state", () => {
    render(
      <Section isLoading={true} name="time">
        <h1>Inner heading</h1>
      </Section>,
    );
    const loadingText = screen.getByText(/LOADING.../);
    expect(loadingText).toBeInTheDocument();
  });
});
