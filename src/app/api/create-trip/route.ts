import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";

import { createTripformSchema } from "@/schemas";
import { createTripAction } from "@/app/_actions";

export async function POST(request: NextRequest) {
  const data = await request.json();

  const result = createTripformSchema.safeParse(data);

  if (!result.success) {
    console.error("Validation error:", result.error);
    return NextResponse.json(result.error, { status: 400 });
  }

  try {
    const response = await createTripAction(result.data);
    revalidatePath("/");
    return NextResponse.json(response);
  } catch (error) {
    console.error("Error creating trip:", error);
    return NextResponse.json(
      {
        error: "Failed to create trip",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
