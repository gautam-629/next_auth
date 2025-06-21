"use client";
import React, { PropsWithChildren } from "react";
import { Button } from "./button";
import { useFormStatus } from "react-dom";

const SubmitButton = ({ children }: PropsWithChildren) => {
  const { pending } = useFormStatus();

  return (
    <Button type="submit" className="w-full mt-2" aria-disabled={pending}>
      {pending ? "Submiting" : children}
    </Button>
  );
};

export default SubmitButton;
