import React from "react";

import { TripFilters } from "@/components/home/trip-filters";
import { TripSearch } from "@/components/home/trip-search";

export const Header = () => {
  return (
    <div className="flex mt-16 flex-col justify-center items-center">
      <h1 className="text-[32px]">The places you dream of</h1>
      <p className="text-xl mt-2">Let&apos;s live new adventures </p>
      <TripSearch />
      <div className="mt-16">
        <TripFilters />
      </div>
    </div>
  );
};
