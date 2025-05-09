"use client";
import RequiredLabel from "@/components/RequiredLabel";
import { Button } from "@/components/ui/button";
import { CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogTitle,
} from "@/components/ui/dialog";
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
import { axiosInstance } from "@/providers/AxiosInstance";
import { zodResolver } from "@hookform/resolvers/zod";
import { Icon } from "@iconify/react/dist/iconify.js";
import { useMutation, useQuery } from "@tanstack/react-query";
import moment from "moment";
import { useRouter } from "next/navigation";
import { FC, use, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

const createSchema = z.object({
  description: z.string().min(1, "Description cannot be empty"),
  type: z.string().min(1, "Please choose a type"),
  noOfVehicle: z
    .string()
    .min(1, "No. of vehicles cannot be empty")
    .refine((v) => Number(v) > 0, "No. of vehicle must be greater than 0"),
  street: z.string().min(2, "Street cannot be empty"),
  zipcode: z.string().min(1, "Zipcode cannot be empty"),
  price: z.string().min(1, "Price cannot be empty"),
  city: z.string().min(1, "City cannot be empty"),
  country: z.string().min(1, "Country cannot be empty"),
});

const page: FC<{
  params: Promise<{
    userId: string;
    listingsId: string;
  }>;
}> = ({ params }) => {
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
    },
    resolver: zodResolver(createSchema),
  });

  const photoForm = useForm({
    defaultValues: {
      photo: "",
    },
  });
  const [dialogOpen, setdialogOpen] = useState(false);
  const [listingToDelete, setListingToDelete] = useState(false);
  const [photo, setPhoto] = useState(null);
  const submitUpdatedListing = useMutation({
    mutationFn: async () => {
      const data = form.getValues();
      const response = await axiosInstance.patch(
        `/listing/${rparams.listingsId}`,
        data
      );
      return response.data;
    },
    onSuccess: (data) => {
      toast.success(data.message);
    },
  });

  const onsubmit = () => {
    submitUpdatedListing.mutate();
  };

  const router = useRouter();
  const deleteMutation = useMutation({
    mutationFn: async () => {
      const response = await axiosInstance.delete(
        `/listing/${rparams.listingsId}`
      );
      return response.data;
    },
    onSuccess: () => {
      toast.success("Listing deleted successfully");
      setListingToDelete(false);
      router.push(`/p/${rparams.userId}/yourListings`);
    },
    onError: () => {
      toast.error("Failed to delete");
    },
  });
  const rparams = use(params);
  const listingDetailQuery = useQuery({
    queryKey: ["listingDetailQuery"],
    queryFn: async () => {
      const response = await axiosInstance.get(
        `/listing/${rparams.listingsId}`
      );
      console.log(response.data);
      return response.data;
    },
  });

  useEffect(() => {
    if (!listingDetailQuery.isSuccess) return;
    form.setValue("description", listingDetailQuery.data.data.description);
    form.setValue("type", listingDetailQuery.data.data.type);
    console.log(listingDetailQuery.data.data.type);
    form.setValue("noOfVehicle", listingDetailQuery.data.data.noOfVehicle);
    form.setValue("street", listingDetailQuery.data.data.street);
    form.setValue("zipcode", listingDetailQuery.data.data.zipcode);
    form.setValue("price", listingDetailQuery.data.data.price);
    form.setValue("city", listingDetailQuery.data.data.city);
    form.setValue("country", listingDetailQuery.data.data.country);
  }, [listingDetailQuery.data]);

  const updatePhotoMutation = useMutation({
    mutationFn: async () => {
      const formData = new FormData();
      formData.append("photo", photoForm.getValues("photo")[0]);

      const response = await axiosInstance.patch(
        `/listing/${rparams.listingsId}/photo`,
        formData
      );
      return response.data;
    },
    onSuccess: () => {
      toast.success("Photo updated successfully");
      setdialogOpen(false);
      listingDetailQuery.refetch();
    },
    onError: () => {
      toast.error("Error on updating photo");
      setdialogOpen(false);
    },
  });

  if (listingDetailQuery.isLoading) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-800">
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
    <div className=" bg-gray-800 min-h-screen">
      <div className="flex flex-col  justify-center items-center ">
        <div className="flex flex-row pt-8 w-[75%]  ">
          <div className="flex flex-col gap-5 text-white">
            <div className="text-xl font-bold">Manage Listings</div>
            {listingDetailQuery.isSuccess && (
              <img
                src={listingDetailQuery.data.data.photo}
                alt=""
                className="h-[50%]    rounded-lg flex"
              />
            )}
            <Dialog
              open={dialogOpen}
              onOpenChange={() => {
                setdialogOpen(false);
              }}
            >
              <form
                onSubmit={photoForm.handleSubmit(() => {
                  updatePhotoMutation.mutate();
                })}
              >
                <DialogContent>
                  <DialogTitle>Update Photo</DialogTitle>
                  <DialogDescription>
                    <Input
                      type="file"
                      accept=".jpg, .jpeg, .png"
                      {...photoForm.register("photo")}
                    />
                  </DialogDescription>
                  <DialogFooter>
                    <Button
                      type="submit"
                      disabled={updatePhotoMutation.isPending}
                      onClick={() => {
                        updatePhotoMutation.mutate();
                      }}
                    >
                      {updatePhotoMutation.isPending && (
                        <Icon
                          icon="svg-spinners:180-ring"
                          width="24"
                          height="24"
                        />
                      )}
                      Update
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </form>
            </Dialog>
            <Button
              onClick={() => {
                setdialogOpen(true);
              }}
            >
              Change Image
            </Button>
          </div>
          <div className="md:w-[80%] sm:w-[70%] w-[100%] flex flex-col  ">
            <form onSubmit={form.handleSubmit(onsubmit)}>
              <CardHeader className="flex justify-center items-center"></CardHeader>
              <CardContent className="p-0 pb-6 pl-6">
                <div className="md:gap-5 grid md:grid-cols-2  sm:grid-cols-1 sm:gap-5 gap-5 ">
                  <div className="sm:flex sm:flex-col gap-1 relative md:col-span-2 sm:col-span-1">
                    <RequiredLabel
                      // htmlFor="description"
                      className="absolute -top-3 left-3 bg-gray-800 font-bold  text-white px-2 py-1 "
                    >
                      Description
                    </RequiredLabel>
                    <Textarea
                      id="description"
                      className="border  rounded-md p-2 text-white"
                      rows={4}
                      {...form.register("description")}
                    />
                    <Label className="text-red-500">
                      {form.formState.errors["description"]?.message}
                    </Label>
                  </div>
                  <div className="flex flex-col gap-1 relative">
                    <RequiredLabel className="absolute -top-2 left-3  px-2 text-white bg-gray-800  font-bold">
                      Type
                    </RequiredLabel>
                    <Select
                      value={form.watch("type")}
                      onValueChange={(value) => {
                        if (!value) return;
                        form.setValue("type", value);
                      }}
                    >
                      <SelectTrigger className="text-white">
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
                    <Label>{form.formState.errors["type"]?.message}</Label>
                  </div>
                  <div className="flex flex-col gap-1 relative">
                    <RequiredLabel className="absolute -top-2 left-3 bg-gray-800 px-2 text-white font-bold">
                      Price
                    </RequiredLabel>
                    <Input {...form.register("price")} className="text-white" />
                    <Label className="text-red-500">
                      {form.formState.errors["price"]?.message}
                    </Label>
                  </div>
                  <div className="flex flex-col gap-1 relative">
                    <RequiredLabel className="absolute -top-2 left-3 bg-gray-800 px-2 text-white font-bold">
                      Number of Vehicles
                    </RequiredLabel>
                    <Input
                      {...form.register("noOfVehicle")}
                      className="text-white"
                    />
                    <Label className="text-red-500">
                      {form.formState.errors["noOfVehicle"]?.message}
                    </Label>
                  </div>
                  <div className="flex flex-col gap-1 relative">
                    <RequiredLabel className="absolute -top-2 left-3 bg-gray-800 px-2 text-white font-bold">
                      City
                    </RequiredLabel>
                    <Input {...form.register("city")} className="text-white" />
                    <Label className="text-red-500">
                      {form.formState.errors["city"]?.message}
                    </Label>
                  </div>
                  <div className="flex flex-col gap-1 relative">
                    <RequiredLabel className="absolute -top-2 left-3 bg-gray-800 px-2 text-white font-bold">
                      Street
                    </RequiredLabel>
                    <Input
                      {...form.register("street")}
                      className="text-white"
                    />
                    <Label className="text-red-500">
                      {form.formState.errors["street"]?.message}
                    </Label>
                  </div>
                  <div className="flex flex-col gap-1 relative">
                    <RequiredLabel className="absolute -top-2 left-3 bg-gray-800 px-2 text-white font-bold">
                      Country
                    </RequiredLabel>
                    <Input
                      {...form.register("country")}
                      className="text-white"
                    />
                    <Label className="text-red-500">
                      {form.formState.errors["country"]?.message}
                    </Label>
                  </div>
                  <div className="flex flex-col gap-1 relative">
                    <RequiredLabel className="absolute -top-2 left-3 bg-gray-800 px-2 text-white font-bold">
                      Zip Code
                    </RequiredLabel>
                    <Input
                      {...form.register("zipcode")}
                      className="text-white"
                    />
                    <Label className="text-red-500">
                      {form.formState.errors["zipcode"]?.message}
                    </Label>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between pr-0">
                <Button
                  variant={"destructive"}
                  type="button"
                  onClick={() => {
                    setListingToDelete(true);
                  }}
                >
                  Delete
                </Button>
                <Dialog
                  open={listingToDelete}
                  onOpenChange={() => {
                    setListingToDelete(false);
                  }}
                >
                  <DialogContent className="bg-slate-800 border-none">
                    <DialogTitle className="flex items-center justify-center ">
                      <Icon
                        icon="uiw:warning"
                        className="text-destructive"
                        width="50"
                        height="50"
                      />
                    </DialogTitle>
                    <DialogDescription className="text-center">
                      Are you sure you want to delete this listing
                    </DialogDescription>
                    <DialogFooter className="flex justify-between">
                      <Button
                        variant={"secondary"}
                        className="!shadow-none"
                        onClick={() => {
                          setListingToDelete(false);
                        }}
                      >
                        Cancel
                      </Button>

                      <Button
                        disabled={deleteMutation.isPending}
                        variant={"destructive"}
                        onClick={() => {
                          deleteMutation.mutate();
                        }}
                      >
                        Delete
                        {deleteMutation.isPending && (
                          <Icon
                            icon="svg-spinners:180-ring"
                            width="24"
                            height="24"
                          />
                        )}
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>

                <Button disabled={submitUpdatedListing.isPending}>
                  Update
                  {submitUpdatedListing.isPending && (
                    <Icon icon="svg-spinners:180-ring" width="24" height="24" />
                  )}
                </Button>
              </CardFooter>
            </form>
          </div>
        </div>
        <div className="flex justify-between w-[75%] pb-8">
          <div className=" flex w-[45%] flex-col gap-2">
            <div className="font-bold text-white">Reservations</div>
            <div className="flex flex-col gap-2">
              {listingDetailQuery.isSuccess &&
                listingDetailQuery.data.data.reservation.map(
                  (reservation: {
                    date: string;
                    id: string;
                    reserver: { avatar: string; email: string; name: string };
                  }) => {
                    return (
                      <div
                        key={reservation.id}
                        className="text-white flex justify-between w-full  p-2  border border-white rounded-md"
                      >
                        <div className="flex justify-between gap-2">
                          <img
                            src={reservation.reserver.avatar}
                            alt=""
                            className="h-12 rounded-full"
                          />
                          <div className="flex flex-col">
                            <div>{reservation.reserver.name}</div>
                            <div className="text-gray-500 text-sm">
                              {reservation.reserver.email}
                            </div>
                          </div>
                        </div>
                        <div className="text-[12px]">
                          {moment(reservation.date).format("DD MMM, YYYY")}
                        </div>
                      </div>
                    );
                  }
                )}
            </div>
          </div>
          <div className="w-[48%] flex flex-col gap-2">
            <div className="font-bold text-white">Reviews</div>
            <div className="flex flex-col gap-2">
              {listingDetailQuery.isSuccess &&
                listingDetailQuery.data.data.review.map(
                  (review: {
                    comment: string;
                    id: string;
                    rating: string;
                    reviewer: { name: string; avatar: string };
                  }) => {
                    return (
                      <div
                        key={review.id}
                        className=" border border-white text-white flex justify-between gap-3 p-4 rounded-md"
                      >
                        <div className="flex gap-3">
                          <img
                            src={review.reviewer.avatar}
                            alt=""
                            className="h-12 rounded-full"
                          />
                          <div>
                            <div>{review.comment}</div>
                            <div className="text-gray-500 text-sm">
                              {review.reviewer.name}
                            </div>
                          </div>
                        </div>
                        <div className="flex gap-1 items-center">
                          {review.rating}
                          <Icon icon="noto:star" width="20" height="20" />
                        </div>
                      </div>
                    );
                  }
                )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
