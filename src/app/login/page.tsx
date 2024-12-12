import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Icon } from "@iconify/react/dist/iconify.js";

const page = () => {
  return (
    <div className="bg-gradient-to-r from-purple-400 to-white">
      <div className="flex justify-center h-screen items-center">
        <Card className="w-[450px] flex flex-col gap-8 bg-gradient-to-r from-purple-200 to-white  ">
          <CardHeader>
            <CardTitle className="flex justify-center text-2xl font-bold text-purple-600">
              Login Form
            </CardTitle>
            <CardDescription className="flex justify-center">
              Login to explore all the features and services we offer.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form className="flex flex-col gap-6">
              <div className="flex flex-col gap-2">
                <Label htmlFor="email" className="flex gap-1 items-center">
                  Email
                  <Icon icon="iconamoon:email" width="20" height="20" />{" "}
                </Label>
                <Input placeholder="Enter your email"></Input>
              </div>
              <div className="flex flex-col gap-2 relative">
                <Label htmlFor="password" className="flex gap-1 items-center">
                  Password
                  <Icon
                    icon="ooui:lock"
                    className="inline"
                    width="18"
                    height="18"
                  />
                </Label>
                <Input placeholder="Enter your password"></Input>
                <Icon
                  icon="heroicons-solid:eye"
                  className="absolute top-[34px] right-2"
                  width="20"
                  height="20"
                />
              </div>
              <div className="flex justify-between ">
                <div className="flex gap-1 items-center">
                  <Checkbox id="remember" />
                  <Label htmlFor="remember">Remember me</Label>
                </div>
                <div className="text-sm">Forgot password?</div>
              </div>

              <Button>Submit</Button>

              <div className="flex justify-center items-center">
                Don't have account?
                <Button variant={"link"}>Register</Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default page;
