"use client";
import { capitalize } from "@/lib/utils";
import { Icon } from "@iconify/react/dist/iconify.js";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { FC, Usable, use } from "react";

const page: FC<{
  params: Usable<{
    listingsId: string;
    userId: string;
  }>;
}> = ({ params }) => {
  const rparams = use(params);
  const listingsQuery = useQuery({
    queryKey: ["singleListingQuery"],
    queryFn: async () => {
      const response = await axios.get(
        `http://localhost:3333/listing/${rparams.listingsId}`
      );
      return response.data;
    },
  });
  if (
    listingsQuery.isLoading ||
    listingsQuery.isFetching ||
    listingsQuery.isError
  ) {
    return "Loading...";
  }
  listingsQuery.isSuccess && console.log(listingsQuery.data);
  return (
    <div className="p-6 bg-gray-800 min-h-screen ">
      <div className="flex justify-center mt-5">
        <img
          src={listingsQuery.data.data.photo ?? ""}
          className="w-full max-w-4xl h-72 bg-gray-300 rounded-lg"
        ></img>
      </div>

      {/* Details Section */}
      <div className="max-w-4xl mx-auto mt-6 flex flex-col gap-4">
        {/* Title and Price */}
        <div className="flex justify-between items-center">
          <div className="text-2xl font-bold text-white">
            {capitalize(listingsQuery.data.data.street)},
            {capitalize(listingsQuery.data.data.city)}
          </div>
          <div className="text-lg font-semibold text-white flex items-center">
            <span className="mr-1 text-lg font-bold">
              {listingsQuery.data.data.price}
            </span>
            <span className="text-sm">per hour</span>
          </div>
        </div>

        {/* Description */}
        <div className="text-gray-400 text-sm">
          {listingsQuery.data.data.description}
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Debitis
          nostrum veniam rerum pariatur, unde quasi consequuntur expedita
          nesciunt! Inventore ad dolores illum deserunt sed veritatis aliquam
          officia repudiandae consectetur architecto.
        </div>

        {/* Features */}
        <div className="flex items-center gap-4">
          <div className="flex  gap-2 flex-col">
            <span className="text-white font-medium">
              {capitalize(listingsQuery.data.data.type)}
            </span>
            <div className="flex items-center gap-2">
              <Icon icon="noto:star" width="24" height="24" />
              <span className="text-white font-medium">3.5</span>
            </div>
          </div>
        </div>

        <div className="flex justify-between items-start gap-8 mt-10">
          {/* Owner Details */}
          <div className="flex-1">
            <div className="font-semibold text-white  mb-5">Owner Details</div>
            <div className="flex items-center gap-4 mt-2">
              <div className="w-12 h-12 bg-gray-300 rounded-full"></div>
              <div>
                <div className="font-medium text-white">
                  {listingsQuery.data.data.owner.name}
                </div>
                <div className="text-sm text-gray-500">
                  {listingsQuery.data.data.owner.email}
                </div>
              </div>
            </div>
          </div>

          {/* Reviews */}
          <div className="flex-1">
            <div className="font-semibold text-white">Reviews</div>
            <div className="bg-gray-200 h-16 rounded-lg mt-2"></div>
          </div>
        </div>

        {/* Add a Review Section */}
        <div className="mt-5">
          <div className="font-semibold text-white text-md">Add a Review</div>
          <div className="flex items-center gap-2 mt-2">
            <Icon icon="noto:star" width="24" height="24" />
            <Icon icon="noto:star" width="24" height="24" />
          </div>
          <div className="mt-3">
            <textarea
              placeholder="Write your review here..."
              className="w-full h-28 border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-violet-800 resize-none"
            ></textarea>
          </div>
          <div className="flex justify-end mt-3">
            <button className="bg-violet-800 text-white px-6 py-2 rounded-lg hover:bg-violet-700 transition">
              Submit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default page;
