import React from "react";
import Image from "next/image";

import { Trip } from "@/types/index";

import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { StatusButton } from "@/components/trip/status-button";

export const TripDetailsDialog = ({ trip }: { trip: Trip }) => {
  return (
    <Dialog>
      <DialogTrigger className="underline cursor-pointer underline-offset-2">
        See trip details
      </DialogTrigger>
      <DialogContent className="p-0">
        <DialogHeader>
          <div className="relative h-64">
            {trip.photo_url && (
              <Image
                src={trip.photo_url}
                alt={trip.title}
                fill
                className="rounded-t-lg bg-zinc-100 object-cover"
              />
            )}
          </div>
        </DialogHeader>

        <div className="px-8 pt-4 pb-8">
          <div className="flex flex-col gap-y-6">
            <div className="flex flex-col gap-y-2">
              <DialogTitle className="text-[32px]">{trip.title}</DialogTitle>
              <StatusButton tripId={trip.id} status={trip.status} />
            </div>
            <p className="text-base">{trip.description}</p>
          </div>

          <hr className="border-t my-4 border-gray-200" />

          <div className="flex flex-col gap-y-6">
            <h2 className="text-2xl">Itinerary</h2>

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
                      <p className="text-base font-medium">Day {day.day}:</p>
                      <p className="text-base">{day.location}</p>
                    </div>

                    <p className="text-base text-[#898989]">
                      {day.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
