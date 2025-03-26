"use client";

import React, { useState } from "react";
import { toast } from "sonner";

import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogHeader,
  DialogTrigger,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

import { Trip } from "@/types/index";
import { deleteTripAction } from "@/app/_actions";

export const DeleteTripDialog = ({ trip }: { trip: Trip }) => {
  const [isPending, setIsPending] = useState(false);

  const handleDelete = async () => {
    try {
      setIsPending(true);
      await deleteTripAction(trip.id);
      toast.success("Trip deleted successfully");
    } catch (error) {
      toast.error("Failed to delete trip");
      console.error("Error deleting trip:", error);
    } finally {
      setIsPending(false);
    }
  };

  return (
    <Dialog>
      <DialogTrigger className="w-fit cursor-pointer text-destructive underline underline-offset-2">
        Delete
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogHeader>
            <DialogTitle>Delete a trip</DialogTitle>
          </DialogHeader>

          <DialogDescription>
            {`Are you sure you want to delete your trip to `}
            <span className="font-medium">{trip.title}</span>
            {`? This action
            cannot be undone.`}
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col gap-y-6 mt-6">
          <Button
            variant="destructive"
            onClick={handleDelete}
            disabled={isPending}
          >
            {isPending ? "Deleting..." : "Delete"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
