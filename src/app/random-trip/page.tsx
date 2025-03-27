import React from "react";
import { Metadata } from "next";

import { TripCountdown } from "@/components/trip-countdown";

export const metadata: Metadata = {
  title: "Random Trip",
  description:
    "You don't know where to go? Randomly select your next adventure from your list of destinations.",
};

export default function RandomTripPage() {
  return <TripCountdown />;
}
