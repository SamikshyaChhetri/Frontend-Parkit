"use client";
import { Icon } from "@iconify/react/dist/iconify.js";
import { motion } from "framer-motion";
import Link from "next/link";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  show: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.6, ease: "easeOut" },
  }),
};

const slideIn = {
  hidden: { opacity: 0, x: -30 },
  show: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2,
    },
  },
};

const scaleIn = {
  hidden: { opacity: 0, scale: 0.8 },
  show: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

const Footer = () => {
  return (
    <motion.div
      className="bg-gradient-to-br from-gray-100 to-gray-300 dark:from-gray-800 dark:to-gray-900 text-gray-800 dark:text-white pt-16 px-4 pb-8 relative overflow-hidden"
      initial="hidden"
      whileInView="show"
      viewport={{ once: true }}
      variants={staggerContainer}
    >
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-10 left-20 w-72 h-72 bg-purple-500/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12"
          variants={staggerContainer}
        >
          {/* Company Info */}
          <motion.div className="flex flex-col gap-4" variants={slideIn}>
            <motion.div
              className="font-bold text-2xl flex items-center gap-2"
              whileHover={{ scale: 1.05 }}
            >
              <Icon
                icon="fluent:vehicle-car-parking-16-filled"
                width="28"
                height="28"
                className="text-purple-500"
              />
              Par
              <span className="text-purple-500 bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">
                ki
              </span>
              fy
            </motion.div>
            <motion.div
              className="text-gray-600 dark:text-gray-300 leading-relaxed"
              variants={fadeUp}
            >
              Founded in 2025, Our platform offers real-time availability,
              secure booking, flexible pricing, and options tailored to your
              needs.
            </motion.div>
          </motion.div>

          {/* Support Links */}
          <motion.div className="flex flex-col gap-4" variants={slideIn}>
            <motion.div
              className="font-bold text-xl text-gray-800 dark:text-white"
              variants={fadeUp}
            >
              Support
            </motion.div>
            <motion.div
              className="flex flex-col gap-3"
              variants={staggerContainer}
            >
              {[
                { label: "About", href: "/" },
                { label: "FAQs", href: "/faqs" },
                { label: "Become a host", href: "/login" },
                { label: "Terms and Conditions", href: "/termsCondition" },
                { label: "Privacy and policy", href: "/privacy" },
              ].map((item, i) => (
                <motion.div
                  key={i}
                  variants={fadeUp}
                  custom={i}
                  whileHover={{ x: 5, color: "#a855f7" }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <Link
                    href={item.href}
                    className="text-gray-600 dark:text-gray-300 hover:text-purple-500 transition-colors duration-200 cursor-pointer"
                  >
                    {item.label}
                  </Link>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* Contact Info */}
          <motion.div className="flex flex-col gap-4" variants={slideIn}>
            <motion.div
              className="font-bold text-xl text-gray-800 dark:text-white"
              variants={fadeUp}
            >
              Contact
            </motion.div>
            <motion.div
              className="flex flex-col gap-3"
              variants={staggerContainer}
            >
              {[
                { icon: "ic:outline-email", text: "support@parkify.com" },
                { icon: "ic:outline-phone", text: "+977 98000000" },
                {
                  icon: "ic:outline-location-on",
                  text: "Lalitpur, Nepal 12345",
                },
              ].map((item, i) => (
                <motion.div
                  key={i}
                  className="flex items-center gap-2 text-gray-600 dark:text-gray-300"
                  variants={fadeUp}
                  custom={i}
                  whileHover={{ x: 5, scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <Icon
                    icon={item.icon}
                    width="18"
                    height="18"
                    className="text-purple-500"
                  />
                  {item.text}
                </motion.div>
              ))}
            </motion.div>

            {/* Social Media */}
            <motion.div className="flex gap-4 mt-4" variants={staggerContainer}>
              {[
                {
                  icon: "skill-icons:instagram",
                  href: "https://www.instagram.com/",
                },
                { icon: "logos:facebook", href: "https://www.facebook.com" },
                { icon: "logos:tiktok-icon", href: "https://www.tiktok.com" },
                {
                  icon: "mingcute:threads-fill",
                  href: "https://www.threads.com",
                },
              ].map((social, i) => (
                <motion.a
                  key={i}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  variants={scaleIn}
                  custom={i}
                  whileHover={{ scale: 1.2, y: -3 }}
                  whileTap={{ scale: 0.9 }}
                  className="p-2 bg-gray-200 dark:bg-gray-700 rounded-full hover:bg-purple-100 dark:hover:bg-purple-900 transition-colors duration-200"
                >
                  <Icon icon={social.icon} width="24" height="24" />
                </motion.a>
              ))}
            </motion.div>
          </motion.div>

          {/* Contact Form */}
          <motion.div className="flex flex-col gap-4" variants={slideIn}>
            <motion.div
              className="font-bold text-xl text-gray-800 dark:text-white"
              variants={fadeUp}
            >
              Get in Touch
            </motion.div>
            <motion.form
              className="flex flex-col gap-4"
              variants={staggerContainer}
            >
              <motion.input
                type="text"
                placeholder="Your Name"
                className="px-4 py-3 rounded-lg bg-white dark:bg-gray-700 text-gray-800 dark:text-white placeholder-gray-400 border border-gray-300 dark:border-gray-600 focus:border-purple-500 focus:outline-none text-sm transition-colors duration-200"
                variants={fadeUp}
                custom={0}
                whileFocus={{ scale: 1.02 }}
              />
              <motion.input
                type="email"
                placeholder="Your Email"
                className="px-4 py-3 rounded-lg bg-white dark:bg-gray-700 text-gray-800 dark:text-white placeholder-gray-400 border border-gray-300 dark:border-gray-600 focus:border-purple-500 focus:outline-none text-sm transition-colors duration-200"
                variants={fadeUp}
                custom={1}
                whileFocus={{ scale: 1.02 }}
              />
              <motion.textarea
                placeholder="Your Message"
                rows={3}
                className="px-4 py-3 rounded-lg bg-white dark:bg-gray-700 text-gray-800 dark:text-white placeholder-gray-400 border border-gray-300 dark:border-gray-600 focus:border-purple-500 focus:outline-none text-sm resize-none transition-colors duration-200"
                variants={fadeUp}
                custom={2}
                whileFocus={{ scale: 1.02 }}
              />
              <motion.button
                type="submit"
                className="px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white rounded-lg text-sm font-medium transition-all duration-200 shadow-lg hover:shadow-xl"
                variants={fadeUp}
                custom={3}
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                Send Message
              </motion.button>
            </motion.form>
          </motion.div>
        </motion.div>

        {/* Bottom Section */}
        <motion.div
          className="border-t border-gray-300 dark:border-gray-600 pt-8 text-center"
          variants={fadeUp}
        >
          <motion.div
            className="text-gray-600 dark:text-gray-400 text-sm"
            whileHover={{ scale: 1.02 }}
          >
            © 2025 Parkify, Inc. All rights reserved. Made with ❤️ in Nepal
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Footer;
