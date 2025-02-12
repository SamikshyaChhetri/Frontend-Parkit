"use client";
import ListingCard from "@/components/ListingCard";
import NoData from "@/components/NoData";
import SkeletonView from "@/components/SkeletonView";
import { axiosInstance } from "@/providers/AxiosInstance";
import { useQuery } from "@tanstack/react-query";
import { AxiosResponse } from "axios";
import Link from "next/link";
import React, { FC } from "react";

const Page: FC<{ params: Promise<{ userId: string; listingsId: string }> }> = ({
  params,
}) => {
  const rparams = React.use(params);

  const userListings = useQuery({
    queryKey: ["userListings"],
    queryFn: async () => {
      const response: AxiosResponse<{
        message: string;
        data: {
          city: string;
          country: string;
          photo: string;
          price: string;
          id: string;
        }[];
      }> = await axiosInstance.get(`/listing/user/${rparams.userId}`);
      // console.log(response.data);
      return response.data;
    },
  });
  userListings.isSuccess && console.log(userListings.data);

  return (
    <div className="bg-gray-800 min-h-screen flex justify-center">
      <div className="w-full px-10 sm:px-0 md:w-[80%]">
        <div className="flex  text-2xl font-bold text-white py-10">
          My Lis<span className="text-violet-500">tin</span>gs
        </div>
        {userListings.isLoading && <SkeletonView></SkeletonView>}
        {userListings.isSuccess && (
          <div className="grid sm:grid-cols-2 flex-wrap sm:flex-1 md:grid-cols-2 w-full gap-10 lg:grid-cols-3 xl:grid-cols-4  ">
            {userListings.data.data.length == 0 && <NoData></NoData>}
            {userListings.data?.data.map((item, index) => {
              return (
                <Link
                  key={index}
                  href={`/p/${rparams.userId}/yourListings/update/${item.id}`}
                >
                  <ListingCard
                    city={item.city}
                    country={item.country}
                    photo={item.photo}
                    price={item.price}
                    type="listing"
                  ></ListingCard>
                </Link>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default Page;
