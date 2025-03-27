"use client";

import { useEffect, useState } from "react";
import useSWR from "swr";
import { useRouter } from "next/navigation";
import Image from "next/image";

import { Button } from "@/components/ui/button";
import { EmptyState } from "@/components/ui/empty-state";
import { ConfirmDeselectTripDialog } from "@/components/dialogs/confirm-deselect-trip";

import { useTripsStore } from "@/store/useTripsStore";

interface Trip {
  id: string;
  title: string;
  introduction: string | null;
  description: string | null;
  photo_url: string | null;
  status: string;
  itineraries: {
    id: string;
    trip_id: string;
    day: number;
    location: string;
    description: string;
  }[];
}

interface ApiError {
  error: string;
}

const fetcher = async (url: string) => {
  const res = await fetch(url);
  if (!res.ok) {
    const error: ApiError = await res.json();
    throw new Error(error.error || "Failed to fetch trip");
  }
  return res.json();
};

export const TripCountdown = () => {
  const router = useRouter();
  const { selectedTrip, getTimeRemaining, deselectTrip } = useTripsStore();
  const [timeLeft, setTimeLeft] = useState(getTimeRemaining());
  const [showDeselectDialog, setShowDeselectDialog] = useState(false);

  const {
    data: trip,
    error,
    isLoading,
  } = useSWR<Trip>(
    selectedTrip ? `/api/trips/${selectedTrip.tripId}` : null,
    fetcher,
    {
      refreshInterval: 60000,
      revalidateOnFocus: false,
    }
  );

  useEffect(() => {
    if (!selectedTrip) return;

    const timer = setInterval(() => {
      setTimeLeft(getTimeRemaining());
    }, 60000);

    return () => clearInterval(timer);
  }, [selectedTrip]);

  const handleDeselect = () => {
    deselectTrip();
    router.push("/");
  };

  if (!selectedTrip || !timeLeft || isLoading) return null;
  if (error)
    return (
      <div className="p-4 bg-red-50 text-red-600 rounded-xl">
        {error instanceof Error ? error.message : "Error loading trip details"}
      </div>
    );
  if (!trip) return null;

  return (
    <div className="my-8">
      <div className="border rounded-xl overflow-hidden">
        <div className="relative h-64">
          {trip.photo_url && (
            <Image
              src={trip.photo_url}
              alt={trip.title}
              fill
              className="rounded-t-xl bg-zinc-100 object-cover object-center"
            />
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-[300px_1fr]">
          <div className="p-6 bg-zinc-50 border-b md:border-b-0 md:border-r">
            <div className="flex flex-col gap-4">
              <div>
                <h4 className="font-medium mb-2">Time until your trip:</h4>
                <div className="text-lg font-bold">
                  {timeLeft.days} days, {timeLeft.hours} hours,{" "}
                  {timeLeft.minutes} minutes
                </div>
              </div>
              <Button
                onClick={() => setShowDeselectDialog(true)}
                className="w-full"
              >
                Deselect Trip
              </Button>
            </div>
          </div>

          <div className="px-8 pt-4 pb-8">
            <div className="flex flex-col gap-y-6">
              <div className="flex flex-col gap-y-2">
                <h3 className="text-[32px] font-semibold">{trip.title}</h3>
              </div>
              <p className="text-base">{trip.description}</p>
            </div>

            <hr className="border-t my-4 border-zinc-200" />

            <div className="flex flex-col gap-y-6">
              <h2 className="text-2xl">Itinerary</h2>

              {trip.itineraries.length === 0 ? (
                <EmptyState />
              ) : (
                <div className="flex flex-col relative">
                  <div className="absolute left-[5px] top-[12px] h-[calc(100%-12px)] w-[2px] bg-black" />

                  {trip.itineraries.map((day) => (
                    <div
                      className="flex gap-x-4 relative pb-8 last:pb-0"
                      key={day.day}
                    >
                      <div className="w-3 h-3 rounded-full bg-black flex-shrink-0 relative z-10 mt-1.5" />

                      <div className="flex flex-col gap-y-2">
                        <div className="flex gap-x-2">
                          <p className="text-base font-medium">
                            Day {day.day}:
                          </p>
                          <p className="text-base">{day.location}</p>
                        </div>

                        <p className="text-base text-[#898989]">
                          {day.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <ConfirmDeselectTripDialog
        showDeselectDialog={showDeselectDialog}
        setShowDeselectDialog={setShowDeselectDialog}
        trip={trip}
        handleDeselect={handleDeselect}
      />
    </div>
  );
};
