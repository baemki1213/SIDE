import styled from "styled-components";

import {
  ColorKeyTypes,
  FontSizeKeyTypes,
  FontWeightKeyTypes,
  colors,
  fontSize,
  fontWeight,
} from "../../styles/assets";

interface Props {
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

export default function StyledText({
  text,
  fontSize = "base",
  fontWeight = "medium",
  fontColor = "mainColor",
  numberOfLines,
  width = "auto",
  textDecoration = "none",
  textAlign = "initial",
  wordBreak = "normal",
  whiteSpace = "normal",
}: Props) {
  return (
    <Wrapper textAlign={textAlign} width={width}>
      <Text
        textDecoration={textDecoration}
        numberOfLines={numberOfLines}
        fontSize={fontSize}
        fontColor={fontColor}
        fontWeight={fontWeight}
        wordBreak={wordBreak}
        whiteSpace={whiteSpace}
      >
        {text}
      </Text>
    </Wrapper>
  );
}

const Wrapper = styled.div<{
  width?: string;
  textAlign?: "left" | "right" | "center" | "justify" | "initial" | "inherit";
}>`
  width: ${(props) => props.width};
  text-align: ${(props) => props.textAlign};
`;

const Text = styled.p<{
  numberOfLines?: number;
  fontSize?: FontSizeKeyTypes;
  fontWeight?: FontWeightKeyTypes;
  fontColor?: ColorKeyTypes;
  textDecoration?:
    | "none"
    | "line-through"
    | "overline"
    | "underline"
    | "initial"
    | "inherit";
  wordBreak?: "normal" | "break-word";
  whiteSpace?: "normal" | "nowrap";
}>`
  overflow: hidden;
  display: ${(props) => (props.numberOfLines ? "-webkit-box" : "inherit")};
  text-overflow: ${(props) => (props.numberOfLines ? "ellipsis" : "inherit")};
  -webkit-box-orient: ${(props) =>
    props.numberOfLines ? "vertical" : "inherit"};
  -webkit-line-clamp: ${(props) =>
    props.numberOfLines ? props.numberOfLines : "inherit"};
  font-size: ${(props) => fontSize[props?.fontSize as FontSizeKeyTypes].size};
  line-height: ${(props) =>
    fontSize[props?.fontSize as FontSizeKeyTypes]?.height};
  font-weight: ${(props) =>
    fontWeight[props?.fontWeight as FontWeightKeyTypes]};
  color: ${(props) => colors[props?.fontColor as ColorKeyTypes]};
  text-decoration: ${(props) => props.textDecoration};
  white-space: ${(props) => props.whiteSpace};
  word-break: ${(props) => props.wordBreak};
  transition: all 0.3s ease;
`;
