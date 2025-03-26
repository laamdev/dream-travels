import React from "react";
import Image from "next/image";

import { CreateTripDialog } from "@/components/dialogs/create-trip";

export const Navbar = () => {
  return (
    <div className="flex mt-12 bg-black rounded-lg p-4 justify-between items-center">
      <Image src="/images/logo.png" alt="logo" width={32} height={32} />
      <CreateTripDialog />
    </div>
  );
};
