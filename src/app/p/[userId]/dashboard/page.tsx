"use client";
import Display from "@/components/Display";
import SkeletonView from "@/components/SkeletonView";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { axiosInstance } from "@/providers/AxiosInstance";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import React, { FC } from "react";
import { useForm } from "react-hook-form";
const Page: FC<{ params: Promise<{ userId: string }> }> = ({ params }) => {
  const rparams = React.use(params);
  const form = useForm({
    defaultValues: {
      search: "",
    },
  });
  const listingQuery = useQuery({
    queryKey: [`allListings${form.watch("search")}`],
    queryFn: async () => {
      const response = await axiosInstance.get(
        "/listing?search=" + form.watch("search")
      );
      return response.data;
    },
  });

  return (
    <div className="bg-gray-800 min-h-screen h-full flex flex-col items-center gap-8 ">
      <div className="w-full px-10 sm:px-0 md:w-[80%] flex flex-col justify-center gap-10">
        <div>
          <div className="flex justify-center py-6">
            <div className="flex gap-3 w-full px-5">
              <Input
                type="search"
                className="text-white w-full"
                placeholder="Search for place..."
                {...form.register("search")}
              />
              <Link href={`listings`}>
                <Button>Create post</Button>
              </Link>
            </div>
          </div>
        </div>{" "}
        {listingQuery.isLoading && <SkeletonView></SkeletonView>}
        {listingQuery.isSuccess && (
          <Display
            listingQueryData={listingQuery.data.data}
            userId={rparams.userId}
          ></Display>
        )}
      </div>
    </div>
  );
};

export default Page;
