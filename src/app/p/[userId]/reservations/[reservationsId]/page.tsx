"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { axiosInstance } from "@/providers/AxiosInstance";
import { Icon } from "@iconify/react/dist/iconify.js";
import { useMutation, useQuery } from "@tanstack/react-query";
import { AxiosResponse } from "axios";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  Calendar,
  Car,
  CheckCircle,
  Clock,
  CreditCard,
  Eye,
  Mail,
  MapPin,
  SquareArrowOutUpRight,
  StarIcon,
  Trash2,
  User,
  Wallet,
} from "lucide-react";
import moment from "moment";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { FC, useState } from "react";
import { toast } from "sonner";

const Page: FC<{
  params: Promise<{
    reservationsId: string;
    userId: string;
    listingsId: string;
  }>;
}> = ({ params }) => {
  const rparams = React.use(params);
  const [paymentDialogOpen, setPaymentDialogOpen] = useState(false);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<
    "cash" | "qr" | null
  >(null);

  const reservationsQuery = useQuery({
    queryKey: ["reservationQuery"],
    queryFn: async () => {
      const response: AxiosResponse<{
        message: string;
        data: {
          date: string;
          endDate: string;
          listing: {
            id: string;
            photo: string;
            description: string;
            type: string;
            rating: string;
            street: string;
            city: string;
            paymentQr?: string;
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
  const router = useRouter();
  const deleteMutation = useMutation({
    mutationFn: async () => {
      const response = await axiosInstance.delete(
        `/reserve/${rparams.reservationsId}`
      );
      return response.data;
    },
    onError: () => {
      toast.error("Failed to delete");
    },
    onSuccess: () => {
      toast.success("Successfully deleted reservation");
      router.push(`/p/${rparams.userId}/reservations`);
    },
  });

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

  if (reservationsQuery.isLoading)
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
          <p className="text-muted-foreground">
            Loading reservation details...
          </p>
        </motion.div>
      </div>
    );

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      {" "}
      <motion.div
        className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Header */}
        <motion.div className="mb-8" variants={itemVariants}>
          <div className="flex items-center gap-4 mb-6">
            <Link href={`/p/${rparams.userId}/reservations`}>
              <Button
                variant="outline"
                size="sm"
                className="hover:bg-primary/10 hover:border-primary/50 transition-colors"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Reservations
              </Button>
            </Link>
          </div>

          <div className="text-center">
            <motion.h1
              className="text-3xl font-bold text-foreground mb-2"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              Reservation Details
            </motion.h1>
            <motion.p
              className="text-muted-foreground"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              Manage your parking reservation
            </motion.p>
          </div>
        </motion.div>

        {/* Main Content */}
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Image and Actions */}
          <motion.div className="lg:col-span-1" variants={itemVariants}>
            <Card className="border-border/50 shadow-lg backdrop-blur-sm bg-card/95 overflow-hidden">
              <div className="relative">
                <motion.img
                  src={reservationsQuery.data?.data.listing.photo}
                  alt="Parking Space"
                  className="w-full h-64 object-cover"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.3 }}
                />
                <div className="absolute top-4 right-4">
                  <div className="bg-green-500/90 backdrop-blur-sm text-white px-3 py-1 rounded-full text-sm font-medium flex items-center gap-1">
                    <CheckCircle className="h-3 w-3" />
                    Confirmed
                  </div>
                </div>
              </div>

              <CardContent className="p-6 space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Calendar className="h-4 w-4" />
                    Reserved Date:{" "}
                    {new Date(
                      reservationsQuery.data?.data.date || ""
                    ).toLocaleDateString()}
                  </div>

                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Clock className="h-4 w-4" />
                    Reserved Time:{" "}
                    {moment(reservationsQuery.data?.data.date).format(
                      "hh:mm A"
                    )}{" "}
                    -{" "}
                    {moment(reservationsQuery.data?.data.endDate).format(
                      "hh:mm A"
                    )}
                  </div>

                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Car className="h-4 w-4" />
                    Vehicle Type: {reservationsQuery.data?.data.listing.type}
                  </div>
                </div>

                <Separator />

                <div className="space-y-3">
                  <Link
                    href={`/p/${rparams.userId}/listings/${reservationsQuery.data?.data.listing.id}`}
                    className="w-full"
                  >
                    <Button
                      variant="outline"
                      className="w-full hover:bg-primary/10 hover:border-primary/50 transition-colors"
                    >
                      <Eye className="h-4 w-4 mr-2" />
                      View Full Listing
                      <SquareArrowOutUpRight className="h-4 w-4 ml-2" />
                    </Button>
                  </Link>

                  <Dialog
                    open={paymentDialogOpen}
                    onOpenChange={setPaymentDialogOpen}
                  >
                    <DialogTrigger asChild>
                      <motion.div
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <Button className="w-full bg-green-600 hover:bg-green-700 text-white">
                          <Wallet className="h-4 w-4 mr-2" />
                          Proceed Payment
                        </Button>
                      </motion.div>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[500px]">
                      <DialogHeader>
                        <DialogTitle className="text-center text-xl font-bold">
                          Choose Payment Method
                        </DialogTitle>
                        <DialogDescription className="text-center">
                          Select how you would like to pay for your reservation
                        </DialogDescription>
                      </DialogHeader>

                      {selectedPaymentMethod === null ? (
                        <div className="space-y-4 py-4">
                          {/* Cash Option */}
                          <motion.div
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                          >
                            <Button
                              variant="outline"
                              className="w-full h-auto py-6 flex flex-col items-center gap-3 hover:border-primary hover:bg-primary/5"
                              onClick={() => setSelectedPaymentMethod("cash")}
                            >
                              <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center">
                                <CreditCard className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                              </div>
                              <div className="text-center">
                                <p className="font-semibold text-base">
                                  Pay with Cash
                                </p>
                                <p className="text-xs text-muted-foreground">
                                  Pay directly to the owner
                                </p>
                              </div>
                            </Button>
                          </motion.div>

                          {/* QR Option (only if paymentQr exists) */}
                          {reservationsQuery.data?.data.listing.paymentQr &&
                            reservationsQuery.data?.data.listing.paymentQr.trim() !==
                              "" && (
                              <motion.div
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                              >
                                <Button
                                  variant="outline"
                                  className="w-full h-auto py-6 flex flex-col items-center gap-3 hover:border-primary hover:bg-primary/5"
                                  onClick={() => setSelectedPaymentMethod("qr")}
                                >
                                  <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-full flex items-center justify-center">
                                    <Icon
                                      icon="mdi:qrcode-scan"
                                      className="h-6 w-6 text-purple-600 dark:text-purple-400"
                                    />
                                  </div>
                                  <div className="text-center">
                                    <p className="font-semibold text-base">
                                      Pay with QR Code
                                    </p>
                                    <p className="text-xs text-muted-foreground">
                                      Scan and pay instantly
                                    </p>
                                  </div>
                                </Button>
                              </motion.div>
                            )}
                        </div>
                      ) : selectedPaymentMethod === "cash" ? (
                        <motion.div
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="py-6"
                        >
                          <div className="text-center space-y-4">
                            <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center mx-auto">
                              <CreditCard className="h-8 w-8 text-blue-600 dark:text-blue-400" />
                            </div>
                            <div>
                              <h3 className="text-lg font-semibold mb-2">
                                Cash Payment
                              </h3>
                              <p className="text-muted-foreground mb-4">
                                You can pay the cash directly to the owner when
                                you arrive at the parking location.
                              </p>
                              <div className="bg-muted/50 rounded-lg p-4 text-sm">
                                <p className="font-medium mb-2">
                                  Owner Details:
                                </p>
                                <p className="text-muted-foreground">
                                  <strong>Name:</strong>{" "}
                                  {
                                    reservationsQuery.data?.data.listing.owner
                                      .name
                                  }
                                </p>
                                <p className="text-muted-foreground">
                                  <strong>Email:</strong>{" "}
                                  {
                                    reservationsQuery.data?.data.listing.owner
                                      .email
                                  }
                                </p>
                              </div>
                            </div>
                            <Button
                              onClick={() => setSelectedPaymentMethod(null)}
                              variant="outline"
                              className="w-full"
                            >
                              Back to Payment Options
                            </Button>
                          </div>
                        </motion.div>
                      ) : (
                        <motion.div
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="py-6"
                        >
                          <div className="text-center space-y-4">
                            <div className="w-16 h-16 bg-purple-100 dark:bg-purple-900/30 rounded-full flex items-center justify-center mx-auto">
                              <Icon
                                icon="mdi:qrcode"
                                className="h-8 w-8 text-purple-600 dark:text-purple-400"
                              />
                            </div>
                            <div>
                              <h3 className="text-lg font-semibold mb-2">
                                Scan QR Code
                              </h3>
                              <p className="text-muted-foreground mb-4">
                                Scan the QR code below to complete your payment
                              </p>
                              <div className="bg-white p-6 rounded-lg shadow-md border border-border/50 inline-block">
                                <img
                                  src={
                                    reservationsQuery.data?.data.listing
                                      .paymentQr
                                  }
                                  alt="Payment QR Code"
                                  className="w-64 h-64 object-contain mx-auto"
                                />
                              </div>
                              <p className="text-xs text-muted-foreground mt-3">
                                Use any UPI app or digital wallet to scan and
                                pay
                              </p>
                            </div>
                            <Button
                              onClick={() => setSelectedPaymentMethod(null)}
                              variant="outline"
                              className="w-full"
                            >
                              Back to Payment Options
                            </Button>
                          </div>
                        </motion.div>
                      )}
                    </DialogContent>
                  </Dialog>

                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Button
                      className="w-full bg-destructive hover:bg-destructive/90 text-destructive-foreground"
                      onClick={() => {
                        deleteMutation.mutate();
                      }}
                      disabled={deleteMutation.isPending}
                    >
                      {deleteMutation.isPending ? (
                        <Icon
                          icon="svg-spinners:180-ring"
                          width="20"
                          height="20"
                          className="mr-2"
                        />
                      ) : (
                        <Trash2 className="h-4 w-4 mr-2" />
                      )}
                      Cancel Reservation
                    </Button>
                  </motion.div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Details */}
          <motion.div
            className="lg:col-span-2 space-y-6"
            variants={itemVariants}
          >
            {/* Location Details */}
            <Card className="border-border/50 shadow-lg backdrop-blur-sm bg-card/95">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MapPin className="h-5 w-5 text-primary" />
                  Location Details
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">
                    {reservationsQuery.data?.data.listing.street},{" "}
                    {reservationsQuery.data?.data.listing.city}
                  </h3>
                  <p className="text-muted-foreground">
                    {reservationsQuery.data?.data.listing.description}
                  </p>
                </div>

                <div className="flex flex-wrap gap-3">
                  <div className="px-3 py-1 rounded-full bg-muted/50 text-sm font-medium">
                    {reservationsQuery.data?.data.listing.type}
                  </div>
                  <div className="px-3 py-1 rounded-full bg-muted/50 text-sm font-medium flex items-center gap-1">
                    <StarIcon className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                    {reservationsQuery.data?.data.listing.rating || "N/A"}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Owner Details */}
            <Card className="border-border/50 shadow-lg backdrop-blur-sm bg-card/95">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="h-5 w-5 text-primary" />
                  Owner Information
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-4">
                  <motion.img
                    src={reservationsQuery.data?.data.listing.owner.avatar}
                    alt="Owner Avatar"
                    className="w-16 h-16 rounded-full object-cover border-2 border-border"
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.2 }}
                  />
                  <div className="space-y-1">
                    <h4 className="font-semibold text-foreground">
                      {reservationsQuery.data?.data.listing.owner.name}
                    </h4>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Mail className="h-3 w-3" />
                      {reservationsQuery.data?.data.listing.owner.email}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Reservation Status */}
            <Card className="border-border/50 shadow-lg backdrop-blur-sm bg-green-50/50 dark:bg-green-950/20 border-green-200">
              <CardContent className="pt-6">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-green-500/10 rounded-full flex items-center justify-center">
                    <CheckCircle className="h-6 w-6 text-green-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-green-800 dark:text-green-200">
                      Reservation Confirmed
                    </h3>
                    <p className="text-sm text-green-600 dark:text-green-300">
                      Your parking spot is reserved for the selected date
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default Page;
