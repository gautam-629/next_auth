import { getProfile } from "@/lib/actions";
import React from "react";

const page = async () => {
  const res = await getProfile();

  return (
    <div>
      profile page
      <p>{JSON.stringify(res)}</p>
    </div>
  );
};

export default page;
