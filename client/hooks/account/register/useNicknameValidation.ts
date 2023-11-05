import { nicknameValidationRegex } from "@/utils/validations/account";
import { useEffect, useState } from "react";

export function useNicknameValidation(nickname: string) {
  const [isValid, setIsValid] = useState(false);

  useEffect(() => {
    setIsValid(nicknameValidationRegex.test(nickname));
  }, [nickname]);

  return { isValid, setIsValid };
}
