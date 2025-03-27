import { z } from "zod";

const itineraryItemSchema = z.object({
  day: z.number(),
  location: z.string(),
  description: z.string(),
});

export const createTripformSchema = z.object({
  id: z.number().optional(),
  title: z.string().min(1, { message: "Name is required" }),
  introduction: z
    .string()
    .max(240, { message: "Introduction must be less than 240 characters" })
    .optional(),
  description: z.string().optional(),
  photo_url: z.string().optional(),
  status: z.enum(["todo", "done"]).default("todo"),
  itinerary: z.array(itineraryItemSchema).default([]),
});
