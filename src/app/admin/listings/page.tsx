"use client";
import AdminLayout from "@/components/admin/AdminLayout";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { axiosInstance } from "@/providers/AxiosInstance";
import { Icon } from "@iconify/react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

type Listing = {
  id: string;
  city: string;
  street: string;
  country?: string;
  zipcode?: string;
  type: string;
  description: string;
  rating: number;
  price: string;
  noOfVehicle: string;
  photo?: string;
  lat?: string;
  long?: string;
  ownerId: string;
  owner: {
    id: string;
    name: string;
    email: string;
    phone?: string;
    avatar?: string;
  };
  _count?: {
    reservation: number;
    review: number;
  };
};

export default function AdminListingsPage() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [listingToDelete, setListingToDelete] = useState<Listing | null>(null);

  // Fetch all listings with owner and counts
  const listingsQuery = useQuery({
    queryKey: ["allListings"],
    queryFn: async () => {
      const response = await axiosInstance.get("/admin/listings");
      return response.data;
    },
    retry: false,
  });

  // Delete listing mutation
  const deleteListingMutation = useMutation({
    mutationFn: async (listingId: string) => {
      const response = await axiosInstance.delete(
        `/admin/listings/${listingId}`
      );
      return response.data;
    },
    onSuccess: () => {
      toast.success("Listing deleted successfully");
      listingsQuery.refetch();
      setDeleteDialogOpen(false);
      setListingToDelete(null);
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message || "Failed to delete listing");
    },
  });

  const handleDeleteClick = (listing: Listing) => {
    setListingToDelete(listing);
    setDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = () => {
    if (listingToDelete) {
      deleteListingMutation.mutate(listingToDelete.id);
    }
  };

  // Handle auth errors
  if (listingsQuery.isError) {
    const error: any = listingsQuery.error;
    if (error?.response?.status === 403 || error?.response?.status === 401) {
      toast.error("Please login to access this page");
      router.push("/login");
      return null;
    }
  }

  const listings: Listing[] = listingsQuery.data?.data || [];

  // Filter listings based on search query
  const filteredListings = listings.filter(
    (listing) =>
      listing.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
      listing.street.toLowerCase().includes(searchQuery.toLowerCase()) ||
      listing.country?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      listing.type.toLowerCase().includes(searchQuery.toLowerCase()) ||
      listing.owner.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <AdminLayout
      title="Listing Management"
      subtitle="Manage all parking listings on your platform"
    >
      <div className="space-y-6">
        {/* Header with search and stats */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div className="flex items-center gap-4">
            <div className="relative">
              <Icon
                icon="mdi:magnify"
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5"
              />
              <Input
                type="text"
                placeholder="Search listings..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 w-64"
              />
            </div>
          </div>
          <div className="flex gap-4">
            <div className="bg-green-50 dark:bg-green-900/20 rounded-lg px-4 py-2 border border-green-200 dark:border-green-800">
              <p className="text-xs text-green-600 dark:text-green-400">
                Total Listings
              </p>
              <p className="text-2xl font-bold text-green-700 dark:text-green-300">
                {listings.length}
              </p>
            </div>
          </div>
        </div>

        {/* Listings Table */}
        <div className="bg-white dark:bg-slate-900 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
          {listingsQuery.isLoading ? (
            <div className="flex items-center justify-center h-64">
              <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-green-500"></div>
            </div>
          ) : filteredListings.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-64 text-gray-500 dark:text-gray-400">
              <Icon icon="mdi:car-parking" className="w-16 h-16 mb-4" />
              <p className="text-lg">No listings found</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Listing</TableHead>
                    <TableHead>Location</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Owner</TableHead>
                    <TableHead className="text-right">Price</TableHead>
                    <TableHead className="text-center">Vehicles</TableHead>
                    <TableHead className="text-center">Reservations</TableHead>
                    <TableHead className="text-center">Reviews</TableHead>
                    <TableHead className="text-center">Rating</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredListings.map((listing) => (
                    <TableRow key={listing.id}>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <div className="relative h-12 w-16 rounded-lg overflow-hidden flex-shrink-0 bg-gray-200 dark:bg-gray-700">
                            {listing.photo ? (
                              <img
                                src={listing.photo}
                                alt={`${listing.city} parking`}
                                className="object-cover w-full h-full"
                              />
                            ) : (
                              <div className="flex items-center justify-center h-full">
                                <Icon
                                  icon="mdi:car-parking"
                                  className="w-6 h-6 text-gray-400"
                                />
                              </div>
                            )}
                          </div>
                          <div className="max-w-xs">
                            <p className="font-semibold text-gray-900 dark:text-gray-100 truncate">
                              {listing.street}
                            </p>
                            <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                              {listing.city}, {listing.country || "N/A"}
                            </p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="text-sm">
                          <p className="font-medium">{listing.city}</p>
                          <p className="text-xs text-gray-500">
                            {listing.zipcode || "N/A"}
                          </p>
                        </div>
                      </TableCell>
                      <TableCell>
                        <span className="inline-flex items-center px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300">
                          {listing.type}
                        </span>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <div className="relative h-8 w-8 rounded-full overflow-hidden flex-shrink-0">
                            {listing.owner.avatar ? (
                              <img
                                src={listing.owner.avatar}
                                alt={listing.owner.name}
                                className="object-cover"
                              />
                            ) : (
                              <div className="h-8 w-8 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center text-white font-bold text-xs">
                                {listing.owner.name
                                  .substring(0, 2)
                                  .toUpperCase()}
                              </div>
                            )}
                          </div>
                          <div>
                            <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
                              {listing.owner.name}
                            </p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="text-right">
                        <span className="font-semibold text-green-600 dark:text-green-400">
                          ${listing.price}
                        </span>
                      </TableCell>
                      <TableCell className="text-center">
                        <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300 font-semibold">
                          {listing.noOfVehicle}
                        </span>
                      </TableCell>
                      <TableCell className="text-center">
                        <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-purple-100 text-purple-700 dark:bg-purple-900 dark:text-purple-300 font-semibold">
                          {listing._count?.reservation || 0}
                        </span>
                      </TableCell>
                      <TableCell className="text-center">
                        <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-orange-100 text-orange-700 dark:bg-orange-900 dark:text-orange-300 font-semibold">
                          {listing._count?.review || 0}
                        </span>
                      </TableCell>
                      <TableCell className="text-center">
                        <div className="flex items-center justify-center gap-1">
                          <Icon
                            icon="mdi:star"
                            className="w-4 h-4 text-yellow-500"
                          />
                          <span className="font-semibold">
                            {listing.rating}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell className="text-right">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDeleteClick(listing)}
                          className="text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-900/20"
                        >
                          <Icon icon="mdi:delete" className="w-4 h-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </div>
      </div>

      {/* Delete Confirmation Dialog */}
      <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Listing</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete the listing at{" "}
              <strong>
                {listingToDelete?.street}, {listingToDelete?.city}
              </strong>
              ? This action cannot be undone and will remove all related
              reservations and reviews.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setDeleteDialogOpen(false)}
              disabled={deleteListingMutation.isPending}
            >
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={handleDeleteConfirm}
              disabled={deleteListingMutation.isPending}
            >
              {deleteListingMutation.isPending ? (
                <>
                  <Icon icon="svg-spinners:180-ring" className="w-4 h-4 mr-2" />
                  Deleting...
                </>
              ) : (
                "Delete Listing"
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </AdminLayout>
  );
}
