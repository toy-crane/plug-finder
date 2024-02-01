"use client";

import * as React from "react";
import { useMediaQuery } from "@/lib/hooks";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ChevronsUpDownIcon } from "lucide-react";
import { Tables } from "@/types/generated";
import { useSearchParams, useRouter } from "next/navigation";
import CarMakerMappings from "@/constants/brand";

type Car = Tables<"cars">;

export function CarComboBox({
  slug,
  cars,
  order,
}: {
  slug: string;
  cars: Car[];
  order: "primary" | "secondary";
}) {
  const [open, setOpen] = React.useState(false);
  const searchParams = useSearchParams();
  const router = useRouter();

  const isDesktop = useMediaQuery("(min-width: 768px)");

  const carLabels = cars.map((car) => ({
    value: `${car.slug} ${car.brand} ${CarMakerMappings[car.brand]} ${
      car.display_model
    } ${car.trim} ${car.year}`,
    label: `${car.display_model} ${car.trim} ${car.year}`,
  }));

  const handleSelectedCar = (value: string) => {
    const params = new URLSearchParams(searchParams);
    const slug = value.split(" ")[0];
    console.log(slug, value);
    params.set(order, slug);
    router.replace(`?${params.toString()}`);
  };

  const selectedCarLabel = carLabels.find(
    (car) => car.value.split(" ")[0] === slug
  );

  if (isDesktop) {
    return (
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="ghost"
            role="combobox"
            aria-expanded={open}
            className="w-full justify-between overflow-hidden bg-white"
          >
            <span className="text-ellipsis whitespace-nowrap overflow-hidden">
              {selectedCarLabel ? (
                <>{selectedCarLabel.label}</>
              ) : (
                <>차종을 선택해 주세요.</>
              )}
            </span>
            <ChevronsUpDownIcon
              className="ml-2 h-4 w-4 shrink-0"
              color={"#b31ff7"}
            />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[360px] p-0" align="start">
          <CarList
            setOpen={setOpen}
            onSelectedCar={handleSelectedCar}
            carLabels={carLabels}
          />
        </PopoverContent>
      </Popover>
    );
  }

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <Button
          variant="ghost"
          role="combobox"
          aria-expanded={open}
          className="w-full justify-between bg-white overflow-hidden"
        >
          <span className="text-ellipsis whitespace-nowrap overflow-hidden">
            {selectedCarLabel ? (
              <>{selectedCarLabel.label}</>
            ) : (
              <>차종을 선택해 주세요.</>
            )}
          </span>
          <ChevronsUpDownIcon
            className="ml-2 h-4 w-4 shrink-0"
            color={"#b31ff7"}
          />
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <div className="mt-4 border-t">
          <CarList
            setOpen={setOpen}
            onSelectedCar={handleSelectedCar}
            carLabels={carLabels}
          />
        </div>
      </DrawerContent>
    </Drawer>
  );
}

function CarList({
  setOpen,
  carLabels,
  onSelectedCar,
}: {
  setOpen: (open: boolean) => void;
  carLabels: { value: string; label: string }[];
  onSelectedCar: (value: string) => void;
}) {
  return (
    <Command>
      <CommandInput placeholder="모델을 선택해 주세요." className="text-base" />
      <CommandList>
        <CommandEmpty>결과가 없습니다.</CommandEmpty>
        <CommandGroup>
          {carLabels.map((label) => (
            <CommandItem
              key={label.value}
              value={label.value}
              className="text-base py-3"
              onSelect={(value) => {
                if (value) {
                  onSelectedCar(value);
                }
                setOpen(false);
              }}
            >
              {label.label}
            </CommandItem>
          ))}
        </CommandGroup>
      </CommandList>
    </Command>
  );
}
