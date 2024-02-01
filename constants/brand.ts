import { Tables } from "@/types/generated";

type brand = Tables<"cars">["brand"];

const CarMakerMappings: Record<brand, string> = {
  tesla: "테슬라",
};

export default CarMakerMappings;
