import { Icon } from "@iconify/react/dist/iconify.js";
import Searchbox from "./Searchbox";
import Seperator from "./Seperator";

const Navbar = () => {
  return (
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
          <div className="pt-8">Sign up</div>
          <div className="text-white bg-purple-500 mt-6 text-center p-2  rounded-lg ">
            Login
          </div>
        </div>
      </div>
      <div className="flex justify-between pl-5">
        <div className="flex justify-center flex-col text-center gap-5">
          <div className="text-3xl font-bold">
            Find a <span className="text-purple-600">GO-TO</span> parking space
          </div>
          <div className="text-gray-500">
            Discover and reserve secure, convenient parking near you in seconds.
            Stress-free parking, always!
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
  );
};

export default Navbar;
