"use client";
import { updateReservation } from "@/actions";
import { categories } from "@/data";
import useLoginModal from "@/hooks/useLoginModal";
import { Listing, Reservation, User } from "@prisma/client";
import { differenceInDays, eachDayOfInterval } from "date-fns";
import { useRouter } from "next/navigation";
import { Suspense, useCallback, useEffect, useMemo, useState } from "react";
import { Range } from "react-date-range";
import toast from "react-hot-toast";
import ListingHead from "./ListingHead";
import ListingInfo from "./ListingInfo";
import ListingReservation from "./ListingReservation";

const initialDateRange = {
  startDate: new Date(),
  endDate: new Date(),
  key: "selection",
};

type ListingClientProps = {
  reservation?: Reservation[];
  currentUser: User | null;
  listing: Listing & { user: User };
};
export default function ListingClient({
  listing,
  currentUser: currentUser,
  reservation = [],
}: ListingClientProps) {
  const router = useRouter();

  const disabledDates = useMemo(() => {
    let dates: Date[] = [];

    reservation.forEach((reservation: any) => {
      const range = eachDayOfInterval({
        start: new Date(reservation.startDate),
        end: new Date(reservation.endDate),
      });

      dates = [...dates, ...range];
    });

    return dates;
  }, [reservation]);

  const loginModal = useLoginModal();
  const category = useMemo(() => {
    return categories.find((item) => item.label === listing.category);
  }, [listing.category]);

  const [isLoading, setIsLoading] = useState(false);
  const [totalPrice, setTotalPrice] = useState(listing.price);
  const [dateRange, setDateRange] = useState<Range>(initialDateRange);

  const onCreateReservation = useCallback(() => {
    if (!currentUser) {
      return loginModal.onOpen();
    }
    setIsLoading(true);
    try {
      const reservation = async () => {
        await updateReservation(
          totalPrice,
          dateRange.startDate,
          dateRange.endDate,
          listing?.id
        );
      };
      reservation();
      toast.success("Listing reserved!");
      setDateRange(initialDateRange);
      router.push("/trips");
    } catch (error) {
      toast.error("Something went wrong.");
    } finally {
      setIsLoading(false);
    }
  }, [totalPrice, dateRange, listing?.id, router, currentUser, loginModal]);

  useEffect(() => {
    if (dateRange.startDate && dateRange.endDate) {
      const dayCount =
        differenceInDays(dateRange.endDate, dateRange.startDate) + 1;

      if (dayCount && listing.price) {
        setTotalPrice(dayCount * listing.price);
      } else {
        setTotalPrice(listing.price);
      }
    }
  }, [dateRange, listing.price]);

  return (
    <Suspense>
      <div className="max-w-screen-lg mx-auto ">
        <div className="flex flex-col gap-6">
          <ListingHead
            title={listing.title}
            imageSrc={listing.imageSrc}
            locationValue={listing.locationValue}
            id={listing.id}
          />
          <div className="grid grid-cols-1 md:grid-cols-7 md:gap-10 mt-6">
            <ListingInfo
              user={listing.user}
              category={category}
              description={listing.description}
              roomCount={listing.roomCount}
              guestCount={listing.guestCount}
              bathroomCount={listing.bathroomCount}
              locationValue={listing.locationValue}
            />
            <div
              className=" order-first mb-10 md:order-last md:col-span-3
              "
            >
              <ListingReservation
                price={listing.price}
                totalPrice={totalPrice}
                onChangeDate={(value) => setDateRange(value)}
                dateRange={dateRange}
                onSubmit={onCreateReservation}
                disabled={isLoading}
                disabledDates={disabledDates}
              />
            </div>
          </div>
        </div>
      </div>
    </Suspense>
  );
}
