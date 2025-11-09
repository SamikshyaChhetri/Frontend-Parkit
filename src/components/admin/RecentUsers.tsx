"use client";

import { Button } from "@/components/ui/button";
import { Icon } from "@iconify/react";
import Link from "next/link";

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

export default function RecentUsers({ users }: { users: User[] }) {
  return (
    <div className="bg-gradient-to-br from-white to-gray-50 dark:from-slate-800 dark:to-slate-900 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
      <h3 className="text-xl font-bold mb-4 text-gray-800 dark:text-gray-100">
        Recent Users
      </h3>
      {users.length === 0 ? (
        <p className="text-gray-500 dark:text-gray-400 text-center py-4">
          No users yet
        </p>
      ) : (
        <div className="space-y-3">
          {users.map((user) => (
            <div
              key={user.id}
              className="flex items-center gap-4 p-4 bg-white dark:bg-slate-700 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 border border-gray-100 dark:border-gray-600"
            >
              <div className="w-12 h-12 rounded-full overflow-hidden flex-shrink-0 bg-gradient-to-br from-blue-400 to-purple-500 relative">
                {user.avatar ? (
                  <img
                    src={user.avatar}
                    alt={user.name}
                    className="object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-white font-bold text-lg">
                    {user.name.substring(0, 2).toUpperCase()}
                  </div>
                )}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <p className="font-semibold text-gray-800 dark:text-gray-100 truncate">
                    {user.name}
                  </p>
                  {user.type === "admin" && (
                    <span className="px-2 py-0.5 text-xs font-semibold rounded-full bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300">
                      Admin
                    </span>
                  )}
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400 truncate">
                  {user.email}
                </p>
                <div className="flex items-center gap-3 mt-2 text-xs text-gray-500 dark:text-gray-400">
                  {user._count && (
                    <>
                      <span className="flex items-center gap-1">
                        <svg
                          className="w-3 h-3"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M4 4a2 2 0 012-2h8a2 2 0 012 2v12a1 1 0 110 2h-3a1 1 0 01-1-1v-2a1 1 0 00-1-1H9a1 1 0 00-1 1v2a1 1 0 01-1 1H4a1 1 0 110-2V4zm3 1h2v2H7V5zm2 4H7v2h2V9zm2-4h2v2h-2V5zm2 4h-2v2h2V9z"
                            clipRule="evenodd"
                          />
                        </svg>
                        {user._count.listing} listings
                      </span>
                      <span className="flex items-center gap-1">
                        <svg
                          className="w-3 h-3"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                            clipRule="evenodd"
                          />
                        </svg>
                        {user._count.reservation} bookings
                      </span>
                      <span className="flex items-center gap-1">
                        <svg
                          className="w-3 h-3"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                        {user._count.review} reviews
                      </span>
                    </>
                  )}
                </div>
              </div>
              {user.country && (
                <div className="text-xs text-gray-500 dark:text-gray-400">
                  {user.country}
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* See More Button */}
      {users.length > 0 && (
        <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
          <Link href="/admin/users" className="block">
            <Button
              variant="outline"
              className="w-full flex items-center justify-center gap-2 hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 dark:hover:from-slate-800 dark:hover:to-slate-700 transition-all duration-200"
            >
              <span>See All Users</span>
              <Icon icon="mdi:arrow-right" className="w-4 h-4" />
            </Button>
          </Link>
        </div>
      )}
    </div>
  );
}
