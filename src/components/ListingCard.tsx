import { capitalize } from "@/lib/utils";
import { FC } from "react";
import { Card, CardContent, CardDescription } from "./ui/card";

const ListingCard: FC<{
  photo: string;
  city: string;
  country: string;
  price: string;
}> = ({ photo, city, country, price }) => {
  return (
    <div className=" flex flex-col sm:gap-3 sm:pt-10 mx-5 md:mx-0 sm:w-full  md:w-fit  ">
      <Card className="bg-transparent cursor-pointer hover:shadow-md hover:scale-[1.07] ease-in-out transition-all border-none">
        <CardContent className="text-white flex flex-col h-fit p-0 ">
          <div>
            <img
              src={photo}
              className="h-52 w-full rounded-xl md:w-72 "
              alt=""
            />
          </div>
          <div className="p-2">
            <div className="text-white">
              {capitalize(city)},{capitalize(country)}
            </div>
            <CardDescription>Rs.{price} per hour</CardDescription>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ListingCard;
