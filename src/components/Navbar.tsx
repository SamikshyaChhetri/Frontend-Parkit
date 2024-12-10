import { Button } from "@/components/ui/button";
import { Icon } from "@iconify/react/dist/iconify.js";
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
            <h2 className="flex justify-center">Start learning</h2>
          </div>
        </div>
        <Button className="bg-purple-500 px-10 hover:bg-purple-600">
          Become a host
        </Button>
      </div>
      <Seperator></Seperator>
      <div className=" flex justify-center flex-col pt-14 mb-14 ">
        <div className="flex justify-center text-center text-3xl font-bold">
          Features we <span className="text-purple-500"> Offer</span>
        </div>
        <div className="flex justify-between  ">
          <div className="flex flex-col gap-4">
            <div>
              <div>Search by location</div>
              <div>
                Quickly find parking spaces near landmarks, addresses, or
                cities.
              </div>
            </div>
            <div>
              <div>Real-time availability</div>
              <div>
                View up-to-date information on available spots for immediate or
                future bookings.
              </div>
            </div>
            <div>
              <div>Flexible booking and reservation</div>
              <div>
                Reserve parking for your desired duration—hourly, daily, or
                monthly.
              </div>
            </div>
            <div>
              <div>Secure Online Payments</div>
              <div>
                Pay seamlessly with multiple payment options, ensuring a safe
                transaction.
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-4">
            <div>
              <div>Navigation Assistance</div>
              <div>
                Get step-by-step directions to your reserved parking spot via
                integrated maps.
              </div>
            </div>
            <div>
              <div>Filter and Sort</div>
              <div>
                Refine searches by price, amenities (e.g., EV charging), or type
                (covered/uncovered).
              </div>
            </div>
            <div>
              <div>Parking History</div>
              <div>
                Keep track of your past bookings and receipts for convenience.
              </div>
            </div>
            <div>
              <div>Customer Reviews</div>
              <div>
                Read feedback from other parkers to choose the best parking
                space for your needs.
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
