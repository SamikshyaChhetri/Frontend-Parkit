"use client";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { capitalize } from "@/lib/utils";
import { axiosInstance } from "@/providers/AxiosInstance";
import { Icon } from "@iconify/react/dist/iconify.js";
import StarIcon from "@mui/icons-material/Star";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import Rating from "@mui/material/Rating";
import { useMutation, useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import moment from "moment";
import React, { FC } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
const Page: FC<{
  params: Promise<{
    listingsId: string;
    userId: string;
  }>;
}> = ({ params }) => {
  const rparams = React.use(params);
  const reserveForm = useForm({
    defaultValues: {
      date: new Date(),
      reserverId: rparams.userId,
      listingId: rparams.listingsId,
    },
  });

  // Initialize the form with default values
  const form = useForm({
    defaultValues: {
      rating: 2,
      comment: "",
      reviewerId: rparams.userId,
      listingId: rparams.listingsId,
    },
  });

  const { listingsId } = rparams;

  // Query to fetch listing details
  const listingsQuery = useQuery({
    queryKey: ["singleListingQuery", listingsId],
    queryFn: async () => {
      const response = await axiosInstance.get(`/listing/${listingsId}`);
      return response.data;
    },
  });

  // Query to fetch reviews of the listing
  const reviewsOfListing = useQuery({
    queryKey: ["reviewsOfListing"],
    queryFn: async () => {
      const response = await axiosInstance.get(`/review/listing/${listingsId}`);
      return response.data;
    },
  });

  // const
  // Mutation to submit the review
  const submitReview = useMutation({
    mutationFn: async () => {
      const values = form.getValues();
      const response = await axiosInstance.post("/review", values);
      return response.data;
    },
    onSuccess: () => {
      toast.success("Review submitted successfully");
      form.reset();
      reviewsOfListing.refetch();
      listingsQuery.refetch();
    },
    onError: (error: AxiosError<{ message: string }>) => {
      toast.error(error.response?.data.message);
    },
  });

  //Mutation for reservation
  const submitReservation = useMutation({
    mutationFn: async () => {
      const reservationValue = reserveForm.getValues();

      const response = await axiosInstance.post("/reserve", reservationValue);
      console.log(response.data);
      return response.data;
    },
    onSuccess: () => {
      toast.success("Reservation submitted successfully!");
      reserveForm.reset();
    },
    onError: (error: AxiosError<{ message: string }>) => {
      toast.error(error.response?.data.message);
    },
  });
  const onSubmitReservation = () => {
    submitReservation.mutate();
  };
  // Form submit handler
  const onSubmit = (data: {
    rating: number;
    comment: string;
    reviewerId: string;
    listingId: string;
  }) => {
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
          <div className="flex flex-col gap-2">
            <Dialog>
              <DialogTrigger asChild>
                <Button>Reserve</Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle className="flex justify-center mt-5">
                    Create a reservation
                  </DialogTitle>
                </DialogHeader>
                <form onSubmit={reserveForm.handleSubmit(onSubmitReservation)}>
                  <div className="flex justify-center items-center h-[350px]">
                    <Calendar
                      mode="single"
                      className="rounded-md border shadow "
                      {...reserveForm.register("date")}
                      selected={reserveForm.watch("date")}
                      disabled={(date) => {
                        console.log(
                          moment(date).format("YYYY-MM-DD"),
                          listingsQuery.data.data.unavailableDates
                        );
                        if (date < moment().subtract(1, "day").toDate())
                          return true;
                        listingsQuery.data.data.unavailableDates.includes(
                          moment(date).format("YYYY-MM-DD").toString()
                        )
                          ? true //ekxin ma hunxa? awhh awhh
                          : false;
                        return false;
                      }}
                      onSelect={(value) => {
                        reserveForm.setValue("date", value!);
                      }}
                    />
                  </div>
                  <div className="flex justify-between">
                    <DialogClose asChild className="inline justify-start">
                      <Button
                        className="w-fit"
                        type="button"
                        variant="destructive"
                      >
                        Cancel
                      </Button>
                    </DialogClose>
                    <div className="flex justify-end">
                      <Button className="w-fit">Reserve</Button>
                    </div>
                  </div>
                </form>
              </DialogContent>
            </Dialog>

            <div className="text-lg font-semibold text-white flex items-center">
              <span className="mr-1 text-lg font-bold">{listing.price}</span>
              <span className="text-sm">per hour</span>
            </div>
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
              {/* <div className="w-12 h-12 bg-gray-300 rounded-full"></div> */}
              <img
                src={listing.owner.avatar}
                className="w-12 h-12  rounded-full"
              />
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
            <div className="   flex flex-col gap-2 w-full">
              {reviewsOfListing.isSuccess &&
                reviewsOfListing.data.data.slice(0, 3).map((review: any) => (
                  <div
                    key={review.id}
                    className="flex justify-between bg-gray-200 rounded-lg mt-2 items-center"
                  >
                    <div className="flex justify-between items-center gap-2 p-2">
                      <img
                        src={review.reviewer.avatar}
                        alt=""
                        className="bg-white rounded-full h-14 w-14"
                      />
                      <div className="flex flex-col ">
                        <div className="mt-2 text-sm border ">
                          {review.comment}
                        </div>
                        <div>{review.reviewer.name}</div>
                      </div>
                    </div>

                    <div className="flex items-center gap-1 ">
                      {review.rating}
                      <Icon
                        icon="pepicons-pencil:star-filled"
                        width="20"
                        height="20"
                        className="inline mr-1"
                      />
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>
        {/* Add a Review Section */}
        <div className="mt-5">
          <div className="font-semibold text-white text-md">Add a Review</div>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="mt-3">
              <textarea
                placeholder="Write your review here..."
                {...form.register("comment")}
                className="w-full h-28 border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-violet-800 resize-none"
              ></textarea>
            </div>
            <div className=" rounded-md w-fit flex items-center justify-center">
              <Rating
                name="customized-stars"
                defaultValue={2}
                onChange={(event, newValue) => {
                  form.setValue("rating", newValue!);
                }}
                icon={
                  <StarIcon
                    style={{
                      stroke: "white", // color for the border
                      strokeWidth: 1, // thickness of the border
                      fill: "gold", // fill color for the star
                      width: "30px",
                    }}
                  />
                }
                /* 2) Empty star */
                emptyIcon={
                  <StarBorderIcon
                    style={{
                      stroke: "white",
                      strokeWidth: 1,
                      width: "30px",
                    }}
                  />
                }
              />
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
