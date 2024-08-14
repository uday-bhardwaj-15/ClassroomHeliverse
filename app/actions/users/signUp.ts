"use server";

import prisma from "@/lib/prisma";
import bcrypt from "bcryptjs";

export const signUp = async (uNo: string, passwordhash: string) => {
  const user = await prisma.user.findUnique({
    where: {
      uNo,
    },
  });
  if (user) {
    return "User with that credentials already exists.";
  }
  console.log({ passwordhash });

  const password = bcrypt.hashSync(passwordhash, 10);

  await prisma.user.create({
    data: {
      uNo,
      password,
    },
  });

  return "Successfully created new user!";
};
