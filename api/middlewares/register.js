const Validator = require('validator');
const isEmpty = require('is-empty');

module.exports = function validateRegisterInput(data) {
    let errors = {};
  
    data.username = !isEmpty(data.username) ? data.username: "";
    data.email = !isEmpty(data.email) ? data.email: "";
    data.password = !isEmpty(data.password) ? data.password: "";
    data.password2 = !isEmpty(data.password2) ? data.password2: "";
  
    if (Validator.isEmpty(data.username)) {
      errors.username = "Username field is required ! ";
    }
    if (Validator.isEmpty(data.email)) {
      errors.email = "Email field is required !";
    } else if (!Validator.isEmail(data.email)) {
      errors.email = "Email is invalid !";
    }
    if (Validator.isEmpty(data.password)) {
      errors.password = "Password field is required !";
    }
    if (Validator.isEmpty(data.password2)) {
      errors.password2 = "Confirm password is required !";
    }
    if (!Validator.isLength(data.password, {min: 6, max:40})) {
      errors.password = "Password must be at least 6 characters";
    }
    if (!Validator.equals(data.password, data.password2)) {
      errors.password2 = "Passwords must match !";
    }
    return {
      errors,
      isValid: isEmpty(errors)
    };
  };