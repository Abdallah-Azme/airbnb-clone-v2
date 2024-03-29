import { getFavoriteListings } from "@/actions";
import EmptyState from "@/components/EmptyState";
import FavoritesClient from "./FavoritesClient";
import { Suspense } from "react";

export default async function page() {
  const listings = await getFavoriteListings();

  if (listings.length === 0) {
    return (
      <Suspense fallback={<div>Loading...</div>}>
        <EmptyState
          title="No favorites found"
          subtitle="Looks like you have no favorite listings."
        />
      </Suspense>
    );
  }
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <FavoritesClient listings={listings} />;
    </Suspense>
  );
}
