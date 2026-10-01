function isValidStudentNumber(value) {
  var trimmed = value.trim();
  var pattern = /^\d{2}-\d{4}-\d{3}$/;
  return pattern.test(trimmed);
}

function isValidPassword(value) {
  if (value.length < 8) return false;
  if (/\s/.test(value)) return false;
  if (!/[A-Z]/.test(value)) return false;
  if (!/\d/.test(value)) return false;
  if (!/[@$!]/.test(value)) return false;
  return true;
}

if (typeof module !== "undefined" && module.exports) {
  module.exports = {
    isValidStudentNumber: isValidStudentNumber,
    isValidPassword: isValidPassword
  };
}

if (typeof document !== "undefined") {
  var form = document.getElementById("registrationForm");
  var fullNameInput = document.getElementById("fullName");
  var studentNumberInput = document.getElementById("studentNumber");
  var emailInput = document.getElementById("email");
  var mobileNumberInput = document.getElementById("mobileNumber");
  var passwordInput = document.getElementById("password");
  var confirmPasswordInput = document.getElementById("confirmPassword");
  var courseSelect = document.getElementById("course");
  var termsCheckbox = document.getElementById("terms");
  var resetBtn = document.getElementById("resetBtn");

  var fullNameError = document.getElementById("fullNameError");
  var studentNumberError = document.getElementById("studentNumberError");
  var emailError = document.getElementById("emailError");
  var mobileNumberError = document.getElementById("mobileNumberError");
  var passwordError = document.getElementById("passwordError");
  var confirmPasswordError = document.getElementById("confirmPasswordError");
  var courseError = document.getElementById("courseError");
  var termsError = document.getElementById("termsError");
  var passwordFeedback = document.getElementById("passwordFeedback");
  var successMessage = document.getElementById("successMessage");
  var registrationSummary = document.getElementById("registrationSummary");
  var summaryName = document.getElementById("summaryName");
  var summaryStudentNumber = document.getElementById("summaryStudentNumber");
  var summaryEmail = document.getElementById("summaryEmail");
  var summaryMobileNumber = document.getElementById("summaryMobileNumber");
  var summaryCourse = document.getElementById("summaryCourse");

  function clearError(input, errorSpan) {
    errorSpan.textContent = "";
    input.setAttribute("aria-invalid", "false");
  }

  function showError(input, errorSpan, message) {
    errorSpan.textContent = message;
    input.setAttribute("aria-invalid", "true");
  }

  function validateFullName() {
    var value = fullNameInput.value.trim();
    if (value.length === 0) {
      showError(fullNameInput, fullNameError, "Full name is required.");
      return false;
    }
    if (value.length < 2) {
      showError(fullNameInput, fullNameError, "Full name must be at least two characters.");
      return false;
    }
    clearError(fullNameInput, fullNameError);
    return true;
  }

  function validateStudentNumber() {
    var value = studentNumberInput.value.trim();
    if (value.length === 0) {
      showError(studentNumberInput, studentNumberError, "Student number is required.");
      return false;
    }
    if (!isValidStudentNumber(value)) {
      showError(studentNumberInput, studentNumberError, "Enter a student number in the format 24-1234-123.");
      return false;
    }
    clearError(studentNumberInput, studentNumberError);
    return true;
  }

  function validateEmail() {
    var value = emailInput.value.trim();
    if (value.length === 0) {
      showError(emailInput, emailError, "Email address is required.");
      return false;
    }
    var emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(value)) {
      showError(emailInput, emailError, "Enter a valid email address.");
      return false;
    }
    clearError(emailInput, emailError);
    return true;
  }

  function validateMobileNumber() {
    var value = mobileNumberInput.value.trim();
    if (value.length === 0) {
      showError(mobileNumberInput, mobileNumberError, "Mobile number is required.");
      return false;
    }
    var mobilePattern = /^(09\d{9}|\+639\d{9})$/;
    if (!mobilePattern.test(value)) {
      showError(mobileNumberInput, mobileNumberError, "Enter a valid mobile number (09XXXXXXXXX or +639XXXXXXXXX).");
      return false;
    }
    clearError(mobileNumberInput, mobileNumberError);
    return true;
  }

  function validatePassword() {
    var value = passwordInput.value;
    if (value.length === 0) {
      showError(passwordInput, passwordError, "Password is required.");
      return false;
    }
    if (!isValidPassword(value)) {
      showError(passwordInput, passwordError, "Password must be at least 8 characters, include one uppercase letter, one digit, and one of @, $, or !; no whitespace.");
      return false;
    }
    clearError(passwordInput, passwordError);
    return true;
  }

  function validateConfirmPassword() {
    var value = confirmPasswordInput.value;
    if (value.length === 0) {
      showError(confirmPasswordInput, confirmPasswordError, "Confirm password is required.");
      return false;
    }
    if (value !== passwordInput.value) {
      showError(confirmPasswordInput, confirmPasswordError, "Passwords do not match.");
      return false;
    }
    clearError(confirmPasswordInput, confirmPasswordError);
    return true;
  }

  function validateCourse() {
    var value = courseSelect.value;
    if (value !== "BSIT" && value !== "BSCS") {
      showError(courseSelect, courseError, "Please select a course.");
      return false;
    }
    clearError(courseSelect, courseError);
    return true;
  }

  function validateTerms() {
    if (!termsCheckbox.checked) {
      showError(termsCheckbox, termsError, "You must agree to the terms.");
      return false;
    }
    clearError(termsCheckbox, termsError);
    return true;
  }

  function updatePasswordFeedback() {
    var value = passwordInput.value;
    if (value.length === 0) {
      passwordFeedback.textContent = "";
      return;
    }
    var messages = [];
    if (value.length < 8) messages.push("at least 8 characters");
    if (!/[A-Z]/.test(value)) messages.push("one uppercase letter");
    if (!/\d/.test(value)) messages.push("one digit");
    if (!/[@$!]/.test(value)) messages.push("one of @, $, or !");
    if (/\s/.test(value)) messages.push("no whitespace");
    if (messages.length === 0) {
      passwordFeedback.textContent = "Password meets all requirements.";
      passwordFeedback.style.color = "green";
    } else {
      passwordFeedback.textContent = "Missing: " + messages.join(", ");
      passwordFeedback.style.color = "orange";
    }
  }

  function clearAllFeedback() {
    fullNameError.textContent = "";
    studentNumberError.textContent = "";
    emailError.textContent = "";
    mobileNumberError.textContent = "";
    passwordError.textContent = "";
    confirmPasswordError.textContent = "";
    courseError.textContent = "";
    termsError.textContent = "";
    passwordFeedback.textContent = "";
    successMessage.textContent = "";
    registrationSummary.style.display = "none";
    summaryName.textContent = "";
    summaryStudentNumber.textContent = "";
    summaryEmail.textContent = "";
    summaryMobileNumber.textContent = "";
    summaryCourse.textContent = "";
    fullNameInput.setAttribute("aria-invalid", "false");
    studentNumberInput.setAttribute("aria-invalid", "false");
    emailInput.setAttribute("aria-invalid", "false");
    mobileNumberInput.setAttribute("aria-invalid", "false");
    passwordInput.setAttribute("aria-invalid", "false");
    confirmPasswordInput.setAttribute("aria-invalid", "false");
    courseSelect.setAttribute("aria-invalid", "false");
    termsCheckbox.setAttribute("aria-invalid", "false");
  }

  form.addEventListener("submit", function (event) {
    event.preventDefault();
    var isValid = true;
    if (!validateFullName()) isValid = false;
    if (!validateStudentNumber()) isValid = false;
    if (!validateEmail()) isValid = false;
    if (!validateMobileNumber()) isValid = false;
    if (!validatePassword()) isValid = false;
    if (!validateConfirmPassword()) isValid = false;
    if (!validateCourse()) isValid = false;
    if (!validateTerms()) isValid = false;

    if (isValid) {
      successMessage.textContent = "Registration details validated successfully!";
      summaryName.textContent = fullNameInput.value.trim();
      summaryStudentNumber.textContent = studentNumberInput.value.trim();
      summaryEmail.textContent = emailInput.value.trim();
      summaryMobileNumber.textContent = mobileNumberInput.value.trim();
      summaryCourse.textContent = courseSelect.value;
      registrationSummary.style.display = "block";
    } else {
      successMessage.textContent = "";
      registrationSummary.style.display = "none";
    }
  });

  passwordInput.addEventListener("input", updatePasswordFeedback);

  fullNameInput.addEventListener("blur", validateFullName);

  courseSelect.addEventListener("change", validateCourse);
  termsCheckbox.addEventListener("change", validateTerms);

  form.addEventListener("reset", function () {
    setTimeout(clearAllFeedback, 0);
  });
}
