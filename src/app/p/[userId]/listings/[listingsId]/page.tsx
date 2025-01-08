"use client";
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

  return <div>{listingsQuery.data.data.price}</div>;
};
export default page;
// viber for explanantion okk
