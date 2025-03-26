"use client";

import { useFormStatus } from "react-dom";

export const DeleteTripButton = () => {
  const { pending } = useFormStatus();

  return (
    <button disabled={pending} type="submit">
      Sign Up
    </button>
  );
};
