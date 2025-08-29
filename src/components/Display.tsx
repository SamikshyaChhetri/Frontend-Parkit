import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { FC } from "react";
import ListingCard from "./ListingCard";
import NoData from "./NoData";

const Display: FC<{
  userId: string;
  listingQueryData: {
    id: string;
    description: string;
    type: string;
    price: string;
    numberOfVehicle: string;
    city: string;
    street: string;
    country: string;
    zipcode: string;
    photo: string;
  }[];
}> = ({ listingQueryData, userId }) => {
  const router = useRouter();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.3,
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.9 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.5,
        type: "spring",
        stiffness: 100,
      },
    },
  };

  if (!listingQueryData || listingQueryData.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="flex justify-center items-center py-12"
      >
        <NoData />
      </motion.div>
    );
  }

  return (
    <motion.div
      className="w-full"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {listingQueryData.map((item, index) => (
          <motion.div
            key={item.id}
            variants={itemVariants}
            whileHover={{ y: -8 }}
            whileTap={{ scale: 0.95 }}
            className="cursor-pointer"
            onClick={() => {
              router.push(`/p/${userId}/listings/${item.id}`);
            }}
          >
            <ListingCard
              photo={item.photo}
              city={item.city}
              country={item.country}
              price={item.price}
              type="listing"
            />
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};
export default Display;
