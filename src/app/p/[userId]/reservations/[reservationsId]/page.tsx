"use client";
import { Button } from "@/components/ui/button";
import { axiosInstance } from "@/providers/AxiosInstance";
import { useQuery } from "@tanstack/react-query";
import { AxiosResponse } from "axios";
import { StarIcon } from "lucide-react";
import Link from "next/link";
import React, { FC } from "react";
import { useForm } from "react-hook-form";

const Page: FC<{
  params: Promise<{
    reservationsId: string;
    userId: string;
    listingsId: string;
  }>;
}> = ({ params }) => {
  const form = useForm({
    defaultValues: {
      comment: "",
    },
  });
  const rparams = React.use(params);
  const reservationsQuery = useQuery({
    queryKey: ["reservationQuery"],
    queryFn: async () => {
      const response: AxiosResponse<{
        message: string;
        data: {
          date: string;
          listing: {
            photo: string;
            description: string;
            type: string;
            rating: string;
            street: string;
            city: string;
            country: string;
            owner: {
              name: string;
              email: string;
              avatar: string;
            };
          };
        };
      }> = await axiosInstance.get(`/reserve/${rparams.reservationsId}`);
      return response.data;
    },
  });
  return (
    <div className="bg-slate-800 min-h-screen text-white flex justify-center items-center">
      <div className=" p-10 rounded-2xl shadow-xl flex flex-col gap-8 w-[90%] max-w-5xl">
        <div className="flex flex-col md:flex-row gap-10">
          <div className="flex flex-col gap-6 md:w-1/2">
            <img
              src={reservationsQuery.data?.data.listing.photo}
              alt="Bike"
              className="w-full rounded-xl shadow-md object-cover"
            />
            <Button className="bg-red-700 hover:bg-red-600 transition-all duration-200">
              Cancel Reservation
            </Button>
          </div>

          <div className="flex flex-col gap-5 md:w-1/2 justify-between">
            <div className="bg-slate-700 rounded-lg p-4 shadow-md text-center font-medium text-green-300">
              ✅ Reserved for your selected date
            </div>

            <div className="space-y-2">
              <h2 className="text-xl font-semibold">
                {reservationsQuery.data?.data.listing.street},
                {reservationsQuery.data?.data.listing.city} &nbsp;{" "}
                {/* {reservationsQuery.data?.data.listing.country} */}
              </h2>
              <p className="text-gray-300">
                {reservationsQuery.data?.data.listing.description}
              </p>
              <Link
                href={`/p/${rparams.userId}/listings/${rparams.listingsId}`}
              >
                View listing
              </Link>
            </div>

            <div className="flex gap-4 text-sm text-gray-400">
              <div className="px-3 py-1 rounded-full bg-slate-700">
                {reservationsQuery.data?.data.listing.type}
              </div>
              <div className="px-3 py-1 rounded-full bg-slate-700 flex flex-row items-center gap-1">
                {reservationsQuery.data?.data.listing.rating}
                <StarIcon
                  style={{
                    stroke: "white", // color for the border
                    strokeWidth: 1, // thickness of the border
                    fill: "gold", // fill color for the star
                    width: "15px",
                  }}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-6">
          <div className="space-y-3">
            <h3 className="text-lg font-semibold">Owner's Details</h3>
            <div className="flex items-center gap-4 bg-slate-700 p-4 rounded-lg shadow-sm">
              <img
                src={reservationsQuery.data?.data.listing.owner.avatar}
                alt="Owner"
                className="w-16 h-16 rounded-full object-cover border-2 border-white"
              />
              <div>
                <div className="font-bold">
                  {reservationsQuery.data?.data.listing.owner.name}
                </div>
                <div className="text-sm text-gray-400">
                  {reservationsQuery.data?.data.listing.owner.email}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
