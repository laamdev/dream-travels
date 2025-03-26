CREATE TABLE `itineraries` (
	`id` text PRIMARY KEY NOT NULL,
	`trip_id` text NOT NULL,
	`day` integer NOT NULL,
	`location` text NOT NULL,
	`description` text NOT NULL,
	`created_at` integer DEFAULT CURRENT_TIMESTAMP NOT NULL,
	FOREIGN KEY (`trip_id`) REFERENCES `trips`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `trips` (
	`id` text PRIMARY KEY NOT NULL,
	`title` text NOT NULL,
	`introduction` text,
	`description` text,
	`photo_url` text,
	`status` text DEFAULT 'todo' NOT NULL,
	`created_at` integer DEFAULT CURRENT_TIMESTAMP NOT NULL
);
