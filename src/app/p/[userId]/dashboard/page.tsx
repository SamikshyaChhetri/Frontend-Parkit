"use client";
import Display from "@/components/Display";
import SkeletonView from "@/components/SkeletonView";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { axiosInstance } from "@/providers/AxiosInstance";
import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { Clock, MapPin, Plus, Search } from "lucide-react";
import Link from "next/link";
import React, { FC, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
const Page: FC<{ params: Promise<{ userId: string }> }> = ({ params }) => {
  const rparams = React.use(params);

  const [userLat, setUserLat] = useState(0);
  const [userLng, setUserLng] = useState(0);

  const form = useForm({
    defaultValues: {
      search: "",
    },
  });

  const listingQuery = useQuery({
    queryKey: [`allListings`, form.watch("search")],
    queryFn: async () => {
      const response = await axiosInstance.get(
        "/listing?search=" + form.watch("search")
      );
      return response.data;
    },
  });

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const userLat = position.coords.latitude;
        const userLng = position.coords.longitude;
        setUserLat(userLat);
        setUserLng(userLng);
      },
      () => {
        // console.error("Error getting location:", error.message);
      }
    );
  }, []);

  const recommendationQuery = useQuery({
    queryKey: ["recommendation"],
    queryFn: async () => {
      const response = await axiosInstance.post("/recommendation/recommend", {
        lat: userLat,
        lng: userLng,
      });

      return response.data;
    },
    enabled: !!(userLat && userLng),
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
      transition: { duration: 0.6 },
    },
  };

  const searchVariants = {
    hidden: { opacity: 0, y: -30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, type: "spring", stiffness: 120 },
    },
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      <motion.div
        className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Header Section */}
        <motion.div className="mb-12" variants={itemVariants}>
          <div className="text-center mb-8">
            <motion.h1
              className="text-4xl font-bold text-foreground mb-4"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              Find Your Perfect Parking Spot
            </motion.h1>
            <motion.p
              className="text-muted-foreground text-lg max-w-2xl mx-auto"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              Discover available parking spaces in your area or create a new
              listing
            </motion.p>
          </div>

          {/* Search and Create Section */}
          <motion.div className="max-w-2xl mx-auto" variants={searchVariants}>
            <Card className="border-border/50 shadow-lg backdrop-blur-sm bg-card/95">
              <CardContent className="p-6">
                <div className="flex flex-col sm:flex-row gap-4">
                  <div className="flex-1 relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                    <Input
                      type="search"
                      className="pl-10 h-12 bg-background/50 border-border/50 focus:border-primary transition-colors"
                      placeholder="Search for parking spots by location..."
                      {...form.register("search")}
                    />
                  </div>
                  <Link href={`listings`}>
                    <Button
                      className="h-12 px-6 bg-primary hover:bg-primary/90 transition-all duration-200 hover:scale-105"
                      size="lg"
                    >
                      <Plus className="mr-2 h-4 w-4" />
                      Create Listing
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>

        {/* Stats Cards */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12"
          variants={itemVariants}
        >
          <Card className="border-border/50 shadow-sm hover:shadow-md transition-shadow">
            <CardContent className="p-6 flex items-center">
              <div className="p-3 bg-primary/10 rounded-lg mr-4">
                <MapPin className="h-6 w-6 text-primary" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">
                  {listingQuery.data?.data?.length || 0}
                </p>
                <p className="text-muted-foreground">Available Spots</p>
              </div>
            </CardContent>
          </Card>

          <Card className="border-border/50 shadow-sm hover:shadow-md transition-shadow">
            <CardContent className="p-6 flex items-center">
              <div className="p-3 bg-green-500/10 rounded-lg mr-4">
                <Clock className="h-6 w-6 text-green-500" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">24/7</p>
                <p className="text-muted-foreground">Availability</p>
              </div>
            </CardContent>
          </Card>

          <Card className="border-border/50 shadow-sm hover:shadow-md transition-shadow">
            <CardContent className="p-6 flex items-center">
              <div className="p-3 bg-blue-500/10 rounded-lg mr-4">
                <Search className="h-6 w-6 text-blue-500" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">Instant</p>
                <p className="text-muted-foreground">Search</p>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {!form.watch("search") && (
          <motion.div
            variants={itemVariants}
            className="space-y-8 pb-10"
            key={"abc"}
          >
            <div className="text-xl text-muted-foreground font-bold">
              Nearest Listing
            </div>
            {recommendationQuery.isLoading && (
              <motion.div
                className="flex flex-col space-y-3"
                variants={itemVariants}
              >
                <Skeleton className="h-48 w-full rounded-xl bg-muted/50" />
                <div className="space-y-2 p-2">
                  <Skeleton className="h-4 w-full bg-muted/30" />
                  <Skeleton className="h-4 w-3/4 bg-muted/20" />
                </div>
              </motion.div>
            )}
            {recommendationQuery.isSuccess &&
              recommendationQuery.data &&
              recommendationQuery.data.data.map((i: any) => {
                return <Display listingQueryData={i} userId={rparams.userId} />;
              })}
          </motion.div>
        )}

        {/* Listings Section */}
        <motion.div variants={itemVariants} className="space-y-8">
          {listingQuery.isLoading && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              <SkeletonView />
            </motion.div>
          )}

          {listingQuery.isSuccess && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <h2 className="text-2xl font-semibold text-foreground mb-6">
                Available Parking Spots
              </h2>
              <Display
                listingQueryData={listingQuery.data.data}
                userId={rparams.userId}
              />
            </motion.div>
          )}
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Page;
