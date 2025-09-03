"use client";
import { Button } from "@/components/ui/button";
import { Icon } from "@iconify/react/dist/iconify.js";
import { motion } from "framer-motion";
import Link from "next/link";
import Features from "./Features";
import Seperator from "./Seperator";
import { ModeToggle } from "./theme/ModeToggle";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  show: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.6, ease: "easeOut" },
  }),
};

const slideIn = {
  hidden: { opacity: 0, x: -50 },
  show: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.8, ease: "easeOut" },
  },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.3,
    },
  },
};

const scaleIn = {
  hidden: { opacity: 0, scale: 0.8 },
  show: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

const floatingAnimation = {
  animate: {
    y: [0, -10, 0],
    transition: {
      duration: 3,
      repeat: Infinity,
      ease: "easeInOut",
    },
  },
};

const Navbar = () => {
  return (
    <div className="bg-gradient-to-br from-gray-50 to-gray-200 dark:from-slate-900 dark:to-slate-800 text-gray-100 overflow-hidden">
      <div className="flex flex-col h-[90vh] relative">
        {/* Background decorative elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 left-10 w-72 h-72 bg-purple-500/10 dark:bg-purple-500/20 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-blue-500/10 dark:bg-blue-500/20 rounded-full blur-3xl"></div>
        </div>

        <motion.div
          className="flex justify-between pr-10 font-bold relative z-10"
          initial="hidden"
          animate="show"
          variants={slideIn}
        >
          <motion.div
            className="text-2xl pt-8 pl-5 flex items-center text-slate-800 dark:text-white"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <motion.div
              variants={scaleIn}
              whileHover={{ rotate: 360 }}
              transition={{ duration: 0.5 }}
            >
              <Icon
                icon="fluent:vehicle-car-parking-16-filled"
                width="34"
                height="34"
                className="text-purple-500"
              />
            </motion.div>
            Par<span className="text-purple-500">ki</span>fy
          </motion.div>
          <motion.div
            className="flex gap-5 items-end"
            initial="hidden"
            animate="show"
            variants={staggerContainer}
          >
            <div className="flex items-end">
              <motion.div variants={fadeUp}>
                <ModeToggle />
              </motion.div>
            </div>
            <div className="flex gap-5 pr-5 border-none items-center">
              <Link href="/signUp">
                <motion.div
                  variants={fadeUp}
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button
                    className="mt-6 text-gray-700 dark:text-gray-200 border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-800 hover:shadow-lg transition-all duration-300"
                    variant="outline"
                  >
                    Sign up
                  </Button>
                </motion.div>
              </Link>
              <Link href="/login">
                <motion.div
                  variants={fadeUp}
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button className="bg-purple-600 mt-6 text-white hover:bg-purple-700 dark:bg-purple-700 dark:hover:bg-purple-800 hover:shadow-lg transition-all duration-300">
                    Login
                  </Button>
                </motion.div>
              </Link>
            </div>
          </motion.div>
        </motion.div>

        <div className="flex flex-row gap-10 justify-center h-[80%] items-center relative z-10">
          <motion.div
            className="flex flex-col justify-center items-center text-center gap-6 px-6 md:px-0 max-w-xl"
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            variants={staggerContainer}
          >
            <motion.div
              className="text-4xl text-gray-900 dark:text-white font-extrabold leading-snug"
              variants={slideIn}
              whileHover={{ scale: 1.02 }}
            >
              Find and Reserve{" "}
              <span className="text-purple-500 bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">
                Parking
              </span>{" "}
              Instantly!
            </motion.div>
            <motion.div
              className="text-gray-600 dark:text-gray-300 text-lg"
              variants={fadeUp}
            >
              Say goodbye to parking hassles and enjoy a seamless, stress-free
              experience—anytime, anywhere.
            </motion.div>
            <motion.div
              variants={scaleIn}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-8 py-3 text-lg font-semibold rounded-full shadow-lg hover:shadow-xl transition-all duration-300">
                Get Started
              </Button>
            </motion.div>
          </motion.div>

          <motion.div
            className="hidden md:block pr-10"
            initial={{ opacity: 0, x: 50, scale: 0.8 }}
            whileInView={{ opacity: 1, x: 0, scale: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            viewport={{ once: true }}
            variants={floatingAnimation}
            animate="animate"
          >
            <motion.div
              whileHover={{ scale: 1.05, rotate: 2 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <img
                src="./park2.jpg"
                alt="parking"
                width={600}
                className="rounded-2xl shadow-2xl"
              />
            </motion.div>
          </motion.div>
        </div>
      </div>

      <Seperator />

      <motion.div
        className="flex flex-col gap-10 items-center pt-20 w-full relative"
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        variants={staggerContainer}
      >
        {/* Background decorative elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-10 right-20 w-64 h-64 bg-gradient-to-r from-purple-500/10 to-pink-500/10 dark:from-purple-500/20 dark:to-pink-500/20 rounded-full blur-3xl"></div>
        </div>

        <motion.div
          className="text-5xl font-bold text-gray-900 dark:text-white relative z-10"
          variants={slideIn}
          whileHover={{ scale: 1.02 }}
        >
          Have an unused space?
        </motion.div>
        <motion.div
          className="text-gray-600 dark:text-gray-300 text-xl font-semibold"
          variants={fadeUp}
        >
          Become a host in few steps
        </motion.div>
        <motion.div
          className="flex flex-wrap justify-center gap-32"
          variants={staggerContainer}
        >
          {[
            { src: "/second.png", label: "List your space" },
            { src: "/first.png", label: "Book the vacant spot" },
            { src: "/earn.png", label: "Start earning" },
          ].map(({ src, label }, i) => (
            <motion.div
              key={i}
              className="text-center relative z-10"
              variants={scaleIn}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              custom={i}
              whileHover={{
                scale: 1.05,
                y: -10,
                transition: { type: "spring", stiffness: 300 },
              }}
            >
              <motion.div
                className="relative"
                whileHover={{ rotate: 2 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <img
                  src={src}
                  alt={label}
                  className="h-48 rounded-2xl mx-auto shadow-lg hover:shadow-xl transition-shadow duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-2xl"></div>
              </motion.div>
              <motion.h2
                className="mt-4 text-gray-900 dark:text-white font-semibold"
                variants={fadeUp}
              >
                {label}
              </motion.h2>
            </motion.div>
          ))}
        </motion.div>
        <Link href="/login">
          <motion.div
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            variants={scaleIn}
          >
            <Button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 px-10 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300">
              Become a host
            </Button>
          </motion.div>
        </Link>
      </motion.div>

      <Seperator />

      <motion.div
        className="flex justify-center text-4xl font-bold py-10 text-gray-900 dark:text-white relative"
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        variants={slideIn}
      >
        <motion.div whileHover={{ scale: 1.02 }} className="relative z-10">
          Features we{" "}
          <span className="text-purple-500 bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">
            &nbsp; Offer
          </span>
        </motion.div>
        {/* Background decorative element */}
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-96 h-20 bg-gradient-to-r from-purple-500/10 to-pink-500/10 dark:from-purple-500/20 dark:to-pink-500/20 rounded-full blur-2xl"></div>
      </motion.div>

      <div className="flex justify-center px-6 lg:px-14">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {[
            {
              title: "Search by Location",
              description:
                "Quickly find parking spaces near landmarks, addresses, or cities",
              icon: "tdesign:location",
              color: "bg-green-600",
            },
            {
              title: "Real-Time Availability",
              description:
                "View up-to-date information on available spots for immediate or future bookings.",
              icon: "bx:time-five",
              color: "bg-blue-600",
            },
            {
              title: "Secure Online Payments",
              description:
                "Pay seamlessly with multiple payment options, ensuring a safe transaction.",
              icon: "ic:outline-payment",
              color: "bg-red-600",
            },
            {
              title: "Navigation Assistance",
              description:
                "Get step-by-step directions to your reserved parking spot via integrated maps",
              icon: "bx:navigation",
              color: "bg-violet-600",
            },

            {
              title: "Easy Listing Management",
              description:
                "Add and manage parking spaces with details like location, price, and availability.",
              icon: "ion:list-sharp",
              color: "bg-yellow-600",
            },
            {
              title: "Earnings Dashboard",
              description:
                "Track revenue, payouts, and overall performance with detailed analytics.",
              icon: "mage:dashboard",
              color: "bg-gray-700",
            },
            {
              title: "Flexible Scheduling",
              description:
                "Set available time slots and block off dates when the space is unavailable.",
              icon: "ant-design:schedule-outlined",
              color: "bg-lime-600",
            },

            {
              title: "Customer Feedback",
              description:
                "View reviews and ratings to improve service and attract more renters.",
              icon: "codicon:feedback",
              color: "bg-purple-600",
            },
          ].map((feat, i) => (
            <motion.div
              key={i}
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              custom={i}
            >
              <Features
                title={feat.title}
                description={feat.description}
                icon={<Icon icon={feat.icon} width="24" height="24" />}
                color={feat.color}
              />
            </motion.div>
          ))}
        </div>
      </div>

      <Seperator />

      {/* <div>
        <MarqueeDemo name="james" username="jamessss" />
      </div> */}
    </div>
  );
};

export default Navbar;
