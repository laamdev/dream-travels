"use client";

import { useState } from "react";

import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog";
import { buttonVariants } from "@/components/ui/button";
import { CreateTripForm } from "@/components/forms/create-trip";

export const CreateTripDialog = () => {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger className={buttonVariants({ variant: "outline" })}>
        Create a new trip
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create a trip</DialogTitle>
        </DialogHeader>
        <div className="mt-6">
          <CreateTripForm onSuccess={() => setOpen(false)} />
        </div>
      </DialogContent>
    </Dialog>
  );
};
