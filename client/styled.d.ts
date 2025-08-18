import "styled-components";

import { ColorTypes, FontSizeTypes, FontWeightTypes } from "./styles/assets";

declare module "styled-components" {
  export interface DefaultTheme {
    fontWeight: FontWeightTypes;
    fontSize: FontSizeTypes;
    colors: ColorTypes;
  }
}
