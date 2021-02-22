import validateCardNumber from "./validateCardNumber";

it("Should not allow card numbers that are over 19 characters", () => {
  expect(validateCardNumber("11111111111111111111")).toBe("INPUT_TOO_LONG");
});

it("Should not allow card numbers that are less than 13 characters", () => {
  expect(validateCardNumber("11111")).toBe("INPUT_TOO_SHORT");
});

it("Should only allow digits", () => {
  expect(validateCardNumber("AAAAAAAAAAAAAA")).toBe("NOT_NUMBER");
});

it("Should pass", () => {
  expect(validateCardNumber("111111111111111")).toBe(undefined);
});
