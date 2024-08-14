import { Button } from "@/components/ui/button";
import Link from "next/link";
import { getServerSession } from "next-auth/next";
// import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import Image from "next/image";
import { redirect } from "next/navigation";
import StudentCard from "@/components/studentcard";

export default async function Home() {
  // const session = await getServerSession(authOptions);
  // if (!session || !session.user?.username) {
  //   redirect("http://localhost:3000/auth/signIn");
  // }
  // console.log(session.user?.username);
  return (
    <div className="p-10">
      {/* {session && session.user?.username ? ( */}
      <>
        <Link href="/auth/signout">Sign out</Link>
        <p>
          <b>Signed in as </b>
          <b> You are a </b>
        </p>
        {/* <StudentCard studentId={session.user?.username} /> */}
      </>

      <>
        <Link href="/auth/signup">Sign up</Link>
      </>
    </div>
  );
}
