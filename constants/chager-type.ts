export const chargerType = {
  1: "DC 차데모",
  2: "AC 완속",
  3: "DC차데모, AC3상",
  4: "DC 콤보",
  5: "DC차데모, DC콤보",
  6: "DC차데모, AC3상, DC콤보",
  7: "AC3상",
  8: "DC 콤보(완속)",
  89: "H2",
} as const;

type ChargerType = typeof chargerType;
type ChargerCode = keyof ChargerType;

export function getChargerTypeDescription(code: string): string {
  const parsedCode = parseInt(code, 10);
  if (!isNaN(parsedCode) && chargerType.hasOwnProperty(parsedCode)) {
    return chargerType[parsedCode as ChargerCode];
  }
  console.error("Invalid charger type code", code);
  return "알수 없음";
}
