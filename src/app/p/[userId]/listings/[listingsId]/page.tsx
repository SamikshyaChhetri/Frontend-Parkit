"use client";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent } from "@/components/ui/card";
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
import { motion } from "framer-motion";
import {
  ArrowLeft,
  Calendar as CalendarIcon,
  Car,
  MapPin,
  Star,
  User,
} from "lucide-react";
import moment from "moment";
import Link from "next/link";
import React, { FC, useState } from "react";
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
  const [isOpen, setIsOpen] = useState(false);

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
      setIsOpen(false);
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
  if (listingsQuery.isError) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20 flex justify-center items-center">
        <div className="text-center">
          <div className="text-xl text-destructive">Error on Fetching data</div>
          <Link href={`/p/${rparams.userId}/dashboard`}>
            <Button className="mt-4">Back to Dashboard</Button>
          </Link>
        </div>
      </div>
    );
  }

  if (listingsQuery.isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20 flex justify-center items-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <Icon
            icon="svg-spinners:blocks-shuffle-3"
            width="60"
            height="60"
            className="text-primary mx-auto mb-4"
          />
          <p className="text-muted-foreground">Loading listing details...</p>
        </motion.div>
      </div>
    );
  }

  const listing = listingsQuery.data.data;

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.9 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.5,
        type: "spring",
        stiffness: 100,
      },
    },
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      {" "}
      <motion.div
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Header */}
        <motion.div className="mb-8" variants={itemVariants}>
          <div className="flex items-center justify-between mb-6">
            <Link href={`/p/${rparams.userId}/dashboard`}>
              <Button
                variant="outline"
                size="sm"
                className="hover:bg-primary/10 hover:border-primary/50 transition-colors"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Dashboard
              </Button>
            </Link>

            <Dialog open={isOpen} onOpenChange={setIsOpen}>
              <DialogTrigger asChild>
                <Button className="bg-primary hover:bg-primary/90">
                  <CalendarIcon className="h-4 w-4 mr-2" />
                  Reserve Now
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[500px]">
                <DialogHeader>
                  <DialogTitle className="text-center text-xl font-bold">
                    Create a Reservation
                  </DialogTitle>
                </DialogHeader>
                <form onSubmit={reserveForm.handleSubmit(onSubmitReservation)}>
                  <div className="flex justify-center items-center py-6">
                    <Calendar
                      mode="single"
                      className="rounded-md border shadow"
                      {...reserveForm.register("date")}
                      selected={reserveForm.watch("date")}
                      disabled={(date) => {
                        if (date < moment().subtract(1, "day").toDate())
                          return true;
                        return listingsQuery.data.data.unavailableDates.includes(
                          moment(date).format("YYYY-MM-DD").toString()
                        );
                      }}
                      onSelect={(value) => {
                        reserveForm.setValue("date", value!);
                      }}
                    />
                  </div>
                  <div className="flex justify-between gap-4">
                    <DialogClose asChild>
                      <Button
                        type="button"
                        variant="outline"
                        className="flex-1"
                      >
                        Cancel
                      </Button>
                    </DialogClose>
                    <Button
                      type="submit"
                      className="flex-1"
                      disabled={submitReservation.isPending}
                    >
                      {submitReservation.isPending ? (
                        <>
                          <Icon
                            icon="svg-spinners:180-ring"
                            width="20"
                            height="20"
                            className="mr-2"
                          />
                          Reserving...
                        </>
                      ) : (
                        <>
                          <CalendarIcon className="h-4 w-4 mr-2" />
                          Reserve
                        </>
                      )}
                    </Button>
                  </div>
                </form>
              </DialogContent>
            </Dialog>
          </div>

          <div className="text-center mb-8">
            <motion.h1
              className="text-4xl font-bold text-foreground mb-4"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <span className="text-primary">{capitalize(listing.street)}</span>
              , {capitalize(listing.city)}
            </motion.h1>
            <motion.p
              className="text-muted-foreground text-lg max-w-2xl mx-auto"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              {listing.description}
            </motion.p>
          </div>
        </motion.div>

        {/* Listing Image */}
        <motion.div className="mb-12" variants={itemVariants}>
          <div className="flex justify-center">
            <motion.img
              src={listing.photo || ""}
              alt="Parking Space"
              className="w-full max-w-4xl h-96 object-cover rounded-2xl shadow-xl"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
            />
          </div>
        </motion.div>

        {/* Stats Cards */}
        <motion.div className="mb-12" variants={itemVariants}>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <motion.div variants={cardVariants}>
              <Card className="border-border/50 shadow-sm hover:shadow-md transition-shadow">
                <CardContent className="p-6 flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="p-3 bg-primary/10 rounded-lg mr-4">
                      <Car className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <p className="text-lg font-bold text-foreground">
                        {capitalize(listing.type)}
                      </p>
                      <p className="text-muted-foreground">Vehicle Type</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div variants={cardVariants}>
              <Card className="border-border/50 shadow-sm hover:shadow-md transition-shadow">
                <CardContent className="p-6 flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="p-3 bg-green-500/10 rounded-lg mr-4">
                      <Star className="h-6 w-6 text-green-500" />
                    </div>
                    <div>
                      <p className="text-lg font-bold text-foreground">
                        {listing.rating || "N/A"}
                      </p>
                      <p className="text-muted-foreground">Rating</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div variants={cardVariants}>
              <Card className="border-border/50 shadow-sm hover:shadow-md transition-shadow">
                <CardContent className="p-6 flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="p-3 bg-blue-500/10 rounded-lg mr-4">
                      <MapPin className="h-6 w-6 text-blue-500" />
                    </div>
                    <div>
                      <p className="text-lg font-bold text-foreground">
                        ${listing.price}
                      </p>
                      <p className="text-muted-foreground">per hour</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </motion.div>
        {/* Owner Details and Reviews Section */}
        <motion.div
          className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12"
          variants={itemVariants}
        >
          {/* Owner Details */}
          <motion.div variants={cardVariants}>
            <Card className="border-border/50 shadow-sm hover:shadow-md transition-shadow h-full">
              <CardContent className="p-6">
                <div className="flex items-center gap-4 mb-4">
                  <div className="p-3 bg-primary/10 rounded-lg">
                    <User className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold text-foreground">
                    Owner Details
                  </h3>
                </div>
                <div className="flex items-center gap-4">
                  <img
                    src={listing.owner.avatar}
                    className="w-16 h-16 rounded-full object-cover shadow-md"
                    alt="Owner Avatar"
                  />
                  <div>
                    <div className="text-lg font-medium text-foreground">
                      {listing.owner.name}
                    </div>
                    <div className="text-muted-foreground">
                      {listing.owner.email}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Reviews Section */}
          <motion.div variants={cardVariants}>
            <Card className="border-border/50 shadow-sm hover:shadow-md transition-shadow h-full">
              <CardContent className="p-6">
                <div className="flex items-center gap-4 mb-4">
                  <div className="p-3 bg-green-500/10 rounded-lg">
                    <Star className="h-6 w-6 text-green-500" />
                  </div>
                  <h3 className="text-xl font-semibold text-foreground">
                    Reviews
                  </h3>
                </div>

                <div className="space-y-4 max-h-80 overflow-y-auto">
                  {reviewsOfListing.isSuccess &&
                    reviewsOfListing.data.data.length === 0 && (
                      <div className="text-center py-8">
                        <Icon
                          icon="ic:outline-rate-review"
                          width="48"
                          height="48"
                          className="mx-auto text-muted-foreground mb-2"
                        />
                        <p className="text-muted-foreground">No reviews yet</p>
                      </div>
                    )}

                  {reviewsOfListing.isSuccess &&
                    reviewsOfListing.data.data
                      .slice(0, 3)
                      .map((review: any) => (
                        <motion.div
                          key={review.id}
                          className="p-4 bg-muted/50 rounded-lg"
                          whileHover={{ scale: 1.02 }}
                          transition={{ duration: 0.2 }}
                        >
                          <div className="flex items-start gap-3">
                            <img
                              src={review.reviewer.avatar}
                              alt="Reviewer"
                              className="w-10 h-10 rounded-full object-cover"
                            />
                            <div className="flex-1">
                              <div className="flex items-center justify-between mb-2">
                                <h4 className="font-medium text-foreground">
                                  {review.reviewer.name}
                                </h4>
                                <div className="flex items-center gap-1">
                                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                                  <span className="text-sm font-medium">
                                    {review.rating}
                                  </span>
                                </div>
                              </div>
                              <p className="text-sm text-muted-foreground">
                                {review.comment}
                              </p>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>

        {/* Add a Review Section */}
        <motion.div variants={itemVariants}>
          <Card className="border-border/50 shadow-sm">
            <CardContent className="p-6">
              <h3 className="text-xl font-semibold text-foreground mb-6">
                Add a Review
              </h3>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-6"
              >
                <div>
                  <textarea
                    placeholder="Write your review here..."
                    {...form.register("comment")}
                    className="w-full h-32 p-4 border border-border rounded-lg bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary resize-none transition-colors"
                  ></textarea>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="text-sm font-medium text-foreground">
                      Rating:
                    </span>
                    <Rating
                      name="customized-stars"
                      defaultValue={2}
                      onChange={(event, newValue) => {
                        form.setValue("rating", newValue!);
                      }}
                      icon={
                        <StarIcon
                          style={{
                            fill: "yellow",
                            width: "24px",
                            height: "24px",
                          }}
                        />
                      }
                      emptyIcon={
                        <StarBorderIcon
                          style={{
                            color: "hsl(var(--muted-foreground))",
                            width: "24px",
                            height: "24px",
                          }}
                        />
                      }
                    />
                  </div>

                  <Button
                    type="submit"
                    disabled={submitReview.isPending}
                    className="bg-primary hover:bg-primary/90"
                  >
                    {submitReview.isPending ? (
                      <>
                        <Icon
                          icon="svg-spinners:180-ring"
                          width="20"
                          height="20"
                          className="mr-2"
                        />
                        Submitting...
                      </>
                    ) : (
                      "Submit Review"
                    )}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Page;
