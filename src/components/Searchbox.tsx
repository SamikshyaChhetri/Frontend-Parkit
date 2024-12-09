import { Icon } from "@iconify/react/dist/iconify.js";
import { Input } from "./ui/input";

const Searchbox = () => {
  return (
    <div>
      <div className="flex justify-center">
        <div className="flex justify-between relative w-[80%]">
          <Input
            type="email"
            placeholder="Search a place"
            className="rounded-full"
          />
          <Icon
            icon="line-md:search"
            width="24"
            height="24"
            className="absolute right-2 top-1.5 font-bold"
          />
        </div>
      </div>
    </div>
  );
};

export default Searchbox;
