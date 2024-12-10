import { Button } from "@/components/ui/button";
import { Icon } from "@iconify/react/dist/iconify.js";
import Features from "./Features";
import Searchbox from "./Searchbox";
import Seperator from "./Seperator";

const Navbar = () => {
  return (
    <div>
      <div className="flex flex-col">
        <div className="flex justify-between pr-10 font-bold">
          <div className="text-xl pt-8  pl-5 flex justify-between">
            <Icon
              icon="fluent:vehicle-car-parking-16-filled"
              width="34"
              height="34"
            />
            Mero Parkinge
          </div>
          <div className="flex justify-between gap-5 pr-5">
            <div className="pt-8">Become a host</div>
            {/* <div className="pt-8">Sign up</div> */}
            <Button className="mt-6" variant={"outline"}>
              Sign up
            </Button>

            <Button className="text-white bg-purple-500 mt-6 hover:bg-purple-600">
              Login
            </Button>
          </div>
        </div>
        <div className="flex justify-between pl-5">
          <div className="flex justify-center flex-col text-center gap-5">
            <div className="text-3xl font-bold">
              Find and Reserve <span className="text-purple-600">Parking</span>{" "}
              Instantly!
            </div>
            <div className="text-gray-500">
              Discover and reserve secure, convenient parking near you in
              seconds. Stress-free parking, always!
            </div>

            <Searchbox
              iconImage="line-md:search"
              placeHolder="Search a place"
            ></Searchbox>
          </div>
          <div>
            <img src="./park.png" alt="parking" />
          </div>
        </div>
        <Seperator></Seperator>
      </div>
      <div className="flex flex-col gap-14 items-center pt-20 w-full ">
        <div className="text-5xl font-bold">Have an unused space?</div>
        <div className="text-gray-500 text-xl font-bold">
          Become a host in few steps
        </div>
        <div className="flex justify-between gap-44">
          <div>
            <img src="/first.png" alt="" className="h-40" />
            <h2 className="flex justify-center">List your space</h2>
          </div>
          <div>
            <img src="/second.png" alt="" className="h-40" />
            <h2 className="flex justify-center">Approve rental</h2>
          </div>
          <div>
            <img src="/earn.png" alt="" className="h-40" />
            <h2 className="flex justify-center">Start earning</h2>
          </div>
        </div>
        <Button className="bg-purple-500 px-10 hover:bg-purple-600">
          Become a host
        </Button>
      </div>
      <Seperator></Seperator>

      <div className="flex justify-center text-2xl font-bold pt-10">
        Features we <span className="text-purple-500"> Offer</span>
      </div>
      <div className="flex justify-between">
        <div>
          <Features
            title="Search by Location"
            description="Quickly find parking spaces near landmarks, addresses, or cities"
            icon={<Icon icon="tdesign:location" width="24" height="24" />}
            color="bg-green-300"
          ></Features>
          <Features
            title="Real-Time Availability"
            description="View up-to-date information on available spots for immediate or future bookings."
            icon={<Icon icon="bx:time-five" width="24" height="24" />}
            color="bg-blue-300"
          ></Features>
          <Features
            title="Secure Online Payments"
            description="Pay seamlessly with multiple payment options, ensuring a safe transaction."
            icon={<Icon icon="ic:outline-payment" width="24" height="24" />}
            color="bg-red-300"
          ></Features>
          <Features
            title="Navigation Assistance"
            description="Get step-by-step directions to your reserved parking spot via integrated maps"
            icon={<Icon icon="bx:navigation" width="24" height="24" />}
            color="bg-violet-300"
          ></Features>
          <Features
            title="Parking History"
            description="Keep track of your past bookings and receipts for convenience."
            icon={
              <Icon icon="ic:twotone-manage-history" width="24" height="24" />
            }
            color="bg-gray-300"
          ></Features>
        </div>
        <div>
          <Features
            title="Parking History"
            description="Keep track of your past bookings and receipts for convenience."
            icon={
              <Icon icon="ic:twotone-manage-history" width="24" height="24" />
            }
            color="bg-gray-300"
          ></Features>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
