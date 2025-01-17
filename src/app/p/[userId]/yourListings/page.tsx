"use client";
import ListingCard from "@/components/ListingCard";
import { useQuery } from "@tanstack/react-query";
import axios, { AxiosResponse } from "axios";
import React, { FC, Usable } from "react";

const page: FC<{ params: Usable<{ userId: string }> }> = ({ params }) => {
  const rparams = React.use(params);

  const userListings = useQuery({
    queryKey: ["userListings"],
    queryFn: async () => {
      const response: AxiosResponse<{
        message: string;
        data: { city: string; country: string; photo: string; price: string }[];
      }> = await axios.get(
        `http://localhost:3333/listing/user/${rparams.userId}`
      );
      // console.log(response.data);
      return response.data;
    },
  });
  userListings.isSuccess && console.log(userListings.data);
  return (
    <div className="bg-gray-800 h-screen px-5">
      <div className="flex justify-center text-2xl text-white py-7">
        Your Listings
      </div>
      {userListings.data?.data.map((item, index) => {
        return (
          <ListingCard
            key={index}
            city={item.city}
            country={item.country}
            photo={item.photo}
            price={item.price}
          ></ListingCard>
        );
      })}
    </div>
  );
};

export default page;
