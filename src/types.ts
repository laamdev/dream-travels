export interface Itinerary {
  day: number;
  location: string;
  description: string;
}

export interface Travel {
  id: number;
  title: string;
  description: string;
  photo_url: string;
  introduction: string;
  status: number;
  itinerary: Itinerary;
}
