import { Data, Region } from "../../types/Service";

export function createAddressString(data: Data): string {
  const result = data.results[0];
  const addressParts: string[] = [];

  for (let i = 1; i <= 2; i++) {
    const areaName = result.region[`area${i}` as keyof Region].name;

    if (areaName) {
      addressParts.push(areaName);
    }
  }

  return addressParts.join(" ");
}
