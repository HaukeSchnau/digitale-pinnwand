"use server";
import { revalidatePath } from "next/cache";

export const revalidateRoot = async () => {
  revalidatePath("/");
};
