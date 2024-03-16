"use server";

import client from "@/libs/prismadb";
import { User } from "@prisma/client";
import { hash } from "bcryptjs";
import { FieldValues } from "react-hook-form";
import toast from "react-hot-toast";

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
