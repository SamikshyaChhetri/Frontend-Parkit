"use client";
import Display from "@/components/Display";
import Search from "@/components/Search";
import { BACKEND_URL } from "@/lib/env";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React, { FC } from "react";
const Page: FC<{ params: Promise<{ userId: string }> }> = ({ params }) => {
  const rparams = React.use(params);
  const listingQuery = useQuery({
    queryKey: ["allListings"],
    queryFn: async () => {
      const response = await axios.get(`${BACKEND_URL}/listing`);
      return response.data;
    },
  });

  return (
    <div className="bg-gray-800 h-screen flex flex-col gap-8">
      <Search></Search>

      {listingQuery.isSuccess ? (
        <Display
          listingQueryData={listingQuery.data.data}
          userId={rparams.userId}
        ></Display>
      ) : (
        "Fetching Listings"
      )}
    </div>
  );
};

export default Page;
