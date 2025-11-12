"use client";
import ListingCard from "@/components/ListingCard";
import NoData from "@/components/NoData";
import SkeletonView from "@/components/SkeletonView";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { axiosInstance } from "@/providers/AxiosInstance";
import { useQuery } from "@tanstack/react-query";
import { AxiosResponse } from "axios";
import { motion } from "framer-motion";
import { ArrowLeft, Building, Eye, Plus, Star } from "lucide-react";
import Link from "next/link";
import React, { FC } from "react";

const Page: FC<{ params: Promise<{ userId: string }> }> = ({ params }) => {
  const rparams = React.use(params);

  const userListings = useQuery({
    queryKey: ["userListings"],
    queryFn: async () => {
      const response: AxiosResponse<{
        message: string;
        data: {
          city: string;
          photo: string;
          price: string;
          id: string;
        }[];
      }> = await axiosInstance.get(`/listing/user/${rparams.userId}`);
      // console.log(response.data);
      return response.data;
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
      <motion.div
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Header */}
        <motion.div className="mb-12" variants={itemVariants}>
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

            <Link href={`/p/${rparams.userId}/listings`}>
              <Button className="bg-primary hover:bg-primary/90">
                <Plus className="h-4 w-4 mr-2" />
                Add Listings
              </Button>
            </Link>
          </div>

          <div className="text-center mb-8">
            <motion.h1
              className="text-4xl font-bold text-foreground mb-4"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              My <span className="text-primary">Listings</span>
            </motion.h1>
            <motion.p
              className="text-muted-foreground text-lg max-w-2xl mx-auto"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              Manage and track all your parking space listings in one place
            </motion.p>
          </div>

          {/* Stats Cards */}
          {userListings.isSuccess && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <motion.div variants={itemVariants}>
                <Card className="border-border/50 shadow-sm hover:shadow-md transition-shadow">
                  <CardContent className="p-6 flex items-center">
                    <div className="p-3 bg-primary/10 rounded-lg mr-4">
                      <Building className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-foreground">
                        {userListings.data?.data.length || 0}
                      </p>
                      <p className="text-muted-foreground">Total Listings</p>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div variants={itemVariants}>
                <Card className="border-border/50 shadow-sm hover:shadow-md transition-shadow">
                  <CardContent className="p-6 flex items-center">
                    <div className="p-3 bg-blue-500/10 rounded-lg mr-4">
                      <Eye className="h-6 w-6 text-blue-500" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-foreground">
                        Active
                      </p>
                      <p className="text-muted-foreground">Visibility</p>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div variants={itemVariants}>
                <Card className="border-border/50 shadow-sm hover:shadow-md transition-shadow">
                  <CardContent className="p-6 flex items-center">
                    <div className="p-3 bg-green-500/10 rounded-lg mr-4">
                      <Star className="h-6 w-6 text-green-500" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-foreground">High</p>
                      <p className="text-muted-foreground">Quality</p>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          )}
        </motion.div>

        {/* Listings Grid */}
        <motion.div variants={itemVariants} className="space-y-8">
          {userListings.isLoading && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              <SkeletonView />
            </motion.div>
          )}

          {userListings.isSuccess && (
            <>
              {userListings.data.data.length === 0 ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5 }}
                  className="flex justify-center items-center py-12"
                >
                  <div className="text-center">
                    <NoData />
                    <div className="mt-6">
                      <Link href={`/p/${rparams.userId}/dashboard`}>
                        <Button className="bg-primary hover:bg-primary/90">
                          <Plus className="h-4 w-4 mr-2" />
                          Find Parking Spaces
                        </Button>
                      </Link>
                    </div>
                  </div>
                </motion.div>
              ) : (
                <>
                  <h2 className="text-2xl font-semibold text-foreground mb-6">
                    Your Listings
                  </h2>
                  <motion.div
                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
                    variants={containerVariants}
                  >
                    {userListings.data?.data.map((item, index) => (
                      <motion.div
                        key={item.id}
                        variants={cardVariants}
                        whileHover={{ y: -8 }}
                        whileTap={{ scale: 0.95 }}
                        className="cursor-pointer"
                      >
                        <Link
                          href={`/p/${rparams.userId}/yourListings/update/${item.id}`}
                        >
                          <ListingCard
                            city={item.city}
                            photo={item.photo}
                            price={item.price}
                            type="listing"
                          />
                        </Link>
                      </motion.div>
                    ))}
                  </motion.div>
                </>
              )}
            </>
          )}
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Page;
