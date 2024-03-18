import useCountries from "@/hooks/useCountry";
import { User } from "@prisma/client";
import React from "react";
import Heading from "../Heading";
import Image from "next/image";
import HeartButton from "../HeartButton";
import { AuthUser } from "@/data";

type ListingHeadProps = {
  title: string;
  imageSrc: string;
  locationValue: string;
  id: string;
  currentUser?: User | null;
};

export default function ListingHead({
  currentUser,
  id,
  imageSrc,
  locationValue,
  title,
}: ListingHeadProps) {
  const { getByValue } = useCountries();
  const location = getByValue(locationValue);
  return (
    <>
      <Heading
        title={title}
        subtitle={`${location?.region}, ${location?.label}`}
      />
      <div className="w-full h-[60vh] overflow-hidden rounded-xl relative ">
        <Image
          fill
          src={imageSrc}
          alt="Image of listing"
          className="object-cover w-full"
        />
        <div className="absolute top-5 right-5 ">
          <HeartButton listingId={id} />
        </div>
      </div>
    </>
  );
}
