"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useMutation } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";

import { CountryDropdown } from "@/components/country";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { BACKEND_URL } from "@/lib/env";
import { zodResolver } from "@hookform/resolvers/zod";
import { Icon } from "@iconify/react/dist/iconify.js";
import {
  Earth,
  Lock,
  Mail,
  MapPin,
  MapPinHouse,
  Phone,
  User2,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

const createSchema = z.object({
  username: z
    .string()
    .min(3, "Username must be at least 3 characters long")
    .max(30, "Username must not exceed 30 characters"),
  email: z.string().email("Please enter valid email ID"),
  password: z
    .string()
    .min(6, "Password must be at least 6 characters long")
    .max(20, "Password must not exceed 20 characters"),
  phone: z
    .string()
    .min(10, "Phone number must be atleast of 10 characters")
    .max(15, "Phone number cannot exceed 15 characters"),
  address: z.string().min(1, "Address cannot be empty"),
  country: z.string().min(1, "Country is required"),
  zipcode: z.string().min(1, "Zipcode is required"),
  gender: z.string().min(1, "Gender is required"),
});
const Page = () => {
  const [selectedCountry, setSelectedCountry] = useState("");
  const router = useRouter();
  const [isOpen, setOpen] = useState(false);
  const form = useForm({
    defaultValues: {
      username: "",
      email: "",
      password: "",
      phone: "",
      address: "",
      country: "",
      zipcode: "",
      gender: "",
    },
    resolver: zodResolver(createSchema),
  });

  const onsubmit = (data: {
    username: string;
    email: string;
    password: string;
    phone: string;
    address: string;
  }) => {
    submitDataMutation.mutate();
  };
  const submitDataMutation = useMutation({
    mutationFn: async () => {
      const value = form.getValues();
      const response = await axios.post(`${BACKEND_URL}/auth/register`, value);

      return response.data;
    },
    onSuccess: (data) => {
      toast.success(data.message);
      form.reset();
      router.push("/login");
    },
    onError: (err: AxiosError<{ message: string }>) => {
      toast.error(err.response?.data.message);
    },
  });
  return (
    <div className="bg-gradient-to-r from-purple-700 via-purple-400 to-purple-200 ">
      <div className="flex justify-center h-screen items-center">
        <Card className="w-1/2 flex flex-col bg-gradient-to-r  from-purple-200 to-white">
          <form onSubmit={form.handleSubmit(onsubmit)}>
            <CardHeader>
              <CardTitle className="flex justify-center text-xl font-bold text-purple-600">
                Sign up here
              </CardTitle>
              <CardDescription className="flex justify-center">
                Sign up to create your account and unlock exclusive features!
              </CardDescription>
            </CardHeader>
            <CardContent className="p-1 px-6">
              <div className="grid grid-cols-2 gap-5">
                <div className="flex flex-col gap-1">
                  <Label htmlFor="username" className="flex gap-1 items-center">
                    Username
                    <User2 size={20}></User2>
                  </Label>
                  <Input
                    placeholder="Enter your username"
                    {...form.register("username")}
                  />
                  <label className="text-red-500 text-sm">
                    {form.formState.errors.username?.message}
                  </label>
                </div>
                <div className="flex flex-col gap-1">
                  <Label htmlFor="email" className="flex gap-1 items-center">
                    Email
                    <Mail size={20}></Mail>
                  </Label>
                  <Input
                    placeholder="Enter your email"
                    {...form.register("email")}
                  />
                  <label className="text-red-500 text-sm">
                    {form.formState.errors.email?.message}
                  </label>
                </div>
                <div className="flex flex-col gap-1 relative">
                  <Label htmlFor="password" className="flex gap-1 items-center">
                    Password
                    <Lock size={20}></Lock>
                  </Label>
                  <Input
                    placeholder="Enter your password"
                    {...form.register("password")}
                    type={isOpen ? "text" : "password"}
                  />
                  <Icon
                    icon={
                      isOpen ? "heroicons-solid:eye" : "heroicons-solid:eye-off"
                    }
                    className="absolute top-[32px] right-2 cursor-pointer"
                    width="20"
                    height="20"
                    onClick={() => {
                      setOpen(isOpen ? false : true);
                    }}
                  />
                  <label className="text-red-500 text-sm">
                    {form.formState.errors.password?.message}
                  </label>
                </div>
                <div className="flex flex-col gap-1">
                  <Label htmlFor="address" className="flex gap-1 items-center">
                    Address
                    <MapPin size={20}></MapPin>
                  </Label>
                  <Input
                    placeholder="Enter your address"
                    {...form.register("address")}
                  />
                  <label className="text-red-500 text-sm">
                    {form.formState.errors.address?.message}
                  </label>
                </div>
                <div className="flex flex-col gap-1 relative">
                  <Label htmlFor="phone" className="flex gap-1 items-center">
                    Phone
                    <Phone size={20}></Phone>
                  </Label>
                  <Input
                    placeholder="Enter your phone number"
                    {...form.register("phone")}
                  />
                  <label className="text-red-500 text-sm">
                    {form.formState.errors.phone?.message}
                  </label>
                </div>
                <div className="flex flex-col gap-1">
                  <Label htmlFor="country" className="flex gap-1 items-center">
                    Username
                    <Icon icon="lucide:user-round" width="20" height="20" />
                  </Label>
                  <Input
                    placeholder="Enter your username"
                    {...form.register("country")}
                  />
                  <label className="text-red-500 text-sm">
                    {form.formState.errors.username?.message}
                  </label>
                </div>
                <div className="flex flex-col gap-1">
                  <Label htmlFor="zipcode" className="flex gap-1 items-center">
                    Zipcode
                    <MapPinHouse size={20}></MapPinHouse>
                  </Label>
                  <Input
                    placeholder="Enter zipcode"
                    {...form.register("zipcode")}
                  />
                  <label className="text-red-500 text-sm">
                    {form.formState.errors.username?.message}
                  </label>
                </div>
                <div className="flex flex-col gap-1">
                  <Label htmlFor="country" className="flex gap-1 items-center">
                    Country
                    <Earth size={20}></Earth>
                  </Label>
                  <CountryDropdown
                    placeholder="Select country"
                    defaultValue=""
                    value={selectedCountry}
                    onChange={(value) => {
                      form.setValue("country", value.name);
                      setSelectedCountry(value);
                    }}
                  />
                  <label className="text-red-500 text-sm">
                    {form.formState.errors.username?.message}
                  </label>
                </div>
                <Button
                  disabled={submitDataMutation.isPending}
                  className="w-full col-span-2"
                >
                  {submitDataMutation.isPending && (
                    <Icon icon="svg-spinners:180-ring" width="24" height="24" />
                  )}
                  Register
                </Button>
              </div>
            </CardContent>
          </form>
          <div className="flex justify-center items-center pb-1">
            Already have an account?
            <Link href={"/login"}>
              <Button variant={"link"}>Login</Button>
            </Link>
          </div>
        </Card>
      </div>
    </div>
  );
};
export default Page;
