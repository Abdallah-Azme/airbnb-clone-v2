import React from "react";
import { auth } from "../../../auth";
import EmptyState from "@/components/EmptyState";
import { getReservations } from "@/actions";
import TripsClient from "./TripsClient";
import { AuthUser } from "@/data";

export default async function page() {
  const session = await auth();
  const user = session?.user;

  if (!user) {
    return (
      <EmptyState
        title="Log in"
        subtitle="How would you see your visits without logging in?"
      />
    );
  }
  const reservation = await getReservations({ userId: user.id });
  if (reservation.length === 0) {
    return (
      <EmptyState
        title="No trips found"
        subtitle="Do you know what is this mean? It's the time to take a break and book a trip."
      />
    );
  }
  return (
    <TripsClient reservations={reservation} currentUser={user as AuthUser} />
  );
}
