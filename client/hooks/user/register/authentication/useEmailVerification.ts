import { sendVerificationEmail } from "@/api/user";
import { useMutation } from "@tanstack/react-query";
import { AxiosResponse } from "axios";

interface EmailVerificationError {
  response: {
    status: number;
    data: {
      message: string;
    };
  };
}
export const useEmailVerification = (
  setIsVerificationEmailSent: (value: boolean) => void,
  setErrorMessage: (value: any) => void,
  setEmailIsValid: (value: boolean) => void
) => {
  const {
    mutate: verifyEmail,
    isLoading,
    isError,
    isSuccess,
    error,
    reset,
  } = useMutation<
    AxiosResponse<any, any>,
    EmailVerificationError,
    { email: string }
  >({
    mutationFn: sendVerificationEmail,
    onSuccess: () => {
      setIsVerificationEmailSent(true);
    },
    onError: (error: EmailVerificationError) => {
      const status = error.response.status;
      const message = error.response.data.message;

      if (status === 400) {
        setErrorMessage((previousErrorMessage: any) => ({
          ...previousErrorMessage,
          email: message,
        }));
        setEmailIsValid(false);
      }
      if (status === 500) {
        setErrorMessage((previousErrorMessage: any) => ({
          ...previousErrorMessage,
          email: message,
        }));
        setEmailIsValid(false);
      }
    },
  });
  return {
    verifyEmail,
    isLoading,
    isSuccess,
    isError,
    error,
    reset,
  };
};
