import { Icon } from "@iconify/react/dist/iconify.js";
import Search from "./Search";
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

const Header = () => {
  return (
    <div className="text-white bg-gray-800 h-screen">
      <div className="flex flex-col gap-6">
        <div>
          <div className="flex justify-between m-3">
            <div className="text-2xl font-semibold">Parkify</div>
            <div className="flex justify-between gap-10 text-xl">
              <div className="p-2">Home</div>
              <div className="p-2">Places</div>
              <div className="p-2">Reservation</div>
              <div className="p-2">Your listings</div>
              <Sheet>
                <SheetTrigger asChild>
                  <Button
                    variant="outline"
                    className="bg-gray-400 w-12 h-12 border border-black rounded-full"
                  ></Button>
                </SheetTrigger>
                <SheetContent className="flex flex-col  rounded-lg m-2 bg-gray-800 text-white h-[95%]">
                  <div className="flex flex-col gap-10">
                    <SheetHeader className="flex gap-3 flex-row">
                      <div className="bg-gray-400 w-14 border border-black rounded-full"></div>
                      <div>
                        <SheetTitle className="text-white">
                          Samikshya Baniya
                        </SheetTitle>
                        <SheetDescription>
                          samikshyabchhetri@gmail.com
                        </SheetDescription>
                      </div>
                    </SheetHeader>
                  </div>
                  <div className="flex flex-col gap-6 mt-6">
                    {sideBarItems.map((item) => (
                      <div key={item.menu} className="flex gap-2">
                        <Icon icon={item.icon} width="24" height="24" />
                        <div>{item.menu}</div>
                      </div>
                    ))}
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
          {/* <div className="border border-gray-400"></div> */}
        </div>
        <Search></Search>
      </div>
    </div>
  );
};

export default Header;
