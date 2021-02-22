import validateCardName from "./validateCardName";

it("Should not allow card names that are over 26 characters", () => {
  expect(validateCardName("AAAAAAAAAAAAAAAAAAAAAAAAAAAA")).toBe(
    "INPUT_TOO_LONG"
  );
});

it("Should not allow card names that are less than 2 characters", () => {
  expect(validateCardName("A")).toBe("INPUT_TOO_SHORT");
});

it("Should pass", () => {
  expect(validateCardName("JONAS ERIKSSON")).toBe(undefined);
});
