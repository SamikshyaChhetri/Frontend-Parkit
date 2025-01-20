"use client";
import { Icon } from "@iconify/react/dist/iconify.js";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Link from "next/link";
import { FC } from "react";
import { Button } from "./ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";
const sideBarItems = [
  { menu: "Home", icon: "clarity:home-solid" },
  { menu: "Places", icon: "tdesign:location-filled" },
  { menu: "Reservation", icon: "mdi:file-document-box-tick-outline" },
  { menu: "Your Listings", icon: "ion:list-sharp" },
];

const Header: FC<{
  userId: string;
}> = ({ userId }) => {
  const userQuery = useQuery({
    queryKey: ["singleDataQuery"],
    refetchOnWindowFocus: true,
    queryFn: async () => {
      const response = await axios.get(
        `http://localhost:3333/users/getSingleuser/${userId}`
      );
      return response.data;
    },
  });
  if (userQuery.isLoading) {
    return <div>Loading...</div>;
  }
  return (
    <div className="bg-gray-800 text-white">
      <div className="flex flex-col gap-6">
        <div>
          <div className="flex justify-between m-3">
            <div className="text-2xl font-bold">
              Par<span className="text-violet-500">ki</span>fy
            </div>
            <div className="flex justify-between gap-10 text-xl ">
              <Link href={`dashboard`}>
                <div className="lg:p-2 hidden md:p1 md:flex">Home</div>
              </Link>
              <div className="lg:p-2 hidden md:p1 md:flex">Places</div>
              <Link href={`reservations`}>
                <div className="lg:p-2 hidden md:p1 md:flex">Reservation</div>
              </Link>
              <Link href={`yourListings`}>
                <div className="lg:p-2 hidden md:p1 md:flex">Your listings</div>
              </Link>
              <Sheet>
                <SheetTrigger asChild>
                  <img
                    src={userQuery.data.data.avatar}
                    alt="avatar"
                    className="w-10 h-10 rounded-full cursor-pointer"
                  />
                </SheetTrigger>
                <SheetContent className="flex flex-col justify-between  rounded-lg m-2 bg-gray-800 text-white ">
                  <div className="flex flex-col gap-8">
                    <div className="flex flex-col gap-10">
                      <SheetHeader className="flex gap-3 flex-row items-center">
                        <img
                          className=" w-14 rounded-full"
                          src={userQuery.data.data.avatar}
                        ></img>
                        <div>
                          <SheetTitle className="text-white">
                            {userQuery.data.data.name}
                          </SheetTitle>
                          <SheetDescription>
                            {userQuery.data.data.email}
                          </SheetDescription>
                        </div>
                      </SheetHeader>
                    </div>
                    <div className="flex flex-col">
                      {sideBarItems.map((item) => (
                        <div
                          key={item.menu}
                          className="flex gap-2 p-3 hover:bg-gray-500 rounded-lg cursor-pointer"
                        >
                          <Icon icon={item.icon} width="24" height="24" />
                          <div>{item.menu}</div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <SheetFooter>
                    <SheetClose asChild>
                      <Button
                        type="submit"
                        variant="outline"
                        className="text-white bg-gray-800 w-full py-5"
                      >
                        Logout
                      </Button>
                    </SheetClose>
                  </SheetFooter>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
