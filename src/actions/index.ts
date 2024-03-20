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

export async function getAllListing(userId?: string) {
  try {
    let query: any = {};

    if (userId) {
      query.userId = userId;
    }
    const listing = await client.listing.findMany({
      where: query,
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

export async function getListingById(listingId: string) {
  try {
    const listing = await client.listing.findUnique({
      where: { id: listingId },
      include: { user: true },
    });
    return listing;
  } catch (error: unknown) {
    console.log(error);
  }
}

export async function updateReservation(
  totalPrice: number,
  startDate: Date = new Date(Date.now()),
  endDate: Date | undefined,
  listingId: string
) {
  const session = await auth();

  if (!session || !session.user) {
    throw new Error("Please login");
  }

  if (!session.user.id) {
    throw new Error("Please login");
  }
  const userId = session.user.id;

  if (!totalPrice || !startDate || !endDate || !listingId) {
    throw new Error("There is no enough data!");
  }

  try {
    const listingAndReservation = await client.listing.update({
      where: {
        id: listingId,
      },
      data: {
        reservations: {
          create: {
            userId,
            startDate,
            endDate,
            totalPrice,
          },
        },
      },
    });
  } catch (error) {}
}

export async function getReservations(params: {
  listingId?: string;
  userId?: string;
  authorId?: string;
}) {
  try {
    const { listingId, userId, authorId } = params;

    const query: any = {};

    if (listingId) {
      query.listingId = listingId;
    }

    if (userId) {
      query.userId = userId;
    }

    if (authorId) {
      query.listing = { userId: authorId };
    }

    const reservations = await client.reservation.findMany({
      where: query,
      include: {
        listing: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return reservations;
  } catch (error: any) {
    throw new Error(error);
  }
}

export async function deleteReservation(idReservation: string) {
  const session = await auth();
  const user = session?.user;

  if (!session || !user) {
    throw new Error("You need to log in.");
  }
  try {
    await client.reservation.deleteMany({
      where: {
        id: idReservation,
        OR: [{ userId: user.id }, { listing: { userId: user.id } }],
      },
    });
  } catch (error) {
    console.error(error);
    throw new Error("Failed to delete reservation");
  }
}

export async function getFavoriteListings() {
  const user = await getUser();
  if (!user) throw new Error("You need to login");
  try {
    const favorites = await client.listing.findMany({
      where: {
        id: {
          in: [...(user.favoriteIds || [])],
        },
      },
    });
    return favorites;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to get favorites");
  }
}

export async function deleteProperty(listingId: string) {
  const user = await getUser();
  if (!user) {
    throw new Error("You need to be logged in");
  }
  try {
    await client.listing.deleteMany({
      where: {
        id: listingId,
        userId: user.id,
      },
    });
  } catch (error) {
    console.error(error);
    throw new Error("Failed to delete property");
  }
}
