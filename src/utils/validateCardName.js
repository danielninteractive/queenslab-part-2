const validateCardName = (input) => {
  if (input.length > 26) {
    return "INPUT_TOO_LONG";
  }
  if (input.length < 2) {
    return "INPUT_TOO_SHORT";
  }
};

export default validateCardName;
