"use client";
import { capitalize } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { FC, Usable, use } from "react";

const page: FC<{
  params: Usable<{
    listingsId: string;
    userId: string;
    city: string;
    street: String;
    country: string;
    zipcode: string;
    type: string;
    description: string;
    noOfVehicle: string;
    photo: string;
  }>;
}> = ({ params }) => {
  const rparams = use(params);
  const listingsQuery = useQuery({
    queryKey: ["singleUserQuery"],
    queryFn: async () => {
      const response = await axios.get(
        `http://localhost:3333/listing/${rparams.listingsId}`
      );
      return response.data;
    },
  });

  if (listingsQuery.isLoading || listingsQuery.isFetching) {
    return "Loading...";
  }

  return (
    <div className="p-6 bg-gray-800 h-screen text-white rounded-xl shadow-lg">
      <div className="flex justify-center pt-5">
        <img
          src={listingsQuery.data.data.photo}
          className="h-96 w-[70%] rounded-xl  shadow-md"
          alt="Listing Photo"
        />
      </div>
      <div className="text-center text-3xl font-extrabold mt-5 text-violet-800">
        {capitalize(listingsQuery.data.data.city)},{" "}
        {capitalize(listingsQuery.data.data.street)}
      </div>
      <div className="text-center text-xl font-semibold mt-2 text-gray-300">
        Rs.{listingsQuery.data.data.price} per unit
      </div>
      <div className="text-center mt-3 text-gray-400">
        {listingsQuery.data.data.description}
      </div>
      <div className="mt-4 flex justify-center gap-6 text-sm text-gray-300">
        <div className="flex flex-col items-center">
          <span className="font-bold text-violet-800">
            {listingsQuery.data.data.type}
          </span>
          <span>Type</span>
        </div>
        <div className="flex flex-col items-center">
          <span className="font-bold text-violet-800">
            {listingsQuery.data.data.zipcode}
          </span>
          <span>Zipcode</span>
        </div>
      </div>
    </div>
  );
};
export default page;
