"use client";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";

// Icons components
const ChevronDownIcon = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
  >
    <path d="M6 9l6 6 6-6" />
  </svg>
);

const ChevronUpIcon = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
  >
    <path d="M18 15l-6-6-6 6" />
  </svg>
);

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  show: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.6, ease: "easeOut" },
  }),
};

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.3,
    },
  },
};

const titleVariants = {
  hidden: { opacity: 0, y: -30 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: "easeOut" },
  },
};
// FAQ data
const faqItems = [
  {
    question: "What is Parkify?",
    answer:
      "Parkify is a parking reservation platform that lets you find, book, and pay for parking spaces in real-time. You can also list your unused parking spot and earn income from it.",
  },
  {
    question: "How do I create an account?",
    answer:
      "Sign up with your details including name, email, phone number, and password on the registration page.",
  },
  {
    question: "I forgot my password—what do I do?",
    answer:
      "Click 'Forgot your password?' on the login page. You’ll get a reset link in your email.",
  },
  {
    question: "How do I find parking?",
    answer:
      "Use the search bar to enter your destination. You can filter by price, rating, availability, and more.",
  },
  {
    question: "Can I see availability before I book?",
    answer:
      "Yes, availability is shown in real-time for each listing based on your selected time slot.",
  },
  {
    question: "How do I navigate to my reserved spot?",
    answer:
      "After booking, you'll receive directions via map on your booking confirmation page.",
  },
  {
    question: "What payment methods are accepted?",
    answer: "Parkify accepts secure online payments through multiple methods.",
  },
  {
    question: "How are parking fees structured?",
    answer:
      "Prices are set by hosts and may vary by location, time, or demand. Rates can be hourly, daily, or custom.",
  },
  {
    question: "How can I list my parking spot?",
    answer:
      "Click 'Become a Host' and provide details like location, pricing, and availability to get started.",
  },
  {
    question: "How do I manage my listing?",
    answer:
      "Log in to your host dashboard to update availability, pricing, and view earnings.",
  },
  {
    question: "Can I view my past bookings and receipts?",
    answer:
      "Yes, your account dashboard includes booking history and downloadable receipts.",
  },
  {
    question: "Where can I get help if I encounter issues?",
    answer:
      "You can reach support via the Help Center, Feedback form, or Contact Support link.",
  },
  {
    question: "Is Parkify safe to use?",
    answer:
      "Yes. We use secure payment systems, real-time availability, and user reviews to ensure safety.",
  },
  {
    question: "Can I filter parking spaces by amenities?",
    answer:
      "Yes, you can search for EV charging, covered spots, security, and other amenities.",
  },
  {
    question: "Are there analytics for hosts?",
    answer:
      "Yes, hosts can track their earnings, views, and booking history from the dashboard.",
  },
  {
    question: "Can I set flexible scheduling?",
    answer:
      "Hosts can set custom availability and block off dates when their space is unavailable.",
  },
];

// Accordion Component
function FAQItem({
  question,
  answer,
  index,
}: {
  question: string;
  answer: string;
  index: number;
}) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <motion.div
      className="border-b  border-slate-700 bg-slate-800 rounded-lg mb-2 shadow-sm hover:shadow-lg hover:shadow-slate-900/50 transition-all duration-200"
      variants={fadeUp}
      custom={index}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full p-4 text-left flex justify-between items-center hover:bg-slate-700 transition-colors duration-200 rounded-lg"
      >
        <span className="text-slate-100 font-medium text-base pr-4">
          {question}
        </span>
        <motion.span
          className="text-slate-400 flex-shrink-0"
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
        >
          <ChevronDownIcon />
        </motion.span>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            key="content"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            style={{ overflow: "hidden" }}
          >
            <motion.div
              className="px-4 pb-4 text-slate-300 text-sm leading-relaxed"
              initial={{ y: -10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.1, duration: 0.3 }}
            >
              {answer}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function FAQ() {
  return (
    <div className="min-h-screen bg-slate-800 py-12">
      <div className="max-w-4xl mx-auto px-4">
        <motion.div
          className="text-center mb-12"
          initial="hidden"
          animate="show"
          variants={titleVariants}
        >
          <h1 className="text-4xl font-bold text-slate-100 mb-4">
            Frequently Asked Questions
          </h1>
          <p className="text-slate-400 text-lg">
            Find answers to common questions about Parkify
          </p>
        </motion.div>

        <motion.div
          className="space-y-3 w-full"
          initial="hidden"
          animate="show"
          variants={containerVariants}
        >
          {faqItems.map((item, index) => (
            <FAQItem
              key={index}
              question={item.question}
              answer={item.answer}
              index={index}
            />
          ))}
        </motion.div>
      </div>
    </div>
  );
}
