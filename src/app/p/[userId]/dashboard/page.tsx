"use client";
import Display from "@/components/Display";
import Header from "@/components/Header";
import Search from "@/components/Search";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React, { FC, Usable } from "react";
const page: FC<{ params: Usable<{ userId: string }> }> = ({ params }) => {
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
  // const resolvedParams = React.use(params);

  const listingQuery = useQuery({
    queryKey: ["allListings"],
    queryFn: async () => {
      const response = await axios.get("http://localhost:3333/listing");
      console.log(response.data);
      return response.data;
    },
  });
  if (userQuery.isLoading) {
    return <div>Loading...</div>;
  }
  return (
    <div className="bg-gray-800 h-screen flex flex-col gap-8">
      <Header
        name={userQuery.data.name}
        email={userQuery.data.email}
        avatar={userQuery.data.avatar}
      ></Header>
      <Search></Search>

      {/* {listingQuery.data.data.map((item) => {
        return item.description; 
      })} */}

      <Display listingQueryData={listingQuery.data.data}></Display>
    </div>
  );
};

export default page;
