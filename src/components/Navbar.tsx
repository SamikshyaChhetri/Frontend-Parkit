import { Input } from "./ui/input";

const Navbar = () => {
  return (
    <div className="flex flex-col">
      <div className="flex justify-between pt-10 pr-5 font-bold">
        <div className="text-xl  pl-5">Mero Parking</div>
        <div className="flex justify-between gap-5 pr-5">
          <div>Become a host</div>
          <div>Sign up</div>
          <div>Login</div>
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
          <div>
            <Input
              type="email"
              placeholder="Search a place"
              className="w-[70%]"
            />
            <Icon icon="line-md:search" width="24" height="24" />
          </div>
        </div>
        <div>
          <img src="./park.png" alt="parking" />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
