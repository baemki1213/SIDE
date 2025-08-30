import Image from "next/image";

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
