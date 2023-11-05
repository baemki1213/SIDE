import { useEffect, useState } from "react";

export function useEmailValidation(email: string) {
  const [isValid, setIsValid] = useState(false);

  useEffect(() => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    setIsValid(regex.test(email));
  }, [email]);

  return { isValid };
}
