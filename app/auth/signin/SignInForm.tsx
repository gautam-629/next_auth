"use client";
import { Input } from "@/components/ui/input";
import SubmitButton from "@/components/ui/submitButton";
import { signIn } from "@/lib/auth";
import React, { useActionState } from "react";

const SignInForm = () => {
  const [state, action] = useActionState(signIn, undefined);
  return (
    <form action={action}>
      {state?.message && (
        <p className="text-sm text-red-500">{state.message}</p>
      )}
      <div className="flex flex-col gap-2 w-64">
        <div>
          <label htmlFor="email">Email</label>
          <Input id="email" name="email" placeholder="email" />
        </div>

        <div>
          <label htmlFor="password">password</label>
          <Input id="password" name="password" placeholder="password" />
        </div>
        <SubmitButton>Sign In</SubmitButton>
      </div>
    </form>
  );
};

export default SignInForm;
