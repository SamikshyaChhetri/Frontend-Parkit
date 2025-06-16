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
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { BACKEND_URL } from "@/lib/env";
import { zodResolver } from "@hookform/resolvers/zod";
import { Icon } from "@iconify/react";
import { motion } from "framer-motion";
import {
  Earth,
  Lock,
  Mail,
  MapPin,
  MapPinHouse,
  PersonStanding,
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
  username: z.string().min(3).max(30),
  email: z.string().email(),
  password: z.string().min(6).max(20),
  phone: z.string().min(10).max(15),
  address: z.string().min(1),
  country: z.string().min(1),
  zipcode: z.string().min(1),
  gender: z.string().min(1),
});

const Page = () => {
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

  const onsubmit = () => {
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

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.05 },
    }),
  };

  return (
    <div className="bg-slate-800 min-h-screen flex items-center justify-center p-4">
      <Card className="w-full max-w-4xl bg-slate-900 text-white shadow-lg rounded-2xl">
        <form onSubmit={form.handleSubmit(onsubmit)}>
          <CardHeader>
            <CardTitle className="text-center text-2xl text-purple-400 font-bold">
              Sign up here
            </CardTitle>
            <CardDescription className="text-center text-slate-400">
              Sign up to create your account and unlock exclusive features!
            </CardDescription>
          </CardHeader>
          <CardContent className="px-6 pb-6">
            <div className="grid grid-cols-2 gap-5">
              {[
                {
                  id: "username",
                  icon: <User2 size={20} />,
                  placeholder: "Enter your username",
                },
                {
                  id: "email",
                  icon: <Mail size={20} />,
                  placeholder: "Enter your email",
                },
                {
                  id: "password",
                  icon: <Lock size={20} />,
                  placeholder: "Enter your password",
                  type: isOpen ? "text" : "password",
                  isPassword: true,
                },
                {
                  id: "address",
                  icon: <MapPin size={20} />,
                  placeholder: "Enter your address",
                },
                {
                  id: "phone",
                  icon: <Phone size={20} />,
                  placeholder: "Enter your phone number",
                },
                {
                  id: "zipcode",
                  icon: <MapPinHouse size={20} />,
                  placeholder: "Enter your zipcode",
                },
              ].map((field, i) => (
                <motion.div
                  key={field.id}
                  variants={fadeIn}
                  initial="hidden"
                  animate="visible"
                  custom={i}
                  className="flex flex-col gap-1 relative"
                >
                  <Label
                    htmlFor={field.id}
                    className="flex gap-1 items-center text-white"
                  >
                    {field.id.charAt(0).toUpperCase() + field.id.slice(1)}
                    {field.icon}
                  </Label>
                  <Input
                    type={field.type || "text"}
                    placeholder={field.placeholder}
                    {...form.register(field.id as any)}
                    className="bg-slate-800 border border-slate-700 text-white"
                  />
                  {field.isPassword && (
                    <Icon
                      icon={
                        isOpen
                          ? "heroicons-solid:eye"
                          : "heroicons-solid:eye-off"
                      }
                      className="absolute top-[34px] right-2 cursor-pointer text-slate-300"
                      width="20"
                      height="20"
                      onClick={() => setOpen(!isOpen)}
                    />
                  )}
                  <label className="text-red-500 text-sm">
                    {form.formState.errors?.[field.id]?.message as string}
                  </label>
                </motion.div>
              ))}

              <motion.div
                variants={fadeIn}
                initial="hidden"
                animate="visible"
                custom={6}
                className="flex flex-col gap-2"
              >
                <Label className="flex gap-1 items-center text-white">
                  Gender <PersonStanding size={20} />
                </Label>
                <RadioGroup className="flex gap-4" {...form.register("gender")}>
                  {["male", "female", "other"].map((g) => (
                    <div className="flex items-center gap-2" key={g}>
                      <RadioGroupItem value={g} id={g} />
                      <Label htmlFor={g} className="capitalize text-white">
                        {g}
                      </Label>
                    </div>
                  ))}
                </RadioGroup>
                <label className="text-red-500 text-sm">
                  {form.formState.errors.gender?.message}
                </label>
              </motion.div>

              <motion.div
                variants={fadeIn}
                initial="hidden"
                animate="visible"
                custom={7}
                className="flex flex-col gap-2"
              >
                <Label className="flex gap-1 items-center text-white">
                  Country <Earth size={20} />
                </Label>
                <CountryDropdown
                  placeholder="Select country"
                  defaultValue="NPL"
                  onChange={(value) =>
                    form.setValue("country", value.name || "")
                  }
                />
                <label className="text-red-500 text-sm">
                  {form.formState.errors.country?.message}
                </label>
              </motion.div>

              <motion.div
                variants={fadeIn}
                initial="hidden"
                animate="visible"
                custom={8}
                className="col-span-2"
              >
                <Button
                  type="submit"
                  disabled={submitDataMutation.isPending}
                  className="w-full bg-purple-600 hover:bg-purple-700 text-white"
                >
                  {submitDataMutation.isPending && (
                    <Icon
                      icon="svg-spinners:180-ring"
                      width="20"
                      height="20"
                      className="mr-2"
                    />
                  )}
                  Register
                </Button>
              </motion.div>
            </div>
          </CardContent>
        </form>
        <div className="flex justify-center items-center pb-4 text-white">
          Already have an account?
          <Link href={"/login"}>
            <Button variant="link" className="text-purple-400">
              Login
            </Button>
          </Link>
        </div>
      </Card>
    </div>
  );
};

export default Page;
