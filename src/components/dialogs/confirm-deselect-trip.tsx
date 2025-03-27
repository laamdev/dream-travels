"use client";
import React from "react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

import { Trip } from "@/types";

export const ConfirmDeselectTripDialog = ({
  showDeselectDialog,
  setShowDeselectDialog,
  trip,
  handleDeselect,
}: {
  showDeselectDialog: boolean;
  setShowDeselectDialog: (show: boolean) => void;
  trip: Trip;
  handleDeselect: () => void;
}) => {
  return (
    <Dialog open={showDeselectDialog} onOpenChange={setShowDeselectDialog}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Deselect Trip</DialogTitle>
          <DialogDescription>
            Are you sure you want to deselect your trip to{" "}
            <span className="font-medium">{trip.title}</span>? You can always
            select it again later.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button
            variant="secondary"
            onClick={() => setShowDeselectDialog(false)}
          >
            Cancel
          </Button>
          <Button variant="destructive" onClick={handleDeselect}>
            Deselect Trip
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
