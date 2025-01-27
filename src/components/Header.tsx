"use client";
import { axiosInstance } from "@/providers/AxiosInstance";
import { Icon } from "@iconify/react/dist/iconify.js";
import { Tab, Tabs } from "@mui/material";
import { useMutation, useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FC, useState } from "react";
import { toast } from "sonner";
import { Button } from "./ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";

const Header: FC<{
  userId: string;
}> = ({ userId }) => {
  const router = useRouter();
  const sideBarItems = [
    {
      menu: "Home",
      icon: "clarity:home-solid",
      link: `/p/${userId}/dashboard`,
      value: 1,
    },

    {
      menu: "Reservation",
      icon: "mdi:file-document-box-tick-outline",
      link: `/p/${userId}/reservations`,
      value: 2,
    },
    {
      menu: "My Listings",
      icon: "ion:list-sharp",
      link: `/p/${userId}/yourListings`,
      value: 3,
    },
  ];
  const logoutMutation = useMutation({
    mutationFn: async () => {
      const response = await axiosInstance.post(`/auth/logout`, { userId });
      return response.data;
    },
    onSuccess: () => {
      toast.success("Successfully logged out");
      router.push(`/login`);
    },
    onError: (error: AxiosError<{ message: string }>) => {
      toast.error(error.response?.data.message);
    },
  });
  const userQuery = useQuery({
    queryKey: ["singleDataQuery"],
    refetchOnWindowFocus: true,
    queryFn: async () => {
      const response = await axiosInstance.get(
        `/users/getSingleuser/${userId}`
      );
      return response.data;
    },
  });
  const [tabValue, setTabValue] = useState(1);
  if (userQuery.isLoading) {
    return <div>Loading...</div>;
  }
  if (userQuery.isError) {
    return <div>Error fetching data</div>;
  }
  return (
    <div className="bg-gray-800 text-white">
      <div className="flex flex-col gap-6">
        <div>
          <div className="flex justify-between m-3">
            <div className="text-2xl font-bold">
              Par<span className="text-violet-500">ki</span>fy
            </div>

            <div className="flex justify-between gap-10 text-xl tracking-wide ">
              <Tabs
                value={tabValue}
                sx={{
                  "& .MuiTabs-indicator": {
                    backgroundColor: "#8b5cf6",
                  },
                  "@media (max-width: 600px)": {
                    display: "none",
                  },

                  fontFamily: "inherit",
                  // marginTop: "10rem",

                  "& .MuiTabs-flexContainer": {
                    gap: 3,
                    "@media (max-width: 600px)": {
                      gap: 0, // Adjust gap for mobile
                    },
                  },
                }}
                className="hidden"
              >
                <Tab
                  label="Home"
                  sx={{
                    color: "white",
                    fontWeight: "700",
                    "&.Mui-selected": { color: "#8b5cf6" },
                  }}
                  value={1}
                  onClick={() => {
                    router.push(`/p/${userId}/dashboard`);
                    setTabValue(1);
                  }}
                ></Tab>
                <Tab
                  label="Reservations"
                  sx={{
                    color: "white",
                    fontWeight: "700",
                    "&.Mui-selected": { color: "#8b5cf6" },
                  }}
                  value={2}
                  onClick={() => {
                    router.push(`/p/${userId}/reservations`);
                    setTabValue(2);
                  }}
                ></Tab>
                <Tab
                  label="My Listings"
                  sx={{
                    color: "white",
                    fontWeight: "700",
                    "&.Mui-selected": { color: "#8b5cf6" },
                  }}
                  value={3}
                  onClick={() => {
                    router.push(`/p/${userId}/yourListings`);
                    setTabValue(3);
                  }}
                ></Tab>
              </Tabs>

              <Sheet>
                <SheetTrigger asChild>
                  <img
                    src={userQuery.data.data.avatar}
                    alt="avatar"
                    className="w-10 h-10 rounded-full cursor-pointer"
                  />
                </SheetTrigger>
                <SheetContent className="flex flex-col justify-between  rounded-lg m-2 bg-gray-800 text-white ">
                  <div className="flex flex-col gap-8">
                    <div className="flex flex-col gap-10">
                      <SheetHeader className="flex gap-3 flex-row items-center">
                        <img
                          className=" w-14 rounded-full"
                          src={userQuery.data.data.avatar}
                        ></img>
                        <div>
                          <SheetTitle className="text-white">
                            {userQuery.data.data.name}
                          </SheetTitle>
                          <SheetDescription>
                            {userQuery.data.data.email}
                          </SheetDescription>
                        </div>
                      </SheetHeader>
                    </div>
                    <div className="flex flex-col">
                      {sideBarItems.map((item) => (
                        <div
                          key={item.menu}
                          onClick={() => {
                            setTabValue(item.value);
                          }}
                        >
                          <SheetClose asChild>
                            <Link
                              href={item.link}
                              className="flex gap-2 p-3 hover:bg-gray-500 rounded-lg cursor-pointer"
                            >
                              <Icon icon={item.icon} width="24" height="24" />
                              <div>{item.menu}</div>
                            </Link>
                          </SheetClose>
                        </div>
                      ))}
                    </div>
                  </div>

                  <SheetFooter>
                    <SheetClose asChild>
                      <Button
                        type="submit"
                        variant="outline"
                        className="text-white bg-gray-800 w-full py-5"
                        onClick={() => {
                          logoutMutation.mutate();
                        }}
                      >
                        Logout{" "}
                        {logoutMutation.isPending && (
                          <Icon
                            icon="svg-spinners:270-ring"
                            width="24"
                            height="24"
                          />
                        )}
                      </Button>
                    </SheetClose>
                  </SheetFooter>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
