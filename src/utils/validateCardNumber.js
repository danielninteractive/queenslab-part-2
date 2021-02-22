const validateCardNumber = (input) => {
  if (input.length > 19) {
    return "INPUT_TOO_LONG";
  }
  if (input.length < 13) {
    return "INPUT_TOO_SHORT";
  }
  if (!/^[0-9]*$/.test(input)) {
    return "NOT_NUMBER";
  }
};

export default validateCardNumber;
