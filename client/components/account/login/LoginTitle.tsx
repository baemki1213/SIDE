import Image from "next/image";

import Text from "@/components/common/Text";

import logoImage from "@/asset/Logo.png";

export default function LoginTitle() {
  return (
    <div
      className="flex w-full items-center justify-center"
      data-testid="logo-container"
    >
      <div className="w-[70px] h-[70px] relative">
        <Image src={logoImage} alt="Mapack logo" width={70} height={70} />
      </div>
      <Text className="text-point text-4xl font-bold">Mapack</Text>
    </div>
  );
}
