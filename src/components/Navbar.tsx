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
      {/* <div className=" flex justify-center flex-col pt-14 text-justify  ">
        <div className="flex justify-center text-center text-3xl font-bold pb-14">
          Features we <span className="text-purple-500"> Offer</span>
        </div>
        <div className="flex justify-evenly">
          <div className="flex flex-col gap-4">
            <div className="flex gap-2 items-center">
              <Icon
                icon="tdesign:location"
                className="w-14 h-14 text-white bg-green-400 p-4 rounded-full"
              />

              <div>
                <div className="font-bold text-lg">Search by location</div>
                <div>
                  Quickly find parking spaces near landmarks, addresses, or
                  cities.
                </div>
              </div>
            </div>

            <div>
              <div className="font-bold text-lg">Real-time availability</div>
              <div>
                View up-to-date information on available spots for immediate or
                future bookings.
              </div>
            </div>
            <div>
              <div className="font-bold text-lg">
                Flexible booking and reservation
              </div>
              <div>
                Reserve parking for your desired duration—hourly, daily, or
                monthly.
              </div>
            </div>
            <div>
              <div className="font-bold text-lg">Secure Online Payments</div>
              <div>
                Pay seamlessly with multiple payment options, ensuring a safe
                transaction.
              </div>
            </div>
            <div>
              <div className="font-bold text-lg">Navigation Assistance</div>
              <div>
                Get step-by-step directions to your reserved parking spot via
                integrated maps.
              </div>
            </div>
            <div>
              <div className="font-bold text-lg">Filter and Sort</div>
              <div>
                Refine searches by price, amenities (e.g., EV charging), or type
                (covered/uncovered).
              </div>
            </div>
            <div>
              <div className="font-bold text-lg">Parking History</div>
              <div>
                Keep track of your past bookings and receipts for convenience.
              </div>
            </div>
            <div>
              <div className="font-bold text-lg">Customer Reviews</div>
              <div>
                Read feedback from other parkers to choose the best parking
                space for your needs.
              </div>
            </div>
          </div>
          <div className="border-[1px] border-gray-600  mx-[100px]"></div>

          <div className="flex flex-col gap-4">
            <div>
              <div className="font-bold text-lg">Easy Listing Management</div>
              <div>
                Track revenue, payouts, and overall performance with detailed
                analytics.
              </div>
            </div>
            <div>
              <div className="font-bold text-lg">Flexible Scheduling</div>
              <div>
                Set available time slots and block off dates when the space is
                unavailable.
              </div>
            </div>
            <div>
              <div className="font-bold text-lg">Dynamic Pricing Control</div>
              <div>
                Adjust prices based on demand, time of day, or proximity to
                events.
              </div>
            </div>
            <div>
              <div className="font-bold text-lg">
                Real-Time Booking Notifications
              </div>
              <div>
                Get instant alerts for new reservations, cancellations, or
                inquiries.
              </div>
            </div>
            <div>
              <div className="font-bold text-lg">Secure Transactions</div>
              <div>
                Receive payments directly through the platform with safe and
                reliable processing.
              </div>
            </div>
            <div>
              <div className="font-bold text-lg">Space Optimization Tools</div>
              <div>
                Manage multiple parking spots efficiently from a single account.
              </div>
            </div>
            <div>
              <div className="font-bold text-lg">Parking History</div>
              <div>
                Keep track of your past bookings and receipts for convenience.
              </div>
            </div>
            <div>
              <div className="font-bold text-lg">Customer Feedback</div>
              <div>
                View reviews and ratings to improve service and attract more
                renters.
              </div>
            </div>
          </div>
        </div>
      </div> */}
      <div className="flex justify-center text-2xl font-bold pt-10">
        Features we <span className="text-purple-500"> Offer</span>
      </div>
      <Features
        title="Search by Location"
        description="Quickly find parking spaces near landmarks, addresses, or cities"
        icon={<Icon icon="tdesign:location" width="24" height="24" />}
        color="bg-red-500"
      ></Features>
      <Features
        title="Real-Time Availability"
        description="View up-to-date information on available spots for immediate or future bookings."
        icon={<Icon icon="bx:time-five" width="24" height="24" />}
      ></Features>
      <Features
        title="Secure Online Payments"
        description="Pay seamlessly with multiple payment options, ensuring a safe transaction."
        icon={<Icon icon="ic:outline-payment" width="24" height="24" />}
      ></Features>
      <Features
        title="Navigation Assistance"
        description="Get step-by-step directions to your reserved parking spot via integrated maps"
        icon={<Icon icon="bx:navigation" width="24" height="24" />}
      ></Features>
      <Features
        title="Parking History
"
        description="Keep track of your past bookings and receipts for convenience.

"
        icon={<Icon icon="ic:twotone-manage-history" width="24" height="24" />}
      ></Features>
    </div>
  );
};

// aba ali styling gara

export default Navbar;
// k garne kkkkk  tailwind class pass garne k, aba red colro chaiyexa vane bg-red-500 pass garne, ani teslai uuta lera tyo div ma haldine, bujhenau?
// mathi hera ta
