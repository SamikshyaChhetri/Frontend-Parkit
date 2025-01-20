"use client";
import ListingCard from "@/components/ListingCard";
import { useQuery } from "@tanstack/react-query";
import axios, { AxiosResponse } from "axios";
import React, { FC, Promise } from "react";

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
      }> = await axios.get(
        `http://localhost:3333/reserve/userReservations/${rparams.userId}`
      );
      // console.log(response.data);
      return response.data;
    },
  });

  return (
    <div className="bg-gray-800 h-screen px-5">
      <div className="flex justify-center text-2xl text-white py-7">
        Your Reservations
      </div>
      {userReservations.isSuccess && (
        <div className="flex flex-wrap sm:flex-1 w-full gap-4   ">
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
  );
};

export default Page;
