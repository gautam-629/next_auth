import { getSession } from "@/lib/session";
import { redirect } from "next/navigation";
import React from "react";

const page = async () => {
  const session = await getSession();

  if (!session || !session.user) redirect("/auth/signin");

  return <div>Dashboard</div>;
};

export default page;
