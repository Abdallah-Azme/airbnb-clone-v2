"use client";
import { AuthUser } from "@/data";
import useCountries from "@/hooks/useCountry";
import { Listing, Reservation } from "@prisma/client";
import { format } from "date-fns";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useCallback, useMemo } from "react";
import HeartButton from "../HeartButton";
import Button from "../Button";

type ListingCardProps = {
  data: Listing;
  reservation?: Reservation;
  onAction?: (id: string) => void;
  disabled?: boolean;
  actionLabel?: string;
  actionId?: string;
  currentUser: undefined | AuthUser;
};
export default function ListingCard({
  reservation,
  onAction,
  disabled,
  actionLabel,
  actionId = "",
  currentUser,
  data,
}: ListingCardProps) {
  const router = useRouter();
  const { getByValue } = useCountries();
  const location = getByValue(data.locationValue);

  const handelCancel = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      e.stopPropagation();
      if (disabled) {
        return;
      }
      onAction?.(actionId);
    },
    [onAction, disabled, actionId]
  );

  const price = useMemo(() => {
    if (reservation) {
      return reservation.totalPrice;
    }
    return data.price;
  }, [reservation, data.price]);

  const reservationDate = useMemo(() => {
    if (!reservation) {
      return null;
    }

    const start = new Date(reservation.startDate);
    const end = new Date(reservation.endDate);
    return `${format(start, "PP")} - ${format(end, "PP")}`;
  }, [reservation]);

  return (
    <div
      onClick={() => router.push(`/listing/${data.id}`)}
      className="col-span-1 cursor-pointer group "
    >
      <div className="flex flex-col gap-2 w-full ">
        <div className="aspect-square w-full relative overflow-hidden rounded-xl ">
          <Image
            alt="Listing"
            src={data.imageSrc}
            fill
            className="h-full w-full group-hover:scale-110 transition object-cover "
          />
          <div className="absolute top-3 right-3 ">
            <HeartButton listingId={data.id} currentUser={currentUser} />
          </div>
        </div>
        <div className=" font-semibold text-lg ">
          {location?.region}, {location?.label}
        </div>
        <div className="font-light text-neutral-500">
          {reservationDate || data.category}
        </div>
        <div className=" flex flex-row items-center gap-1 ">
          <div className="font-semibold">$ {price}</div>
          {!reservation && <div className="font-light">night </div>}
        </div>
        {onAction && actionLabel && (
          <Button
            label={actionLabel}
            onClick={handelCancel}
            small
            disabled={disabled}
          />
        )}
      </div>
    </div>
  );
}
