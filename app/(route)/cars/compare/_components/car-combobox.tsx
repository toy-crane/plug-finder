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
import { ChevronsUpDownIcon, Loader2 } from "lucide-react";
import createSupabaseBrowerClient from "@/supabase/client";
import { Tables } from "@/types/generated";
import { CommandLoading } from "cmdk";

type Car = Tables<"cars">;

export function CarComboBox({ slug, cars }: { slug: string; cars: Car[] }) {
  const [open, setOpen] = React.useState(false);
  const [selectedCarSlug, setSelectedCarSlug] = React.useState<string | null>(
    slug
  );
  const isDesktop = useMediaQuery("(min-width: 768px)");

  const carLabels = cars.map((car) => ({
    value: car.slug,
    label: `${car.display_model} ${car.trim} ${car.year}`,
  }));

  const selectedCarLabel = carLabels.find(
    (car) => car.value === selectedCarSlug
  );

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
            setSelectedCarSlug={setSelectedCarSlug}
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
            setSelectedCarSlug={setSelectedCarSlug}
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
  setSelectedCarSlug,
}: {
  setOpen: (open: boolean) => void;
  carLabels: { value: string; label: string }[];
  setSelectedCarSlug: (slug: string | null) => void;
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
                  setSelectedCarSlug(value);
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
