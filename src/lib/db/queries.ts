import { eq, and, like, or, sql } from "drizzle-orm";

import { db } from "@/lib/db/index";
import { trips, itineraries } from "@/lib/db/schema";

interface SearchParams {
  status?: string;
  search?: string;
}

export async function getAllTrips(searchParams: SearchParams) {
  const { status, search } = searchParams;
  const whereClause = and(
    status && status !== "all" ? eq(trips.status, status) : undefined,
    search
      ? or(
          like(trips.title, `%${search}%`),
          like(trips.description, `%${search}%`),
          like(trips.introduction, `%${search}%`)
        )
      : undefined
  );

  const tripsWithItineraries = await db
    .select({
      id: trips.id,
      title: trips.title,
      introduction: trips.introduction,
      description: trips.description,
      photo_url: trips.photo_url,
      status: trips.status,
    })
    .from(trips)
    .where(whereClause)
    .orderBy(sql`${trips.createdAt} DESC`);

  const allItineraries = await db
    .select()
    .from(itineraries)
    .orderBy(itineraries.day);

  return tripsWithItineraries.map((trip) => ({
    id: String(trip.id),
    title: String(trip.title),
    introduction: trip.introduction ? String(trip.introduction) : null,
    description: trip.description ? String(trip.description) : null,
    photo_url: trip.photo_url ? String(trip.photo_url) : null,
    status: String(trip.status),
    itineraries: allItineraries
      .filter((itinerary) => itinerary.trip_id === trip.id)
      .map((itinerary) => ({
        id: String(itinerary.id),
        trip_id: String(itinerary.trip_id),
        day: Number(itinerary.day),
        location: String(itinerary.location),
        description: String(itinerary.description),
      })),
  }));
}

export async function getTripById(id: string) {
  const trip = await db.select().from(trips).where(eq(trips.id, id)).get();

  if (!trip) return null;

  return {
    id: String(trip.id),
    title: String(trip.title),
    introduction: trip.introduction ? String(trip.introduction) : null,
    description: trip.description ? String(trip.description) : null,
    photo_url: trip.photo_url ? String(trip.photo_url) : null,
    status: String(trip.status),
  };
}

export async function getItinerariesByTripId(tripId: string) {
  return await db
    .select()
    .from(itineraries)
    .where(eq(itineraries.trip_id, tripId))
    .orderBy(itineraries.day);
}
