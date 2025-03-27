import { Trip } from "@/types";

import { TripCard } from "@/components/trip-card";
import { Header } from "@/components/home/header";
import { EmptyState } from "@/components/home/empty-state";

import { getAllTrips } from "@/lib/db/queries";

interface SearchParams {
  status?: string;
  search?: string;
}

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const { status, search } = await searchParams;

  const trips: Trip[] = await getAllTrips({ status, search });

  return (
    <div>
      <Header />

      <div className="flex mt-6 flex-col gap-6">
        {trips.length === 0 ? (
          <EmptyState />
        ) : (
          trips.map((trip) => <TripCard key={trip.id} trip={trip} />)
        )}
      </div>
    </div>
  );
}
