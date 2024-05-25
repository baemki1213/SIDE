import React, { useState } from "react";

import { requestResetPassword } from "@/api/user";
import { useAppDispatch } from "@/hooks/reduxHook";

import * as S from "./styles";

import { showToast } from "@/store/toastSlice";
import StyledText from "@/components/common/StyledText";
import TextInput from "@/components/common/TextInput";
import StyledButton from "@/components/common/StyledButton";
import Gap from "@/components/common/Gap";

const RequestResetPassword: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useAppDispatch();
  const [email, setEmail] = useState("");

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setIsLoading(true);

    const data: any = await requestResetPassword({ email });

    dispatch(showToast(data.data.message));
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
            onChange={e => setEmail(e.target.value)}
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
