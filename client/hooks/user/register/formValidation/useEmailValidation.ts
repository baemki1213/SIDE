import { useEffect, useState } from "react";

import { emailValidationRegex } from "@/utils/validations/account";

const useEmailValidation = (email: string) => {
  const [isValid, setIsValid] = useState(false);

  useEffect(() => {
    setIsValid(emailValidationRegex.test(email));
  }, [email]);

  return { isValid, setIsValid };
};

export default useEmailValidation;
