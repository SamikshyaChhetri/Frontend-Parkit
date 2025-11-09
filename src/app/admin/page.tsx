"use client";
import AdminHeader from "@/components/admin/AdminHeader";
import DashboardCard from "@/components/admin/DashboardCard";
import RecentListings from "@/components/admin/RecentListings";
import RecentUsers from "@/components/admin/RecentUsers";
import StatsChart from "@/components/admin/StatsChart";
import { axiosInstance } from "@/providers/AxiosInstance";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";

type Counts = {
  users: number;
  listings: number;
  reservations: number;
  reviews: number;
};

type Listing = {
  id: string;
  city: string;
  street: string;
  type: string;
  price: string;
  noOfVehicle: string;
  photo?: string;
};

type User = {
  id: string;
  name: string;
  email: string;
  phone?: string;
  address?: string;
  country?: string;
  avatar?: string;
  type?: string;
  _count?: {
    listing: number;
    reservation: number;
    review: number;
  };
};

export default function AdminPage() {
  const router = useRouter();
  const [counts, setCounts] = useState<Counts | null>(null);
  const [reservationsPerDay, setReservationsPerDay] = useState<any[]>([]);
  const [latestListings, setLatestListings] = useState<Listing[]>([]);
  const [recentUsers, setRecentUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        setLoading(true);
        const resp = await axiosInstance.get("/admin/stats");
        if (resp?.data?.success) {
          setCounts(resp.data.data.counts);
          setReservationsPerDay(resp.data.data.reservationsPerDay || []);
          setLatestListings(resp.data.data.latestListings || []);
          setRecentUsers(resp.data.data.recentUsers || []);
        } else {
          setError("Failed to load stats");
        }
      } catch (err: any) {
        console.error(err);

        // Check if it's a 403 Forbidden error (not admin)
        if (err?.response?.status === 403) {
          toast.error("Access denied. Admin privileges required.");
          router.push("/login");
          return;
        }

        // Check if it's a 401 Unauthorized error (not logged in)
        if (err?.response?.status === 401) {
          toast.error("Please login to access admin dashboard.");
          router.push("/login");
          return;
        }

        setError(
          err?.response?.data?.message || err?.message || "Error fetching stats"
        );
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, [router]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50 dark:from-gray-900 dark:via-slate-900 dark:to-slate-800">
      <AdminHeader />

      <div className="p-6">
        {loading && (
          <div className="flex items-center justify-center h-64">
            <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-500"></div>
          </div>
        )}

        {error && (
          <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4 mb-6">
            <div className="flex items-center gap-2 text-red-700 dark:text-red-400">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                  clipRule="evenodd"
                />
              </svg>
              <span className="font-semibold">{error}</span>
            </div>
          </div>
        )}

        {!loading && counts && (
          <>
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <DashboardCard
                title="Total Users"
                value={counts.users}
                subtitle="Registered accounts"
                color="text-blue-600 dark:text-blue-400"
                bgColor="bg-blue-50 dark:bg-blue-900/20"
                icon={
                  <svg
                    className="w-12 h-12"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" />
                  </svg>
                }
              />
              <DashboardCard
                title="Total Listings"
                value={counts.listings}
                subtitle="Active parking spots"
                color="text-green-600 dark:text-green-400"
                bgColor="bg-green-50 dark:bg-green-900/20"
                icon={
                  <svg
                    className="w-12 h-12"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M4 4a2 2 0 012-2h8a2 2 0 012 2v12a1 1 0 110 2h-3a1 1 0 01-1-1v-2a1 1 0 00-1-1H9a1 1 0 00-1 1v2a1 1 0 01-1 1H4a1 1 0 110-2V4zm3 1h2v2H7V5zm2 4H7v2h2V9zm2-4h2v2h-2V5zm2 4h-2v2h2V9z"
                      clipRule="evenodd"
                    />
                  </svg>
                }
              />
              <DashboardCard
                title="Total Reservations"
                value={counts.reservations}
                subtitle="Bookings made"
                color="text-purple-600 dark:text-purple-400"
                bgColor="bg-purple-50 dark:bg-purple-900/20"
                icon={
                  <svg
                    className="w-12 h-12"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                      clipRule="evenodd"
                    />
                  </svg>
                }
              />
              <DashboardCard
                title="Total Reviews"
                value={counts.reviews}
                subtitle="Customer feedback"
                color="text-orange-600 dark:text-orange-400"
                bgColor="bg-orange-50 dark:bg-orange-900/20"
                icon={
                  <svg
                    className="w-12 h-12"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                }
              />
            </div>

            {/* Charts Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
              <div className="bg-gradient-to-br from-white to-gray-50 dark:from-slate-800 dark:to-slate-900 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
                <StatsChart
                  data={reservationsPerDay}
                  type="bar"
                  title="Daily Reservations"
                />
              </div>
              <div className="bg-gradient-to-br from-white to-gray-50 dark:from-slate-800 dark:to-slate-900 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
                <StatsChart
                  data={reservationsPerDay}
                  type="line"
                  title="Reservation Trend"
                />
              </div>
            </div>

            {/* Recent Activity Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <RecentListings listings={latestListings} />
              <RecentUsers users={recentUsers} />
            </div>
          </>
        )}
      </div>
    </div>
  );
}
