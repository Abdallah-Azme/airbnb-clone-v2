import { getReservations } from "@/actions";
import EmptyState from "@/components/EmptyState";
import { auth } from "../../../auth";
import ReservationsClient from "./ReservationsClient";
import { Suspense } from "react";

export default async function page() {
  const session = await auth();
  const currentUser = session?.user;

  if (!currentUser) {
    return <EmptyState title="Unauthorized" subtitle="Please login" />;
  }

  const reservations = await getReservations({ authorId: currentUser.id });

  if (reservations.length === 0) {
    return (
      <EmptyState
        title="No reservations found"
        subtitle="Looks like you have no reservations on your properties."
      />
    );
  }

  return (
    <Suspense>
      <ReservationsClient reservations={reservations} />;
    </Suspense>
  );
}
