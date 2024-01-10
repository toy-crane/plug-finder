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
import { getDistrictDescription } from "@/constants/districts";
import { getRegionDescription } from "@/constants/regions";
import { cn } from "@/lib/utils";
import createSupabaseBrowerClient from "@/supabase/client";
import { Tables } from "@/types/generated";
import { CommandLoading } from "cmdk";
import { Loader2, SearchIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { useDebounce } from "use-debounce";

type Station = Tables<"stations">;

const SearchBar = () => {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [items, setItems] = useState<Station[]>([]);
  const [search, setSearch] = useState("");
  const [keyword] = useDebounce(search, 500);

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

  const runCommand = useCallback((command: () => unknown) => {
    setOpen(false);
    command();
  }, []);

  return (
    <>
      <Button
        variant="outline"
        className={cn(
          "relative h-12 w-full justify-start rounded-[0.5rem] bg-background text-md font-normal text-muted-foreground shadow-none sm:pr-12 w-full"
        )}
        onClick={() => setOpen(true)}
      >
        <span className="hidden lg:inline-flex lg:items-center">
          <SearchIcon className="w-4 h-4 mr-2" /> 주소 또는 충전소 이름을
          입력해주세요.
        </span>
        <span className="inline-flex lg:hidden items-center">
          <SearchIcon className="w-4 h-4 mr-2" /> 충전소 또는 주소 입력
        </span>
      </Button>
      <CommandDialog open={open} onOpenChange={setOpen} shouldFilter={false}>
        <CommandInput
          placeholder=" 주소 또는 충전소 이름을 입력해주세요."
          value={search}
          onValueChange={setSearch}
        />
        <CommandList>
          {loading && (
            <CommandLoading>
              <div className="flex justify-center items-center py-8">
                <Loader2 className="h-6 w-6 animate-spin" />
              </div>
            </CommandLoading>
          )}
          <>
            <CommandEmpty>검색 결과가 없습니다.</CommandEmpty>
            <CommandGroup heading="충전소 이름">
              {items.map((item) => (
                <CommandItem
                  key={`word-${item.id}`}
                  value={item.display_station_name}
                  onSelect={() =>
                    runCommand(() =>
                      router.push(
                        `/stations/${item.z_code}/${item.zs_code}/${item.slug}`
                      )
                    )
                  }
                >
                  {`${getRegionDescription(item.z_code)}
                ${getDistrictDescription(item.zs_code)}
                ${item.display_station_name}
              `}
                </CommandItem>
              ))}
            </CommandGroup>
          </>
        </CommandList>
      </CommandDialog>
    </>
  );
};

export default SearchBar;
