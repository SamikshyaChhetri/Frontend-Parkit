import Marquee from "@/components/ui/marquee";
import { motion } from "framer-motion";

const reviews = [
  {
    name: "Bike parking",
    img: "/bike.jpg",
  },
  {
    name: "Car parking",
    img: "./car.webp",
  },
  {
    name: "Scooter parking",
    img: "./scooter.webp",
  },
];

const fadeInUp = {
  initial: { opacity: 0, y: 60 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.8, ease: "easeOut" },
};

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const cardHover = {
  hover: {
    scale: 1.05,
    y: -8,
    transition: {
      type: "spring",
      stiffness: 400,
      damping: 25,
    },
  },
};

const shimmer = {
  animate: {
    backgroundPosition: ["200% 0", "-200% 0"],
    transition: {
      duration: 2,
      repeat: Infinity,
      ease: "linear",
    },
  },
};

export function MarqueeDemo() {
  return (
    <motion.div
      initial="initial"
      animate="animate"
      variants={staggerContainer}
      className="flex flex-col gap-10 mt-[50px] mb-[50px] bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 text-gray-800 dark:text-white relative overflow-hidden"
    >
      {/* Background decorative elements */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-400/10 via-purple-400/10 to-pink-400/10 dark:from-blue-600/10 dark:via-purple-600/10 dark:to-pink-600/10"></div>
      <div className="absolute top-10 left-10 w-32 h-32 bg-gradient-to-br from-blue-400/20 to-purple-400/20 rounded-full blur-3xl"></div>
      <div className="absolute bottom-10 right-10 w-40 h-40 bg-gradient-to-br from-purple-400/20 to-pink-400/20 rounded-full blur-3xl"></div>

      <motion.div
        variants={fadeInUp}
        className="relative flex h-[500px] w-full flex-col items-center justify-center overflow-hidden rounded-lg bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border border-gray-200/50 dark:border-slate-700/50 shadow-2xl"
      >
        <Marquee pauseOnHover className="[--duration:20s] bg-transparent">
          <motion.div
            variants={cardHover}
            whileHover="hover"
            className="relative group cursor-pointer"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 rounded-3xl blur-lg opacity-0 group-hover:opacity-30 transition-opacity duration-300"></div>
            <img
              src="./van.jpeg"
              alt=""
              className="h-80 w-64 rounded-3xl object-cover shadow-lg relative z-10 border-2 border-white/50 dark:border-slate-600/50"
            />
            <div className="flex justify-center items-center">
              <motion.div
                className="text-center font-bold bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg w-[100%] text-white p-3 mt-2 shadow-lg border border-white/20 relative z-10"
                variants={shimmer}
                animate="animate"
                style={{
                  backgroundImage:
                    "linear-gradient(45deg, #3b82f6, #8b5cf6, #3b82f6)",
                  backgroundSize: "200% 100%",
                }}
              >
                Van parking
              </motion.div>
            </div>
          </motion.div>

          <motion.div
            variants={cardHover}
            whileHover="hover"
            className="relative group cursor-pointer"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 rounded-3xl blur-lg opacity-0 group-hover:opacity-30 transition-opacity duration-300"></div>
            <img
              src="./car1.avif"
              alt=""
              className="h-80 w-64 rounded-3xl object-cover shadow-lg relative z-10 border-2 border-white/50 dark:border-slate-600/50"
            />
            <div className="flex justify-center items-center">
              <motion.div
                className="text-center font-bold bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg w-[100%] text-white p-3 mt-2 shadow-lg border border-white/20 relative z-10"
                variants={shimmer}
                animate="animate"
                style={{
                  backgroundImage:
                    "linear-gradient(45deg, #3b82f6, #8b5cf6, #3b82f6)",
                  backgroundSize: "200% 100%",
                }}
              >
                Car parking
              </motion.div>
            </div>
          </motion.div>

          <motion.div
            variants={cardHover}
            whileHover="hover"
            className="relative group cursor-pointer"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 rounded-3xl blur-lg opacity-0 group-hover:opacity-30 transition-opacity duration-300"></div>
            <img
              src="./bike.jpg"
              alt=""
              className="h-80 w-64 rounded-3xl object-cover shadow-lg relative z-10 border-2 border-white/50 dark:border-slate-600/50"
            />
            <div className="flex justify-center items-center">
              <motion.div
                className="text-center font-bold bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg w-[100%] text-white p-3 mt-2 shadow-lg border border-white/20 relative z-10"
                variants={shimmer}
                animate="animate"
                style={{
                  backgroundImage:
                    "linear-gradient(45deg, #3b82f6, #8b5cf6, #3b82f6)",
                  backgroundSize: "200% 100%",
                }}
              >
                Two wheeler parking
              </motion.div>
            </div>
          </motion.div>
        </Marquee>

        {/* Enhanced gradient overlays */}
        <div className="pointer-events-none absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-white/90 dark:from-slate-800/90 via-white/50 dark:via-slate-800/50 to-transparent"></div>
        <div className="pointer-events-none absolute inset-y-0 right-0 w-1/3 bg-gradient-to-l from-white/90 dark:from-slate-800/90 via-white/50 dark:via-slate-800/50 to-transparent"></div>
      </motion.div>

      <motion.div
        variants={fadeInUp}
        className="flex flex-col text-center gap-3 relative z-10"
      >
        <motion.div
          className="font-bold text-3xl bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent"
          whileHover={{ scale: 1.05 }}
          transition={{ type: "spring", stiffness: 400, damping: 25 }}
        >
          Options for your every need
        </motion.div>
        <motion.div
          className="text-lg text-gray-600 dark:text-gray-300"
          whileHover={{ scale: 1.02 }}
          transition={{ type: "spring", stiffness: 400, damping: 25 }}
        >
          Safe, Closer and Convenient parking space in palm of your hands
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
