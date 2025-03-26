export interface Itinerary {
  day: number;
  location: string;
  description: string;
}

export interface Trip {
  id: number;
  title: string;
  description: string;
  photo_url: string;
  introduction: string;
  status: number;
  itinerary: Itinerary;
}

export interface ItineraryDay {
  day: number;
  location: string;
  description: string;
}
