"use client";
import ListingCard from "@/components/ListingCard";
import NoData from "@/components/NoData";
import { axiosInstance } from "@/providers/AxiosInstance";
import { useQuery } from "@tanstack/react-query";
import { AxiosResponse } from "axios";
import React, { FC } from "react";

const Page: FC<{ params: Promise<{ userId: string }> }> = ({ params }) => {
  const rparams = React.use(params);
  const userReservations = useQuery({
    queryKey: ["userReservations"],
    queryFn: async () => {
      const response: AxiosResponse<{
        message: string;
        data: {
          listing: {
            city: string;
            country: string;
            photo: string;
            price: string;
          };
          date: string;
        }[];
      }> = await axiosInstance.get(
        `/reserve/userReservations/${rparams.userId}`,
        {
          withCredentials: true,
        }
      );
      // console.log(response.data);
      return response.data;
    },
  });

  return (
    <div className="bg-gray-800 h-screen  flex justify-center">
      <div className="w-full px-10 sm:px-0 md:w-[80%]">
        <div className="flex text-2xl font-bold text-white py-10">
          My Re<span className="text-violet-500">ser</span>vations
        </div>

        {userReservations.isSuccess && (
          <div className="grid sm:grid-cols-2 flex-wrap sm:flex-1 md:grid-cols-2 w-full gap-10 lg:grid-cols-3 xl:grid-cols-4  ">
            {userReservations.data.data.length == 0 && <NoData></NoData>}
            {userReservations.data?.data.map((item, index) => {
              return (
                <ListingCard
                  key={index}
                  city={item.listing.city} // fix these
                  country={item.listing.country}
                  photo={item.listing.photo}
                  price={item.listing.price}
                  date={item.date}
                  type="reservation"
                ></ListingCard>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default Page;
