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
import createSupabaseBrowerClient from "@/supabase/client";
import { Tables } from "@/types/generated";
import { CommandLoading } from "cmdk";
import { useEffect, useState } from "react";
import { useDebounce } from "use-debounce";

type Station = Tables<"stations">;

const SearchBar = () => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [items, setItems] = useState<Station[]>([]);
  const [search, setSearch] = useState("");
  const [keyword] = useDebounce(search, 1000);

  useEffect(() => {
    async function getItems() {
      setLoading(true);
      const supabase = createSupabaseBrowerClient();
      const response = await supabase
        .from("stations")
        .select("*")
        .like("station_name", `%${keyword}%`);
      if (response.error) throw response.error;
      const data = response.data;
      setItems(data);
      setLoading(false);
    }
    getItems();
  }, [keyword]);

  console.log(loading, search);

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
        <CommandInput
          placeholder=" 주소 또는 충전소 이름을 입력해주세요."
          value={search}
          onValueChange={setSearch}
        />
        <CommandList>
          <CommandEmpty>검색 결과가 없습니다.</CommandEmpty>
          {loading && <CommandLoading>loading....</CommandLoading>}
          <CommandGroup heading="충전소 이름">
            {items.map((item) => (
              <CommandItem
                key={`word-${item}`}
                value={item.display_station_name}
              >
                {item.display_station_name}
              </CommandItem>
            ))}
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </>
  );
};

export default SearchBar;
