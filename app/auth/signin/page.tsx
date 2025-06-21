import Link from "next/link";
import React from "react";
import SignInForm from "./SignInForm";

const page = () => {
  return (
    <div className=" p-8 bg-white rounded-lg shadow-lg w-96 flex flex-col justify-center items-center text-black">
      <h1 className="text-center text-2xl font-bold mb-4 ">Sign In page</h1>

      <SignInForm />

      <div className="flex justify-between text-sm">
        <p>Not have an account?</p>

        <Link className="underline" href={"/auth/signup"}>
          sign Up
        </Link>
      </div>
    </div>
  );
};

export default page;
