const statusDescriptions = {
  "0": "알수없음",
  "1": "통신이상",
  "2": "사용가능",
  "3": "충전중",
  "4": "운영중지",
  "5": "점검중",
} as const;

type StatusCode = keyof typeof statusDescriptions;

export function getStatusDescription(code: string): string {
  return statusDescriptions[code as StatusCode] || "알 수 없는 상태";
}
