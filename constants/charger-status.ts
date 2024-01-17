const statusDescriptions = {
  "0": "알수 없음",
  "1": "통신 오류",
  "2": "사용 가능",
  "3": "충전중",
  "4": "운영 중지",
  "5": "점검중",
  "9": "확인 불가",
} as const;

type StatusCode = keyof typeof statusDescriptions;

export function getStatusDescription(code: string): string {
  const description = statusDescriptions[code as StatusCode];
  if (description === undefined) {
    console.error(`유효하지 않은 상태 코드: ${code}`);
    return "알수 없음";
  }
  return description;
}
