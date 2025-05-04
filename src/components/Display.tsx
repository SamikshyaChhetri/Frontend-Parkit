import { useRouter } from "next/navigation";
import { FC } from "react";
import ListingCard from "./ListingCard";
const Display: FC<{
  userId: string;
  listingQueryData: {
    id: string;
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
}> = ({ listingQueryData, userId }) => {
  const router = useRouter();
  return (
    <div className="sm:px-5 bg-gray-800 sm:h-full pb-5  ">
      <div className="grid sm:grid-cols-2 flex-wrap sm:flex-1 md:grid-cols-2 w-full gap-10 lg:grid-cols-3 xl:grid-cols-4  ">
        {listingQueryData.map((item, index) => {
          return (
            <div
              onClick={() => {
                router.push(`/p/${userId}/listings/${item.id}`);
              }}
              key={index}
            >
              <ListingCard
                photo={item.photo}
                city={item.city}
                country={item.country}
                price={item.price}
                type="listing"
              ></ListingCard>
            </div>
          );
        })}
      </div>
    </div>
  );
};
export default Display;
