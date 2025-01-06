import { Icon } from "@iconify/react/dist/iconify.js";
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
  name: string;
  avatar: string;
  email: string;
}> = ({ name, email, avatar }) => {
  return (
    <div className="text-white bg-gray-800">
      <div className="flex flex-col gap-6">
        <div>
          <div className="flex justify-between m-3">
            <div className="text-2xl font-semibold">Parkify</div>
            <div className="flex justify-between gap-10 text-xl">
              <div className="lg:p-2 hidden md:p1 md:flex">Home</div>
              <div className="lg:p-2 hidden md:p1 md:flex">Places</div>
              <div className="lg:p-2 hidden md:p1 md:flex">Reservation</div>
              <div className="lg:p-2 hidden md:p1 md:flex">Your listings</div>
              <Sheet>
                <SheetTrigger asChild>
                  <img
                    src={avatar}
                    alt="avatar"
                    className="w-10 h-10 rounded-full cursor-pointer"
                  />
                </SheetTrigger>
                <SheetContent className="flex flex-col justify-between  rounded-lg m-2 bg-gray-800 text-white h-[90%]">
                  <div className="flex flex-col gap-8">
                    <div className="flex flex-col gap-10">
                      <SheetHeader className="flex gap-3 flex-row items-center">
                        <img className=" w-14 rounded-full" src={avatar}></img>
                        <div>
                          <SheetTitle className="text-white">{name}</SheetTitle>
                          <SheetDescription>{email}</SheetDescription>
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
