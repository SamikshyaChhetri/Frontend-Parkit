"use client";
import RequiredLabel from "@/components/RequiredLabel";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { BACKEND_URL } from "@/lib/env";
import { zodResolver } from "@hookform/resolvers/zod";
import { Icon } from "@iconify/react/dist/iconify.js";
import { useMutation } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
const ResetSchema = z.object({
  email: z.string().email("Please enter valid email ID"),
});
const page = () => {
  const router = useRouter();
  const [isOpen, setOpen] = useState(false);
  const [isOpenConfirm, setOpenConfirm] = useState(false);
  const [step, setStep] = useState(1);
  const form = useForm({
    defaultValues: {
      email: "",
    },
    resolver: zodResolver(ResetSchema),
  });

  const form2 = useForm({
    defaultValues: {
      otp: "",
      password: "",
      confirmPassword: "",
    },
  });
  const onsubmit = () => {
    if (step == 1) {
      emailMutation.mutate();
    }
    if (step == 2) {
      if (form2.getValues("password") == form2.getValues("confirmPassword")) {
        resetPwMutation.mutate();
      } else {
        toast.error("Password doesnot match");
      }
    }
  };
  const emailMutation = useMutation({
    mutationFn: async () => {
      const value = form.getValues();
      const response = await axios.post(`${BACKEND_URL}/auth/reset`, value);
      return response.data;
    },
    onSuccess: (data: { message: string }) => {
      toast.success(data.message);
      setStep(2);
    },
    onError: (err: AxiosError<{ message: string }>) => {
      toast.error(err.response?.data.message);
    },
  });

  const resetPwMutation = useMutation({
    mutationFn: async () => {
      const value = form2.getValues();
      const response = await axios.post(`${BACKEND_URL}/auth/reset`, {
        ...value,
        email: form.getValues("email"),
      });
      return response.data;
    },
    onSuccess: (data: { message: string }) => {
      toast.success(data.message);
      router.push("/login");
    },
    onError: (err: AxiosError<{ message: string }>) => {
      toast.error(err.response?.data.message);
    },
  });
  return (
    <div className="flex justify-center items-center">
      {step == 1 && (
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
          <form
            onSubmit={form.handleSubmit(onsubmit)}
            className="flex flex-col gap-2"
          >
            <Input placeholder="Email" {...form.register("email")}></Input>
            <label className="text-red-500 text-sm">
              {form.formState.errors.email?.message}
            </label>
            <Button disabled={emailMutation.isPending}>
              {emailMutation.isPending && (
                <Icon icon="svg-spinners:180-ring" width="24" height="24" />
              )}
              Send Request
            </Button>
          </form>
          <Link href={"/login"} className="flex flex-row justify-center">
            <Icon
              icon="iconamoon:arrow-left-2-duotone"
              width="24"
              height="24"
            />
            Return to sign in
          </Link>
        </div>
      )}
      {step == 2 && (
        <div className="flex justify-center items-center h-screen flex-col gap-5">
          <div className="flex  justify-center">
            <Icon
              icon="solar:key-square-2-bold"
              width="100"
              height="100"
              className="text-violet-700"
            />
          </div>
          <div>Please enter the OTP we sent to your email </div>
          <form
            className="flex flex-col gap-3 w-full"
            onSubmit={form2.handleSubmit(onsubmit)}
          >
            <div className="flex justify-center">
              <InputOTP
                maxLength={6}
                onChange={(value) => {
                  form2.setValue("otp", value);
                }}
              >
                <InputOTPGroup>
                  <InputOTPSlot index={0} />
                  <InputOTPSlot index={1} />
                  <InputOTPSlot index={2} />
                </InputOTPGroup>
                <InputOTPSeparator />
                <InputOTPGroup>
                  <InputOTPSlot index={3} />
                  <InputOTPSlot index={4} />
                  <InputOTPSlot index={5} />
                </InputOTPGroup>
              </InputOTP>
            </div>
            <div className="w-full flex flex-col gap-2 relative">
              <RequiredLabel>Enter new password</RequiredLabel>
              <Input
                type={isOpen ? "text" : "password"}
                {...form2.register("password")}
              ></Input>
              <Icon
                icon={
                  isOpen ? "heroicons-solid:eye" : "heroicons-solid:eye-off"
                }
                className="absolute top-[30px] right-2 cursor-pointer"
                width="20"
                height="20"
                onClick={() => {
                  setOpen(isOpen ? false : true);
                }}
              />
            </div>
            <div className="w-full flex flex-col gap-2 relative">
              <RequiredLabel>Confirm new password</RequiredLabel>
              <Input
                type={isOpenConfirm ? "text" : "password"}
                {...form2.register("confirmPassword")}
              ></Input>
              <Icon
                icon={
                  isOpenConfirm
                    ? "heroicons-solid:eye"
                    : "heroicons-solid:eye-off"
                }
                className="absolute top-[30px] right-2 cursor-pointer"
                width="20"
                height="20"
                onClick={() => {
                  setOpenConfirm(isOpenConfirm ? false : true);
                }}
              />
            </div>
            <Button disabled={resetPwMutation.isPending} className="w-full">
              {resetPwMutation.isPending && (
                <Icon icon="svg-spinners:180-ring" width="24" height="24" />
              )}
              Reset
            </Button>{" "}
          </form>
        </div>
      )}
    </div>
  );
};

export default page;
