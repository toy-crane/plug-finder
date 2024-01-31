import { createSupabaseServerClient } from "@/supabase/server";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Car, Share2Icon } from "lucide-react";
import CarCard from "./_components/car-card";
import { Button } from "@/components/ui/button";

const isNumber = (value: any): value is number => typeof value === "number";

interface Props {
  searchParams: { primary?: string; secondary?: string };
}

// specTypes에 대응하는 한글 레이블 매핑
const specLabels: { [key in (typeof specTypes)[number]]: string } = {
  charging_type: "충전 유형",
  battery_type: "배터리 유형",
  seat: "좌석 수",
  top_speed: "최고 속도",
  battery_capacity: "배터리 용량",
  range_winter: "겨울철 주행 거리",
  range_summer: "여름철 주행 거리",
  year: "연식",
};

const specTypes = [
  "charging_type",
  "battery_type",
  "seat",
  "top_speed",
  "battery_capacity",
  "range_winter",
  "range_summer",
  "year",
] as const;

// 특정 specTypes에 대한 값을 포맷팅하는 함수
function formatSpecValue(specType: string, value: any): string {
  // 주행거리 관련 specTypes의 경우, 값 뒤에 'KM'를 붙임
  const specsRequiringUnit = ["range_winter", "range_summer"];
  if (specsRequiringUnit.includes(specType) && value !== null) {
    return `${value}KM`;
  }

  // 연식에 '년' 추가
  if (specType === "year" && value !== null) {
    return `${value}년`;
  }

  // 주행거리에 'KM' 추가
  const specsRequiringKM = ["range_winter", "range_summer"];
  if (specsRequiringKM.includes(specType) && isNumber(value)) {
    return `${value}KM`;
  }

  // 배터리 타입에 따른 문자열 추가
  if (specType === "battery_type") {
    switch (value) {
      case "NCM":
        return "리튬이온 배터리";
      case "LFP":
        return "인산철 배터리";
      default:
        return value; // 알 수 없는 값의 경우 원래 값을 그대로 반환
    }
  }

  // 배터리 용량을 'kW' 단위로 변환 및 추가
  if (specType === "battery_capacity" && isNumber(value)) {
    const valueInKW = value / 1000; // 와트를 킬로와트로 변환
    return `${valueInKW.toFixed(2)}kW`; // 소수점 둘째자리까지 표시
  }

  // 다른 specTypes의 경우, 원래의 값을 그대로 반환
  return value;
}

const Page = async ({
  searchParams: {
    primary = "tesla-model-y-rwd",
    secondary = "tesla-model-3-long-range",
  },
}: Props) => {
  const supabase = await createSupabaseServerClient();
  const response = await supabase
    .from("cars")
    .select("*")
    .in("slug", [primary, secondary]);
  if (response.error) throw response.error;
  const cars = response.data;
  const primaryCar = cars.find((car) => car.slug === primary);
  const secondaryCar = cars.find((car) => car.slug === secondary);
  if (primaryCar === undefined || secondaryCar === undefined) {
    throw Error("Invalid car slug");
  }

  const specs = specTypes.map((specType) => {
    return {
      primary: formatSpecValue(specType, primaryCar[specType]),
      secondary: formatSpecValue(specType, secondaryCar[specType]),
      field: specType,
      label: specLabels[specType], // 한글 레이블 추가
    };
  });

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center mb-12">
        <h1 className="text-3xl font-semibold md:text-6xl">전기차 비교하기</h1>
        <Button variant="ghost">
          <span className="hidden md:block">공유하기</span>
          <Share2Icon className="md:ml-2 h-4 w-4" />
        </Button>
      </div>
      <div className="flex gap-4">
        <CarCard car={primaryCar} />
        <CarCard car={secondaryCar} />
      </div>
      <div>
        <Accordion type="single" collapsible defaultValue="summary">
          <AccordionItem value="summary">
            <AccordionTrigger>요약</AccordionTrigger>
            <AccordionContent>
              <Table>
                <TableBody>
                  {specs.map((spec) => (
                    <TableRow key={spec.field}>
                      <TableCell className="text-center">
                        {spec.primary}
                      </TableCell>
                      <TableCell className="text-center">
                        {spec.label}
                      </TableCell>
                      <TableCell className="text-center">
                        {spec.secondary}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="basic-info">
            <AccordionTrigger>기본 정보</AccordionTrigger>
            <AccordionContent>
              <Table>
                <TableBody>
                  {specs.map((spec) => (
                    <TableRow key={spec.field}>
                      <TableCell className="text-center">
                        {spec.primary}
                      </TableCell>
                      <TableCell className="text-center">
                        {spec.label}
                      </TableCell>
                      <TableCell className="text-center">
                        {spec.secondary}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="driving-performance">
            <AccordionTrigger>주행 성능</AccordionTrigger>
            <AccordionContent>주행성능</AccordionContent>
          </AccordionItem>
          <AccordionItem value="charging">
            <AccordionTrigger>충전</AccordionTrigger>
            <AccordionContent>충전</AccordionContent>
          </AccordionItem>
          <AccordionItem value="design">
            <AccordionTrigger>내외부 디자인</AccordionTrigger>
            <AccordionContent>내외부 디자인</AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </div>
  );
};

export default Page;
