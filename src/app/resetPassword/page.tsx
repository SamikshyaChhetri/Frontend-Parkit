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
import { Icon } from "@iconify/react/dist/iconify.js";
import { useState } from "react";

const page = () => {
  const [isOpen, setOpen] = useState(false);
  const [isOpenConfirm, setOpenConfirm] = useState(false);

  const [step, setStep] = useState(2);
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
          <Input placeholder="Email"></Input>
          <Button>Send Request</Button>
          <div className="flex flex-row justify-center">
            <Icon
              icon="iconamoon:arrow-left-2-duotone"
              width="24"
              height="24"
            />
            Return to sign in
          </div>
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
          <div>
            <InputOTP maxLength={6}>
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
            <Input type={isOpen ? "text" : "password"}></Input>
            <Icon
              icon={isOpen ? "heroicons-solid:eye" : "heroicons-solid:eye-off"}
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
            <Input type={isOpenConfirm ? "text" : "password"}></Input>
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
          <Button className="w-full">Reset</Button>
        </div>
      )}
    </div>
  );
};

export default page;
