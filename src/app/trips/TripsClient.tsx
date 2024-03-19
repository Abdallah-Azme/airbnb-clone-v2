"use client";
import { deleteReservation } from "@/actions";
import Container from "@/components/Container";
import Heading from "@/components/Heading";
import ListingCard from "@/components/listing/ListingCard";
import { AuthUser } from "@/data";
import { Reservation } from "@prisma/client";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useCallback, useState } from "react";
import toast from "react-hot-toast";
type TripsClientProps = {
  reservations: Reservation[];
  currentUser?: AuthUser | null;
};
export default function TripsClient({ reservations }: TripsClientProps) {
  const router = useRouter();
  const [deletingId, setDeletingId] = useState("");

  const onCancel = useCallback(
    async (id: string) => {
      setDeletingId(id);

      try {
        const deletingReservation = await deleteReservation(id);
        toast.success("Reservation cancelled");
        router.refresh();
      } catch (error: unknown) {
        toast.error("Failed to delete");
      } finally {
        setDeletingId("");
      }
      deleteReservation(id);
    },
    [router]
  );

  return (
    <Container>
      <Heading
        title="Trips"
        subtitle="Where you've been and where you're going"
      />
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
        {reservations.map((reservation: any) => (
          <ListingCard
            key={reservation.id}
            data={reservation.listing}
            reservation={reservation}
            actionId={reservation.id}
            onAction={onCancel}
            disabled={deletingId === reservation.id}
            actionLabel="Cancel reservation"
          />
        ))}
      </div>
    </Container>
  );
}
