import { getListingById, getUser } from "@/actions";
import EmptyState from "@/components/EmptyState";
import ListingClient from "@/components/listing/ListingClient";
import { User } from "@prisma/client";
import React from "react";

export default async function page({
  params,
}: {
  params: { listingId: string };
}) {
  const listing = await getListingById(params.listingId);
  const user = await getUser();
  if (!listing) {
    return <EmptyState />;
  }
  return <ListingClient listing={listing} curentUser={user} />;
}
