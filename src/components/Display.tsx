import { FC } from "react";
import { Card, CardContent, CardDescription } from "./ui/card";
const Display: FC<{
  listingQueryData: {
    description: string;
    type: string;
    price: string;
    numberOfVehicle: string;
    city: string;
    street: string;
    country: string;
    zipcode: string;
    photo: string;
  }[];
}> = ({ listingQueryData }) => {
  return (
    <div className="sm:px-5 bg-gray-800 sm:h-screen sm:pb-5  ">
      <div className="grid sm:grid-cols-3  sm:flex-wrap sm:flex-1 w-full gap-4 lg:grid-cols-5  ">
        {listingQueryData.map((item, index) => {
          return (
            <div key={index} className=" flex flex-col sm:gap-3 sm:pt-10 ">
              <Card className="bg-transparent">
                <CardContent className="text-white flex flex-col h-fit p-0 ">
                  <div>
                    <img
                      src={item.photo}
                      className="h-52 sm:w-full rounded-xl w-full"
                      alt=""
                    />
                  </div>
                  <div className="p-2">
                    <div className="text-white">
                      {item.city},{item.country}
                    </div>
                    <CardDescription>Rs.{item.price} per hour</CardDescription>
                  </div>
                </CardContent>
              </Card>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Display;
