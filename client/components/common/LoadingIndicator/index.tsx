import { ButtonStyleKey } from "@/styles/assets/button";
import * as S from "./styles";

interface IProps {
  buttonType?: ButtonStyleKey;
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

export const DotSpinner = ({ buttonType, width, size }: IProps) => {
  return (
    <S.DotsSpinnerContainer width={width}>
      <S.Dot buttonType={buttonType} size={size} />
      <S.Dot buttonType={buttonType} size={size} />
      <S.Dot buttonType={buttonType} size={size} />
    </S.DotsSpinnerContainer>
  );
};
