import { capitalize } from "@/lib/utils";
import moment from "moment";
import { useRouter } from "next/navigation";
import { FC } from "react";
import { Card, CardContent, CardDescription } from "./ui/card";
const ListingCard: FC<{
  photo: string;
  city: string;
  country: string;
  price: string;
  type?: "listing" | "reservation";
  date?: string;
}> = ({ photo, city, country, price, type, date }) => {
  const router = useRouter();

  return (
    <div>
      <Card className="bg-transparent cursor-pointer hover:shadow-md hover:scale-[1.07] ease-in-out transition-all border-none">
        <CardContent className="text-white flex flex-col h-fit p-0 ">
          <div>
            <img src={photo} className="h-52 w-full rounded-xl  " alt="" />
          </div>
          <div className="p-2">
            <div className="text-white">
              {capitalize(city)},{capitalize(country)}
            </div>
            {type == "listing" && (
              <CardDescription>Rs.{price} per hour</CardDescription>
            )}
            {type == "reservation" && (
              <CardDescription>
                {moment(date).format("DD MMM YYYY")}
              </CardDescription>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ListingCard;
