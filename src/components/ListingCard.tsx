import { capitalize } from "@/lib/utils";
import { motion } from "framer-motion";
import { Calendar, Clock, IndianRupee, MapPin } from "lucide-react";
import moment from "moment";
import { FC } from "react";
import { Card, CardContent, CardDescription } from "./ui/card";

const ListingCard: FC<{
  photo: string;
  city: string;
  price: string;
  type?: "listing" | "reservation";
  date?: string;
  endDate?: string;
}> = ({ photo, city, price, type, date, endDate }) => {
  return (
    <motion.div
      whileHover={{
        scale: 1.02,
        boxShadow:
          "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
      }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    >
      <Card className="group cursor-pointer border-border/50 hover:border-primary/50 transition-all duration-300 overflow-hidden bg-card/95 backdrop-blur-sm shadow-md hover:shadow-lg">
        <CardContent className="p-0">
          {/* Image Container */}
          <div className="relative overflow-hidden">
            <motion.img
              src={photo}
              className="h-48 w-full object-cover transition-transform duration-300 group-hover:scale-110"
              alt={`Parking in ${city}`}
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

            {/* Price Badge */}
            {type === "listing" && (
              <motion.div
                className="absolute top-3 right-3 bg-primary/90 backdrop-blur-sm text-primary-foreground px-2 py-1 rounded-lg text-sm font-semibold flex items-center gap-1"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2 }}
              >
                <IndianRupee className="h-3 w-3" />
                {price}/hr
              </motion.div>
            )}
          </div>

          {/* Content */}
          <div className="p-4 space-y-2">
            <motion.div
              className="flex items-center text-foreground font-medium text-base group-hover:text-primary transition-colors"
              whileHover={{ x: 2 }}
              transition={{ type: "spring", stiffness: 400 }}
            >
              <MapPin className="h-4 w-4 mr-2 text-muted-foreground group-hover:text-primary transition-colors" />
              {capitalize(city)}
            </motion.div>

            {type === "listing" && (
              <CardDescription className="text-muted-foreground flex items-center">
                <IndianRupee className="h-3 w-3 mr-1" />
                Rs.{price} per hour
              </CardDescription>
            )}

            {type === "reservation" && (
              <CardDescription className="text-muted-foreground  flex flex-col">
                <div className="font-bold flex gap-1 items-center">
                  <Calendar className="h-4 w-4 mr-1" />
                  {moment(date).format("DD MMM YYYY")}
                </div>
                <div className="flex gap-1 items-center mt-2">
                  <Clock className="h-4 w-4 mr-1" />
                  {moment(date).format("hh:mm A")} -{" "}
                  {moment(endDate).format("hh:mm A")}
                </div>
              </CardDescription>
            )}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default ListingCard;
