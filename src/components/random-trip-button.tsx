"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { DicesIcon, EyeIcon } from "lucide-react";

import { Button } from "@/components/ui/button";

import { useTripsStore } from "@/store/useTripsStore";
import { Trip } from "@/types";

interface Props {
  trips: Trip[];
}

export const RandomTripButton = ({ trips }: Props) => {
  const router = useRouter();
  const { hasSelectedTrip, selectRandomTrip } = useTripsStore();

  const handleRandomSelection = () => {
    if (!trips || trips.length === 0) {
      console.error("No available trips to select from");
      return;
    }
    selectRandomTrip(trips);
    router.push("/random-trip");
  };

  const availableTrips = trips;

  if (hasSelectedTrip()) {
    return (
      <Link href="/random-trip">
        <Button variant="outline">
          <span className="hidden md:block">View Selected Trip</span>
          <span className="block md:hidden">
            <EyeIcon className="size-4" />
          </span>
        </Button>
      </Link>
    );
  }

  return (
    <Button
      variant="outline"
      onClick={handleRandomSelection}
      disabled={!availableTrips || availableTrips.length === 0}
    >
      <span className="hidden md:block">
        {!availableTrips || availableTrips.length === 0
          ? "No Trips Available"
          : "Choose Random Trip"}
      </span>
      <span className="block md:hidden">
        <DicesIcon className="size-4" />
      </span>
    </Button>
  );
};
