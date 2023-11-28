const passwordValidationRegex =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

const emailValidationRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const nicknameValidationRegex = /^[a-zA-Z0-9가-힣]{2,10}$/;

const createNumRegex = (length: number) => {
  return new RegExp(`^\\d{${length}}$`);
};

export {
  passwordValidationRegex,
  emailValidationRegex,
  nicknameValidationRegex,
  createNumRegex,
};
