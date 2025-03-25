import { Travel } from "@/types";

import { TripCard } from "@/components/trip-card";

export default async function Home() {
  const travelsData = await fetch(process.env.NEXT_PUBLIC_API_URL as string);
  const travels = await travelsData.json();

  return (
    <div className="flex flex-col gap-4">
      {travels.map((travel: Travel) => (
        <TripCard key={travel.id} travel={travel} />
      ))}
    </div>
  );
}
