import { SignUp } from "@clerk/nextjs";
import { title } from "@/app/shared-metadata";

export const metadata = {
  title: `${title} | Sign Up`,
};

export default function Page() {
  return (
    <div className='flex justify-center'>
      <SignUp/>
    </div>
  )
}