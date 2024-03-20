import { ListingsParams, getAllListing } from "@/actions";
import Container from "@/components/Container";
import EmptyState from "@/components/EmptyState";
import ListingCard from "@/components/listing/ListingCard";
import { Listing } from "@prisma/client";

type HomeProps = {
  searchParams: ListingsParams;
};

export default async function Home({ searchParams }: HomeProps) {
  const listing = await getAllListing(searchParams);

  if (!listing || listing.length === 0) {
    return <EmptyState showReset />;
  }
  return (
    <Container>
      <div className="pt-24 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8">
        {listing.map((list: Listing) => (
          <ListingCard key={list.id} data={list} />
        ))}
      </div>
    </Container>
  );
}
