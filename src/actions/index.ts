"use server";

import client from "@/libs/prismadb";
import { hash } from "bcryptjs";
import { FieldValues } from "react-hook-form";
import toast from "react-hot-toast";
import { auth } from "../../auth";

export async function getUser() {
  const session = await auth();
  const user = session?.user;
  const userDb = await client.user.findFirst({
    where: { email: user?.email },
  });

  return userDb;
}

export async function createUser(data: FieldValues) {
  if (!data || !data.email || !data.name)
    throw new Error("Invalid credentials");

  const hashedPassword = await hash(data.password, 12);
  try {
    await client.user.create({
      data: { email: data.email, hashedPassword, name: data.name },
    });
  } catch (error) {
    console.log(error);
    toast.error("Error, try again!");
  }
}

export async function createNewList(formData: FieldValues) {
  const user = await getUser();
  if (!user) {
    throw new Error("There is no user, may you log in again?");
  }

  const {
    category,
    location,
    guestCount,
    roomCount,
    bathroomCount,
    imageSrc,
    price,
    title,
    description,
  } = formData;

  if (
    !category ||
    !location ||
    !guestCount ||
    !roomCount ||
    !bathroomCount ||
    !imageSrc ||
    !price ||
    !title ||
    !description
  ) {
    throw new Error("Invalid Data");
  }
  await client.listing.create({
    data: {
      category,
      locationValue: location.value,
      guestCount,
      roomCount,
      bathroomCount,
      imageSrc,
      price: parseInt(price, 10),
      title,
      description,
      userId: user.id,
    },
  });
}

export async function getAllListing() {
  try {
    const listing = await client.listing.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });
    return listing;
  } catch (error) {
    console.log(error);
  }
}

export async function toggleFavorite(listId: string) {
  const user = await getUser();
  if (!user) throw new Error("There is no user, may you log in again?");

  let favoriteIds = user.favoriteIds || [];

  const isFavored = favoriteIds.find((id) => id === listId);

  if (isFavored) {
    favoriteIds = favoriteIds.filter((id) => id !== listId);
  } else {
    favoriteIds.push(listId);
  }

  try {
    const updatedUser = await client.user.update({
      where: { id: user.id },
      data: { favoriteIds: favoriteIds },
    });
  } catch (error) {
    console.log(error);
    return "failed to favorite, try again later!";
  }
}
