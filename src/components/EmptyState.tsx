"use client";
import { useRouter } from "next/navigation";
import Heading from "./Heading";
import Button from "./Button";
import { Suspense } from "react";

type EmptyStateProps = {
  title?: string;
  subtitle?: string;
  showReset?: boolean;
};

export default function EmptyState({
  subtitle = "Try changing or removing some of your filters",
  showReset,
  title = "No exact match found",
}: EmptyStateProps) {
  const router = useRouter();
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <div className=" h-[60vh] flex flex-col gap-2 justify-center items-center ">
        <Heading title={title} subtitle={subtitle} center />
        <div className="w-48 mt-4">
          {showReset && (
            <Button
              label="Remove all filters"
              onClick={() => router.push("/")}
            />
          )}
        </div>
      </div>
    </Suspense>
  );
}
