import Image from "next/image";

import { style } from "@vanilla-extract/css";

import Text from "@/components/common/Text";

import logoImage from "@/asset/Logo.png";

import * as styles from "./LoginTitle.css";

export default function LoginTitle() {
  return (
    <div className={styles.container} data-testid="logo-container">
      <div className={styles.logoBox}>
        <Image src={logoImage} alt="Mapack logo" width={70} height={70} />
      </div>
      <Text className={styles.title}>Mapack</Text>
    </div>
  );
}

export const container = style({
  display: "flex",
  width: "100%",
  alignItems: "center",
  justifyContent: "center",
});

export const logoBox = style({
  width: "70px",
  height: "70px",
  position: "relative",
});

export const title = style({
  color: colors.pointColor,
  fontSize: fontSize.xl4.size,
  fontWeight: fontWeight.bold,
});
