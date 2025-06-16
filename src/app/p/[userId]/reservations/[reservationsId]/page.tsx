"use client";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { axiosInstance } from "@/providers/AxiosInstance";
import { useQuery } from "@tanstack/react-query";
import { AxiosResponse } from "axios";
import React, { FC } from "react";

const Page: FC<{
  params: Promise<{
    reservationsId: string;
    userId: string;
  }>;
}> = ({ params }) => {
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
            </div>

            <div className="flex gap-4 text-sm text-gray-400">
              <div className="px-3 py-1 rounded-full bg-slate-700">
                {reservationsQuery.data?.data.listing.type}
              </div>
              <div className="px-3 py-1 rounded-full bg-slate-700">
                {reservationsQuery.data?.data.listing.rating}
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-6">
          <div className="space-y-3">
            <h3 className="text-lg font-semibold">Owner's Details</h3>
            <div className="flex items-center gap-4 bg-slate-700 p-4 rounded-lg shadow-sm">
              <img
                src="/bike.jpg"
                alt="Owner"
                className="w-16 h-16 rounded-full object-cover border-2 border-white"
              />
              <div>
                <div className="font-bold">Samikshya Chhetri</div>
                <div className="text-sm text-gray-400">samikshya@gmail.com</div>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-2 justify-end items-end">
            <h3 className="text-lg font-semibold">Add a Review</h3>
            <Textarea
              placeholder="Write your feedback..."
              className="w-full h-28 border border-gray-600 bg-slate-700 text-white rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-violet-800 resize-none"
            />
            <Button>Submit</Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
