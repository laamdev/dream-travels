import { NextResponse } from "next/server";

import { getTripById, getItinerariesByTripId } from "@/lib/db/queries";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ tripId: string }> }
) {
  try {
    const { tripId } = await params;

    const [trip, itineraries] = await Promise.all([
      getTripById(tripId),
      getItinerariesByTripId(tripId),
    ]);

    if (!trip) {
      return NextResponse.json({ error: "Trip not found" }, { status: 404 });
    }

    return NextResponse.json({
      ...trip,
      itineraries: itineraries.map((itinerary) => ({
        id: String(itinerary.id),
        trip_id: String(itinerary.trip_id),
        day: Number(itinerary.day),
        location: String(itinerary.location),
        description: String(itinerary.description),
      })),
    });
  } catch (error) {
    console.error("Error fetching trip:", error);
    return NextResponse.json(
      { error: "Failed to fetch trip" },
      { status: 500 }
    );
  }
}
