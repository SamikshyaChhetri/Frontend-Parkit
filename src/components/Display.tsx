import { FC } from "react";
import { Card, CardContent, CardDescription, CardTitle } from "./ui/card";
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
    image: string;
  }[];
}> = ({ listingQueryData }) => {
  return (
    <div className="flex justify-center mx-12">
      <div className="flex flex-wrap flex-1 gap-4 pt-5">
        {listingQueryData.map((item, index) => {
          return (
            <div key={index} className=" flex flex-col gap-5 ">
              <Card>
                {/* <div>{item.description}</div> */}
                <div className="h-72 w-80">
                  <img src={item.image} alt="" />
                </div>
              </Card>
              <CardContent className="text-white">
                <CardTitle>
                  {item.city},{item.country}
                </CardTitle>
                <CardDescription>{item.price}</CardDescription>
              </CardContent>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Display;
