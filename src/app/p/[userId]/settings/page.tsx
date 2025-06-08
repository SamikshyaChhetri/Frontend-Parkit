"use client";
import { CountryDropdown } from "@/components/country";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { HardDriveDownload, Images, PencilRuler } from "lucide-react";

const page = () => {
  return (
    <div className="bg-gray-800 h-screen">
      <div className="flex flex-col gap-10 py-11 px-20 bg-gray-800 text-white ">
        <div>
          <div className="text-2xl font-bold">Profile</div>
          <div className="text-gray-500">
            View and edit all your profile details here
          </div>
        </div>
        <div className="flex gap-5 ">
          <div className="flex justify-center items-center flex-col border w-[30%] border-gray-500 p-10 rounded-md">
            <div className="text-xl font-bold">Samiksya Baniya</div>
            <div className="text-gray-500 text-sm">samikshya@gmail.com</div>
            <img
              src="/bike.jpg"
              alt="userImage"
              className="w-[300px] h-[300px] rounded-full mt-3"
            />
            <Button className="mt-3">
              {" "}
              <Images size={20}></Images> Change Avatar
            </Button>
          </div>
          <div className="grid grid-cols-2 gap-x-4 gap-y-5 h-fit w-[70%] border border-gray-500 p-10 rounded-md">
            <div className="col-span-2 flex justify-end">
              <Button>
                {" "}
                <PencilRuler size={20}></PencilRuler> Edit
              </Button>
            </div>
            <div className="flex flex-col gap-1">
              <Label htmlFor="username">Username</Label>
              <Input type="text" id="username" placeholder="username" />
            </div>
            <div className="flex flex-col gap-1">
              <Label htmlFor="email">Email</Label>
              <Input type="email" id="email" placeholder="Email" />
            </div>

            <div className="flex flex-col gap-1">
              <Label htmlFor="address">Address</Label>
              <Input type="text" id="address" placeholder="Address" />
            </div>
            <div className="flex flex-col gap-1">
              <Label htmlFor="phone">Phone</Label>
              <Input type="number" id="phone" placeholder="Phone" />
            </div>
            <div className="flex flex-col gap-1">
              <Label htmlFor="gender">Gender</Label>
              <Input type="text" id="gender" placeholder="Gender" />
            </div>
            <div className="flex flex-col gap-1">
              <Label htmlFor="zipcode">Zipcode</Label>
              <Input type="text" id="zipcode" placeholder="Zipcode" />
            </div>
            <div className="flex flex-col col-span-2 gap-1">
              <Label htmlFor="country">Country</Label>
              <CountryDropdown
                placeholder="Select country"
                defaultValue="NPL"
                onChange={(value) => {
                  console.log(value);
                }}
              />
            </div>
            <div className="col-span-2 flex justify-end">
              <Button>
                {" "}
                <HardDriveDownload size={20}></HardDriveDownload> Save Changes
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
