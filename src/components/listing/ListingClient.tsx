"use client";
import { categories } from "@/data";
import { Listing, Reservation, User } from "@prisma/client";
import React, { useMemo } from "react";
import ListingHead from "./ListingHead";

type ListingClientProps = {
  reservation?: Reservation[];
  curentUser: User | null;
  listing: Listing;
};
export default function ListingClient({
  listing,
  curentUser,
  reservation,
}: ListingClientProps) {
  const category = useMemo(() => {
    return categories.find((item) => item.label === listing.category);
  }, [listing.category]);

  return (
    <div className="max-w-screen-lg mx-auto ">
      <div className="flex flex-col gap-6">
        <ListingHead
          title={listing.title}
          imageSrc={listing.imageSrc}
          locationValue={listing.locationValue}
          id={listing.id}
        />
      </div>
    </div>
  );
}
