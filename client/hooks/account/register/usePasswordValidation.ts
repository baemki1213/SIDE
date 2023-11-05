import { useEffect, useState } from "react";

import { passwordValidationRegex } from "@/utils/validations/account";

const usePasswordValidation = (password1: string, password2: string) => {
  const [isPassword1Valid, setIsPassword1Valid] = useState(false);
  const [isPassword2Valid, setIsPassword2Valid] = useState(false);

  useEffect(() => {
    setIsPassword1Valid(passwordValidationRegex.test(password1));
  }, [password1]);

  useEffect(() => {
    setIsPassword2Valid(
      passwordValidationRegex.test(password2) && password1 === password2
    );
  }, [password1, password2]);

  return { isPassword1Valid, isPassword2Valid };
};

export default usePasswordValidation;
