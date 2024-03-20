"use client";
import { deleteProperty } from "@/actions";
import Container from "@/components/Container";
import Heading from "@/components/Heading";
import ListingCard from "@/components/listing/ListingCard";
import { AuthUser } from "@/data";
import { Listing } from "@prisma/client";
import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";
import toast from "react-hot-toast";
type TripsClientProps = {
  listing: Listing[] | undefined;
  currentUser?: AuthUser | null;
};
export default function PropertiesClient({ listing }: TripsClientProps) {
  const router = useRouter();
  const [deletingId, setDeletingId] = useState("");

  const onCancel = useCallback(
    async (id: string) => {
      setDeletingId(id);

      try {
        await deleteProperty(id);
        toast.success("Listing deleted successfully");
        router.refresh();
      } catch (error: unknown) {
        toast.error("Failed to delete");
      } finally {
        setDeletingId("");
      }
    },
    [router]
  );

  return (
    <Container>
      <Heading title="Properties" subtitle="List of your properties" />
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
        {listing?.map((listing: any) => (
          <ListingCard
            key={listing.id}
            data={listing}
            actionId={listing.id}
            onAction={onCancel}
            disabled={deletingId === listing.id}
            actionLabel="Delete property"
          />
        ))}
      </div>
    </Container>
  );
}
