import Link from "next/link";
import React from "react";
import SignUpForm from "./SignUpForm";

const page = () => {
  return (
    <div className=" p-8 bg-white rounded-lg shadow-lg w-96 flex flex-col justify-center items-center text-black">
      <h1 className="text-center text-2xl font-bold mb-4 ">Sign Up page</h1>

      <SignUpForm />
      <div className="flex justify-between text-sm">
        <p>Alrady have an account?</p>

        <Link className="underline" href={"/auth/signin"}>
          sign In
        </Link>
      </div>
    </div>
  );
};

export default page;
