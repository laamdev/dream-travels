import React from "react";
import { Compass } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";

export const EmptyState = () => {
  return (
    <Card className="flex flex-col items-center justify-center py-12 text-center">
      <CardContent className="flex flex-col items-center justify-center py-12 text-center">
        <Compass className="size-12 text-gray-400 mb-4" />
        <h3 className="text-xl font-medium text-gray-900 mb-2">{`No trips found`}</h3>
        <p className="text-gray-500 max-w-sm">
          {`We couldn't find any trips matching your criteria. Try adjusting your filters or search terms.`}
        </p>
      </CardContent>
    </Card>
  );
};
