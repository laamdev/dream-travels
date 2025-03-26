"use client";

import React from "react";
import { CheckIcon } from "lucide-react";

import { updateTripStatusAction } from "@/app/_actions";

export const StatusButton = ({
  tripId,
  status,
}: {
  tripId: string;
  status: string;
}) => {
  const isDone = status === "done";

  return (
    <button
      onClick={async () => {
        await updateTripStatusAction(tripId);
      }}
      className="flex cursor-pointer items-center gap-x-1.5 text-[#898989]"
    >
      {isDone ? (
        <CheckIcon className="size-[18px] p-0.5 bg-green-600 rounded-full text-white" />
      ) : (
        <CheckIcon className="size-[18px] border-2 p-0.5 rounded-full" />
      )}
      <span className="text-base">
        {isDone ? "Completed" : "Mark as completed"}
      </span>
    </button>
  );
};
