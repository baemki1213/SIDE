import { ComponentLoadingIndicator } from "@/components/common/LoadingIndicator";
import StyledText from "@/components/common/StyledText";

interface IProps {
  isLoading: boolean;
  isSuccess: boolean;
  isError: boolean;
  text: string;
}

const ModalContent = ({ isLoading, isSuccess, isError, text }: IProps) => {
  if (isLoading) {
    return <ComponentLoadingIndicator size="30px" />;
  }
  if (isSuccess || isError) {
    return (
      <>
        <StyledText text={text} fontSize="lg" />
      </>
    );
  }

  return null;
};

export default ModalContent;
