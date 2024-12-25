import Search from "./Search";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
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
                <SheetContent>
                  <SheetHeader className="flex gap-5 flex-row">
                    <div className="bg-gray-400 w-14 border border-black rounded-full "></div>
                    <div>
                      <SheetTitle>Samikshya Baniya</SheetTitle>
                      <SheetDescription>
                        samikshyabchhetri@gmail.com
                      </SheetDescription>
                    </div>
                  </SheetHeader>
                  <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="name" className="text-right">
                        Name
                      </Label>
                      <Input
                        id="name"
                        value="Pedro Duarte"
                        className="col-span-3"
                      />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="username" className="text-right">
                        Username
                      </Label>
                      <Input
                        id="username"
                        value="@peduarte"
                        className="col-span-3"
                      />
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
