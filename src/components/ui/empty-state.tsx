import { CalendarDays } from "lucide-react";

interface EmptyStateProps {
  title?: string;
  description?: string;
}

export const EmptyState = ({
  title = "No itineraries yet",
  description = "Add your first day to start planning your trip",
}: EmptyStateProps) => {
  return (
    <div className="flex flex-col items-center justify-center py-12 text-center">
      <CalendarDays className="size-12 text-zinc-400 mb-4" />
      <h3 className="text-lg font-medium text-zinc-900 mb-2">{title}</h3>
      <p className="text-sm text-zinc-500 max-w-sm">{description}</p>
    </div>
  );
};
