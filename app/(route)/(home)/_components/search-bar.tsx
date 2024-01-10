"use client";

import { Button } from "@/components/ui/button";
import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { cn } from "@/lib/utils";
import { useState } from "react";

const SearchBar = () => {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Button
        variant="outline"
        className={cn(
          "relative h-12 w-full justify-start rounded-[0.5rem] bg-background text-md font-normal text-muted-foreground shadow-none sm:pr-12 w-full"
        )}
        onClick={() => setOpen(true)}
      >
        <span className="hidden lg:inline-flex">
          주소 또는 충전소 이름을 입력해주세요.
        </span>
        <span className="inline-flex lg:hidden">충전소 또는 주소 입력</span>
      </Button>
      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder=" 주소 또는 충전소 이름을 입력해주세요." />
        <CommandList>
          <CommandEmpty>검색 결과가 없습니다.</CommandEmpty>
          <CommandGroup heading="충전소 이름">
            <CommandItem>Calendar</CommandItem>
            <CommandItem>Search Emoji</CommandItem>
            <CommandItem>Calculator</CommandItem>
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </>
  );
};

export default SearchBar;
