import { currentUser } from "@clerk/nextjs/server";
import {redirect} from "next/navigation";
import { title } from "@/app/shared-metadata";

export const metadata = {
  title: `${title} | Dashboard`,
};

export default async function Page() {
  const user = await currentUser();
  if (!user) {
    redirect("/");
  }

  return (
    <div className="flex justify-center">
      <div className="max-w-md min-w-sm text-center">
        <h1 className="text-4xl">Dashboard</h1>
        <br/>
        <br/>
        <h1 className="text-3xl">Welcome back, {user?.firstName}!</h1>
        <br/>
        <div className="columns-2">
          <a href="/dashboard/tasks">
            <div className="card bg-base-200">
              <div className="card-body">
                <h2 className="card-title justify-center">Tasks</h2>
              </div>
            </div>
          </a>
          <a href="/dashboard/notes">
            <div className="card bg-base-200">
              <div className="card-body">
                <h2 className="card-title justify-center">Notes</h2>
              </div>
            </div>
          </a>
        </div>
        <br/>
      </div>
    </div>
  );
}
