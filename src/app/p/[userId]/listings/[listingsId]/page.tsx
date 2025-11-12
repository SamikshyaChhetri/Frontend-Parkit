"use client";
import Map from "@/components/maps/Map";
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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
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
import Link from "next/link";
import { useRouter } from "next/navigation";
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
  const router = useRouter();
  const reserveForm = useForm({
    defaultValues: {
      date: new Date(),
      startTime: "01:30:00",
      endTime: "02:30:00",
      reserverId: rparams.userId,
      listingId: rparams.listingsId,
      slots: 1,
    },
  });
  const [isOpen, setIsOpen] = useState(false);
  const [open, setOpen] = useState(false);
  const [date, setDate] = useState<Date | undefined>(undefined);

  // Initialize the form with default values
  const form = useForm({
    defaultValues: {
      rating: 2,
      comment: "",
      reviewerId: rparams.userId,
      listingId: rparams.listingsId,
    },
  });

  const { listingsId, userId } = rparams;

  // Query to fetch listing details
  const listingsQuery = useQuery({
    queryKey: ["singleListingQuery", listingsId],
    queryFn: async () => {
      const response = await axiosInstance.get(`/listing/${listingsId}`);
      return response.data;
    },
  });

  // Function to calculate available slots for current time
  const calculateAvailableSlots = () => {
    if (!listingsQuery.data?.data) return 0;

    const listing = listingsQuery.data.data;
    const totalSlots = Number(listing.noOfVehicle) || 0;
    const reservations = listing.reservation || [];

    // Get current time
    const now = new Date();

    // Filter reservations that are currently active (ongoing)
    const activeReservations = reservations.filter((reservation: any) => {
      const startTime = new Date(reservation.date);
      const endTime = new Date(reservation.endDate);
      return now >= startTime && now <= endTime;
    });

    // Sum up slots from active reservations
    const bookedSlots = activeReservations.reduce(
      (sum: number, reservation: any) => {
        return sum + (Number(reservation.slots) || 0);
      },
      0
    );

    return Math.max(0, totalSlots - bookedSlots);
  };

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

      // Combine selected date with start and end times to form ISO datetimes
      const selectedDate = reservationValue.date || date || new Date();
      const parseTime = (timeStr: string) => {
        const parts = (timeStr || "").split(":");
        const hh = Number(parts[0]) || 0;
        const mm = Number(parts[1]) || 0;
        const ss = Number(parts[2]) || 0;
        return { hh, mm, ss };
      };

      const combineDateTime = (dAny: any, timeStr: string) => {
        const base = dAny instanceof Date ? new Date(dAny) : new Date(dAny);
        const { hh, mm, ss } = parseTime(timeStr);
        base.setHours(hh, mm, ss, 0);
        return base.toISOString();
      };

      const payload = {
        reserverId: reservationValue.reserverId,
        listingId: reservationValue.listingId,
        date: combineDateTime(selectedDate, reservationValue.startTime),
        endDate: combineDateTime(selectedDate, reservationValue.endTime),
        slots: Number(reservationValue.slots) || 1,
      };

      const response = await axiosInstance.post("/reserve", payload);
      return response.data;
    },
    onSuccess: () => {
      toast.success("Reservation submitted successfully!");
      reserveForm.reset();
      setIsOpen(false);
      setDate(undefined);
      router.push(`/p/${userId}/reservations`);
    },
    onError: (error: AxiosError<{ message: string }>) => {
      toast.error(error.response?.data.message);
    },
  });
  const onSubmitReservation = () => {
    // Validate date: must be selected and not in the past
    const reservationValues = reserveForm.getValues();
    const selected = reservationValues.date || date;
    if (!selected) {
      toast.error("Please pick a date for the reservation.");
      return;
    }

    const sel =
      selected instanceof Date ? new Date(selected) : new Date(selected);
    const today = new Date();
    // normalize to date-only for comparison
    today.setHours(0, 0, 0, 0);
    sel.setHours(0, 0, 0, 0);
    if (sel < today) {
      toast.error("Reservation date cannot be in the past.");
      return;
    }

    // passed validation
    submitReservation.mutate();
  };
  // Form submit handler
  const onSubmit = () => {
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
                  <div className="flex flex-col gap-6 w-full">
                    <div className="flex w-full flex-col gap-3">
                      <Label htmlFor="date" className="px-1">
                        Date
                      </Label>
                      <Select open={open} onOpenChange={setOpen}>
                        <SelectTrigger>
                          <SelectValue
                            placeholder={reserveForm
                              .watch("date")
                              .toLocaleDateString()}
                          />
                        </SelectTrigger>
                        <SelectContent
                          className="w-auto overflow-hidden p-0 z-[9999999]"
                          align="start"
                        >
                          <Calendar
                            mode="single"
                            selected={date}
                            onSelect={(date) => {
                              setDate(date);
                              // keep react-hook-form in sync with calendar selection
                              if (date) reserveForm.setValue("date", date);
                              setOpen(false);
                            }}
                          />
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="flex gap-4 w-full justify-between mb-10">
                      <div className="flex flex-col gap-3">
                        <Label htmlFor="time-from" className="px-1">
                          From
                        </Label>
                        <Input
                          type="time"
                          id="time-from"
                          step="1"
                          className="bg-background appearance-none [&::-webkit-calendar-picker-indicator]:hidden [&::-webkit-calendar-picker-indicator]:appearance-none"
                          {...reserveForm.register("startTime")}
                        />
                      </div>
                      <div className="flex flex-col gap-3">
                        <Label htmlFor="time-to" className="px-1">
                          To
                        </Label>
                        <Input
                          type="time"
                          id="time-to"
                          step="1"
                          className="bg-background appearance-none [&::-webkit-calendar-picker-indicator]:hidden [&::-webkit-calendar-picker-indicator]:appearance-none"
                          {...reserveForm.register("endTime")}
                        />
                      </div>
                      <div className="flex flex-col gap-3 w-1/3">
                        <Label htmlFor="slots" className="px-1">
                          Slots
                        </Label>
                        <Input
                          type="number"
                          id="slots"
                          min={1}
                          step={1}
                          className="bg-background"
                          {...reserveForm.register("slots", {
                            valueAsNumber: true,
                          })}
                        />
                      </div>
                    </div>
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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
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

            <motion.div variants={cardVariants}>
              <Card
                className={`border-border/50 shadow-sm hover:shadow-md transition-shadow ${
                  calculateAvailableSlots() === 0
                    ? "border-red-300 dark:border-red-800 bg-red-50/50 dark:bg-red-950/20"
                    : calculateAvailableSlots() <= 2
                    ? "border-orange-300 dark:border-orange-800 bg-orange-50/50 dark:bg-orange-950/20"
                    : "border-green-300 dark:border-green-800 bg-green-50/50 dark:bg-green-950/20"
                }`}
              >
                <CardContent className="p-6 flex items-center justify-between">
                  <div className="flex items-center">
                    <div
                      className={`p-3 rounded-lg mr-4 ${
                        calculateAvailableSlots() === 0
                          ? "bg-red-500/10"
                          : calculateAvailableSlots() <= 2
                          ? "bg-orange-500/10"
                          : "bg-green-500/10"
                      }`}
                    >
                      <Icon
                        icon="mdi:parking"
                        className={`h-6 w-6 ${
                          calculateAvailableSlots() === 0
                            ? "text-red-600 dark:text-red-400"
                            : calculateAvailableSlots() <= 2
                            ? "text-orange-600 dark:text-orange-400"
                            : "text-green-600 dark:text-green-400"
                        }`}
                      />
                    </div>
                    <div>
                      <p
                        className={`text-lg font-bold ${
                          calculateAvailableSlots() === 0
                            ? "text-red-600 dark:text-red-400"
                            : calculateAvailableSlots() <= 2
                            ? "text-orange-600 dark:text-orange-400"
                            : "text-green-600 dark:text-green-400"
                        }`}
                      >
                        {calculateAvailableSlots()} / {listing.noOfVehicle}
                      </p>
                      <p className="text-muted-foreground text-sm">
                        {calculateAvailableSlots() === 0
                          ? "Fully Booked"
                          : calculateAvailableSlots() === 1
                          ? "Slot Available"
                          : "Slots Available"}
                      </p>
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

        {/* Map Section */}
        {listingsQuery.isSuccess && listingsQuery.data && (
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6 }}
          >
            <Map
              location={[
                Number(listingsQuery.data.data.lat),
                Number(listingsQuery.data.data.long),
              ]}
              move={false}
            ></Map>
          </motion.div>
        )}

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
