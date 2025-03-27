"use client";

import { useState } from "react";
import { useSearchParams, usePathname, useRouter } from "next/navigation";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export const TripSearch = () => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();
  const [search, setSearch] = useState(
    searchParams.get("search")?.toString() || ""
  );

  const handleSearch = () => {
    const params = new URLSearchParams(searchParams);
    if (search) {
      params.set("search", search);
    } else {
      params.delete("search");
    }
    replace(`${pathname}?${params.toString()}`, { scroll: false });
  };

  return (
    <div className="relative w-full mt-6 max-w-sm">
      <Input
        type="text"
        placeholder="Search trips"
        className="w-full pr-9"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <Button
        size="icon"
        className="absolute right-1 top-1/2 h-4/5 -translate-y-1/2  w-fit px-4 py-2"
        onClick={handleSearch}
      >
        Search
      </Button>
    </div>
  );
};
