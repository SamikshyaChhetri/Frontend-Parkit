import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Icon } from "@iconify/react/dist/iconify.js";

const page = () => {
  return (
    <div className="flex justify-center items-center">
      <div className="flex flex-col justify-center gap-5 h-screen w-[40%] ">
        <div className="flex  justify-center">
          <Icon
            icon="solar:key-square-2-bold"
            width="100"
            height="100"
            className="text-violet-700"
          />
        </div>
        <div>
          <div className="text-2xl font-bold flex  justify-center ">
            Forgot your password?
          </div>
          <div className="text-gray-500">
            Please enter the email address associated with your account and we
            will email you a link to reset your password.
          </div>
        </div>
        <Input placeholder="Email"></Input>
        <Button>Send Request</Button>
        <div className="flex flex-row justify-center">
          <Icon icon="iconamoon:arrow-left-2-duotone" width="24" height="24" />
          Return to sign in
        </div>
      </div>
    </div>
  );
};

export default page;
