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
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  FileUpload,
  FileUploadDropzone,
  FileUploadItem,
  FileUploadItemDelete,
  FileUploadItemMetadata,
  FileUploadItemPreview,
  FileUploadList,
  FileUploadTrigger,
} from "@/components/ui/file-upload";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { axiosInstance } from "@/providers/AxiosInstance";
import { zodResolver } from "@hookform/resolvers/zod";
import { Icon } from "@iconify/react/dist/iconify.js";
import { useMutation, useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import {
  Ban,
  HardDriveDownload,
  Images,
  PencilRuler,
  Upload,
  User,
  X,
} from "lucide-react";
import React, { FC, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

const schema = z.object({
  name: z.string().min(1, "Name is required").max(50, "Name is too long"),
  email: z.string().email(),
  address: z
    .string()
    .min(1, "Address is required")
    .max(50, "Address is too long"),
  phone: z
    .string()
    .min(1, "Phone number is required")
    .max(50, "Phone number is too long"),
  gender: z.string().min(1, "Gender is required").max(10, "Gender is too long"),
  zipcode: z
    .string()
    .min(1, "Zipcode is required")
    .max(20, "Zipcode is too long"),
  country: z
    .string()
    .min(1, "Country is required")
    .max(30, "Country name is too long"),
});
const page: FC<{ params: Promise<{ userId: string }> }> = ({ params }) => {
  const [files, setFiles] = React.useState<File[]>([]);

  const onFileReject = React.useCallback((file: File, message: string) => {
    toast(message, {
      description: `"${
        file.name.length > 20 ? `${file.name.slice(0, 20)}...` : file.name
      }" has been rejected`,
    });
  }, []);
  const form = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      name: "",
      email: "",
      address: "",
      phone: "",
      gender: "",
      zipcode: "",
      country: "",
    },
  });
  const rparams = React.use(params);
  const userQuery = useQuery({
    queryKey: ["singleUser"],
    queryFn: async () => {
      const response = await axiosInstance.get(
        "/users/getSingleUser/" + rparams.userId
      );
      return response.data;
    },
  });

  const updateMutation = useMutation({
    mutationFn: async () => {
      const value = form.getValues();
      const response = await axiosInstance.patch(`/settings/update`, value);
      return response.data;
    },
    onSuccess: () => {
      toast.success("User details successfully updated");
      setDisable(true);
    },
    onError: () => {
      toast.error("Failed to update details");
    },
  });

  const updateImageMutation = useMutation({
    mutationFn: async () => {
      const formData = new FormData();
      formData.append("avatar", files[0]);
      const response = await axiosInstance.patch(
        "/settings/updateImage",
        formData
      );
      return response.data;
    },
    onSuccess: () => {
      toast.success("Avatar updated successfully");
      setDialogOpen(false);
    },
    onError: () => {
      toast.error("Failed to update avatar");
    },
  });

  useEffect(() => {
    if (!userQuery.isSuccess) {
      return;
    }
    form.setValue("name", userQuery.data.data.name);
    form.setValue("email", userQuery.data.data.email);
    form.setValue("address", userQuery.data.data.address);
    form.setValue("phone", userQuery.data.data.phone);
    form.setValue("country", userQuery.data.data.country);
    form.setValue("gender", userQuery.data.data.gender);
    form.setValue("zipcode", userQuery.data.data.zipcode);
  }, [userQuery.data]);
  const [isDisabled, setDisable] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.5, type: "spring", stiffness: 120 },
    },
  };

  if (userQuery.isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20 flex justify-center items-center">
        {" "}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <Icon
            icon="svg-spinners:blocks-shuffle-3"
            width="80"
            height="80"
            className="text-primary mx-auto mb-4"
          />
          <p className="text-muted-foreground">Loading your profile...</p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      <motion.div
        className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Header Section */}
        <motion.div className="mb-12" variants={itemVariants}>
          <div className="text-center mb-8">
            <motion.h1
              className="text-4xl font-bold text-foreground mb-4 flex items-center justify-center gap-3"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <User className="h-8 w-8 text-primary" />
              Profile Settings
            </motion.h1>
            <motion.p
              className="text-muted-foreground text-lg max-w-2xl mx-auto"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              View and edit all your profile details here
            </motion.p>
          </div>
        </motion.div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Profile Card */}
          <motion.div variants={cardVariants} className="lg:col-span-1">
            <Card className="border-border/50 shadow-lg backdrop-blur-sm bg-card/95 h-fit">
              <CardHeader className="text-center">
                <CardTitle className="text-2xl font-bold">
                  {userQuery.data.data.name}
                </CardTitle>
                <CardDescription className="text-base">
                  {userQuery.data.data.email}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex justify-center">
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    transition={{ type: "spring", stiffness: 300 }}
                    className="relative"
                  >
                    <img
                      src={userQuery.data.data.avatar}
                      alt="Profile Avatar"
                      className="w-48 h-48 rounded-full object-cover border-4 border-primary/20 shadow-lg"
                    />
                    <div className="absolute inset-0 bg-black/20 rounded-full opacity-0 hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                      <Images className="h-8 w-8 text-white" />
                    </div>
                  </motion.div>
                </div>
                <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
                  <DialogTrigger asChild>
                    <Button
                      className="w-full"
                      disabled={isDisabled}
                      size="lg"
                      onClick={() => {
                        setDialogOpen(true);
                      }}
                    >
                      <Images className="h-4 w-4 mr-2" />
                      Change Avatar
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[425px]">
                    <DialogTitle>Update Profile Avatar</DialogTitle>
                    <FileUpload
                      maxFiles={1}
                      maxSize={5 * 1024 * 1024}
                      className="w-full max-w-md"
                      value={files}
                      onValueChange={setFiles}
                      onFileReject={onFileReject}
                      accept="image/*"
                    >
                      {files.length <= 0 && (
                        <FileUploadDropzone>
                          <div className="flex flex-col items-center gap-1 text-center">
                            <div className="flex items-center justify-center rounded-full border p-2.5">
                              <Upload className="size-6 text-muted-foreground" />
                            </div>
                            <p className="font-medium text-sm">
                              Drag & drop files here
                            </p>
                            <p className="text-muted-foreground text-xs">
                              Or click to browse (max 5MB)
                            </p>
                          </div>
                          <FileUploadTrigger asChild>
                            <Button
                              variant="outline"
                              size="sm"
                              className="mt-2 w-fit"
                            >
                              Browse files
                            </Button>
                          </FileUploadTrigger>
                        </FileUploadDropzone>
                      )}

                      <FileUploadList>
                        {files.map((file, index) => (
                          <FileUploadItem key={index} value={file}>
                            <FileUploadItemPreview />
                            <FileUploadItemMetadata />
                            <FileUploadItemDelete asChild>
                              <Button
                                variant="ghost"
                                size="icon"
                                className="size-7"
                              >
                                <X />
                              </Button>
                            </FileUploadItemDelete>
                          </FileUploadItem>
                        ))}
                      </FileUploadList>
                    </FileUpload>

                    <DialogFooter>
                      <DialogClose asChild>
                        <Button
                          variant="outline"
                          onClick={() => {
                            setFiles([]);
                            setDialogOpen(false);
                          }}
                        >
                          Cancel
                        </Button>
                      </DialogClose>
                      <Button
                        disabled={updateImageMutation.isPending}
                        type="submit"
                        onClick={() => {
                          if (files.length === 0) {
                            return toast.error("Please select an image");
                          }
                          updateImageMutation.mutate();
                        }}
                      >
                        {updateImageMutation.isPending && (
                          <Icon
                            icon="svg-spinners:180-ring"
                            width="24"
                            height="24"
                            className="mr-2"
                          />
                        )}
                        Save changes
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </CardContent>
            </Card>
          </motion.div>

          {/* Profile Form */}
          <motion.div variants={cardVariants} className="lg:col-span-2">
            <Card className="border-border/50 shadow-lg backdrop-blur-sm bg-card/95">
              <CardHeader>
                <div className="flex justify-between items-center">
                  <div>
                    <CardTitle className="text-2xl font-bold">
                      Personal Information
                    </CardTitle>
                    <CardDescription>
                      Update your personal details and contact information
                    </CardDescription>
                  </div>
                  <Button
                    type="button"
                    variant={isDisabled ? "default" : "secondary"}
                    onClick={() => setDisable(!isDisabled)}
                  >
                    {isDisabled ? (
                      <>
                        <PencilRuler className="h-4 w-4 mr-2" />
                        Edit
                      </>
                    ) : (
                      <>
                        <Ban className="h-4 w-4 mr-2" />
                        Cancel
                      </>
                    )}
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <form
                  className="grid grid-cols-1 md:grid-cols-2 gap-6"
                  onSubmit={form.handleSubmit(() => {
                    updateMutation.mutate();
                  })}
                >
                  <div className="space-y-2">
                    <Label htmlFor="username" className="text-sm font-medium">
                      Full Name
                    </Label>
                    <Input
                      type="text"
                      id="username"
                      placeholder="Enter your full name"
                      {...form.register("name")}
                      disabled={isDisabled}
                      className="transition-all duration-200"
                    />
                    {form.formState.errors.name && (
                      <p className="text-sm text-destructive">
                        {form.formState.errors.name.message}
                      </p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-sm font-medium">
                      Email Address
                    </Label>
                    <Input
                      type="email"
                      id="email"
                      placeholder="Enter your email"
                      {...form.register("email")}
                      disabled
                      className="bg-muted/50"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="address" className="text-sm font-medium">
                      Address
                    </Label>
                    <Input
                      type="text"
                      id="address"
                      placeholder="Enter your address"
                      {...form.register("address")}
                      disabled={isDisabled}
                      className="transition-all duration-200"
                    />
                    {form.formState.errors.address && (
                      <p className="text-sm text-destructive">
                        {form.formState.errors.address.message}
                      </p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phone" className="text-sm font-medium">
                      Phone Number
                    </Label>
                    <Input
                      type="tel"
                      id="phone"
                      placeholder="Enter your phone number"
                      {...form.register("phone")}
                      disabled={isDisabled}
                      className="transition-all duration-200"
                    />
                    {form.formState.errors.phone && (
                      <p className="text-sm text-destructive">
                        {form.formState.errors.phone.message}
                      </p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="gender" className="text-sm font-medium">
                      Gender
                    </Label>
                    <Input
                      type="text"
                      id="gender"
                      placeholder="Enter your gender"
                      {...form.register("gender")}
                      disabled={isDisabled}
                      className="transition-all duration-200"
                    />
                    {form.formState.errors.gender && (
                      <p className="text-sm text-destructive">
                        {form.formState.errors.gender.message}
                      </p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="zipcode" className="text-sm font-medium">
                      Zip Code
                    </Label>
                    <Input
                      type="text"
                      id="zipcode"
                      placeholder="Enter your zip code"
                      {...form.register("zipcode")}
                      disabled={isDisabled}
                      className="transition-all duration-200"
                    />
                    {form.formState.errors.zipcode && (
                      <p className="text-sm text-destructive">
                        {form.formState.errors.zipcode.message}
                      </p>
                    )}
                  </div>

                  <div className="md:col-span-2 space-y-2">
                    <Label htmlFor="country" className="text-sm font-medium">
                      Country
                    </Label>
                    <CountryDropdown
                      placeholder="Select country"
                      defaultValue="NPL"
                      disabled={isDisabled}
                      onChange={(value) => {
                        form.setValue("country", value.name);
                      }}
                      value={form.watch("country")}
                    />
                    {form.formState.errors.country && (
                      <p className="text-sm text-destructive">
                        {form.formState.errors.country.message}
                      </p>
                    )}
                  </div>

                  <div className="md:col-span-2 flex justify-end pt-6">
                    <Button
                      disabled={isDisabled || updateMutation.isPending}
                      size="lg"
                      type="submit"
                      className="min-w-[140px]"
                    >
                      {updateMutation.isPending && (
                        <Icon
                          icon="svg-spinners:180-ring"
                          width="24"
                          height="24"
                          className="mr-2"
                        />
                      )}
                      <HardDriveDownload className="h-4 w-4 mr-2" />
                      Save Changes
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default page;
