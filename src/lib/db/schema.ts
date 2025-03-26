import { text, sqliteTable, integer } from "drizzle-orm/sqlite-core";
import { sql } from "drizzle-orm";

export const trips = sqliteTable("trips", {
  id: text("id").primaryKey(),
  title: text("title").notNull(),
  introduction: text("introduction"),
  description: text("description"),
  photo_url: text("photo_url"),
  status: text("status").notNull().default("todo"),
  createdAt: integer("created_at", { mode: "timestamp" })
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
});

export const itineraries = sqliteTable("itineraries", {
  id: text("id").primaryKey(),
  trip_id: text("trip_id")
    .notNull()
    .references(() => trips.id),
  day: integer("day").notNull(),
  location: text("location").notNull(),
  description: text("description").notNull(),
  createdAt: integer("created_at", { mode: "timestamp" })
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
});
