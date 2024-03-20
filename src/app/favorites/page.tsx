import { getFavoriteListings } from "@/actions";
import EmptyState from "@/components/EmptyState";
import FavoritesClient from "./FavoritesClient";

export default async function page() {
  const listings = await getFavoriteListings();

  if (listings.length === 0) {
    return (
      <EmptyState
        title="No favorites found"
        subtitle="Looks like you have no favorite listings."
      />
    );
  }
  return <FavoritesClient listings={listings} />;
}
