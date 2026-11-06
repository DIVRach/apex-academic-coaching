// Select the elements
const form = document.getElementById("contact-form");
const nameInput = document.getElementById("name");
const emailInput = document.getElementById("email");
const messageInput = document.getElementById("message");

// A validation function for each field

function validateName(value) {
  const trimmed = value.trim();
  if (trimmed === "") return "Please enter your name.";
  if (trimmed.length < 2) return "Your name must be at least 2 characters.";
  return "";
}

function validateEmail(value) {
  const trimmed = value.trim();
  if (trimmed === "") return "Please enter your email address.";
  const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!pattern.test(trimmed))
    return "Please enter a valid email, like name@example.com.";
  return "";
}

function validateMessage(value) {
  const trimmed = value.trim();
  if (trimmed === "") return "Please tell us a little about your goals.";
  if (trimmed.length < 10)
    return "Your message should be at least 10 characters.";
  return "";
}

// Show and clear errors
function showError(input, message) {
  const errorElement = document.getElementById(input.id + "-error");
  errorElement.textContent = message;

  if (message) {
    input.setAttribute("aria-invalid", "true");
    input.style.borderColor = "var(--color-error)";
  } else {
    input.removeAttribute("aria-invalid");
    input.style.borderColor = "";
  }
}

// Validate on blur and on input
const fields = [
  { input: nameInput, validate: validateName },
  { input: emailInput, validate: validateEmail },
  { input: messageInput, validate: validateMessage },
];

fields.forEach(({ input, validate }) => {
  // Check when the user leaves the field
  input.addEventListener("blur", () => {
    showError(input, validate(input.value));
  });

  // Once an error is showing, re-check as they type so it clears quickly
  input.addEventListener("input", () => {
    if (input.hasAttribute("aria-invalid")) {
      showError(input, validate(input.value));
    }
  });
});

// Handle submit
const successMessage = document.createElement("p");
successMessage.setAttribute("role", "status");
form.after(successMessage);

form.addEventListener("submit", (event) => {
  event.preventDefault();
  successMessage.textContent = "";

  let firstInvalid = null;

  fields.forEach(({ input, validate }) => {
    const message = validate(input.value);
    showError(input, message);
    if (message && !firstInvalid) {
      firstInvalid = input;
    }
  });

  if (firstInvalid) {
    firstInvalid.focus();
    return;
  }

  // In a real site, you would send the data to a server here.
  form.reset();
  successMessage.textContent =
    "Thank you! We will contact you within one business day to schedule your strategy call.";
});
