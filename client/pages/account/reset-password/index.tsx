import { useState } from "react";

import { useRouter } from "next/router";

import { useAppDispatch } from "@/hooks/reduxHook";
import usePasswordValidation from "@/hooks/user/register/formValidation/usePasswordValidation";

import Gap from "@/components/common/Gap";
import StyledButton from "@/components/common/StyledButton";
import Text from "@/components/common/Text";
import TextInput from "@/components/common/TextInput";

import { resetPassword } from "@/api/user";
import { showToast } from "@/store/toastSlice";

import * as S from "../../../styles/account/reset-password";

const ResetPassword = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { token }: any = router.query;

  const [isLoading, setIsLoading] = useState(false);

  const [newPassword, setNewPassword] = useState("");
  const { isPassword1Valid, isPassword2Valid } = usePasswordValidation(
    newPassword,
    newPassword,
  );

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setIsLoading(true);
    try {
      const data = await resetPassword({ token, newPassword });
      dispatch(showToast(data.data.message));
      localStorage.removeItem("auth");
    } catch (error: any) {
      dispatch(showToast(error.response.data.message));
    }
    setIsLoading(false);
  };

  return (
    <S.Container>
      <Text className="text-xl2 font-bold">비밀번호 재설정</Text>

      <S.FormContainer onSubmit={handleSubmit}>
        <S.LabelContainer>
          <TextInput
            labelText="새로운 비밀번호"
            infoText="대문자, 특수문자 반드시 포함 8자 이상"
            name="newPassword"
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            isValid={newPassword ? isPassword1Valid : true}
          />
        </S.LabelContainer>
        <Gap side={20} />
        <StyledButton
          text="재설정"
          type="submit"
          onClick={handleSubmit}
          buttonType={!isPassword1Valid ? "disabled" : "primary"}
          isLoading={isLoading}
          disabled={!isPassword1Valid}
        />
      </S.FormContainer>
    </S.Container>
  );
};

export default ResetPassword;
