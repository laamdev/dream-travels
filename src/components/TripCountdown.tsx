"use client";

import { useEffect, useState } from "react";

import { useTripsStore } from "@/store/useTripsStore";

export const TripCountdown = () => {
  const { selectedTrip, getTimeRemaining } = useTripsStore();
  const [timeLeft, setTimeLeft] = useState(getTimeRemaining());

  useEffect(() => {
    if (!selectedTrip) return;

    const timer = setInterval(() => {
      setTimeLeft(getTimeRemaining());
    }, 60000); // Update every minute

    return () => clearInterval(timer);
  }, [selectedTrip]);

  if (!selectedTrip || !timeLeft) return null;

  return (
    <div className="fixed top-20 right-4 p-4 bg-white shadow-lg rounded-lg">
      <h3>Time until your trip:</h3>
      <div className="text-lg font-bold">
        {timeLeft.days} days, {timeLeft.hours} hours, {timeLeft.minutes} minutes
      </div>
    </div>
  );
};
