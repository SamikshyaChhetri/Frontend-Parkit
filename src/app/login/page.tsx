"use client";

import { ModeToggle } from "@/components/theme/ModeToggle";
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
import { BACKEND_URL } from "@/lib/env";
import { zodResolver } from "@hookform/resolvers/zod";
import { Icon } from "@iconify/react";
import { useMutation } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import { motion } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

const createSchema = z.object({
  email: z.string().email("Please enter valid email ID"),
  password: z
    .string()
    .min(6, "Password must be at least 6 characters long")
    .max(20, "Password must not exceed 20 characters"),
});

const Page = () => {
  const router = useRouter();
  const [isOpen, setOpen] = useState(false);
  const form = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: zodResolver(createSchema),
  });

  const onsubmit = () => {
    submitDataMutation.mutate();
  };

  const submitDataMutation = useMutation({
    mutationFn: async () => {
      const value = form.getValues();
      const response = await axios.post(`${BACKEND_URL}/auth/login`, value, {
        withCredentials: true,
      });
      return response.data;
    },
    onSuccess: (data) => {
      toast.success(data.message);
      router.push(`/p/${data.data.user.id}/dashboard`);
    },
    onError: (err: AxiosError<{ message: string }>) => {
      toast.error(err.response?.data.message || "Login failed");
    },
  });

  return (
    <div className="bg-white dark:bg-slate-800 min-h-screen flex items-center justify-center">
      <div className="flex justify-center items-center absolute top-5 right-5">
        <ModeToggle />
      </div>
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <Card className="md:w-[450px] sm:h-full bg-white dark:bg-slate-900 text-black dark:text-white shadow-2xl rounded-2xl border border-slate-200 dark:border-slate-700">
          <form onSubmit={form.handleSubmit(onsubmit)}>
            <CardHeader>
              <CardTitle className="flex justify-center text-2xl font-bold text-purple-600 dark:text-purple-400">
                Login Form
              </CardTitle>
              <CardDescription className="flex justify-center text-slate-600 dark:text-slate-400">
                Login to explore all the features and services we offer.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col gap-6">
                <motion.div
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 }}
                  className="flex flex-col gap-2"
                >
                  <Label htmlFor="email" className="flex gap-1 items-center">
                    Email
                    <Icon icon="iconamoon:email" width="20" height="20" />
                  </Label>
                  <Input
                    className="bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-600 text-black dark:text-white"
                    placeholder="Enter your email"
                    {...form.register("email")}
                  />
                  <p className="text-red-500 text-sm">
                    {form.formState.errors.email?.message}
                  </p>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 }}
                  className="flex flex-col gap-2 relative"
                >
                  <Label htmlFor="password" className="flex gap-1 items-center">
                    Password
                    <Icon icon="bx:lock" width="20" height="20" />
                  </Label>
                  <Input
                    type={isOpen ? "text" : "password"}
                    placeholder="Enter your password"
                    className="bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-600 text-black dark:text-white"
                    {...form.register("password")}
                  />
                  <p className="text-red-500 text-sm">
                    {form.formState.errors.password?.message}
                  </p>
                  <Icon
                    icon={
                      isOpen ? "heroicons-solid:eye" : "heroicons-solid:eye-off"
                    }
                    className="absolute top-[34px] right-2 text-slate-500 dark:text-slate-400 hover:text-black dark:hover:text-white cursor-pointer"
                    width="20"
                    height="20"
                    onClick={() => setOpen(!isOpen)}
                  />
                </motion.div>

                <div className="flex justify-between items-center">
                  <div className="flex gap-2 items-center">
                    <Checkbox id="remember" />
                    <Label
                      htmlFor="remember"
                      className="text-slate-600 dark:text-slate-300"
                    >
                      Remember me
                    </Label>
                  </div>
                  <Link
                    href="/resetPassword"
                    className="text-sm text-purple-600 dark:text-purple-400 hover:underline"
                  >
                    Forgot password?
                  </Link>
                </div>

                <Button
                  disabled={submitDataMutation.isPending}
                  className="bg-purple-600 hover:bg-purple-700 text-white transition-colors"
                >
                  {submitDataMutation.isPending && (
                    <Icon
                      icon="svg-spinners:180-ring"
                      width="24"
                      height="24"
                      className="mr-2"
                    />
                  )}
                  Login
                </Button>
              </div>
            </CardContent>
          </form>
          <div className="flex justify-center items-center pb-6 text-slate-600 dark:text-slate-400">
            Don&apos;t have an account?
            <Link href="/signUp">
              <Button
                variant="link"
                className="text-purple-600 dark:text-purple-400"
              >
                Register
              </Button>
            </Link>
          </div>
        </Card>
      </motion.div>
    </div>
  );
};

export default Page;
