import { useQuery } from "@tanstack/react-query";
import axios, { AxiosResponse } from "axios";
import React, { FC, Usable } from "react";

const page: FC<{ params: Usable<{ userId: string }> }> = ({ params }) => {
  const rparams = React.use(params);
  const userReservations = useQuery({
    queryKey: ["userReservations"],
    queryFn: async () => {
      const response: AxiosResponse<{
        message: string;
        data: { city: string; country: string; photo: string; price: string }[];
      }> = await axios.get(
        `http://localhost:3333/reserve/userReservations/${rparams.userId}`
      );
      // console.log(response.data);
      return response.data;
    },
  });
  return <div>page</div>;
};

export default page;
