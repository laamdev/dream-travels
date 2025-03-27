"use client";

import React from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "motion/react";

import { DeleteTripDialog } from "@/components/dialogs/delete-trip";
import { TripDetailsDialog } from "@/components/dialogs/trip-details";
import { EditTripDialog } from "@/components/dialogs/edit-trip";

import { Trip } from "@/types";

export const TripCard = ({ trip }: { trip: Trip }) => {
  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.3 }}
        className="h-full"
        data-testid={trip.title}
      >
        <div className="grid md:grid-cols-2 gap-4 border rounded-xl h-full">
          <div className="relative h-56 md:h-[300px]">
            {trip.photo_url && (
              <Image
                src={trip.photo_url}
                alt={trip.title}
                fill
                className="object-cover md:rounded-tr-none rounded-t-xl md:rounded-l-xl overflow-hidden bg-zinc-100 object-center"
              />
            )}
          </div>
          <div className="flex flex-col justify-center p-6 gap-y-6 h-full">
            <h2 className="text-2xl">{trip.title}</h2>
            <p className="text-base">{trip.introduction}</p>
            <div className="flex justify-between mt-auto">
              <TripDetailsDialog trip={trip} />
              <div className="flex gap-4">
                <EditTripDialog trip={trip} />
                <DeleteTripDialog trip={trip} />
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};
