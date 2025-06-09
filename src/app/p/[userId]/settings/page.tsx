"use client";
import { CountryDropdown } from "@/components/country";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { axiosInstance } from "@/providers/AxiosInstance";
import { zodResolver } from "@hookform/resolvers/zod";
import { Icon } from "@iconify/react/dist/iconify.js";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Ban, HardDriveDownload, Images, PencilRuler } from "lucide-react";
import React, { FC, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const schema = z.object({
  name: z.string().min(1, "Name is required").max(50, "Name is too long"),
  email: z.string().email(),
  address: z
    .string()
    .min(1, "Address is required")
    .max(50, "Address is too long"),
  phone: z
    .string()
    .min(1, "Phone number is required")
    .max(50, "Phone number is too long"),
  gender: z.string().min(1, "Gender is required").max(10, "Gender is too long"),
  zipcode: z
    .string()
    .min(1, "Zipcode is required")
    .max(20, "Zipcode is too long"),
  country: z
    .string()
    .min(1, "Country is required")
    .max(30, "Country name is too long"),
});
const page: FC<{ params: Promise<{ userId: string }> }> = ({ params }) => {
  const form = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      name: "",
      email: "",
      address: "",
      phone: "",
      gender: "",
      zipcode: "",
      country: "",
    },
  });
  const rparams = React.use(params);
  const userQuery = useQuery({
    queryKey: ["singleUser"],
    queryFn: async () => {
      const response = await axiosInstance.get(
        "/users/getSingleUser/" + rparams.userId
      );
      return response.data;
    },
  });

  const updateMutation = useMutation({
    mutationFn: async () => {
      const value = form.getValues();
      const response = await axiosInstance.patch(
        `/settings/update/${rparams.userId}`,
        value
      );
      return response.data;
    },
  });

  useEffect(() => {
    if (!userQuery.isSuccess) {
      return;
    }
    form.setValue("name", userQuery.data.data.name);
    form.setValue("email", userQuery.data.data.email);
    form.setValue("address", userQuery.data.data.address);
    form.setValue("phone", userQuery.data.data.phone);
    form.setValue("country", userQuery.data.data.country);
    form.setValue("gender", userQuery.data.data.gender);
    form.setValue("zipcode", userQuery.data.data.zipcode);
  }, [userQuery.data]);
  const [isDisabled, setDisable] = useState(true);
  if (userQuery.isLoading) {
    return (
      <div className="bg-gray-800 flex justify-center items-center h-screen">
        <Icon
          icon="svg-spinners:blocks-shuffle-3"
          width="200"
          height="200"
          className="text-white"
        />
      </div>
    );
  }
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
            <Button className="mt-3" disabled={isDisabled}>
              <Images size={20} />
              Change Avatar
            </Button>
          </div>
          <form
            className="grid grid-cols-2 gap-x-4 gap-y-5 h-fit w-[70%] border border-gray-500 p-10 rounded-md"
            onSubmit={form.handleSubmit(() => {
              updateMutation.mutate();
            })}
          >
            <div className="col-span-2 flex justify-end">
              <Button type="button" onClick={() => setDisable(!isDisabled)}>
                {isDisabled ? (
                  <>
                    <PencilRuler size={20} />
                    Edit
                  </>
                ) : (
                  <>
                    <Ban size={20} />
                    Cancel
                  </>
                )}
              </Button>
            </div>
            <div className="flex flex-col gap-1">
              <Label htmlFor="username">Name</Label>
              <Input
                type="text"
                id="username"
                placeholder="username"
                {...form.register("name")}
                disabled={isDisabled}
              />
            </div>
            <div className="flex flex-col gap-1">
              <Label htmlFor="email">Email</Label>
              <Input
                type="email"
                id="email"
                placeholder="Email"
                {...form.register("email")}
                disabled
              />
            </div>

            <div className="flex flex-col gap-1">
              <Label htmlFor="address">Address</Label>
              <Input
                type="text"
                id="address"
                placeholder="Address"
                {...form.register("address")}
                disabled={isDisabled}
              />
            </div>
            <div className="flex flex-col gap-1">
              <Label htmlFor="phone">Phone</Label>
              <Input
                type="number"
                id="phone"
                placeholder="Phone"
                {...form.register("phone")}
                disabled={isDisabled}
              />
            </div>
            <div className="flex flex-col gap-1">
              <Label htmlFor="gender">Gender</Label>
              <Input
                type="text"
                id="gender"
                placeholder="Gender"
                {...form.register("gender")}
                disabled={isDisabled}
              />
            </div>
            <div className="flex flex-col gap-1">
              <Label htmlFor="zipcode">Zipcode</Label>
              <Input
                type="text"
                id="zipcode"
                placeholder="Zipcode"
                {...form.register("zipcode")}
                disabled={isDisabled}
              />
            </div>
            <div className="flex flex-col col-span-2 gap-1">
              <Label htmlFor="country">Country</Label>
              <CountryDropdown
                placeholder="Select country"
                defaultValue="NPL"
                disabled={isDisabled}
                onChange={(value) => {
                  console.log(value);
                  form.setValue("country", value.name);
                }}
                value={form.watch("country")}
              />
            </div>
            <div className="col-span-2 flex justify-end">
              <Button disabled={isDisabled}>
                <HardDriveDownload size={20}></HardDriveDownload> Save Changes
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default page;
