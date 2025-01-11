"use client";
import { capitalize } from "@/lib/utils";
import { Icon } from "@iconify/react/dist/iconify.js";
import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";
import React, { FC, Usable } from "react";
import { useForm } from "react-hook-form";

const Page: FC<{
  params: Usable<{
    listingsId: string;
    userId: string;
  }>;
}> = ({ params }) => {
  const rparams = React.use(params);
  // Initialize the form with default values
  const form = useForm({
    defaultValues: {
      rating: "",
      review: "",
      reviewerId: rparams.userId,
      listingId: rparams.listingsId,
    },
  });

  const { listingsId } = rparams;

  // Query to fetch listing details
  const listingsQuery = useQuery({
    queryKey: ["singleListingQuery", listingsId],
    queryFn: async () => {
      const response = await axios.get(
        `http://localhost:3333/listing/${listingsId}`
      );
      return response.data;
    },
  });
  // Query to fetch review
  const reviewQuery = useQuery({
    queryKey: ["reviewQuery"],
    queryFn: async () => {
      const response = await axios.get(
        `http://localhost:3333/review/${listingsId}`
      );
      console.log(response.data);
      return response.data;
    },
  });

  // Mutation to submit the review
  const submitReview = useMutation({
    mutationFn: async () => {
      const values = form.getValues();
      const response = await axios.post("http://localhost:3333/review", values);
      return response.data;
    },
  });

  // Form submit handler
  const onSubmit = (data: {
    rating: string;
    review: string;
    reviewerId: string;
    listingId: string;
  }) => {
    console.log(data);
    submitReview.mutate();
  };

  // Render loading or error state
  if (
    listingsQuery.isLoading ||
    listingsQuery.isFetching ||
    listingsQuery.isError
  ) {
    return <div>Loading...</div>;
  }

  const listing = listingsQuery.data.data;

  return (
    <div className="p-6 bg-gray-800 min-h-screen">
      {/* Listing Image */}
      <div className="flex justify-center mt-5">
        <img
          src={listing.photo || ""}
          alt="Listing"
          className="w-[50%] max-w-4xl h-96 bg-gray-300 rounded-lg"
        />
      </div>

      {/* Listing Details */}
      <div className="max-w-4xl mx-auto mt-6 flex flex-col gap-4">
        {/* Title and Price */}
        <div className="flex justify-between items-center">
          <div className="text-2xl font-bold text-white">
            {capitalize(listing.street)}, {capitalize(listing.city)}
          </div>
          <div className="text-lg font-semibold text-white flex items-center">
            <span className="mr-1 text-lg font-bold">{listing.price}</span>
            <span className="text-sm">per hour</span>
          </div>
        </div>

        {/* Description */}
        <div className="text-gray-400 text-sm">{listing.description}</div>

        {/* Features */}
        <div className="flex items-center gap-4">
          <div className="flex gap-2 flex-col">
            <span className="text-white font-medium">
              {capitalize(listing.type)}
            </span>
            <div className="flex items-center gap-2">
              <Icon icon="noto:star" width="24" height="24" />
              <span className="text-white font-medium">{listing.rating}</span>
            </div>
          </div>
        </div>

        {/* Owner Details and Reviews Section */}
        <div className="flex justify-between items-start gap-8 mt-10">
          {/* Owner Details */}
          <div className="flex-1">
            <div className="font-semibold text-white mb-5">Owner Details</div>
            <div className="flex items-center gap-4 mt-2">
              <div className="w-12 h-12 bg-gray-300 rounded-full"></div>
              <div>
                <div className="font-medium text-white">
                  {listing.owner.name}
                </div>
                <div className="text-sm text-gray-500">
                  {listing.owner.email}
                </div>
              </div>
            </div>
          </div>

          {/* Reviews Section */}
          <div className="flex-1">
            <div className="font-semibold text-white">Reviews</div>
            <div className="bg-gray-200 h-16 rounded-lg mt-2"></div>
          </div>
        </div>

        {/* Add a Review Section */}
        <div className="mt-5">
          <div className="font-semibold text-white text-md">Add a Review</div>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="mt-3">
              <textarea
                placeholder="Write your review here..."
                {...form.register("review")}
                className="w-full h-28 border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-violet-800 resize-none"
              ></textarea>
            </div>
            <div className="flex justify-end mt-3">
              <button className="bg-violet-800 text-white px-6 py-2 rounded-lg hover:bg-violet-700 transition">
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Page;
