"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { BACKEND_URL } from "@/lib/env";
import { zodResolver } from "@hookform/resolvers/zod";
import { Icon } from "@iconify/react/dist/iconify.js";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { FC } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

const createSchema = z.object({
  description: z.string().min(1, "Description cannot be empty"),
  type: z.string().min(1, "Please choose a type"),
  numberOfvehicle: z.coerce.string().min(1, "No. of vehicles cannot be empty"),
  street: z.string().min(2, "Street cannot be empty"),
  zipcode: z.string().min(1, "Zipcode cannot be empty"),
  price: z.string().min(1, "Price cannot be empty"),
  city: z.string().min(1, "City cannot be empty"),
  country: z.string().min(1, "Country cannot be empty"),
  photo: z.object({}),
  // .nonempty({ message: "You must upload at least one file" }),
});

const Page: FC<{
  params: Promise<{ userId: string }>;
}> = ({ params }) => {
  const router = useRouter();
  const rparams = React.use(params);
  const form = useForm({
    defaultValues: {
      description: "",
      type: "",
      noOfVehicle: "",
      street: "",
      zipcode: "",
      price: "",
      city: "",
      country: "",
      photo: "",
    },
    resolver: zodResolver(createSchema),
  });

  const onsubmit = () => {
    submitDataMutation.mutate();
  };
  const submitDataMutation = useMutation({
    mutationFn: async () => {
      const value = form.getValues();

      // Create a form data because image cannot be send in json
      const formData = new FormData();

      // Append the field to the form data
      formData.append("description", value.description);
      formData.append("type", value.type);
      formData.append("city", value.city);
      formData.append("price", value.price);
      formData.append("noOfVehicle", value.noOfVehicle);
      formData.append("street", value.street);
      formData.append("country", value.country);
      formData.append("zipcode", value.zipcode);
      formData.append("photo", value.photo[0]);
      formData.append("ownerId", rparams.userId);

      const response = await axios.post(`${BACKEND_URL}/listing`, formData);

      return response.data;
    },
    onSuccess: (data: { message: string }) => {
      toast.success(data.message);
      router.push(`dashboard`);
    },
    onError: (data: { error: string }) => {
      toast.error(data.error);
    },
  });
  return (
    <div className="flex justify-center items-center  h-[92vh] bg-gray-800 ">
      <Card className="md:w-[40%] sm:w-[70%] w-[100%] flex flex-col ">
        <form onSubmit={form.handleSubmit(onsubmit)}>
          <CardHeader className="flex justify-center items-center">
            <CardTitle className="text-xl">Create Listing</CardTitle>
            <CardDescription></CardDescription>
          </CardHeader>
          <CardContent>
            {/* <form> */}
            <div className="md:gap-5 grid md:grid-cols-2  sm:grid-cols-1 sm:gap-5 gap-5 ">
              <div className="sm:flex sm:flex-col gap-1 relative md:col-span-2 sm:col-span-1">
                <Label
                  htmlFor="description"
                  className="absolute -top-2 left-3 bg-white px-2 text-gray-600"
                >
                  Description
                </Label>
                <Textarea
                  id="description"
                  className="border  rounded-md p-2"
                  rows={4}
                  {...form.register("description")}
                />
              </div>
              <div className="flex flex-col gap-1 relative">
                <Label
                  htmlFor="type"
                  className="absolute -top-2 left-3 bg-white px-2 text-gray-600"
                >
                  Type
                </Label>
                <Select onValueChange={(value) => form.setValue("type", value)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Select the type</SelectLabel>
                      <SelectItem value="bus">Bus</SelectItem>
                      <SelectItem value="2-wheeler">2-wheeler</SelectItem>
                      <SelectItem value="car">Car</SelectItem>
                      <SelectItem value="truck">Truck</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex flex-col gap-1 relative">
                <Label
                  htmlFor="price"
                  className="absolute -top-2 left-3 bg-white px-2 text-gray-600"
                >
                  Price
                </Label>
                <Input type="number" {...form.register("price")} />
              </div>
              <div className="flex flex-col gap-1 relative">
                <Label
                  htmlFor="vehicles"
                  className="absolute -top-2 left-3 bg-white px-2 text-gray-600"
                >
                  Number of Vehicles
                </Label>
                <Input type="number" {...form.register("noOfVehicle")} />
              </div>
              <div className="flex flex-col gap-1 relative">
                <Label
                  htmlFor="city"
                  className="absolute -top-2 left-3 bg-white px-2 text-gray-600"
                >
                  City
                </Label>
                <Input {...form.register("city")} />
              </div>
              <div className="flex flex-col gap-1 relative">
                <Label
                  htmlFor="street"
                  className="absolute -top-2 left-3 bg-white px-2 text-gray-600"
                >
                  Street
                </Label>
                <Input {...form.register("street")} />
              </div>
              <div className="flex flex-col gap-1 relative">
                <Label
                  htmlFor="country"
                  className="absolute -top-2 left-3 bg-white px-2 text-gray-600"
                >
                  Country
                </Label>
                <Input {...form.register("country")} />
              </div>
              <div className="flex flex-col gap-1 relative">
                <Label
                  htmlFor="zipcode"
                  className="absolute -top-2 left-3 bg-white px-2 text-gray-600"
                >
                  Zip Code
                </Label>
                <Input {...form.register("zipcode")} />
              </div>
              <div className="flex flex-col gap-1 relative">
                <Label
                  htmlFor="image"
                  className="absolute -top-2 left-3 bg-white px-2 text-gray-600"
                >
                  Upload Image
                </Label>
                <Input {...form.register("photo")} type="file" />
              </div>
            </div>
            {/* </form> */}
          </CardContent>
          <CardFooter className="flex justify-between">
            <Link href={`/p/${rparams.userId}/dashboard`}>
              <Button variant="outline">Cancel</Button>
            </Link>
            <Button disabled={submitDataMutation.isPending}>
              {submitDataMutation.isPending && (
                <Icon icon="svg-spinners:270-ring" width="24" height="24" />
              )}
              Create
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
};
export default Page;
