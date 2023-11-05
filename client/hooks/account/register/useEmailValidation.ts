import { emailValidationRegex } from "@/utils/validations/account";
import { useEffect, useState } from "react";

export function useEmailValidation(email: string) {
  const [isValid, setIsValid] = useState(false);

  useEffect(() => {
    setIsValid(emailValidationRegex.test(email));
  }, [email]);

  return { isValid, setIsValid };
}
