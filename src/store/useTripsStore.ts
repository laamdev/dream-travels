import { create } from "zustand";
import { persist } from "zustand/middleware";
import dayjs from "dayjs";

interface Trip {
  id: string;
  title: string;
  introduction: string | null;
  description: string | null;
  photo_url: string | null;
  status: string;
  itineraries: {
    id: string;
    trip_id: string;
    day: number;
    location: string;
    description: string;
  }[];
}

interface TripSelection {
  tripId: string;
  selectedAt: string; // ISO string
  plannedDate: string; // ISO string
}

interface TripsState {
  selectedTrip: TripSelection | null;
  selectRandomTrip: (trips: Trip[]) => void;
  hasSelectedTrip: () => boolean;
  getTimeRemaining: () => {
    days: number;
    hours: number;
    minutes: number;
  } | null;
}

export const useTripsStore = create<TripsState>()(
  persist(
    (set, get) => ({
      selectedTrip: null,

      selectRandomTrip: (trips) => {
        if (get().selectedTrip) return; // Prevent new selection if trip already chosen
        if (!trips || trips.length === 0) return;

        const randomTrip = trips[Math.floor(Math.random() * trips.length)];
        if (!randomTrip) return;

        const plannedDate = dayjs().add(3, "month").toISOString();

        set({
          selectedTrip: {
            tripId: randomTrip.id,
            selectedAt: dayjs().toISOString(),
            plannedDate,
          },
        });
      },

      hasSelectedTrip: () => {
        return get().selectedTrip !== null;
      },

      getTimeRemaining: () => {
        const selectedTrip = get().selectedTrip;
        if (!selectedTrip) return null;

        const now = dayjs();
        const plannedDate = dayjs(selectedTrip.plannedDate);
        const diff = plannedDate.diff(now);

        return {
          days: Math.floor(diff / (1000 * 60 * 60 * 24)),
          hours: Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)),
        };
      },
    }),
    {
      name: "trips-storage",
      storage: {
        getItem: (name) => {
          const str = localStorage.getItem(name);
          if (!str) return null;
          try {
            return JSON.parse(str);
          } catch (error) {
            console.error("Error parsing stored trips:", error);
            return null;
          }
        },
        setItem: (name, value) => {
          try {
            localStorage.setItem(name, JSON.stringify(value));
          } catch (error) {
            console.error("Error storing trips:", error);
          }
        },
        removeItem: (name) => localStorage.removeItem(name),
      },
    }
  )
);
