import { logoutAction } from "@/lib/auth";
import { getSession } from "@/lib/session";
import Link from "next/link";
import React from "react";

const SignInButton = async () => {
  const session = await getSession();

  return (
    <div className="flex items-center gap-2 ml-auto">
      {!session || !session.user ? (
        <>
          <Link href={"/auth/signin"}>Sign In</Link>
          <Link href={"/auth/signuo"}>Sign UP</Link>
        </>
      ) : (
        <>
          <p>{session.user.name}</p>
          {/* <Link href={"/api/auth/signout"}>Signout</Link> */}
          <form action={logoutAction}>
            <button className="cursor-pointer">Logout</button>
          </form>
        </>
      )}
    </div>
  );
};

export default SignInButton;
