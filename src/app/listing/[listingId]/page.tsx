import { getListingById, getReservations, getUser } from "@/actions";
import EmptyState from "@/components/EmptyState";
import ListingClient from "@/components/listing/ListingClient";

export default async function page({
  params,
}: {
  params: { listingId: string };
}) {
  const listing = await getListingById(params.listingId);
  const user = await getUser();
  const reservation = await getReservations(params);
  if (!listing) {
    return <EmptyState />;
  }
  return (
    <ListingClient
      listing={listing}
      reservation={reservation}
      currentUser={user}
    />
  );
}
