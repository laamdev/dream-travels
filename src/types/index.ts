export interface Itinerary {
  id: string;
  trip_id: string;
  day: number;
  location: string;
  description: string;
}

export interface Trip {
  id: string;
  title: string;
  introduction: string | null;
  description: string | null;
  photo_url: string | null;
  status: string;
  itineraries: Itinerary[];
}
