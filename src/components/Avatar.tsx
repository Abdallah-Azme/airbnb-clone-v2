import Image from "next/image";
import React from "react";

type AvatarProps = {
  src: string | null | undefined;
};

export default function Avatar({ src }: AvatarProps) {
  return (
    <Image
      alt="placeholder"
      src={src || "/images/placeholder.jpg"}
      height={30}
      width={30}
      className="rounded-full"
    />
  );
}
