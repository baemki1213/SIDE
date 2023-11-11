import * as S from "./styles";

interface IProps {
  size?: string;
}
export const FullPageLoadingIndicator = ({ size }: IProps) => {
  return (
    <S.FullPageSpinnerContainer>
      <S.Spinner size={size} />
    </S.FullPageSpinnerContainer>
  );
};

export const ComponentLoadingIndicator = ({ size }: IProps) => {
  return <S.Spinner size={size} />;
};
