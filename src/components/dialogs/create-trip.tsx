"use client";

import { useState } from "react";
import { PlusIcon } from "lucide-react";

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
      <DialogTrigger className={buttonVariants({ variant: "secondary" })}>
        <span className="hidden md:block">Create a new trip</span>
        <span className="block md:hidden">
          <PlusIcon className="size-4" />
        </span>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create a trip</DialogTitle>
        </DialogHeader>
        <div className="mt-4">
          <CreateTripForm onSuccess={() => setOpen(false)} />
        </div>
      </DialogContent>
    </Dialog>
  );
};
