"use client";
import moment from "moment";

type Reservation = {
  id: string;
  reserverId: string;
  listingId: string;
  date: string;
  endDate?: string;
  startTime?: string;
  endTime?: string;
  slots?: number;
};

export default function RecentReservations({
  reservations,
}: {
  reservations: Reservation[];
}) {
  return (
    <div className="bg-gradient-to-br from-white to-gray-50 dark:from-slate-800 dark:to-slate-900 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
      <h3 className="text-xl font-bold mb-4 text-gray-800 dark:text-gray-100">
        Recent Reservations
      </h3>
      {reservations.length === 0 ? (
        <p className="text-gray-500 dark:text-gray-400 text-center py-4">
          No reservations yet
        </p>
      ) : (
        <div className="space-y-3">
          {reservations.map((reservation) => (
            <div
              key={reservation.id}
              className="flex items-center justify-between p-4 bg-white dark:bg-slate-700 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 border border-gray-100 dark:border-gray-600"
            >
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <span className="px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300">
                    {reservation.slots || 1} slot
                    {(reservation.slots || 1) > 1 ? "s" : ""}
                  </span>
                  <span className="text-xs text-gray-500 dark:text-gray-400">
                    ID: {reservation.id.substring(0, 8)}...
                  </span>
                </div>
                <div className="flex items-center gap-3 text-sm text-gray-700 dark:text-gray-300">
                  <span className="flex items-center gap-1">
                    <svg
                      className="w-4 h-4"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                        clipRule="evenodd"
                      />
                    </svg>
                    {moment(reservation.date).format("MMM D, YYYY")}
                  </span>
                  {reservation.startTime && reservation.endTime && (
                    <span className="flex items-center gap-1">
                      <svg
                        className="w-4 h-4"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
                          clipRule="evenodd"
                        />
                      </svg>
                      {reservation.startTime} - {reservation.endTime}
                    </span>
                  )}
                </div>
              </div>
              <div className="ml-4">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-400 to-purple-600 flex items-center justify-center text-white font-semibold shadow-md">
                  {reservation.reserverId.substring(0, 2).toUpperCase()}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
