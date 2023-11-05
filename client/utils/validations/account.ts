const passwordValidationRegex =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

const emailValidationRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const createNumRegex = (length: number) => {
  return new RegExp(`^\\d{${length}}$`);
};

export { passwordValidationRegex, emailValidationRegex, createNumRegex };
