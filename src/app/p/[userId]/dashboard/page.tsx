"use client";
import Display from "@/components/Display";
import Header from "@/components/Header";
import Search from "@/components/Search";
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
    <div className="bg-gray-800 h-screen">
      <Header
        name={userQuery.data.name}
        email={userQuery.data.email}
        avatar={userQuery.data.avatar}
      ></Header>
      <Search></Search>
      <Display></Display>
    </div>
  );
};
export default page;
