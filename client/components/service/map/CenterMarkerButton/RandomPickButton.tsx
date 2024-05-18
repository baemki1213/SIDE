import { useState } from "react";

import StyledButton from "@/components/common/StyledButton";

interface Props {
  items: any[];
}

const RandomPickButton = ({ items }: Props) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <StyledButton
        width="120px"
        buttonType="secondary"
        text="랜덤 추천 받기"
        size="small"
        onClick={() => setIsModalOpen(true)}
      />
    </>
  );
};
export default RandomPickButton;
