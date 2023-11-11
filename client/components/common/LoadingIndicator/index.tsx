import * as S from "./styles";

interface IProps {
  size?: string;
}
const LoadingIndicator = ({ size }: IProps) => {
  return (
    <S.FullPageSpinnerContainer>
      <S.Spinner size={size} />
    </S.FullPageSpinnerContainer>
  );
};

export default LoadingIndicator;
