import React, { useState } from "react";

import { useAppDispatch } from "@/hooks/reduxHook";

import Gap from "@/components/common/Gap";
import StyledButton from "@/components/common/StyledButton";
import StyledText from "@/components/common/StyledText";
import TextInput from "@/components/common/TextInput";

import { requestResetPassword } from "@/api/user";
import { showToast } from "@/store/toastSlice";

import * as S from "../../../styles/account/request-reset";

const RequestResetPassword: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useAppDispatch();
  const [email, setEmail] = useState("");

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setIsLoading(true);
    try {
      const data = await requestResetPassword({ email });
      dispatch(showToast(data.data.message));
    } catch (error: any) {
      dispatch(showToast(error.response.data.message));
    }

    setIsLoading(false);
  };

  return (
    <S.Container>
      <StyledText
        text="비밀번호 재설정 요청"
        fontSize="xl2"
        fontWeight="bold"
      />
      <Gap side={50} />
      <S.FormContainer onSubmit={handleSubmit}>
        <S.LabelContainer>
          <TextInput
            labelText="이메일"
            name="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </S.LabelContainer>
        <Gap side={20} />
        <StyledButton
          text="재설정 링크 보내기"
          type="submit"
          onClick={handleSubmit}
          buttonType="primary"
          isLoading={isLoading}
        />
      </S.FormContainer>
    </S.Container>
  );
};

export default RequestResetPassword;
