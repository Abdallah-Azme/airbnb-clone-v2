"use client";

import Container from "@/components/Container";
import Heading from "@/components/Heading";
import ListingCard from "@/components/listing/ListingCard";
import { AuthUser } from "@/data";
import { Listing } from "@prisma/client";
import { Suspense } from "react";

interface FavoritesClientProps {
  listings: Listing[];
}
export default function FavoritesClient({ listings }: FavoritesClientProps) {
  return (
    <Suspense>
      <Container>
        <Heading title="Favorites" subtitle="List of places you favored!" />
        <div
          className="
          mt-10
          grid 
          grid-cols-1 
          sm:grid-cols-2 
          md:grid-cols-3 
          lg:grid-cols-4
          xl:grid-cols-5
          2xl:grid-cols-6
          gap-8
        "
        >
          {listings.map((listing: any) => (
            <ListingCard key={listing.id} data={listing} />
          ))}
        </div>
      </Container>
    </Suspense>
  );
}
