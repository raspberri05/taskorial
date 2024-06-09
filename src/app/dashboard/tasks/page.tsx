import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import TaskCard from "@/app/components/task/taskcard";

import { title } from "@/app/shared-metadata";

export const metadata = {
  title: `${title} | Tasks`,
};

export default async function Dashboard() {
  const user = await currentUser();
  if (!user) {
    redirect("/");
  }

  return (
    <div className="text-center">
      <h2 className="text-3xl">Welcome back, {user?.firstName}!</h2>
      <br />
      <TaskCard userId={user?.id} />
      <br />
    </div>
  );
}
