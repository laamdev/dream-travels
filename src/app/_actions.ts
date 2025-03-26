"use server";

import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { v4 as uuidv4 } from "uuid";
import * as z from "zod";

import { db } from "@/lib/db";
import { trips, itineraries } from "@/lib/db/schema";
import { Trip } from "@/types/index";
import { createTripformSchema } from "@/schemas";

export const createTripAction = async (
  data: z.infer<typeof createTripformSchema>
) => {
  try {
    const tripId = uuidv4();

    await db.insert(trips).values({
      id: tripId,
      title: data.title,
      introduction: data.introduction || "",
      description: data.description || "",
      photo_url:
        data.photo_url ||
        "https://res.cloudinary.com/brother-sailor/image/upload/v1742960930/Dream%20Travels/travel-placeholder.jpg",
      status: "todo",
    });

    if (data.itinerary && data.itinerary.length > 0) {
      await db.insert(itineraries).values(
        data.itinerary.map(
          (item: { day: number; location: string; description: string }) => ({
            id: uuidv4(),
            trip_id: tripId,
            day: item.day,
            location: item.location,
            description: item.description,
          })
        )
      );
    }

    revalidatePath("/");
    return { success: true, tripId };
  } catch (error) {
    console.error("Error creating trip:", error);
    throw new Error("Failed to create trip");
  }
};

export const deleteTripAction = async (tripId: string) => {
  try {
    await db.delete(itineraries).where(eq(itineraries.trip_id, tripId));

    await db.delete(trips).where(eq(trips.id, tripId));

    revalidatePath("/");
    return { success: true };
  } catch (error) {
    console.error("Error deleting trip:", error);
    throw new Error("Failed to delete trip");
  }
};

export const updateTripStatusAction = async (tripId: string) => {
  try {
    const trip = await db
      .select()
      .from(trips)
      .where(eq(trips.id, tripId))
      .get();

    if (!trip) return;

    const newStatus = trip.status === "todo" ? "done" : "todo";

    await db
      .update(trips)
      .set({ status: newStatus })
      .where(eq(trips.id, tripId));

    revalidatePath("/");
    return { success: true };
  } catch (error) {
    console.error("Error updating trip status:", error);
    throw new Error("Failed to update trip status");
  }
};

export const editTripAction = async (trip: Trip) => {
  try {
    // Update trip details
    await db
      .update(trips)
      .set({
        title: trip.title,
        introduction: trip.introduction || "",
        description: trip.description || "",
        photo_url:
          trip.photo_url ||
          "https://res.cloudinary.com/brother-sailor/image/upload/v1742960930/Dream%20Travels/travel-placeholder.jpg",
        status: trip.status,
      })
      .where(eq(trips.id, trip.id));

    // Delete existing itineraries
    await db.delete(itineraries).where(eq(itineraries.trip_id, trip.id));

    // Insert new itineraries if they exist
    if (trip.itineraries && trip.itineraries.length > 0) {
      await db.insert(itineraries).values(
        trip.itineraries.map((item) => ({
          id: item.id || uuidv4(),
          trip_id: trip.id,
          day: item.day,
          location: item.location,
          description: item.description,
        }))
      );
    }

    revalidatePath("/");
    return { success: true };
  } catch (error) {
    console.error("Error editing trip:", error);
    throw new Error("Failed to edit trip");
  }
};
