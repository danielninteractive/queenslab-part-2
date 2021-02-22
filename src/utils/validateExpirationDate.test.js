import validateExpirationDate from "./validateExpirationDate";

const testDate = new Date(2021, 10, 22);

it("Should not allow experation date prior to current date (in this case testDate)", () => {
  expect(validateExpirationDate(1, "2021", testDate)).toBe("EXPIRED");
});
it("Should pass", () => {
  expect(validateExpirationDate(4, "2022", testDate)).toBe(undefined);
});
