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
    <div className="px-4">
      <div className="flex justify-between flex-wrap flex-1  ">
        {listingQueryData.map((item, index) => {
          return (
            <div key={index} className=" flex flex-col gap-3 pt-7">
              <Card>
                <CardContent className="text-white flex flex-col justify-center items-center h-fit p-0 ">
                  <div>
                    <img
                      src={item.photo}
                      className="h-52 w-64 rounded-xl"
                      alt=""
                    />
                  </div>
                  <div>
                    <div className="text-black">
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
