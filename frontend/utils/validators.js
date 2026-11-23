/**
 * validators.js
 * Form validation helpers used across auth, checkout, and contact forms.
 */

/** Returns error message string or null if valid. */

export function validateEmail(email) {
  if (!email || !email.trim()) return "Email address is required.";
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!re.test(email.trim())) return "Please enter a valid email address.";
  return null;
}

export function validatePassword(password) {
  if (!password) return "Password is required.";
  if (password.length < 8) return "Password must be at least 8 characters.";
  return null;
}

export function validateConfirmPassword(password, confirmPassword) {
  if (!confirmPassword) return "Please confirm your password.";
  if (password !== confirmPassword) return "Passwords do not match.";
  return null;
}

export function validateName(name) {
  if (!name || !name.trim()) return "Full name is required.";
  if (name.trim().length < 2) return "Name must be at least 2 characters.";
  return null;
}

export function validatePhone(phone) {
  if (!phone || !phone.trim()) return "Phone number is required.";
  const re = /^[6-9]\d{9}$/; // Indian mobile number
  if (!re.test(phone.replace(/\s+/g, "")))
    return "Please enter a valid 10-digit Indian mobile number.";
  return null;
}

export function validatePincode(pincode) {
  if (!pincode || !pincode.trim()) return "Pincode is required.";
  if (!/^\d{6}$/.test(pincode.trim())) return "Please enter a valid 6-digit pincode.";
  return null;
}

export function validateRequired(value, fieldName = "This field") {
  if (!value || !String(value).trim()) return `${fieldName} is required.`;
  return null;
}

/** Validate a full checkout shipping address object. Returns { field: errorMsg } */
export function validateShippingAddress(address) {
  const errors = {};
  const checks = {
    name: validateName(address.name),
    phone: validatePhone(address.phone),
    addressLine1: validateRequired(address.addressLine1, "Address line 1"),
    city: validateRequired(address.city, "City"),
    state: validateRequired(address.state, "State"),
    pincode: validatePincode(address.pincode),
  };
  Object.entries(checks).forEach(([field, error]) => {
    if (error) errors[field] = error;
  });
  return errors; // empty object = valid
}
