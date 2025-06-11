"use client";
import { CountryDropdown } from "@/components/country";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { BACKEND_URL } from "@/lib/env";
import { zodResolver } from "@hookform/resolvers/zod";
import { Icon } from "@iconify/react/dist/iconify.js";
import { useMutation } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
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

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.5 },
  }),
};

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

  const onsubmit = (data: any) => {
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
    <div className="bg-zinc-900 min-h-screen flex justify-center items-center text-white">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-3xl"
      >
        <Card className="bg-zinc-800 border border-zinc-700 shadow-2xl">
          <form onSubmit={form.handleSubmit(onsubmit)}>
            <CardHeader>
              <CardTitle className="text-center text-purple-400 text-2xl font-bold">
                Sign up here
              </CardTitle>
              <CardDescription className="text-center text-zinc-400">
                Sign up to create your account and unlock exclusive features!
              </CardDescription>
            </CardHeader>
            <CardContent className="p-1 px-6">
              <div className="grid grid-cols-2 gap-5">
                {/* Username */}
                <motion.div
                  variants={fadeInUp}
                  initial="hidden"
                  animate="visible"
                  custom={1}
                  className="flex flex-col gap-1"
                >
                  <Label
                    htmlFor="username"
                    className="flex gap-1 items-center text-zinc-300"
                  >
                    Username <User2 size={20} />
                  </Label>
                  <Input
                    className="bg-zinc-700 border-zinc-600 text-white placeholder:text-zinc-400"
                    placeholder="Enter your username"
                    {...form.register("username")}
                  />
                  <label className="text-red-500 text-sm">
                    {form.formState.errors.username?.message}
                  </label>
                </motion.div>

                {/* Email */}
                <motion.div
                  variants={fadeInUp}
                  initial="hidden"
                  animate="visible"
                  custom={2}
                  className="flex flex-col gap-1"
                >
                  <Label
                    htmlFor="email"
                    className="flex gap-1 items-center text-zinc-300"
                  >
                    Email <Mail size={20} />
                  </Label>
                  <Input
                    className="bg-zinc-700 border-zinc-600 text-white placeholder:text-zinc-400"
                    placeholder="Enter your email"
                    {...form.register("email")}
                  />
                  <label className="text-red-500 text-sm">
                    {form.formState.errors.email?.message}
                  </label>
                </motion.div>

                {/* Password */}
                <motion.div
                  variants={fadeInUp}
                  initial="hidden"
                  animate="visible"
                  custom={3}
                  className="flex flex-col gap-1 relative"
                >
                  <Label
                    htmlFor="password"
                    className="flex gap-1 items-center text-zinc-300"
                  >
                    Password <Lock size={20} />
                  </Label>
                  <Input
                    className="bg-zinc-700 border-zinc-600 text-white placeholder:text-zinc-400"
                    placeholder="Enter your password"
                    type={isOpen ? "text" : "password"}
                    {...form.register("password")}
                  />
                  <Icon
                    icon={
                      isOpen ? "heroicons-solid:eye" : "heroicons-solid:eye-off"
                    }
                    className="absolute top-[32px] right-2 cursor-pointer text-zinc-400"
                    width="20"
                    height="20"
                    onClick={() => setOpen(!isOpen)}
                  />
                  <label className="text-red-500 text-sm">
                    {form.formState.errors.password?.message}
                  </label>
                </motion.div>

                {/* Address */}
                <motion.div
                  variants={fadeInUp}
                  initial="hidden"
                  animate="visible"
                  custom={4}
                  className="flex flex-col gap-1"
                >
                  <Label
                    htmlFor="address"
                    className="flex gap-1 items-center text-zinc-300"
                  >
                    Address <MapPin size={20} />
                  </Label>
                  <Input
                    className="bg-zinc-700 border-zinc-600 text-white placeholder:text-zinc-400"
                    placeholder="Enter your address"
                    {...form.register("address")}
                  />
                  <label className="text-red-500 text-sm">
                    {form.formState.errors.address?.message}
                  </label>
                </motion.div>

                {/* Phone */}
                <motion.div
                  variants={fadeInUp}
                  initial="hidden"
                  animate="visible"
                  custom={5}
                  className="flex flex-col gap-1"
                >
                  <Label
                    htmlFor="phone"
                    className="flex gap-1 items-center text-zinc-300"
                  >
                    Phone <Phone size={20} />
                  </Label>
                  <Input
                    className="bg-zinc-700 border-zinc-600 text-white placeholder:text-zinc-400"
                    placeholder="Enter your phone number"
                    {...form.register("phone")}
                  />
                  <label className="text-red-500 text-sm">
                    {form.formState.errors.phone?.message}
                  </label>
                </motion.div>

                {/* Gender */}
                <motion.div
                  variants={fadeInUp}
                  initial="hidden"
                  animate="visible"
                  custom={6}
                  className="flex flex-col gap-3"
                >
                  <Label
                    htmlFor="gender"
                    className="flex gap-1 items-center text-zinc-300"
                  >
                    Gender <PersonStanding size={20} />
                  </Label>
                  <RadioGroup className="flex flex-row justify-between text-white">
                    {["male", "female", "other"].map((g) => (
                      <div key={g} className="flex items-center gap-3">
                        <RadioGroupItem
                          value={g}
                          id={g}
                          onClick={() => {
                            form.setValue("gender", g);
                          }}
                        />
                        <Label htmlFor={g}>
                          {g.charAt(0).toUpperCase() + g.slice(1)}
                        </Label>
                      </div>
                    ))}
                  </RadioGroup>
                  <label className="text-red-500 text-sm">
                    {form.formState.errors.gender?.message}
                  </label>
                </motion.div>

                {/* Zipcode */}
                <motion.div
                  variants={fadeInUp}
                  initial="hidden"
                  animate="visible"
                  custom={7}
                  className="flex flex-col gap-1"
                >
                  <Label
                    htmlFor="zipcode"
                    className="flex gap-1 items-center text-zinc-300"
                  >
                    Zipcode <MapPinHouse size={20} />
                  </Label>
                  <Input
                    className="bg-zinc-700 border-zinc-600 text-white placeholder:text-zinc-400"
                    placeholder="Enter zipcode"
                    {...form.register("zipcode")}
                  />
                  <label className="text-red-500 text-sm">
                    {form.formState.errors.zipcode?.message}
                  </label>
                </motion.div>

                {/* Country */}
                <motion.div
                  variants={fadeInUp}
                  initial="hidden"
                  animate="visible"
                  custom={8}
                  className="flex flex-col gap-1"
                >
                  <Label
                    htmlFor="country"
                    className="flex gap-1 items-center text-zinc-300"
                  >
                    Country <Earth size={20} />
                  </Label>
                  <CountryDropdown
                    placeholder="Select country"
                    defaultValue="NPL"
                    onChange={(value) => form.setValue("country", value.name)}
                  />
                  <label className="text-red-500 text-sm">
                    {form.formState.errors.country?.message}
                  </label>
                </motion.div>

                {/* Submit */}
                <motion.div
                  variants={fadeInUp}
                  initial="hidden"
                  animate="visible"
                  custom={9}
                  className="col-span-2"
                >
                  <Button
                    disabled={submitDataMutation.isPending}
                    className="w-full bg-purple-600 hover:bg-purple-700"
                  >
                    {submitDataMutation.isPending && (
                      <Icon
                        icon="svg-spinners:180-ring"
                        width="24"
                        height="24"
                      />
                    )}
                    Register
                  </Button>
                </motion.div>
              </div>
            </CardContent>
          </form>
          <div className="flex justify-center items-center pb-4 text-zinc-400">
            Already have an account?
            <Link href={"/login"}>
              <Button variant="link" className="text-purple-400">
                Login
              </Button>
            </Link>
          </div>
        </Card>
      </motion.div>
    </div>
  );
};

export default Page;
