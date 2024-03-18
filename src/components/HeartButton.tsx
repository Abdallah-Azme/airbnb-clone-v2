"use client";

import { getUser, toggleFavorite } from "@/actions";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";

type HeartButtonProps = {
  listingId: string;
};
export default function HeartButton({ listingId }: HeartButtonProps) {
  const [hasFavored, setHasFavored] = useState<boolean | undefined>(false);

  useEffect(() => {
    const checkIsFavored = async () => {
      const user = await getUser();
      setHasFavored(user?.favoriteIds.includes(listingId));
    };
    checkIsFavored();
    return () => {};
  }, [listingId]);

  const onFavorite = async () => {
    await toggleFavorite(listingId);
  };

  return (
    <div
      className="relative hover:opacity-80 transition cursor-pointer "
      onClick={onFavorite}
    >
      <AiOutlineHeart
        size={28}
        className="fill-white absolute -top-[2px] -right-[2px]"
      />
      <AiFillHeart
        size={24}
        className={hasFavored ? " fill-rose-500 " : " fill-neutral-500/70"}
      />
    </div>
  );
}
