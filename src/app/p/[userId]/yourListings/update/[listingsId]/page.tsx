"use client";
import Map from "@/components/maps/Map";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
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
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { axiosInstance } from "@/providers/AxiosInstance";
import { zodResolver } from "@hookform/resolvers/zod";
import { Icon } from "@iconify/react/dist/iconify.js";
import { useMutation, useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import {
  AlertTriangle,
  ArrowLeft,
  Calendar,
  Camera,
  Edit,
  FileText,
  Hash,
  Home,
  IndianRupee,
  MapPin,
  MessageSquare,
  Save,
  Star,
  Trash2,
  Upload,
  Users,
} from "lucide-react";
import moment from "moment";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FC, use, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

const createSchema = z
  .object({
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
    location: z.any().optional(),
  })
  .superRefine((v, c) => {
    console.log(v);
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

const page: FC<{
  params: Promise<{
    userId: string;
    listingsId: string;
  }>;
}> = ({ params }) => {
  const rparams = use(params);
  const router = useRouter();

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
      location: [0, 0],
    },
    resolver: zodResolver(createSchema),
  });

  useEffect(() => {
    console.log(form.watch("location"));
  }, [form.watch("location")]);

  const photoForm = useForm({
    defaultValues: {
      photo: "",
    },
  });
  const [dialogOpen, setdialogOpen] = useState(false);
  const [listingToDelete, setListingToDelete] = useState(false);
  const [photo, setPhoto] = useState(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [renderError, setRenderError] = useState<string | null>(null);

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
      transition: { duration: 0.5 },
    },
  };

  const listingDetailQuery = useQuery({
    queryKey: ["listingDetailQuery", rparams.listingsId],
    queryFn: async () => {
      try {
        const response = await axiosInstance.get(
          `/listing/${rparams.listingsId}`
        );
        console.log("Listing data:", response.data);
        return response.data;
      } catch (error) {
        console.error("Error fetching listing details:", error);
        throw error;
      }
    },
    enabled: !!rparams.listingsId, // Only run if listingsId exists
  });

  const submitUpdatedListing = useMutation({
    mutationFn: async () => {
      const data = form.getValues();
      const dataToSend = {
        ...data,
        lat: data.location[0],
        long: data.location[1],
        location: undefined,
      };
      const response = await axiosInstance.patch(
        `/listing/${rparams.listingsId}`,
        dataToSend
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

  useEffect(() => {
    try {
      if (!listingDetailQuery.isSuccess || !listingDetailQuery.data?.data)
        return;

      const listingData = listingDetailQuery.data.data;
      form.setValue("description", listingData.description || "");
      form.setValue("type", listingData.type || "");
      console.log(listingData.type);
      form.setValue("noOfVehicle", listingData.noOfVehicle?.toString() || "");
      form.setValue("street", listingData.street || "");
      form.setValue("zipcode", listingData.zipcode || "");
      form.setValue("price", listingData.price?.toString() || "");
      form.setValue("city", listingData.city || "");
      form.setValue("country", listingData.country || "");

      // Clear any previous render errors
      setRenderError(null);
    } catch (error) {
      console.error("Error setting form values:", error);
      setRenderError("Failed to populate form data");
    }
  }, [listingDetailQuery.data, listingDetailQuery.isSuccess]);

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

  // Render error state
  if (renderError) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20 flex justify-center items-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <div className="w-16 h-16 bg-destructive/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <AlertTriangle className="h-8 w-8 text-destructive" />
          </div>
          <h2 className="text-xl font-semibold text-foreground mb-2">
            Render Error
          </h2>
          <p className="text-muted-foreground mb-4">{renderError}</p>
          <div className="flex gap-2 justify-center">
            <Button
              onClick={() => {
                setRenderError(null);
                listingDetailQuery.refetch();
              }}
              variant="outline"
            >
              Try Again
            </Button>
            <Button onClick={() => window.location.reload()} variant="outline">
              Refresh Page
            </Button>
          </div>
        </motion.div>
      </div>
    );
  }

  // Loading state
  if (listingDetailQuery.isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20 flex justify-center items-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <Icon
            icon="svg-spinners:blocks-shuffle-3"
            width="60"
            height="60"
            className="text-primary mx-auto mb-4"
          />
          <p className="text-muted-foreground">Loading listing details...</p>
        </motion.div>
      </div>
    );
  }

  // Error state
  if (listingDetailQuery.isError) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20 flex justify-center items-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <div className="w-16 h-16 bg-destructive/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <AlertTriangle className="h-8 w-8 text-destructive" />
          </div>
          <h2 className="text-xl font-semibold text-foreground mb-2">
            Error Loading Listing
          </h2>
          <p className="text-muted-foreground mb-4">
            Failed to load listing details. Please try again.
          </p>
          <Button
            onClick={() => listingDetailQuery.refetch()}
            variant="outline"
          >
            Try Again
          </Button>
        </motion.div>
      </div>
    );
  }

  // No data state
  if (!listingDetailQuery.data || !listingDetailQuery.data.data) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20 flex justify-center items-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <div className="w-16 h-16 bg-muted/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <FileText className="h-8 w-8 text-muted-foreground" />
          </div>
          <h2 className="text-xl font-semibold text-foreground mb-2">
            Listing Not Found
          </h2>
          <p className="text-muted-foreground mb-4">
            The listing you're looking for doesn't exist or has been removed.
          </p>
          <Link href={`/p/${rparams.userId}/yourListings`}>
            <Button variant="outline">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Your Listings
            </Button>
          </Link>
        </motion.div>
      </div>
    );
  }

  // Ensure we have valid data before rendering
  const listingData = listingDetailQuery.data?.data;
  if (!listingData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20 flex justify-center items-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <div className="w-16 h-16 bg-muted/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <FileText className="h-8 w-8 text-muted-foreground" />
          </div>
          <h2 className="text-xl font-semibold text-foreground mb-2">
            Invalid Listing Data
          </h2>
          <p className="text-muted-foreground mb-4">
            The listing data is corrupted or incomplete. Please try refreshing.
          </p>
          <div className="flex gap-2 justify-center">
            <Button onClick={() => window.location.reload()} variant="outline">
              Refresh Page
            </Button>
            <Link href={`/p/${rparams.userId}/yourListings`}>
              <Button variant="outline">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Listings
              </Button>
            </Link>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      {" "}
      <motion.div
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Header */}
        <motion.div className="mb-8" variants={itemVariants}>
          <div className="flex items-center justify-between mb-6">
            <Link href={`/p/${rparams.userId}/yourListings`}>
              <Button
                variant="outline"
                size="sm"
                className="hover:bg-primary/10 hover:border-primary/50 transition-colors"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Your Listings
              </Button>
            </Link>
          </div>

          <div className="text-center">
            <motion.h1
              className="text-3xl font-bold text-foreground mb-2"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              Manage Your Listing
            </motion.h1>
            <motion.p
              className="text-muted-foreground"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              Update details, manage reservations, and track reviews
            </motion.p>
          </div>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column - Image and Actions */}
          <motion.div
            className="lg:col-span-1 space-y-6"
            variants={itemVariants}
          >
            {/* Image Card */}
            <Card className="border-border/50 shadow-lg backdrop-blur-sm bg-card/95 overflow-hidden">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Camera className="h-5 w-5 text-primary" />
                  Listing Photo
                </CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                {listingData?.photo ? (
                  <motion.img
                    src={listingData.photo}
                    alt="Parking Space"
                    className="w-full h-64 object-cover"
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.3 }}
                    onError={(e) => {
                      e.currentTarget.src = "/park.png"; // Fallback image
                    }}
                  />
                ) : (
                  <div className="w-full h-64 bg-muted/20 flex items-center justify-center">
                    <div className="text-center">
                      <Camera className="h-12 w-12 text-muted-foreground mx-auto mb-2" />
                      <p className="text-sm text-muted-foreground">
                        No photo available
                      </p>
                    </div>
                  </div>
                )}
              </CardContent>
              <CardFooter className="p-4">
                <Button
                  onClick={() => setdialogOpen(true)}
                  variant="outline"
                  className="w-full hover:bg-primary/10 hover:border-primary/50"
                >
                  <Camera className="h-4 w-4 mr-2" />
                  Change Photo
                </Button>
              </CardFooter>
            </Card>

            {/* Actions Card */}
            <Card className="border-border/50 shadow-lg backdrop-blur-sm bg-card/95">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Edit className="h-5 w-5 text-primary" />
                  Quick Actions
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Button
                    onClick={() => form.handleSubmit(onsubmit)()}
                    disabled={submitUpdatedListing.isPending}
                    className="w-full bg-primary hover:bg-primary/90"
                  >
                    {submitUpdatedListing.isPending ? (
                      <Icon
                        icon="svg-spinners:180-ring"
                        width="20"
                        height="20"
                        className="mr-2"
                      />
                    ) : (
                      <Save className="h-4 w-4 mr-2" />
                    )}
                    Save Changes
                  </Button>
                </motion.div>

                <motion.div
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Button
                    variant="destructive"
                    onClick={() => setListingToDelete(true)}
                    className="w-full"
                  >
                    <Trash2 className="h-4 w-4 mr-2" />
                    Delete Listing
                  </Button>
                </motion.div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Right Column - Form */}
          <motion.div className="lg:col-span-2" variants={itemVariants}>
            <Card className="border-border/50 shadow-lg backdrop-blur-sm bg-card/95">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5 text-primary" />
                  Listing Details
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-8">
                <form onSubmit={form.handleSubmit(onsubmit)}>
                  {/* Basic Information */}
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
                          placeholder="Describe your parking space..."
                          {...form.register("description")}
                        />
                        {form.formState.errors.description && (
                          <Label className="text-destructive text-sm">
                            {form.formState.errors.description.message}
                          </Label>
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
                            value={form.watch("type")}
                            onValueChange={(value) => {
                              if (!value) return;
                              form.setValue("type", value);
                            }}
                          >
                            <SelectTrigger className="border-border/50 focus:border-primary">
                              <SelectValue placeholder="Select vehicle type" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectGroup>
                                <SelectLabel>Vehicle Types</SelectLabel>
                                <SelectItem value="2-wheeler">
                                  🏍️ 2-Wheeler
                                </SelectItem>
                                <SelectItem value="car">🚗 Car</SelectItem>
                                <SelectItem value="bus">🚌 Bus</SelectItem>
                                <SelectItem value="truck">🚚 Truck</SelectItem>
                              </SelectGroup>
                            </SelectContent>
                          </Select>
                          {form.formState.errors.type && (
                            <Label className="text-destructive text-sm">
                              {form.formState.errors.type.message}
                            </Label>
                          )}
                        </div>

                        {/* Price */}
                        <div className="space-y-2">
                          <label className="text-sm font-medium text-foreground flex items-center gap-1">
                            <span className="text-destructive">*</span>
                            Price per Hour (₹)
                          </label>
                          <div className="relative">
                            <IndianRupee className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                            <Input
                              className="border-border/50 focus:border-primary pl-10"
                              placeholder="50"
                              {...form.register("price")}
                            />
                          </div>
                          {form.formState.errors.price && (
                            <Label className="text-destructive text-sm">
                              {form.formState.errors.price.message}
                            </Label>
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
                            className="border-border/50 focus:border-primary pl-10"
                            placeholder="How many vehicles can park here?"
                            {...form.register("noOfVehicle")}
                          />
                        </div>
                        {form.formState.errors.noOfVehicle && (
                          <Label className="text-destructive text-sm">
                            {form.formState.errors.noOfVehicle.message}
                          </Label>
                        )}
                      </div>
                    </div>
                  </motion.div>

                  <Separator />

                  {/* Location Information */}
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
                            <Label className="text-destructive text-sm">
                              {form.formState.errors.street.message}
                            </Label>
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
                              placeholder="Mumbai"
                              {...form.register("city")}
                            />
                          </div>
                          {form.formState.errors.city && (
                            <Label className="text-destructive text-sm">
                              {form.formState.errors.city.message}
                            </Label>
                          )}
                        </div>
                      </div>

                      <div className="grid md:grid-cols-2 gap-6">
                        {/* Country */}
                        <div className="space-y-2">
                          <label className="text-sm font-medium text-foreground flex items-center gap-1">
                            <span className="text-destructive">*</span>
                            Country
                          </label>
                          <div className="relative">
                            <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                            <Input
                              className="border-border/50 focus:border-primary pl-10"
                              placeholder="India"
                              {...form.register("country")}
                            />
                          </div>
                          {form.formState.errors.country && (
                            <Label className="text-destructive text-sm">
                              {form.formState.errors.country.message}
                            </Label>
                          )}
                        </div>

                        {/* Zip Code */}
                        <div className="space-y-2">
                          <label className="text-sm font-medium text-foreground flex items-center gap-1">
                            <span className="text-destructive">*</span>
                            Zip Code
                          </label>
                          <div className="relative">
                            <Hash className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                            <Input
                              className="border-border/50 focus:border-primary pl-10"
                              placeholder="400001"
                              {...form.register("zipcode")}
                            />
                          </div>
                          {form.formState.errors.zipcode && (
                            <Label className="text-destructive text-sm">
                              {form.formState.errors.zipcode.message}
                            </Label>
                          )}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </form>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Map Section */}
        {listingDetailQuery.isSuccess && listingDetailQuery.data && (
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6 }}
          >
            <Map
              location={[
                Number(listingDetailQuery.data.data.lat),
                Number(listingDetailQuery.data.data.long),
              ]}
              form={form}
              move={true}
            ></Map>
          </motion.div>
        )}

        {/* Bottom Section - Reservations and Reviews */}
        <motion.div
          className="grid lg:grid-cols-2 gap-8 mt-8"
          variants={itemVariants}
        >
          {/* Reservations */}
          <Card className="border-border/50 shadow-lg backdrop-blur-sm bg-card/95">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5 text-primary" />
                Active Reservations
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {listingDetailQuery.isSuccess &&
                listingDetailQuery.data.data.reservation.length === 0 ? (
                  <p className="text-muted-foreground text-center py-8">
                    No active reservations
                  </p>
                ) : (
                  listingDetailQuery.data.data.reservation.map(
                    (reservation: {
                      date: string;
                      id: string;
                      reserver: { avatar: string; email: string; name: string };
                    }) => (
                      <motion.div
                        key={reservation.id}
                        className="flex items-center justify-between p-4 border border-border/50 rounded-lg hover:bg-muted/20 transition-colors"
                        whileHover={{ scale: 1.02 }}
                      >
                        <div className="flex items-center gap-3">
                          <img
                            src={reservation.reserver.avatar}
                            alt="Avatar"
                            className="w-12 h-12 rounded-full object-cover border-2 border-border"
                          />
                          <div>
                            <div className="font-semibold text-foreground">
                              {reservation.reserver.name}
                            </div>
                            <div className="text-sm text-muted-foreground">
                              {reservation.reserver.email}
                            </div>
                          </div>
                        </div>
                        <div className="text-sm text-muted-foreground">
                          {moment(reservation.date).format("DD MMM, YYYY")}
                        </div>
                      </motion.div>
                    )
                  )
                )}
              </div>
            </CardContent>
          </Card>

          {/* Reviews */}
          <Card className="border-border/50 shadow-lg backdrop-blur-sm bg-card/95">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MessageSquare className="h-5 w-5 text-primary" />
                Recent Reviews
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {listingDetailQuery.isSuccess &&
                listingDetailQuery.data.data.review.length === 0 ? (
                  <p className="text-muted-foreground text-center py-8">
                    No reviews yet
                  </p>
                ) : (
                  listingDetailQuery.data.data.review.map(
                    (review: {
                      comment: string;
                      id: string;
                      rating: string;
                      reviewer: { name: string; avatar: string };
                    }) => (
                      <motion.div
                        key={review.id}
                        className="p-4 border border-border/50 rounded-lg hover:bg-muted/20 transition-colors"
                        whileHover={{ scale: 1.02 }}
                      >
                        <div className="flex items-start justify-between gap-3">
                          <div className="flex gap-3 flex-1">
                            <img
                              src={review.reviewer.avatar}
                              alt="Avatar"
                              className="w-12 h-12 rounded-full object-cover border-2 border-border flex-shrink-0"
                            />
                            <div className="flex-1">
                              <p className="text-foreground mb-2">
                                {review.comment}
                              </p>
                              <p className="text-sm text-muted-foreground">
                                {review.reviewer.name}
                              </p>
                            </div>
                          </div>
                          <div className="flex items-center gap-1 text-yellow-500">
                            <Star className="h-4 w-4 fill-current" />
                            <span className="text-sm font-medium">
                              {review.rating}
                            </span>
                          </div>
                        </div>
                      </motion.div>
                    )
                  )
                )}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Photo Update Dialog */}
        <Dialog open={dialogOpen} onOpenChange={setdialogOpen}>
          <DialogContent className="sm:max-w-md">
            <form
              onSubmit={photoForm.handleSubmit(() => {
                updatePhotoMutation.mutate();
              })}
            >
              <DialogTitle className="flex items-center gap-2">
                <Camera className="h-5 w-5 text-primary" />
                Update Photo
              </DialogTitle>
              <DialogDescription className="space-y-4">
                <div className="border-2 border-dashed border-border/50 rounded-lg p-6 text-center hover:border-primary/50 transition-colors">
                  <Upload className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
                  <p className="text-sm text-muted-foreground mb-2">
                    Choose a new photo for your parking space
                  </p>
                  <Input
                    type="file"
                    accept="image/*"
                    className="border-0 p-0 h-auto file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:bg-primary file:text-primary-foreground file:hover:bg-primary/90"
                    {...photoForm.register("photo")}
                    onChange={handleImageChange}
                  />
                </div>
                {imagePreview && (
                  <div className="mt-4">
                    <p className="text-sm font-medium text-foreground mb-2">
                      Preview:
                    </p>
                    <img
                      src={imagePreview}
                      alt="New photo preview"
                      className="w-full h-48 object-cover rounded-lg border border-border/50"
                    />
                  </div>
                )}
              </DialogDescription>
              <DialogFooter>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setdialogOpen(false)}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  disabled={updatePhotoMutation.isPending}
                  className="bg-primary hover:bg-primary/90"
                >
                  {updatePhotoMutation.isPending ? (
                    <Icon
                      icon="svg-spinners:180-ring"
                      width="20"
                      height="20"
                      className="mr-2"
                    />
                  ) : (
                    <Upload className="h-4 w-4 mr-2" />
                  )}
                  Update Photo
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>

        {/* Delete Confirmation Dialog */}
        <Dialog open={listingToDelete} onOpenChange={setListingToDelete}>
          <DialogContent className="sm:max-w-md">
            <DialogTitle className="flex items-center justify-center">
              <div className="w-16 h-16 bg-destructive/10 rounded-full flex items-center justify-center mb-4">
                <AlertTriangle className="h-8 w-8 text-destructive" />
              </div>
            </DialogTitle>
            <div className="text-center">
              <h3 className="text-lg font-semibold text-foreground mb-2">
                Delete Listing
              </h3>
              <DialogDescription className="text-center mb-6">
                Are you sure you want to delete this listing? This action cannot
                be undone and will cancel all active reservations.
              </DialogDescription>
            </div>
            <DialogFooter className="flex justify-center gap-3">
              <Button
                variant="outline"
                onClick={() => setListingToDelete(false)}
              >
                Cancel
              </Button>
              <Button
                variant="destructive"
                disabled={deleteMutation.isPending}
                onClick={() => deleteMutation.mutate()}
              >
                {deleteMutation.isPending ? (
                  <Icon
                    icon="svg-spinners:180-ring"
                    width="20"
                    height="20"
                    className="mr-2"
                  />
                ) : (
                  <Trash2 className="h-4 w-4 mr-2" />
                )}
                Delete Listing
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </motion.div>
    </div>
  );
};

export default page;
