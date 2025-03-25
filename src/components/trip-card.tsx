import React from "react";
import Image from "next/image";

import { Travel } from "@/types";

export const TripCard = ({ travel }: { travel: Travel }) => {
  return (
    <div>
      <div className="grid grid-cols-2 gap-4 border rounded-xl">
        <div className="relative h-full overflow-hidden rounded-l-lg">
          <Image
            src={travel.photo_url}
            alt={travel.title}
            fill
            className="object-cover object-center"
          />
        </div>
        <div className="flex flex-col justify-center p-4 gap-y-6">
          <h2 className="text-2xl">{travel.title}</h2>
          <p className="text-base">{travel.description}</p>
          <div className="flex justify-between">
            <button className="w-fit underline underline-offset-2">
              See trip details
            </button>
            <div className="flex gap-4">
              <button className="w-fit underline underline-offset-2">
                Edit
              </button>
              <button className="w-fit text-destructive underline underline-offset-2">
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
