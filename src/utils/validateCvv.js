const validateCvv = (input) => {
  if (input.length > 3) {
    return "INPUT_TOO_LONG";
  }
  if (input.length < 3) {
    return "INPUT_TOO_SHORT";
  }
  if (!/^[0-9]*$/.test(input)) {
    return "NOT_NUMBER";
  }
};

export default validateCvv;
