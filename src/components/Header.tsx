import { Input } from "@/components/ui/input";
import { Button } from "./ui/button";

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
              <div className="bg-gray-400 w-12 border border-black rounded-full "></div>
            </div>
          </div>
          <div className="border border-gray-400"></div>
        </div>

        <div className="flex justify-center">
          <div className="flex gap-3 w-[50%]">
            <Input type="search" placeholder="Search for place" />
            <Button>Create post</Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
