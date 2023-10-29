const validateEmail = (email: string) => {
  const re = /\S+@\S+\.\S+/;
  return re.test(email);
};
const validatePassword = (password: string) => {
  // 대문자, 소문자, 숫자, 특수문자 포함 8자 이상
  const re = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;
  return re.test(password);
};
const validateNickname = nickname => {
  const re = /^[a-zA-Z0-9가-힣]{2,10}$/;
  return re.test(nickname);
};

export { validateEmail, validatePassword, validateNickname };
