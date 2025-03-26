"use client";

import { useTripsStore } from "@/store/useTripsStore";
import { Trip } from "@/types";

interface Props {
  trips: Trip[];
}

export const RandomTripButton = ({ trips }: Props) => {
  const { hasSelectedTrip, selectRandomTrip } = useTripsStore();

  const handleRandomSelection = () => {
    if (!trips || trips.length === 0) {
      console.error("No trips available");
      return;
    }
    selectRandomTrip(trips);
  };

  if (hasSelectedTrip()) {
    return (
      <button
        disabled
        className="opacity-50 cursor-not-allowed px-4 py-2 bg-gray-300 rounded"
      >
        Trip Already Selected
      </button>
    );
  }

  return (
    <button
      onClick={handleRandomSelection}
      className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      disabled={!trips || trips.length === 0}
    >
      {!trips || trips.length === 0
        ? "No Trips Available"
        : "Choose Random Trip"}
    </button>
  );
};
