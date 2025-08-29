import { motion } from "framer-motion";
import { Skeleton } from "./ui/skeleton";

const SkeletonView = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
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

  return (
    <motion.div
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {Array.from({ length: 8 }).map((_, index) => (
        <motion.div
          key={index}
          className="flex flex-col space-y-3"
          variants={itemVariants}
        >
          <Skeleton className="h-48 w-full rounded-xl bg-muted/50" />
          <div className="space-y-2 p-2">
            <Skeleton className="h-4 w-full bg-muted/30" />
            <Skeleton className="h-4 w-3/4 bg-muted/20" />
          </div>
        </motion.div>
      ))}
    </motion.div>
  );
};

export default SkeletonView;
