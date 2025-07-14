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

const Navbar = () => {
  return (
    <div className="bg-gray-200 dark:bg-slate-800 text-gray-100">
      <div className="flex flex-col h-[90vh]">
        <motion.div
          className="flex justify-between pr-10 font-bold"
          initial="hidden"
          animate="show"
          variants={fadeUp}
        >
          <div className="text-2xl pt-8 pl-5 flex items-center text-slate-800 dark:text-white">
            <motion.div variants={fadeUp}>
              <Icon
                icon="fluent:vehicle-car-parking-16-filled"
                width="34"
                height="34"
                className="text-purple-500"
              />
            </motion.div>
            Par<span className="text-purple-500">ki</span>fy
          </div>
          <div className="flex gap-5 items-end">
            <div className="flex items-end">
              <motion.div variants={fadeUp}>
                <ModeToggle />
              </motion.div>
            </div>
            <div className="flex gap-5 pr-5 border items-center ">
              <Link href="/signUp">
                <motion.div variants={fadeUp}>
                  <Button
                    className="mt-6 text-black dark:text-white"
                    variant="outline"
                  >
                    Sign up
                  </Button>
                </motion.div>
              </Link>
              <Link href="/login">
                <motion.div variants={fadeUp}>
                  <Button className="bg-purple-600 mt-6 text-white hover:bg-purple-700">
                    Login
                  </Button>
                </motion.div>
              </Link>
            </div>
          </div>
        </motion.div>

        <div className="flex flex-row gap-10 justify-center h-[80%] items-center">
          <motion.div
            className="flex flex-col justify-center items-center text-center gap-6 px-6 md:px-0 max-w-xl"
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            variants={fadeUp}
          >
            <motion.div className="text-4xl text-black dark:text-white font-extrabold leading-snug">
              Find and Reserve <span className="text-purple-500">Parking</span>{" "}
              Instantly!
            </motion.div>
            <motion.div className=" text-gray-600 dark:text-gray-400 text-lg ">
              Say goodbye to parking hassles and enjoy a seamless, stress-free
              experience—anytime, anywhere.
            </motion.div>
          </motion.div>

          <motion.div
            className="hidden md:block pr-10"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <img src="./map.png" alt="parking" width={600} />
          </motion.div>
        </div>
      </div>

      <Seperator />

      <motion.div
        className="flex flex-col gap-10 items-center pt-20 w-full"
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        variants={fadeUp}
      >
        <motion.div className="text-5xl font-bold text-gray-800 dark:text-white">
          Have an unused space?
        </motion.div>
        <motion.div className="text-gray-400 text-xl font-semibold">
          Become a host in few steps
        </motion.div>
        <div className="flex flex-wrap justify-center gap-32">
          {[
            { src: "/second.png", label: "List your space" },
            { src: "/first.png", label: "Book the vacant spot" },
            { src: "/earn.png", label: "Start earning" },
          ].map(({ src, label }, i) => (
            <motion.div
              key={i}
              className="text-center "
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              custom={i}
            >
              <img src={src} alt={label} className="h-48 rounded-md mx-auto " />
              <h2 className="mt-4">{label}</h2>
            </motion.div>
          ))}
        </div>
        <Link href="/login">
          <motion.div whileHover={{ scale: 1.05 }}>
            <Button className="bg-purple-600 px-10 hover:bg-purple-700 text-white">
              Become a host
            </Button>
          </motion.div>
        </Link>
      </motion.div>

      <Seperator />

      <motion.div
        className="flex justify-center text-4xl font-bold py-10 text-gray-800 dark:text-white"
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        variants={fadeUp}
      >
        Features we <span className="text-purple-500">&nbsp; Offer</span>
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
              title: "Parking History",
              description:
                "Keep track of your past bookings and receipts for convenience.",
              icon: "ic:twotone-manage-history",
              color: "bg-gray-700",
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
              title: "Dynamic Pricing Control",
              description:
                "Adjust prices based on demand, time of day, or proximity to events.",
              icon: "ic:outline-price-change",
              color: "bg-cyan-600",
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
