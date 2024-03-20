import { getAllListing } from "@/actions";
import EmptyState from "@/components/EmptyState";
import { AuthUser } from "@/data";
import { auth } from "../../../auth";
import PropertiesClient from "./PropertiesClient";
import { Suspense } from "react";

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
  const listing = await getAllListing({ userId: user.id });
  if (listing?.length === 0) {
    return (
      <EmptyState
        title="No Properties found"
        subtitle="Looks like there is no properties."
      />
    );
  }
  return (
    <Suspense>
      <PropertiesClient listing={listing} currentUser={user as AuthUser} />;
    </Suspense>
  );
}
