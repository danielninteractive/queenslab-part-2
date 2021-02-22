import React, { useState } from "react";
import validateCardNumber from "./utils/validateCardNumber";
import validateCardName from "./utils/validateCardName";
import validateExpirationDate from "./utils/validateExpirationDate";
import validateCvv from "./utils/validateCvv";

function App() {
  const currentDate = new Date(2021, 10, 22);

  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth() + 1;

  // create dummy array used to generate 10 year <options> from current year
  const a = new Array(10);
  a.fill(null, 0, 10);

  const [cardNumber, setCardNumber] = useState(undefined);
  const [cardName, setCardName] = useState("");
  const [expirationMonth, setExpirationMonth] = useState(undefined);
  const [expirationYear, setExpirationYear] = useState(undefined);
  const [cvv, setCvv] = useState(undefined);
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const onCardNumberChange = (event) => {
    const newErrors = { ...errors };
    delete newErrors.numberError;
    setErrors(newErrors);
    const numberInput = event.target.value;
    const validationError = validateCardNumber(numberInput);
    if (validationError === "INPUT_TOO_LONG") {
      return setCardNumber(numberInput.slice(0, 19));
    }
    if (validationError) {
      setErrors({ ...errors, numberError: "invalid card number" });
    }
    setCardNumber(numberInput);
  };

  const onCardNameChange = (event) => {
    const newErrors = { ...errors };
    delete newErrors.nameError;
    setErrors(newErrors);
    const nameInput = event.target.value.toUpperCase();
    const validationError = validateCardName(nameInput);
    // check if only letters and if name length
    if (validationError) {
      setErrors({ ...errors, nameError: "invalid name" });
    }
    if (validationError === "INPUT_TOO_LONG") {
      // incase name is pasted in and too long, slice the string
      return setCardName(nameInput.slice(0, 26));
    }
    setCardName(nameInput);
  };

  const onExpirationMonthChange = (event) => {
    const newErrors = { ...errors };
    delete newErrors.expirationError;
    setErrors(newErrors);
    const monthInput = event.target.value;
    const validationError = validateExpirationDate(
      monthInput,
      expirationYear,
      currentDate
    );
    if (validationError) {
      setErrors({ ...errors, expirationError: "card expired" });
    }
    setExpirationMonth(event.target.value);
  };

  const onExpirationYearChange = (event) => {
    const newErrors = { ...errors };
    delete newErrors.expirationError;
    setErrors(newErrors);
    const yearInput = event.target.value;
    const validationError = validateExpirationDate(
      expirationMonth,
      yearInput,
      currentDate
    );
    if (validationError) {
      setErrors({ ...errors, expirationError: "card expired" });
    }
    setExpirationYear(event.target.value);
  };

  const onCvvChange = (event) => {
    const newErrors = { ...errors };
    delete newErrors.cvvError;
    setErrors(newErrors);
    const cvvInput = event.target.value;
    const validationError = validateCvv(cvvInput);
    if (validationError === "INPUT_TOO_LONG") {
      return setCvv(cvvInput.slice(0, 3));
    }
    if (validationError) {
      setErrors({ ...errors, cvvError: "invalid cvv" });
    }
    setCvv(cvvInput);
  };

  const onSubmitPress = (event) => {
    let submissionErrors = {};
    if (!cardNumber || errors.numberError) {
      submissionErrors.numberError = "error";
    }
    if (!cardName) {
      submissionErrors.nameError = "error";
    }
    if (!expirationMonth || !expirationYear || errors.expirationError) {
      submissionErrors.expirationError = "error";
    }
    if (!cvv || errors.cvvError) {
      submissionErrors.cvvError = "error";
    }
    if (Object.keys(submissionErrors).length) {
      //
      console.log(submissionErrors);
      setSubmitted(true);
      return event.preventDefault();
    }
    // send data to backend
    console.log(cardNumber, cardName, expirationMonth, expirationYear, cvv);
    setSubmitted(true);
    event.preventDefault();
  };

  return (
    <div class='flex flex-col' className='App'>
      <div class='w-96	p-4 text-left'>
        <form class='flex flex-col' onSubmit={onSubmitPress}>
          <label class={"flex flex-col p-2"}>
            Card Number:
            <input
              class={`p-2 border-2${
                (!cardNumber && submitted) || errors.numberError
                  ? " border-red-600"
                  : " border-grey-600"
              }`}
              type='tel'
              name='creditCardNumber'
              value={cardNumber}
              onChange={(event) => onCardNumberChange(event)}
            />
            {errors.numberError && (
              <span class='text-red-600'>{errors.numberError}</span>
            )}
          </label>
          <label class='flex flex-col p-2'>
            Card Name:
            <input
              class={`p-2 border-2${
                (!cardName && submitted) || errors.nameError
                  ? " border-red-600"
                  : " border-grey-600"
              }`}
              type='text'
              name='creditCardNumber'
              value={cardName}
              onChange={(event) => onCardNameChange(event)}
            />
            {errors.nameError && (
              <span class='text-red-600'>{errors.nameError}</span>
            )}
          </label>
          <div class='flex flex-row'>
            <fieldset class='flex flex-col w-8/12 m-2'>
              <legend> Expiration Date:</legend>
              <div>
                <label>
                  <select
                    class={`p-2 border-2 mr-4 box-border h-11     ${
                      (!expirationMonth && submitted) || errors.expirationError
                        ? " border-red-600"
                        : " border-grey-600"
                    }`}
                    onChange={(event) => onExpirationMonthChange(event)}
                  >
                    <option value='' disabled selected>
                      Month
                    </option>
                    <option value='1'>1</option>
                    <option value='2'>2</option>
                    <option value='3'>3</option>
                    <option value='4'>4</option>
                    <option value='5'>5</option>
                    <option value='6'>6</option>
                    <option value='7'>7</option>
                    <option value='8'>8</option>
                    <option value='9'>9</option>
                    <option value='10'>10</option>
                    <option value='11'>11</option>
                    <option value='12'>12</option>
                  </select>
                </label>
                <label>
                  <select
                    class={`p-2 border-2 mr-4 box-border h-11     ${
                      (!expirationYear && submitted) || errors.expirationError
                        ? " border-red-600"
                        : " border-grey-600"
                    }`}
                    onChange={(event) => onExpirationYearChange(event)}
                  >
                    <option value='' disabled selected>
                      Year
                    </option>
                    {a.map((_, i) => (
                      <option value={String(currentYear + i)}>
                        {String(currentYear + i)}
                      </option>
                    ))}
                  </select>
                </label>
                {errors.expirationError && (
                  <span class='text-red-600'>{errors.expirationError}</span>
                )}
              </div>
            </fieldset>
            <label class='w-4/12 m-2'>
              CVV:
              <input
                class={`w-full p-2 border-2 ${
                  (!cvv && submitted) || errors.cvvError
                    ? " border-red-600"
                    : " border-grey-600"
                }`}
                type='tel'
                name='cvv'
                value={cvv}
                onChange={(event) => onCvvChange(event)}
              />
              {errors.cvvError && (
                <span class='text-red-600'>{errors.cvvError}</span>
              )}
            </label>
          </div>
          <input class='m-2 p-2 border-2' type='submit' value='Submit' />
        </form>
      </div>
    </div>
  );
}

export default App;
