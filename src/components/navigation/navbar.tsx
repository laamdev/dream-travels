import React from "react";
import Image from "next/image";
import Link from "next/link";

import { CreateTripDialog } from "@/components/dialogs/create-trip";
// import { RandomTripButton } from "@/components/random-trip-button";
// import { getTodoTrips } from "@/lib/db/queries";

export const Navbar = async () => {
  // const availableTrips = await getTodoTrips();
  return (
    <div className="flex mt-12 bg-black rounded-lg p-4 justify-between items-center">
      <Link href="/">
        <Image src="/images/logo.png" alt="logo" width={32} height={32} />
      </Link>
      <CreateTripDialog />
      {/* <RandomTripButton trips={availableTrips} /> */}
    </div>
  );
};
