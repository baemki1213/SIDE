import Text from "@/components/common/Text";

import GoogleLoginButton from "./GoogleLoginButton";
import KakaoLoginButton from "./KakaoLoginButton";
import NaverLoginButton from "./NaverLoginButton";

export default function SocialButtons() {
  return (
    <div className="flex flex-col items-center border-b border-gray-ed pb-[30px] my-[30px]">
      <Text className="text-gray-75 text-xs font-normal text-center">
        SNS계정으로 간편가입
      </Text>
      <div className="w-[357px] flex justify-center mt-[15px]">
        <GoogleLoginButton />
        <KakaoLoginButton />
        <NaverLoginButton />
      </div>
    </div>
  );
}
