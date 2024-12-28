"use client";
import Header from "@/components/Header";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React, { FC, Usable } from "react";
const page: FC<{
  params: Usable<{ userId: string }>;
}> = ({ params }) => {
  const rparams = React.use(params);
  const userQuery = useQuery({
    queryKey: ["singleUserQuery"],
    queryFn: async () => {
      const response = await axios.get(
        `http://localhost:3333/users/getSingleuser/${rparams.userId}`
      );
      return response.data;
    },
  });
  const resolvedParams = React.use(params);

  if (userQuery.isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <Header name={userQuery.data.name} email={userQuery.data.email}></Header>
    </div>
  );
};
export default page;
