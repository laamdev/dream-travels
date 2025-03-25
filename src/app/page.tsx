import { Travel } from "@/types";

import { Input } from "@/components/ui/input";
import { TripCard } from "@/components/trip-card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default async function Home() {
  const travelsData = await fetch(process.env.NEXT_PUBLIC_API_URL as string);
  const travels = await travelsData.json();

  return (
    <div>
      <div className="flex flex-col justify-center items-center">
        <h1 className="text-[32px]">The places you dream of</h1>
        <p className="text-xl">Let’s live new adventures </p>

        <div className="flex justify-center items-center w-96">
          <Input placeholder="Search trips" className="mt-8" />
        </div>

        <div className="mt-16">
          <Tabs defaultValue="all">
            <TabsList>
              <TabsTrigger value="all" className="rounded-l-full">
                All
              </TabsTrigger>
              <TabsTrigger value="upcoming" className="border-x">
                Upcoming
              </TabsTrigger>
              <TabsTrigger value="completed" className="rounded-r-full">
                Completed
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      </div>

      <div className="flex mt-12 flex-col gap-4">
        {travels.map((travel: Travel) => (
          <TripCard key={travel.id} travel={travel} />
        ))}
      </div>
    </div>
  );
}
