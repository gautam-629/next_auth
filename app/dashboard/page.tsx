import { getSession } from "@/lib/session";
import { redirect } from "next/navigation";
import React from "react";

const page = async () => {
  const session = await getSession();

  if (!session || !session.user) redirect("/auth/signin");

  console.log({ session });

  return <div>Dashboard</div>;
};

export default page;
