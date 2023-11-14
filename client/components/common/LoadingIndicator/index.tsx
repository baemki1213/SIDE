import * as S from "./styles";

interface IProps {
  size?: string;
  width?: string;
}
export const FullPageLoadingIndicator = ({ size }: IProps) => {
  return (
    <S.FullPageSpinnerContainer>
      <S.Spinner size={size} />
    </S.FullPageSpinnerContainer>
  );
};

export const ComponentLoadingIndicator = ({ size }: IProps) => {
  return (
    <S.ComponentSpinnerContainer>
      <S.Spinner size={size} />
    </S.ComponentSpinnerContainer>
  );
};

export const DotSpinner = ({ width, size }: IProps) => {
  return (
    <S.DotsSpinnerContainer width={width}>
      <S.Dot size={size} />
      <S.Dot size={size} />
      <S.Dot size={size} />
    </S.DotsSpinnerContainer>
  );
};
