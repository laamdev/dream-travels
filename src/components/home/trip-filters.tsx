"use client";

import React from "react";
import { useSearchParams, usePathname, useRouter } from "next/navigation";

import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

export const TripFilters = () => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const currentFilter = searchParams.get("status") || "all";

  const handleFilter = (status: string) => {
    const params = new URLSearchParams(searchParams);
    if (status === "all") {
      params.delete("status");
    } else {
      params.set("status", status);
    }
    params.delete("page");
    replace(`${pathname}?${params.toString()}`, { scroll: false });
  };

  return (
    <div>
      <Tabs value={currentFilter} onValueChange={handleFilter}>
        <TabsList>
          <TabsTrigger value="all" className="rounded-l-full">
            All
          </TabsTrigger>
          <TabsTrigger value="todo" className="border-x">
            Upcoming
          </TabsTrigger>
          <TabsTrigger value="done" className="rounded-r-full">
            Completed
          </TabsTrigger>
        </TabsList>
      </Tabs>
    </div>
  );
};
