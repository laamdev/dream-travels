"use client";

import * as z from "zod";
import { toast } from "sonner";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Plus, Trash2 } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";

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

import { createTripformSchema } from "@/schemas";
import { Trip } from "@/types/index";
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
        introduction: values.introduction,
        description: values.description,
        photo_url: values.photo_url,
        status: values.status,
        itineraries: values.itinerary.map((item, index) => ({
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
                  className="resize-none"
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
                  className="resize-none"
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
              onClick={() => append({ day: 1, location: "", description: "" })}
              className="cursor-pointer p-0.5 rounded-full border-2 border-black group hover:text-white hover:bg-black transition-all duration-300 ease-in-out"
            >
              <Plus className="size-4" />
            </button>
          </div>

          {fields.map((field, index) => (
            <div key={field.id} className="gap-y-4 p-4 bg-[#f3f3f3] rounded-lg">
              <div className="flex justify-between items-center">
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => remove(index)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>

              <div className="grid grid-cols-4 gap-x-4">
                <div className="col-span-1">
                  <FormField
                    control={form.control}
                    name={`itinerary.${index}.day`}
                    render={({ field }) => (
                      <FormItem>
                        <Select
                          onValueChange={(value) =>
                            field.onChange(Number(value))
                          }
                          defaultValue={String(field.value)}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select day" />
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

                <div className="col-span-3 flex flex-col gap-y-2">
                  <FormField
                    control={form.control}
                    name={`itinerary.${index}.location`}
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input
                            placeholder="e.g., Rome"
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
                            placeholder="What to do on this day..."
                            className="resize-none"
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
          ))}
        </div>

        <Button type="submit" className="mt-6" disabled={isPending}>
          {isPending ? "Updating..." : "Update Trip"}
        </Button>
      </form>
    </Form>
  );
};
