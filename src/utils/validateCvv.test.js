import validateCvv from "./validateCvv";

it("Should not allow card numbers that are over 3 characters", () => {
  expect(validateCvv("1111")).toBe("INPUT_TOO_LONG");
});

it("Should not allow card numbers that are less than 3 characters", () => {
  expect(validateCvv("11")).toBe("INPUT_TOO_SHORT");
});

it("Should only allow digits", () => {
  expect(validateCvv("AAA")).toBe("NOT_NUMBER");
});

it("Should pass", () => {
  expect(validateCvv("123")).toBe(undefined);
});
