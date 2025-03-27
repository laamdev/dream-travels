"use client";

import { useState } from "react";

import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog";
import { EditTripForm } from "@/components/forms/edit-trip";
import { Trip } from "@/types";

interface EditTripDialogProps {
  trip: Trip;
}

export const EditTripDialog = ({ trip }: EditTripDialogProps) => {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger className="w-fit cursor-pointer underline underline-offset-2">
        Edit trip
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit trip</DialogTitle>
        </DialogHeader>
        <div className="mt-4">
          <EditTripForm trip={trip} onSuccess={() => setOpen(false)} />
        </div>
      </DialogContent>
    </Dialog>
  );
};
