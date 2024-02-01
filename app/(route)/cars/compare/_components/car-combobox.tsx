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
    value: car.slug,
    label: `${car.display_model} ${car.trim} ${car.year}`,
  }));

  const handleSelectedCar = (value: string) => {
    const params = new URLSearchParams(searchParams);
    params.set(order, value);
    router.replace(`?${params.toString()}`);
  };

  const selectedCarLabel = carLabels.find((car) => car.value === slug);

  if (isDesktop) {
    return (
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="ghost"
            role="combobox"
            aria-expanded={open}
            className="w-full justify-between"
          >
            {selectedCarLabel ? (
              <>{selectedCarLabel.label}</>
            ) : (
              <>차종을 선택해 주세요.</>
            )}
            <ChevronsUpDownIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="m-w-[360px] p-0" align="start">
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
          className="w-full justify-between"
        >
          {selectedCarLabel ? (
            <>{selectedCarLabel.label}</>
          ) : (
            <>차종을 선택해 주세요.</>
          )}
          <ChevronsUpDownIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
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
      <CommandInput placeholder="모델을 선택해 주세요." />
      <CommandList>
        <CommandEmpty>결과가 없습니다.</CommandEmpty>
        <CommandGroup>
          {carLabels.map((label) => (
            <CommandItem
              key={label.value}
              value={label.value}
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