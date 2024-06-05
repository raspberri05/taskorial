import {currentUser} from "@clerk/nextjs/server";

export async function getUserId() {
  const user = await currentUser();
  return user?.id
}
