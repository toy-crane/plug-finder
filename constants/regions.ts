export enum Regions {
  Seoul = 11,
  Busan = 26,
  Daegu = 27,
  Incheon = 28,
  Gwangju = 29,
  Daejeon = 30,
  Ulsan = 31,
  Sejong = 36,
  Gyeonggi = 41,
  Chungbuk = 43,
  Chungnam = 44,
  Jeonbuk = 45,
  Jeonnam = 46,
  Gyeongbuk = 47,
  Gyeongnam = 48,
  Jeju = 50,
  GangwonSpecial = 51,
}

const regionDescriptions: { [key in Regions]: string } = {
  [Regions.Seoul]: "서울특별시",
  [Regions.Busan]: "부산광역시",
  [Regions.Daegu]: "대구광역시",
  [Regions.Incheon]: "인천광역시",
  [Regions.Gwangju]: "광주광역시",
  [Regions.Daejeon]: "대전광역시",
  [Regions.Ulsan]: "울산광역시",
  [Regions.Sejong]: "세종특별자치시",
  [Regions.Gyeonggi]: "경기도",
  [Regions.Chungbuk]: "충청북도",
  [Regions.Chungnam]: "충청남도",
  [Regions.Jeonbuk]: "전라북도",
  [Regions.Jeonnam]: "전라남도",
  [Regions.Gyeongbuk]: "경상북도",
  [Regions.Gyeongnam]: "경상남도",
  [Regions.Jeju]: "제주특별자치도",
  [Regions.GangwonSpecial]: "강원도",
};

const RegionPosition: { [key in Regions]: { lat: number; lng: number } } = {
  [Regions.Seoul]: { lat: 37.5665, lng: 126.978 },
  [Regions.Busan]: { lat: 35.1796, lng: 129.0756 },
  [Regions.Daegu]: { lat: 35.8714, lng: 128.6014 },
  [Regions.Incheon]: { lat: 37.4563, lng: 126.7052 },
  [Regions.Gwangju]: { lat: 35.1595, lng: 126.8526 },
  [Regions.Daejeon]: { lat: 36.3504, lng: 127.3845 },
  [Regions.Ulsan]: { lat: 35.5384, lng: 129.3114 },
  [Regions.Sejong]: { lat: 36.4808, lng: 127.2892 },
  [Regions.Gyeonggi]: { lat: 37.4138, lng: 127.5183 },
  [Regions.Chungbuk]: { lat: 36.8, lng: 127.7 },
  [Regions.Chungnam]: { lat: 36.5184, lng: 126.8 },
  [Regions.Jeonbuk]: { lat: 35.7175, lng: 127.153 },
  [Regions.Jeonnam]: { lat: 34.8679, lng: 126.991 },
  [Regions.Gyeongbuk]: { lat: 36.4919, lng: 128.8889 },
  [Regions.Gyeongnam]: { lat: 35.4606, lng: 128.2132 },
  [Regions.Jeju]: { lat: 33.4996, lng: 126.5312 },
  [Regions.GangwonSpecial]: { lat: 37.8228, lng: 128.1555 },
};

export function getRegionDescription(code: string): string {
  if (code in Regions) {
    return regionDescriptions[parseInt(code) as Regions];
  } else {
    // 여기서는 잘못된 코드에 대한 처리를 할 수 있습니다.
    // 예를 들어, 오류를 반환하거나 기본값을 제공할 수 있습니다.
    console.error("Invalid region code", code);
    throw new Error("Invalid region code");
    // 또는 기본값 반환
    // return '알 수 없는 지역';
  }
}

export const regionCodes = Object.keys(Regions).filter(
  (_) => typeof Regions[_ as any] !== "number"
);

export const getRegionPosition = (
  code: string
): { lat: number; lng: number } => {
  if (code in Regions) {
    return RegionPosition[parseInt(code) as Regions];
  } else {
    console.error("Invalid region code", code);
    throw new Error("Invalid region code");
  }
};
