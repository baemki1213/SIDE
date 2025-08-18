import { useEffect, useState } from "react";

import { nicknameValidationRegex } from "@/utils/validations/account";

const useNicknameValidation = (nickname: string) => {
  const [isValid, setIsValid] = useState(false);

  useEffect(() => {
    setIsValid(nicknameValidationRegex.test(nickname));
  }, [nickname]);

  return { isValid, setIsValid };
};

export default useNicknameValidation;
