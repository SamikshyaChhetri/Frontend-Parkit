"use client";
import ListingCard from "@/components/ListingCard";
import NoData from "@/components/NoData";
import { axiosInstance } from "@/providers/AxiosInstance";
import { useQuery } from "@tanstack/react-query";
import { AxiosResponse } from "axios";
import React, { FC } from "react";

const Page: FC<{ params: Promise<{ userId: string }> }> = ({ params }) => {
  const rparams = React.use(params);

  const userListings = useQuery({
    queryKey: ["userListings"],
    queryFn: async () => {
      const response: AxiosResponse<{
        message: string;
        data: { city: string; country: string; photo: string; price: string }[];
      }> = await axiosInstance.get(`/listing/user/${rparams.userId}`);
      // console.log(response.data);
      return response.data;
    },
  });
  userListings.isSuccess && console.log(userListings.data);

  if (userListings.isLoading) return <div>Loading...</div>;

  return (
    <div className="bg-gray-800 h-screen px-5">
      <div className="flex pl-14 text-2xl font-bold text-white py-7">
        My Lis<span className="text-violet-500">tin</span>gs
      </div>

      {userListings.isSuccess && (
        <div className="flex flex-wrap sm:flex-1 w-full gap-6 ">
          {userListings.data.data.length == 0 && <NoData></NoData>}
          {userListings.data?.data.map((item, index) => {
            return (
              <ListingCard
                key={index}
                city={item.city}
                country={item.country}
                photo={item.photo}
                price={item.price}
                type="listing"
              ></ListingCard>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Page;
