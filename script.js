// Elements needed
const submitButton = document.querySelector("button");
const userDay = document.querySelector("[id='day']");
const userYear = document.querySelector("[id='year']");
const userMonth = document.querySelector("[id='month']");
const inputs = [userDay, userMonth, userYear];

// input Validation
const yearValidate = (year) => {
  const newDate = new Date();
  if (year <= newDate.getFullYear() && year !== 0) {
    return true;
  }
};

const inputValidation = (input) => {
  const inputId = input.getAttribute("id");
  const errorMessage = document.querySelector(`.${inputId}-error-message`);

  if (
    !input.checkValidity() ||
    (inputId === "year" && !yearValidate(input.value))
  ) {
    input.classList.add("invalid-red-border");
    errorMessage.style.display = "block";
  } else {
    input.classList.remove("invalid-red-border");
    errorMessage.style.display = "none";
  }
};

// Form Age Calculation
const AgeCalculation = (year, month, day) => {
  const currentDate = new Date();
  const userDate = new Date(year, month - 1, day);

  let age = currentDate.getFullYear() - userDate.getFullYear();

  const monthDiff = currentDate.getMonth() - userDate.getMonth();
  const dayDiff = currentDate.getDate() - userDate.getDate();

  if (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)) {
    age -= 1;
  }

  return age;
};

// Button EventListener Handler
const onClickHandler = (event) => {
  event.preventDefault();

  const isAnyWrongInput = inputs.some(
    (input) => input.value == "" || !input.checkValidity()
  );

  // Error handling
  inputs.forEach((input) => inputValidation(input));

  if (!isAnyWrongInput && yearValidate(userYear.value)) {
    const age = AgeCalculation(userYear.value, userMonth.value, userDay.value);
    document.querySelector(".age").textContent = age;
  } else {
    document.querySelector(".age").textContent = "--";
  }
};

submitButton.addEventListener("click", onClickHandler);

// Keyboard Accessibility for inputs
const inputsAccessibility = (event, input, index, arr) => {
  const nextInput = arr[index + 1];
  const previousInput = arr[index - 1];

  if (
    (input.checkValidity() && event.key == "Enter") ||
    event.key == "ArrowRight"
  ) {
    nextInput ? nextInput.focus() : submitButton.click();
  }
  if (event.key == "ArrowLeft") {
    previousInput && previousInput.focus();
  }
};

inputs.forEach((input, index, arr) => {
  input.addEventListener("keydown", (event) =>
    inputsAccessibility(event, input, index, arr)
  );
});

// Keyboard Accessibility for Dark theme button

const darkThemeLabel = document.querySelector(".dark-theme-label");

const labelAccessibility = (event) => {
  if (event.key === "Enter") {
    darkThemeLabel.click();
  }
};

darkThemeLabel.addEventListener("keydown", labelAccessibility);
