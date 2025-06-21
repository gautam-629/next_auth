"use client";
import { Input } from "@/components/ui/input";
import SubmitButton from "@/components/ui/submitButton";
import { singnUp } from "@/lib/auth";
import React, { useActionState } from "react";

const SignUpForm = () => {
  const [state, action] = useActionState(singnUp, undefined);

  return (
    <form action={action}>
      <div className="flex flex-col gap-2">
        {state?.message && (
          <p
            className="
        text-sm text-red-500"
          >
            {state.message}
          </p>
        )}
        <div>
          <label htmlFor="name">Name</label>
          <Input id="name" name="name" placeholder="jonh Doe" />
        </div>
        {state?.error?.name && (
          <p
            className="
        text-sm text-red-500"
          >
            {state.error.name}
          </p>
        )}
        <div>
          <label htmlFor="email">Email</label>
          <Input id="email" name="email" placeholder="email" />
        </div>
        {state?.error?.email && (
          <p
            className="
        text-sm text-red-500"
          >
            {state.error.email}
          </p>
        )}
        <div>
          <label htmlFor="password">password</label>
          <Input id="password" name="password" placeholder="password" />
        </div>
        {state?.error?.password && (
          <div>
            <p>password must be:</p>
            <ul className="text-red-500 text-sm">
              {state.error.password.map((error) => (
                <li key={error}>{error}</li>
              ))}
            </ul>
          </div>
        )}
        <SubmitButton>Sign Up</SubmitButton>
      </div>
    </form>
  );
};

export default SignUpForm;
