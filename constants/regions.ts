enum Regions {
  Seoul = 11,
  Busan = 26,
  Daegu = 27,
  Incheon = 28,
  Gwangju = 29,
  Daejeon = 30,
  Ulsan = 31,
  Sejong = 36,
  Gyeonggi = 41,
  Gangwon = 42,
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
  [Regions.Gangwon]: "강원도",
  [Regions.Chungbuk]: "충청북도",
  [Regions.Chungnam]: "충청남도",
  [Regions.Jeonbuk]: "전라북도",
  [Regions.Jeonnam]: "전라남도",
  [Regions.Gyeongbuk]: "경상북도",
  [Regions.Gyeongnam]: "경상남도",
  [Regions.Jeju]: "제주특별자치도",
  [Regions.GangwonSpecial]: "강원특별자치도",
};

export function getRegionDescription(code: number): string {
  if (code in Regions) {
    return regionDescriptions[code as Regions];
  } else {
    // 여기서는 잘못된 코드에 대한 처리를 할 수 있습니다.
    // 예를 들어, 오류를 반환하거나 기본값을 제공할 수 있습니다.
    throw new Error("Invalid region code");
    // 또는 기본값 반환
    // return '알 수 없는 지역';
  }
}
