import React from "react";

import { TripFilters } from "@/components/home/trip-filters";
import { TripSearch } from "@/components/home/trip-search";

export const Header = () => {
  return (
    <div className="flex mt-8 md:mt-16 flex-col justify-center items-center px-4 md:px-0">
      <h1 className="text-2xl md:text-[32px] text-center">
        The places you dream of
      </h1>
      <p className="text-lg md:text-xl mt-2 text-center">
        Let&apos;s live new adventures
      </p>
      <div className="w-full mx-auto flex justify-center items-center max-w-2xl">
        <TripSearch />
      </div>
      <div className="mt-8 md:mt-16 w-full mx-auto  flex justify-center items-center">
        <TripFilters />
      </div>
    </div>
  );
};
