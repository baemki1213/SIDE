import {
  ChangeEvent,
  Dispatch,
  SetStateAction,
  useEffect,
  useState,
} from "react";

import Gap from "@/components/common/Gap";
import StyledButton from "@/components/common/StyledButton";
import Text from "@/components/common/Text";
import TextInput from "@/components/common/TextInput";

import { sendVerificationEmail, verifyEmailCode } from "@/api/user";
import { createNumRegex } from "@/utils/validations/account";

import * as S from "./styles";

interface IProps {
  email: string;
  setIsVerifiedEmailCode: Dispatch<SetStateAction<boolean>>;
}

const CODE_LENGTH = 6;
const TIMER_DURATION = 60;

export default function EmailVerifyContainer({
  email,
  setIsVerifiedEmailCode,
}: IProps) {
  const [isValid, setIsValid] = useState(false);
  const [verifyCode, setVerifyCode] = useState("");
  const [time, setTime] = useState(TIMER_DURATION); // 1분
  const numRegex = createNumRegex(CODE_LENGTH);

  useEffect(() => {
    const countdown = setInterval(() => {
      if (time > 0) {
        setTime(time - 1);
      } else {
        setIsValid(false);
        clearInterval(countdown);
      }
    }, 1000);

    return () => clearInterval(countdown);
  }, [time]);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const filteredValue = e.target.value
      .replace(/[^0-9]/g, "")
      .slice(0, CODE_LENGTH);
    setVerifyCode(filteredValue);
    setIsValid(numRegex.test(filteredValue) && time > 0);
  };

  const handleVerification = async () => {
    try {
      const result = await verifyEmailCode({ email, code: Number(verifyCode) });

      switch (result.status) {
        case 200:
          setIsVerifiedEmailCode(true);
          break;

        case 400:
          if (result.data.message === "잘못된 코드입니다.") {
            return;
          }
          if (result.data.message === "만료된 코드입니다.") {
            return;
          }
          break;
        case 500:
          break;
        default:
      }
    } catch (error) {
      throw error;
    }
  };

  const handleResend = async () => {
    setVerifyCode("");
    try {
      await sendVerificationEmail({ email });
      setTime(TIMER_DURATION);
    } catch (error) {
      throw error;
    }
  };

  const formatTime = () => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  return (
    <S.Container>
      <Text className="text-black">
        이메일로 전송된 인증코드를 입력해주세요.
      </Text>

      <TextInput
        name="verifyToken"
        value={verifyCode}
        onChange={handleChange}
        placeholder="인증코드 6자리 입력"
        maxLength={6}
        buttonComponent={
          <StyledButton
            width="48px"
            buttonType={!isValid ? "disabled" : "primary"}
            onClick={handleVerification}
            text="확인"
            disabled={!isValid}
            size="small"
          />
        }
      />
      <Gap side={12} />
      <S.FooterContainer>
        <Text className="text-red-FF text-xs font-semibold">
          유효시간: {formatTime()}
        </Text>
        <S.FooterTextWrapper>
          <Text className="text-gray-130 text-xs font-normal">
            이메일을 받지 못하셨나요?
          </Text>
          <Gap side={4} />
          <S.TextButton type="button" onClick={handleResend}>
            <Text className="text-gray-130 text-xs font-normal underline">
              이메일 재전송하기
            </Text>
          </S.TextButton>
        </S.FooterTextWrapper>
      </S.FooterContainer>
    </S.Container>
  );
}
