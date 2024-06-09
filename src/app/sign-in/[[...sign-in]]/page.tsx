import { SignIn } from "@clerk/nextjs";
import { title } from "@/app/shared-metadata";

export const metadata = {
  title: `${title} | Sign In`,
};

export default function Page() {
  return (
    <div className='flex justify-center'>
      <SignIn/>
    </div>
  )
}