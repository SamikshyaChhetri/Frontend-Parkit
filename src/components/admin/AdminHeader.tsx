"use client";
import { ModeToggle } from "@/components/theme/ModeToggle";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { axiosInstance } from "@/providers/AxiosInstance";
import { Icon } from "@iconify/react";
import { useMutation, useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { toast } from "sonner";

type AdminHeaderProps = {
  title?: string;
  subtitle?: string;
};

export default function AdminHeader({
  title = "Parkify Admin Dashboard",
  subtitle = "Welcome back! Here's what's happening with your platform.",
}: AdminHeaderProps) {
  const router = useRouter();
  const pathname = usePathname();

  const menuItems = [
    {
      name: "Dashboard",
      href: "/admin",
      icon: "mdi:view-dashboard",
    },
    {
      name: "Users",
      href: "/admin/users",
      icon: "mdi:account-group",
    },
    {
      name: "Listings",
      href: "/admin/listings",
      icon: "mdi:car-parking",
    },
  ];

  // Fetch current admin user info
  const userQuery = useQuery({
    queryKey: ["adminUser"],
    queryFn: async () => {
      const response = await axiosInstance.get("/users/admin/me");
      return response.data;
    },
    retry: false,
  });

  const logoutMutation = useMutation({
    mutationFn: async () => {
      const userId = userQuery.data?.data?.id;

      if (!userId) {
        throw new Error("User ID not found");
      }

      const response = await axiosInstance.post("/auth/logout", { userId });
      return response.data;
    },
    onSuccess: () => {
      toast.success("Successfully logged out");
      router.push("/login");
    },
    onError: (error: any) => {
      console.error("Logout error:", error);
      toast.error(
        error?.response?.data?.message || error?.message || "Logout failed"
      );
    },
  });

  const handleLogout = () => {
    // Make sure user data is loaded before attempting logout
    if (!userQuery.data?.data?.id) {
      toast.error("User information not loaded. Please try again.");
      return;
    }
    logoutMutation.mutate();
  };

  const currentUser = userQuery.data?.data;

  return (
    <header className="bg-white dark:bg-slate-900 border-b border-gray-200 dark:border-slate-700 sticky top-0 z-50 shadow-sm mb-6">
      <div className="px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Left: Title and subtitle */}
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              {title}
            </h1>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
              {subtitle}
            </p>
          </div>

          {/* Right: Theme toggle, Avatar, and Logout */}
          <div className="flex items-center gap-4">
            {/* Navigation Menu */}
            <nav className="flex items-center gap-1">
              {menuItems.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <Link key={item.href} href={item.href}>
                    <Button
                      variant={isActive ? "default" : "ghost"}
                      size="sm"
                      className={`flex items-center gap-2 ${
                        isActive
                          ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700"
                          : "hover:bg-gray-100 dark:hover:bg-slate-800"
                      }`}
                    >
                      <Icon icon={item.icon} className="w-4 h-4" />
                      <span className="hidden md:inline">{item.name}</span>
                    </Button>
                  </Link>
                );
              })}
            </nav>
            <ModeToggle />

            {/* User dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative w-fit rounded-full">
                  {currentUser?.avatar ? (
                    <div className="relative rounded-full overflow-hidden border-2 border-purple-500">
                      <img
                        src={currentUser.avatar}
                        alt={currentUser.name || "Admin"}
                        className="object-cover h-10 w-10"
                      />
                    </div>
                  ) : (
                    <div className="h-10 w-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold border-2 border-purple-500">
                      {currentUser?.name
                        ? currentUser.name.substring(0, 2).toUpperCase()
                        : "AD"}
                    </div>
                  )}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none">
                      {currentUser?.name || "Admin User"}
                    </p>
                    <p className="text-xs leading-none text-muted-foreground">
                      {currentUser?.email || "admin@parkify.com"}
                    </p>
                    <span className="inline-flex items-center px-2 py-1 mt-2 text-xs font-semibold rounded-full bg-purple-100 text-purple-700 dark:bg-purple-900 dark:text-purple-300 w-fit">
                      <Icon icon="mdi:shield-crown" className="w-3 h-3 mr-1" />
                      Admin
                    </span>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  onClick={handleLogout}
                  disabled={logoutMutation.isPending}
                  className="cursor-pointer text-red-600 dark:text-red-400 focus:text-red-600 dark:focus:text-red-400"
                >
                  {logoutMutation.isPending ? (
                    <>
                      <Icon
                        icon="svg-spinners:180-ring"
                        className="w-4 h-4 mr-2"
                      />
                      Logging out...
                    </>
                  ) : (
                    <>
                      <Icon icon="mdi:logout" className="w-4 h-4 mr-2" />
                      Logout
                    </>
                  )}
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </header>
  );
}
