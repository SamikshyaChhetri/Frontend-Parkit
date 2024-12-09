import { Icon } from "@iconify/react/dist/iconify.js";
import { Input } from "./ui/input";

const Searchbox = ({
  iconImage,
  placeHolder,
}: {
  iconImage: string;
  placeHolder: string;
}) => {
  return (
    <div>
      <div className="flex justify-center">
        <div className="flex justify-between relative w-[80%]">
          <Input
            type="email"
            placeholder={placeHolder}
            className="rounded-full"
          />
          <Icon
            icon={iconImage}
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
