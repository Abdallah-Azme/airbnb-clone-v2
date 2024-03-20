"use client";
import EmptyState from "@/components/EmptyState";
import { Suspense, useEffect } from "react";

type ErrorProps = {
  error: Error;
};

export default function Error({ error }: ErrorProps) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <EmptyState title="Uh Oh" subtitle="Something went wrong!" />;
    </Suspense>
  );
}
