"use client";
import { Card, CardContent } from "@/components/ui/card";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { AnimatePresence, motion } from "framer-motion";
import { useTheme } from "next-themes";
import { useState } from "react";

// Enhanced Icons components
const ChevronDownIcon = ({ className = "" }: { className?: string }) => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M6 9l6 6 6-6" />
  </svg>
);

const ParkIcon = () => (
  <svg
    width="32"
    height="32"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="text-primary"
  >
    <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
    <path d="M8 21l8-8-8-8" />
  </svg>
);

const SearchIcon = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="text-muted-foreground"
  >
    <circle cx="11" cy="11" r="8" />
    <path d="m21 21-4.35-4.35" />
  </svg>
);

// Category Icons
const GeneralIcon = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
  >
    <circle cx="12" cy="12" r="10" />
    <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
    <path d="M12 17h.01" />
  </svg>
);

const AccountIcon = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
  >
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
    <circle cx="12" cy="7" r="4" />
  </svg>
);

const BookingIcon = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
  >
    <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
    <path d="M16 2v4M8 2v4M3 10h18" />
  </svg>
);

const PaymentIcon = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
  >
    <rect x="1" y="4" width="22" height="16" rx="2" ry="2" />
    <path d="M1 10h22" />
  </svg>
);

const HostingIcon = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
  >
    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
    <polyline points="9,22 9,12 15,12 15,22" />
  </svg>
);

// Enhanced animation variants
const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  show: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.05,
      duration: 0.4,
      ease: [0.25, 0.4, 0.55, 1.4],
    },
  }),
};

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
      delayChildren: 0.1,
    },
  },
};

const titleVariants = {
  hidden: { opacity: 0, y: -20 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

const heroVariants = {
  hidden: { opacity: 0, scale: 0.95 },
  show: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.8, ease: "easeOut" },
  },
};

const categoryVariants = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" },
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

// Enhanced Accordion Component with theme support
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
      variants={fadeUp}
      custom={index}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className="group"
    >
      <Card className="overflow-hidden border-border/50 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5 transition-all duration-300 bg-card/80 backdrop-blur-sm">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="w-full p-6 text-left flex justify-between items-start hover:bg-muted/30 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:ring-offset-2 focus:ring-offset-background"
          aria-expanded={isOpen}
          aria-controls={`faq-answer-${index}`}
        >
          <span className="text-foreground font-semibold text-base leading-relaxed pr-4 group-hover:text-primary transition-colors duration-200">
            {question}
          </span>
          <motion.span
            className="text-muted-foreground flex-shrink-0 mt-0.5"
            animate={{ rotate: isOpen ? 180 : 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            <ChevronDownIcon className="w-5 h-5" />
          </motion.span>
        </button>

        <AnimatePresence>
          {isOpen && (
            <motion.div
              key="content"
              id={`faq-answer-${index}`}
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: [0.04, 0.62, 0.23, 0.98] }}
              style={{ overflow: "hidden" }}
            >
              <CardContent className="px-6 pb-6 pt-0">
                <motion.div
                  className="text-muted-foreground leading-relaxed border-l-2 border-primary/20 pl-4"
                  initial={{ y: -10, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.1, duration: 0.3 }}
                >
                  {answer}
                </motion.div>
              </CardContent>
            </motion.div>
          )}
        </AnimatePresence>
      </Card>
    </motion.div>
  );
}

export default function FAQ() {
  const [searchTerm, setSearchTerm] = useState("");
  const { theme } = useTheme();

  // Filter FAQ items based on search term
  const filteredFAQs = faqItems.filter(
    (item) =>
      item.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.answer.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20 py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Theme Toggle - Top Right */}
        <div className="flex justify-end mb-8">
          <ThemeToggle />
        </div>

        {/* Hero Section */}
        <motion.div
          className="text-center mb-12"
          initial="hidden"
          animate="show"
          variants={heroVariants}
        >
          <div className="flex justify-center mb-6">
            <div className="p-3 bg-primary/10 rounded-full">
              <ParkIcon />
            </div>
          </div>
          <motion.h1
            className="text-4xl sm:text-5xl font-bold mb-4 bg-gradient-to-r from-primary via-foreground to-primary bg-clip-text text-transparent"
            variants={titleVariants}
          >
            Frequently Asked Questions
          </motion.h1>
          <motion.p
            className="text-muted-foreground text-lg sm:text-xl max-w-2xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            Find answers to common questions about Parkify and get the help you
            need
          </motion.p>
        </motion.div>

        {/* Enhanced Search Section */}
        <motion.div
          className="mb-12 space-y-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
        >
          {/* Search Bar */}
          <div className="relative max-w-lg mx-auto">
            <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
              <SearchIcon />
            </div>
            <input
              type="text"
              placeholder="Search FAQs..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-card/70 backdrop-blur-sm border border-border/60 rounded-xl focus:ring-2 focus:ring-primary/30 focus:border-primary/50 transition-all duration-200 text-foreground placeholder:text-muted-foreground shadow-sm hover:shadow-md"
              aria-label="Search frequently asked questions"
            />
            {searchTerm && (
              <motion.button
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                onClick={() => setSearchTerm("")}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                aria-label="Clear search"
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M18 6L6 18M6 6l12 12" />
                </svg>
              </motion.button>
            )}
          </div>

          {/* Search Results Count */}
          {searchTerm && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center text-sm text-muted-foreground"
            >
              {filteredFAQs.length === 1
                ? "1 result found"
                : `${filteredFAQs.length} results found`}{" "}
              for "{searchTerm}"
            </motion.div>
          )}
        </motion.div>

        {/* FAQ Items */}
        <motion.div
          className="space-y-4 w-full"
          initial="hidden"
          animate="show"
          variants={containerVariants}
        >
          {filteredFAQs.length > 0 ? (
            filteredFAQs.map((item, index) => (
              <FAQItem
                key={index}
                question={item.question}
                answer={item.answer}
                index={index}
              />
            ))
          ) : (
            <motion.div
              className="text-center py-12"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              <div className="text-muted-foreground text-lg">
                No FAQs match your search. Try different keywords.
              </div>
            </motion.div>
          )}
        </motion.div>

        {/* Footer CTA */}
        <motion.div
          className="text-center mt-16 p-8 bg-card/50 backdrop-blur-sm rounded-2xl border border-border/50"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.6 }}
        >
          <h3 className="text-xl font-semibold text-foreground mb-4">
            Still have questions?
          </h3>
          <p className="text-muted-foreground mb-6">
            Can't find what you're looking for? Our support team is here to
            help.
          </p>
          <motion.button
            className="parking-button text-sm px-6 py-3 rounded-xl"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Contact Support
          </motion.button>
        </motion.div>
      </div>
    </div>
  );
}
