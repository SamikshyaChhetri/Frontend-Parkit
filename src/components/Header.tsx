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

const Header = () => {
  return (
    <div className="text-white bg-gray-800 h-screen ">
      <div className="flex flex-col gap-6">
        <div>
          <div className="flex justify-between m-3">
            <div className="text-2xl font-semibold">Parkify</div>
            <div className="flex justify-between gap-10 text-xl ">
              <div className="p-2">Home</div>
              <div className="p-2">Places</div>
              <div className="p-2">Reservation</div>
              <div className="p-2">Your listings</div>
              <Sheet>
                <SheetTrigger asChild>
                  <Button
                    variant="outline"
                    className="bg-gray-400 w-12 h-12 border border-black rounded-full "
                  ></Button>
                </SheetTrigger>
                <SheetContent className="flex flex-col gap-10">
                  <SheetHeader className="flex gap-5 flex-row">
                    <div className="bg-gray-400 w-14 border border-black rounded-full "></div>
                    <div>
                      <SheetTitle>Samikshya Baniya</SheetTitle>
                      <SheetDescription>
                        samikshyabchhetri@gmail.com
                      </SheetDescription>
                    </div>
                  </SheetHeader>
                  <div className="flex flex-col gap-6">
                    <div className="flex gap-2">
                      <Icon icon="clarity:home-solid" width="24" height="24" />
                      <div className=" flex justify-center ">Home</div>
                    </div>
                    <div className="flex gap-2">
                      <Icon
                        icon="tdesign:location-filled"
                        width="24"
                        height="24"
                      />
                      <div>Places</div>
                    </div>
                    <div className="flex gap-2">
                      <Icon
                        icon="mdi:file-document-box-tick-outline"
                        width="24"
                        height="24"
                        className="inline"
                      />
                      <div>Reservation</div>
                    </div>
                    <div>
                      <Icon
                        icon="ion:list-sharp"
                        width="24"
                        height="24"
                        className="inline"
                      />
                      Your Listings
                    </div>
                  </div>
                  <SheetFooter>
                    <SheetClose asChild>
                      <Button type="submit">Save changes</Button>
                    </SheetClose>
                  </SheetFooter>
                </SheetContent>
              </Sheet>
            </div>
          </div>
          <div className="border border-gray-400"></div>
        </div>
        <Search></Search>
      </div>
    </div>
  );
};

export default Header;
