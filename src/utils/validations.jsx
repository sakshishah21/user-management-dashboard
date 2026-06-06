export const validateUserForm = (data) => {
  const errors = {};

  if (!data.firstName?.trim()) {
    errors.firstName = "First Name is required";
  }

  if (!data.lastName?.trim()) {
    errors.lastName = "Last Name is required";
  }

  if (!data.email?.trim()) {
    errors.email = "Email is required";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
    errors.email = "Invalid Email";
  }

  if (!data.phone?.trim()) {
    errors.phone = "Phone is required";
  }

  if (!data.age) {
    errors.age = "Age is required";
  }

  if (!data.gender) {
    errors.gender = "Gender is required";
  }

  return errors;
};
