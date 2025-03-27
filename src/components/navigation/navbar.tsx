import React from "react";
import Image from "next/image";
import Link from "next/link";

import { CreateTripDialog } from "@/components/dialogs/create-trip";
import { RandomTripButton } from "@/components/random-trip-button";

import { getAllTrips } from "@/lib/db/queries";

export const Navbar = async () => {
  const availableTrips = await getAllTrips({});
  return (
    <div className="flex md:mt-12 mt-4 bg-black rounded-lg p-4 justify-between items-center">
      <Link href="/">
        <Image src="/images/logo.png" alt="logo" width={32} height={32} />
      </Link>
      <div className="flex gap-4">
        <RandomTripButton trips={availableTrips} />
        <CreateTripDialog />
      </div>
    </div>
  );
};
