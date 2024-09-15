"use server"
import { User } from "@/lib/models";
import { connectToDb } from "@/lib/dbc"; // Make sure to import the DB connection

export const getUserById = async (id: string) => {
  try {
    await connectToDb();  // Ensure DB connection is established

    const user = await User.findById(id);
    if (!user) {
      return null;
    }

    return user;
  } catch (error) {
    console.error("Error fetching user by ID:", error);
    return null;
  }
};
