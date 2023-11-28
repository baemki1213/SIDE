import * as S from "./styles";
import StyledText from "../StyledText";

import {
  ColorKeyTypes,
  FontSizeKeyTypes,
  FontWeightKeyTypes,
} from "@/styles/assets";

interface StyledTextIProps {
  text?: string;
  fontSize?: FontSizeKeyTypes;
  fontWeight?: FontWeightKeyTypes;
  fontColor?: ColorKeyTypes;
  numberOfLines?: number;
  width?: string;
  textDecoration?:
    | "none"
    | "line-through"
    | "overline"
    | "underline"
    | "initial"
    | "inherit";
  textAlign?: "left" | "right" | "center" | "justify" | "initial" | "inherit";
  wordBreak?: "normal" | "break-word";
  whiteSpace?: "normal" | "nowrap";
}

interface IProps {
  buttonType: "button" | "submit" | "reset";
  styleProps: StyledTextIProps;
  handleClick: () => void;
}
export default function StyledTextButton({
  buttonType,
  styleProps,
  handleClick,
}: IProps) {
  return (
    <S.Container type={buttonType} onClick={handleClick}>
      <StyledText {...styleProps} />
    </S.Container>
  );
}
