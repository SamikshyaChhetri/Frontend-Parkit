"use client";
import Map from "@/components/maps/Map";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
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
import { useMutation } from "@tanstack/react-query";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  Camera,
  CheckCircle,
  Clock,
  FileText,
  Home,
  IndianRupee,
  MapPin,
  Plus,
  Shield,
  Upload,
  Users,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { FC, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

const createSchema = z
  .object({
    description: z.string().min(1, "Description cannot be empty"),
    type: z.string().min(1, "Please choose a type"),
    numberOfvehicle: z.coerce
      .string()
      .min(1, "No. of vehicles cannot be empty"),
    street: z.string().min(2, "Street cannot be empty"),
    price: z.string().min(1, "Price cannot be empty"),
    city: z.string().min(1, "City cannot be empty"),
    photo: z.any().optional(),
    paymentQr: z.any().optional(),
    location: z.any().optional(),
  })
  .superRefine((v, c) => {
    if (
      !v.photo ||
      !(v.photo instanceof Object) ||
      Object.keys(v.photo).length === 0 ||
      v.photo.length === 0
    ) {
      c.addIssue({
        path: ["photo"],
        message: "Please upload a photo",
        code: "custom",
      });
    }
    if (
      !v.paymentQr ||
      !(v.paymentQr instanceof Object) ||
      Object.keys(v.paymentQr).length === 0 ||
      v.paymentQr.length === 0
    ) {
      c.addIssue({
        path: ["paymentQr"],
        message: "Please upload payment QR code",
        code: "custom",
      });
    }
    if (Array.isArray(v.location)) {
      if (v.location.length !== 2) {
        return c.addIssue({
          path: ["location"],
          message: "Please select a location in map",
          code: "custom",
        });
      }
    } else {
      c.addIssue({
        path: ["location"],
        message: "Please select a location in map",
        code: "custom",
      });
    }
  });

const Page: FC<{
  params: Promise<{ userId: string }>;
}> = ({ params }) => {
  const router = useRouter();
  const rparams = React.use(params);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [qrPreview, setQrPreview] = useState<string | null>(null);

  const form = useForm({
    defaultValues: {
      description: "",
      type: "",
      noOfVehicle: "",
      street: "",
      price: "",
      city: "",
      photo: "",
      paymentQr: "",
      location: [0, 0],
    },
    resolver: zodResolver(createSchema),
  });

  const onsubmit = () => {
    submitDataMutation.mutate();
  };

  const submitDataMutation = useMutation({
    mutationFn: async () => {
      const value = form.getValues();
      const formData = new FormData();

      formData.append("description", value.description);
      formData.append("type", value.type);
      formData.append("city", value.city);
      formData.append("price", value.price);
      formData.append("noOfVehicle", value.noOfVehicle);
      formData.append("street", value.street);
      formData.append("photo", value.photo[0]);
      formData.append("paymentQr", value.paymentQr[0]);
      formData.append("ownerId", rparams.userId);
      formData.append("lat", String(value.location[0]));
      formData.append("long", String(value.location[1]));

      const response = await axiosInstance.post(`/listing`, formData);
      return response.data;
    },
    onSuccess: (data: { message: string }) => {
      toast.success(data.message);
      router.push(`dashboard`);
    },
    onError: (data: { error: string }) => {
      toast.error(data.error);
    },
  });

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleQrChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setQrPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

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

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      <motion.div
        className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Header */}
        <motion.div className="mb-8" variants={cardVariants}>
          <div className="flex items-center justify-between mb-6">
            <Link href={`/p/${rparams.userId}/dashboard`}>
              <Button
                variant="outline"
                size="sm"
                className="hover:bg-primary/10 hover:border-primary/50 transition-colors"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Dashboard
              </Button>
            </Link>
          </div>

          <div className="text-center mb-8">
            <motion.h1
              className="text-4xl font-bold text-foreground mb-4"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              Share Your Parking Space
            </motion.h1>
            <motion.p
              className="text-muted-foreground text-lg max-w-2xl mx-auto"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              Turn your unused parking space into income. It&apos;s easy,
              secure, and profitable.
            </motion.p>
          </div>

          {/* Benefits Cards */}
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <motion.div
              className="text-center p-6 rounded-lg bg-card/50 border border-border/50"
              whileHover={{ y: -5 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <div className="w-12 h-12 bg-green-500/10 rounded-full flex items-center justify-center mx-auto mb-3">
                <IndianRupee className="h-6 w-6 text-green-600" />
              </div>
              <h3 className="font-semibold text-foreground mb-2">
                Earn Extra Income
              </h3>
              <p className="text-sm text-muted-foreground">
                Make money from your parking space when you&apos;re not using it
              </p>
            </motion.div>

            <motion.div
              className="text-center p-6 rounded-lg bg-card/50 border border-border/50"
              whileHover={{ y: -5 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <div className="w-12 h-12 bg-blue-500/10 rounded-full flex items-center justify-center mx-auto mb-3">
                <Shield className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="font-semibold text-foreground mb-2">
                Safe & Secure
              </h3>
              <p className="text-sm text-muted-foreground">
                All bookings are verified and insured for your peace of mind
              </p>
            </motion.div>

            <motion.div
              className="text-center p-6 rounded-lg bg-card/50 border border-border/50"
              whileHover={{ y: -5 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <div className="w-12 h-12 bg-purple-500/10 rounded-full flex items-center justify-center mx-auto mb-3">
                <Clock className="h-6 w-6 text-purple-600" />
              </div>
              <h3 className="font-semibold text-foreground mb-2">
                24/7 Support
              </h3>
              <p className="text-sm text-muted-foreground">
                Round-the-clock customer support for hosts and renters
              </p>
            </motion.div>
          </div>
        </motion.div>

        <div className="max-w-4xl mx-auto">
          {/* Form */}
          <motion.div variants={cardVariants}>
            <Card className="border-border/50 shadow-xl backdrop-blur-sm bg-card/95">
              <form onSubmit={form.handleSubmit(onsubmit)}>
                <CardHeader className="pb-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="text-2xl flex items-center gap-2">
                        <Plus className="h-6 w-6 text-primary" />
                        Create Your Listing
                      </CardTitle>
                      <CardDescription className="mt-2">
                        Fill in the details about your parking space
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>

                <CardContent className="space-y-8">
                  {/* Basic Information Section */}
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 }}
                  >
                    <div className="flex items-center gap-2 mb-4">
                      <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                        <FileText className="h-4 w-4 text-primary" />
                      </div>
                      <h3 className="text-lg font-semibold text-foreground">
                        Basic Information
                      </h3>
                    </div>

                    <div className="space-y-6 pl-10">
                      {/* Description */}
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-foreground flex items-center gap-1">
                          <span className="text-destructive">*</span>
                          Description
                        </label>
                        <Textarea
                          className="border-border/50 focus:border-primary min-h-[100px]"
                          placeholder="Describe your parking space: location, accessibility, security features, nearby landmarks..."
                          {...form.register("description")}
                        />
                        {form.formState.errors.description && (
                          <p className="text-sm text-destructive">
                            {form.formState.errors.description.message}
                          </p>
                        )}
                      </div>

                      <div className="grid md:grid-cols-2 gap-6">
                        {/* Vehicle Type */}
                        <div className="space-y-2">
                          <label className="text-sm font-medium text-foreground flex items-center gap-1">
                            <span className="text-destructive">*</span>
                            Vehicle Type
                          </label>
                          <Select
                            onValueChange={(value) =>
                              form.setValue("type", value)
                            }
                          >
                            <SelectTrigger className="border-border/50 focus:border-primary">
                              <SelectValue placeholder="Select vehicle type" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectGroup>
                                <SelectLabel>Available for</SelectLabel>
                                <SelectItem value="2-wheeler">
                                  <div className="flex items-center gap-2">
                                    🏍️ <span>2-Wheeler</span>
                                  </div>
                                </SelectItem>
                                <SelectItem value="car">
                                  <div className="flex items-center gap-2">
                                    🚗 <span>Car</span>
                                  </div>
                                </SelectItem>
                                <SelectItem value="bus">
                                  <div className="flex items-center gap-2">
                                    🚌 <span>Bus</span>
                                  </div>
                                </SelectItem>
                                <SelectItem value="truck">
                                  <div className="flex items-center gap-2">
                                    🚚 <span>Truck</span>
                                  </div>
                                </SelectItem>
                              </SelectGroup>
                            </SelectContent>
                          </Select>
                          {form.formState.errors.type && (
                            <p className="text-sm text-destructive">
                              {form.formState.errors.type.message}
                            </p>
                          )}
                        </div>

                        {/* Price */}
                        <div className="space-y-2">
                          <label className="text-sm font-medium text-foreground flex items-center gap-1">
                            <span className="text-destructive">*</span>
                            Price per Hour (Rs)
                          </label>
                          <div className="relative">
                            <Input
                              type="number"
                              className="border-border/50 focus:border-primary pl-10"
                              placeholder="50"
                              {...form.register("price")}
                            />
                          </div>
                          {form.formState.errors.price && (
                            <p className="text-sm text-destructive">
                              {form.formState.errors.price.message}
                            </p>
                          )}
                        </div>
                      </div>

                      {/* Vehicle Capacity */}
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-foreground flex items-center gap-1">
                          <span className="text-destructive">*</span>
                          Vehicle Capacity
                        </label>
                        <div className="relative">
                          <Users className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                          <Input
                            type="number"
                            className="border-border/50 focus:border-primary pl-10"
                            placeholder="How many vehicles can park here?"
                            {...form.register("noOfVehicle")}
                          />
                        </div>
                        {form.formState.errors.noOfVehicle && (
                          <p className="text-sm text-destructive">
                            {form.formState.errors.noOfVehicle.message}
                          </p>
                        )}
                      </div>
                    </div>
                  </motion.div>

                  {/* Location Section */}
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4 }}
                  >
                    <div className="flex items-center gap-2 mb-4">
                      <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                        <MapPin className="h-4 w-4 text-primary" />
                      </div>
                      <h3 className="text-lg font-semibold text-foreground">
                        Location Details
                      </h3>
                    </div>

                    <div className="space-y-6 pl-10">
                      <div className="grid md:grid-cols-2 gap-6">
                        {/* Street */}
                        <div className="space-y-2">
                          <label className="text-sm font-medium text-foreground flex items-center gap-1">
                            <span className="text-destructive">*</span>
                            Street Address
                          </label>
                          <div className="relative">
                            <Home className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                            <Input
                              className="border-border/50 focus:border-primary pl-10"
                              placeholder="123 Main Street"
                              {...form.register("street")}
                            />
                          </div>
                          {form.formState.errors.street && (
                            <p className="text-sm text-destructive">
                              {form.formState.errors.street.message}
                            </p>
                          )}
                        </div>

                        {/* City */}
                        <div className="space-y-2">
                          <label className="text-sm font-medium text-foreground flex items-center gap-1">
                            <span className="text-destructive">*</span>
                            City
                          </label>
                          <div className="relative">
                            <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                            <Input
                              className="border-border/50 focus:border-primary pl-10"
                              placeholder="Kathmandu"
                              {...form.register("city")}
                            />
                          </div>
                          {form.formState.errors.city && (
                            <p className="text-sm text-destructive">
                              {form.formState.errors.city.message}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  </motion.div>

                  {/* Photo Section */}
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.6 }}
                  >
                    <div className="flex items-center gap-2 mb-4">
                      <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                        <Camera className="h-4 w-4 text-primary" />
                      </div>
                      <h3 className="text-lg font-semibold text-foreground">
                        Add Photos
                      </h3>
                    </div>

                    <div className="space-y-4 pl-10">
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-foreground flex items-center gap-1">
                          <span className="text-destructive">*</span>
                          Upload Image
                        </label>
                        <div className="border-2 border-dashed border-border/50 rounded-lg p-6 text-center hover:border-primary/50 transition-colors">
                          <Upload className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
                          <p className="text-sm text-muted-foreground mb-2">
                            Choose a clear photo of your parking space
                          </p>
                          <Input
                            {...form.register("photo")}
                            type="file"
                            accept="image/*"
                            className="border-0 p-0 h-auto file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:bg-primary file:text-primary-foreground file:hover:bg-primary/90"
                            onChange={handleImageChange}
                          />
                        </div>
                        {form.formState.errors.photo && (
                          <p className="text-sm text-destructive">
                            {form.formState.errors.photo.message}
                          </p>
                        )}
                      </div>

                      {imagePreview && (
                        <motion.div
                          initial={{ opacity: 0, scale: 0.9 }}
                          animate={{ opacity: 1, scale: 1 }}
                          className="mt-4"
                        >
                          <p className="text-sm font-medium text-foreground mb-2">
                            Preview:
                          </p>
                          <img
                            src={imagePreview}
                            alt="Parking space preview"
                            className="w-full max-w-md h-48 object-cover rounded-lg border border-border/50"
                          />
                        </motion.div>
                      )}
                    </div>
                  </motion.div>

                  {/* Payment QR Section */}
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.7 }}
                  >
                    <div className="flex items-center gap-2 mb-4">
                      <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                        <Icon
                          icon="mdi:qrcode"
                          className="h-4 w-4 text-primary"
                        />
                      </div>
                      <h3 className="text-lg font-semibold text-foreground">
                        Payment QR Code
                      </h3>
                    </div>

                    <div className="space-y-4 pl-10">
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-foreground flex items-center gap-1">
                          <span className="text-destructive">*</span>
                          Upload Payment QR Code
                        </label>
                        <p className="text-xs text-muted-foreground mb-2">
                          Upload your payment QR code (e.g., UPI, bank transfer,
                          digital wallet) for customers to pay you directly
                        </p>
                        <div className="border-2 border-dashed border-border/50 rounded-lg p-6 text-center hover:border-primary/50 transition-colors">
                          <Icon
                            icon="mdi:qrcode-scan"
                            className="h-8 w-8 text-muted-foreground mx-auto mb-2"
                          />
                          <p className="text-sm text-muted-foreground mb-2">
                            Choose your payment QR code image
                          </p>
                          <Input
                            {...form.register("paymentQr")}
                            type="file"
                            accept="image/*"
                            className="border-0 p-0 h-auto file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:bg-primary file:text-primary-foreground file:hover:bg-primary/90"
                            onChange={handleQrChange}
                          />
                        </div>
                        {form.formState.errors.paymentQr && (
                          <p className="text-sm text-destructive">
                            {form.formState.errors.paymentQr.message}
                          </p>
                        )}
                      </div>

                      {qrPreview && (
                        <motion.div
                          initial={{ opacity: 0, scale: 0.9 }}
                          animate={{ opacity: 1, scale: 1 }}
                          className="mt-4"
                        >
                          <p className="text-sm font-medium text-foreground mb-2">
                            QR Code Preview:
                          </p>
                          <img
                            src={qrPreview}
                            alt="Payment QR code preview"
                            className="w-full max-w-xs h-64 object-contain rounded-lg border border-border/50 bg-white p-4"
                          />
                        </motion.div>
                      )}
                    </div>
                  </motion.div>

                  {/* Map Section */}
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.6 }}
                  >
                    <div className={"text-xl font-bold"}>
                      Choose select a location in the map
                    </div>
                    <div className={"text-destructive"}>
                      {form.formState.errors.location?.message}{" "}
                    </div>
                    <Map move={true} form={form}></Map>
                  </motion.div>
                </CardContent>

                <CardFooter className="flex justify-between pt-6 border-t border-border/50">
                  <Link href={`/p/${rparams.userId}/dashboard`}>
                    <Button
                      variant="outline"
                      className="hover:bg-muted/50 transition-colors"
                    >
                      <ArrowLeft className="h-4 w-4 mr-2" />
                      Cancel
                    </Button>
                  </Link>
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Button
                      type="submit"
                      disabled={submitDataMutation.isPending}
                      className="bg-primary hover:bg-primary/90 min-w-[140px]"
                    >
                      {submitDataMutation.isPending ? (
                        <Icon
                          icon="svg-spinners:180-ring"
                          width="20"
                          height="20"
                        />
                      ) : (
                        <>
                          <CheckCircle className="h-4 w-4 mr-2" />
                          Publish Listing
                        </>
                      )}
                    </Button>
                  </motion.div>
                </CardFooter>
              </form>
            </Card>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};
export default Page;
