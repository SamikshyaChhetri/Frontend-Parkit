"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { toast } from "sonner";

import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { zodResolver } from "@hookform/resolvers/zod";
import { Icon } from "@iconify/react/dist/iconify.js";
import { useMutation } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import Link from "next/link";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
const createSchema = z.object({
  email: z.string().email("Please enter valid email ID"),
  password: z
    .string()
    .min(6, "Password must be at least 6 characters long")
    .max(20, "Password must not exceed 20 characters"),
});
const Page = () => {
  const [isOpen, setOpen] = useState(false);

  const form = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: zodResolver(createSchema),
  });
  const onsubmit = (data: { email: string; password: string }) => {
    console.log(data);
    submitDataMutation.mutate();
  };
  const submitDataMutation = useMutation({
    mutationFn: async () => {
      const value = form.getValues();
      const response = await axios.post(
        "http://localhost:3333/auth/login",
        value
      );
      console.log(response.data);

      return response.data;
    },

    onSuccess: (data: { message: string }) => {
      toast.success(data.message);
    },
    onError: (err: AxiosError<{ message: string }>) => {
      // console.log(err);
      toast.error(err.response?.data.message);
    },
  });
  return (
    <div className="bg-gradient-to-r from-purple-700 via-purple-400 to-purple-200 ">
      <div className="flex justify-center h-screen items-center">
        <Card className="w-[450px] flex flex-col bg-gradient-to-r from-purple-200 to-white">
          <form onSubmit={form.handleSubmit(onsubmit)}>
            <CardHeader>
              <CardTitle className="flex justify-center text-2xl font-bold text-purple-600">
                Login Form
              </CardTitle>
              <CardDescription className="flex justify-center">
                Login to explore all the features and services we offer.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col gap-6">
                <div className="flex flex-col gap-2">
                  <Label htmlFor="email" className="flex gap-1 items-center">
                    Email
                    <Icon icon="iconamoon:email" width="20" height="20" />
                  </Label>
                  <Input
                    placeholder="Enter your email"
                    {...form.register("email")}
                  />
                  <label className="text-red-500 text-sm">
                    {form.formState.errors.email?.message}
                  </label>
                </div>
                <div className="flex flex-col gap-2 relative">
                  <Label htmlFor="password" className="flex gap-1 items-center">
                    Password
                    <Icon icon="bx:lock" width="20" height="20" />
                  </Label>
                  <Input
                    placeholder="Enter your password"
                    type={isOpen ? "text" : "password"}
                    {...form.register("password")}
                  />
                  <label className="text-red-500 text-sm">
                    {form.formState.errors.password?.message}
                  </label>
                  <Icon
                    icon={
                      isOpen ? "heroicons-solid:eye" : "heroicons-solid:eye-off"
                    }
                    className="absolute top-[34px] right-2 cursor-pointer"
                    width="20"
                    height="20"
                    onClick={() => {
                      setOpen(isOpen ? false : true);
                    }}
                  />
                </div>
                <div className="flex justify-between">
                  <div className="flex gap-1 items-center">
                    <Checkbox id="remember" />
                    <Label htmlFor="remember">Remember me</Label>
                  </div>
                  <div className="text-sm">Forgot password?</div>
                </div>
                <Button>Submit</Button>
              </div>
            </CardContent>
          </form>
          <div className="flex justify-center items-center pb-6">
            Don't have an account?
            <Link href={"/signUp"}>
              <Button variant={"link"}>Register</Button>
            </Link>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Page;
