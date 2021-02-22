import { render, fireEvent } from "@testing-library/react";
import App from "./App";

it("Should render correctly", () => {
  const rendering = render(<App />);
  const cardNumberLabel = rendering.getByText(/Card Number/i);
  expect(cardNumberLabel).toBeInTheDocument();
});

it("Should render all input fields with order-red-600 if inputs are empty", () => {
  const rendering = render(<App />);
  fireEvent.click(rendering.getByText("Submit"));
  const cardNumberInput = rendering.getByLabelText("Card Number:");
  expect(cardNumberInput.className.includes("border-red-600")).toBe(true);
});

it("Should render all input fields with order-red-600 if inputs are empty", () => {
  const rendering = render(<App />);
  fireEvent.change(rendering.getByLabelText("Card Number:"), {
    target: { value: 1111111111111111 },
  });
  fireEvent.click(rendering.getByText("Submit"));
  const cardNumberInput = rendering.getByLabelText("Card Number:");
  expect(cardNumberInput.className.includes("border-grey-600")).toBe(true);
});
