"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import * as z from "zod";
import { toast } from "sonner";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { PlusIcon, XIcon } from "lucide-react";

import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { EmptyState } from "@/components/ui/empty-state";

import { createTripformSchema } from "@/validation/form-schemas";
import { Trip } from "@/types";
import { editTripAction } from "@/app/_actions";

interface EditTripFormProps {
  trip: Trip;
  onSuccess?: () => void;
}

export const EditTripForm = ({ trip, onSuccess }: EditTripFormProps) => {
  const [isPending, setIsPending] = useState(false);
  const router = useRouter();

  const form = useForm<z.infer<typeof createTripformSchema>>({
    resolver: zodResolver(createTripformSchema),
    defaultValues: {
      title: trip.title,
      introduction: trip.introduction || "",
      description: trip.description || "",
      photo_url: trip.photo_url || "",
      status: trip.status as "done" | "todo",
      itinerary: trip.itineraries.map((it) => ({
        day: it.day,
        location: it.location,
        description: it.description,
      })),
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "itinerary",
  });

  async function onSubmit(values: z.infer<typeof createTripformSchema>) {
    try {
      setIsPending(true);

      const updatedTrip = {
        ...trip,
        title: values.title,
        introduction: values.introduction || null,
        description: values.description || null,
        photo_url: values.photo_url || null,
        status: values.status,
        itineraries: values.itinerary
          .filter(
            (
              item
            ): item is { day: number; location: string; description: string } =>
              item.day !== undefined
          )
          .map((item, index) => ({
            id: trip.itineraries[index]?.id || "",
            trip_id: trip.id,
            day: item.day,
            location: item.location,
            description: item.description,
          })),
      };

      await editTripAction(updatedTrip);

      toast.success("Trip updated successfully");
      router.refresh();
      onSuccess?.();
    } catch (error) {
      console.error("Form submission error", error);
      toast.error("Failed to update the trip. Please try again.");
    } finally {
      setIsPending(false);
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-y-8"
      >
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input
                  placeholder="Italy"
                  type="text"
                  {...field}
                  value={field.value || ""}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="introduction"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Introduction (max. 240 characters)</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="From Rome to Venice..."
                  {...field}
                  value={field.value || ""}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Discover the wonders of the Roman empire..."
                  {...field}
                  value={field.value || ""}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="photo_url"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Image</FormLabel>
              <FormControl>
                <Input
                  placeholder="Image URL"
                  type="text"
                  {...field}
                  value={field.value || ""}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <FormLabel>Day by day itinerary</FormLabel>

            <button
              type="button"
              onClick={() =>
                append({ day: undefined, location: "", description: "" })
              }
              className="cursor-pointer p-0.5 rounded-full border-2 border-black group hover:text-white hover:bg-black transition-all duration-300 ease-in-out"
            >
              <PlusIcon className="size-4" />
            </button>
          </div>

          {fields.length === 0 ? (
            <EmptyState
              title="No days planned yet"
              description="Click the + button to add your first day"
            />
          ) : (
            fields.map((field, index) => (
              <div
                key={field.id}
                className="gap-y-4 relative p-4 bg-[#f3f3f3] rounded-lg"
              >
                <button
                  type="button"
                  onClick={() => remove(index)}
                  className="absolute top-1 right-1 p-0.5 group cursor-pointer transition-colors duration-300 ease-in-out"
                >
                  <XIcon className="size-3 text-destructive group-hover:text-destructive/80" />
                </button>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div className="md:col-span-1">
                    <FormField
                      control={form.control}
                      name={`itinerary.${index}.day`}
                      render={({ field }) => (
                        <FormItem>
                          <Select
                            onValueChange={(value) =>
                              field.onChange(Number(value))
                            }
                            value={String(field.value)}
                          >
                            <FormControl>
                              <SelectTrigger className="w-full">
                                <SelectValue placeholder="Day" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {Array.from({ length: 14 }, (_, i) => i + 1).map(
                                (day) => (
                                  <SelectItem key={day} value={String(day)}>
                                    Day {day}
                                  </SelectItem>
                                )
                              )}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="md:col-span-3 flex flex-col gap-y-2">
                    <FormField
                      control={form.control}
                      name={`itinerary.${index}.location`}
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <Input
                              placeholder="Location"
                              {...field}
                              value={field.value || ""}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name={`itinerary.${index}.description`}
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <Textarea
                              placeholder="Description"
                              {...field}
                              value={field.value || ""}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        <Button type="submit" className="w-auto md:w-fit" disabled={isPending}>
          {isPending ? "Updating..." : "Update"}
        </Button>
      </form>
    </Form>
  );
};
