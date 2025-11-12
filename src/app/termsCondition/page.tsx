"use client";
import { Card, CardContent } from "@/components/ui/card";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  CheckCircle,
  CreditCard,
  Heart,
  Shield,
  Users,
} from "lucide-react";
import { useRouter } from "next/navigation";

// Enhanced Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.25, 0.4, 0.55, 1.4] },
  },
};

const heroVariants = {
  hidden: { opacity: 0, scale: 0.9 },
  show: {
    opacity: 1,
    scale: 1,
    transition: { duration: 1, ease: "easeOut" },
  },
};

// Enhanced Terms Section Component
const TermsSection = ({
  icon: Icon,
  title,
  children,
  iconColor = "text-primary",
  bgGradient = "from-primary/5 to-primary/10",
}: {
  icon: any;
  title: string;
  children: React.ReactNode;
  iconColor?: string;
  bgGradient?: string;
}) => (
  <motion.div variants={itemVariants} whileHover={{ scale: 1.01, y: -2 }}>
    <Card className="mb-6 overflow-hidden border-border/40 hover:border-primary/40 hover:shadow-xl hover:shadow-primary/10 transition-all duration-500 bg-card/90 backdrop-blur-md group">
      <CardContent className="p-8">
        <div className="flex items-center gap-4 mb-6">
          <div
            className={`p-3 rounded-xl bg-gradient-to-br ${bgGradient} group-hover:scale-110 transition-transform duration-300`}
          >
            <Icon className={`w-6 h-6 ${iconColor}`} />
          </div>
          <h2 className="text-2xl font-bold text-foreground group-hover:text-primary transition-colors duration-300">
            {title}
          </h2>
        </div>
        <div className="prose prose-gray dark:prose-invert max-w-none">
          {children}
        </div>
      </CardContent>
    </Card>
  </motion.div>
);

// Quick Summary Cards Component
const QuickSummaryCard = ({
  icon: Icon,
  title,
  description,
  bgGradient,
}: {
  icon: any;
  title: string;
  description: string;
  bgGradient: string;
}) => (
  <motion.div
    variants={itemVariants}
    whileHover={{ scale: 1.05, y: -5 }}
    className="group"
  >
    <Card className="h-full bg-gradient-to-br from-card/80 to-card/60 backdrop-blur-lg border-border/30 hover:border-primary/50 transition-all duration-300 hover:shadow-lg hover:shadow-primary/10">
      <CardContent className="p-6 text-center">
        <div
          className={`inline-flex p-4 rounded-2xl bg-gradient-to-br ${bgGradient} mb-4 group-hover:scale-110 transition-transform duration-300`}
        >
          <Icon className="w-8 h-8 text-white" />
        </div>
        <h3 className="text-lg font-semibold text-foreground mb-3 group-hover:text-primary transition-colors duration-300">
          {title}
        </h3>
        <p className="text-muted-foreground text-sm leading-relaxed">
          {description}
        </p>
      </CardContent>
    </Card>
  </motion.div>
);

const page = () => {
  const router = useRouter();
  const lastUpdated = "January 1, 2025";

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20 py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Enhanced Header */}
        <div className="flex justify-between items-center mb-12">
          <motion.button
            onClick={() => router.back()}
            className="flex items-center gap-3 text-muted-foreground hover:text-foreground transition-colors duration-300 p-3 rounded-xl hover:bg-muted/30 group"
            whileHover={{ scale: 1.05, x: -5 }}
            whileTap={{ scale: 0.95 }}
          >
            <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform duration-200" />
            <span className="font-medium">Back</span>
          </motion.button>
          <ThemeToggle />
        </div>

        {/* Enhanced Hero Section */}
        <motion.div
          className="text-center mb-16"
          initial="hidden"
          animate="show"
          variants={heroVariants}
        >
          <div className="flex justify-center mb-8">
            <motion.div
              className="p-6 bg-gradient-to-br from-primary/20 via-primary/10 to-transparent rounded-3xl backdrop-blur-sm"
              whileHover={{ scale: 1.1, rotate: 5 }}
              transition={{ duration: 0.3 }}
            >
              <Shield className="w-12 h-12 text-primary" />
            </motion.div>
          </div>
          <motion.h1
            className="text-3xl sm:text-5xl font-extrabold mb-6 bg-gradient-to-r from-primary via-foreground to-primary bg-clip-text text-transparent leading-tight"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
          >
            Terms & Conditions
          </motion.h1>
          <motion.p
            className="text-muted-foreground text-xl max-w-3xl mx-auto leading-relaxed mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
          >
            Simple, clear terms that protect both drivers and parking space
            hosts on Parkify
          </motion.p>
          <motion.div
            className="inline-flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-primary/10 to-secondary/10 rounded-full text-sm font-medium text-muted-foreground backdrop-blur-sm border border-border/30"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.6, duration: 0.6 }}
          >
            <CheckCircle className="w-4 h-4 text-primary" />
            <span>Last updated: {lastUpdated}</span>
          </motion.div>
        </motion.div>

        {/* Quick Summary Section */}
        <motion.div
          className="mb-16"
          initial="hidden"
          animate="show"
          variants={containerVariants}
        >
          <motion.h2
            className="text-3xl font-bold text-center text-foreground mb-8"
            variants={itemVariants}
          >
            Key Points
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <QuickSummaryCard
              icon={Shield}
              title="Safe & Secure"
              description="Your data and payments are protected with industry-standard security"
              bgGradient="from-blue-500 to-cyan-500"
            />
            <QuickSummaryCard
              icon={Users}
              title="Fair Usage"
              description="Clear guidelines for both drivers and parking space hosts"
              bgGradient="from-green-500 to-emerald-500"
            />
            <QuickSummaryCard
              icon={CreditCard}
              title="Transparent Pricing"
              description="No hidden fees - all costs are clearly displayed upfront"
              bgGradient="from-purple-500 to-pink-500"
            />
            <QuickSummaryCard
              icon={Heart}
              title="Easy Booking"
              description="Simple booking process with instant confirmation"
              bgGradient="from-orange-500 to-red-500"
            />
          </div>
        </motion.div>

        {/* Streamlined Terms Content */}
        <motion.div
          initial="hidden"
          animate="show"
          variants={containerVariants}
        >
          {/* Service Agreement */}
          <TermsSection
            icon={Shield}
            title="Service Agreement"
            bgGradient="from-blue-500/5 to-blue-500/10"
          >
            <div className="space-y-4">
              <p className="text-muted-foreground leading-relaxed text-lg">
                By using Parkify, you agree to these terms. We're a platform
                that connects parking space owners with drivers looking for
                convenient parking spots.
              </p>
              <div className="bg-muted/20 p-4 rounded-lg border-l-4 border-primary/50">
                <p className="text-muted-foreground">
                  <strong className="text-foreground">Important:</strong> We
                  reserve the right to update these terms as needed.
                </p>
              </div>
            </div>
          </TermsSection>

          {/* Bookings & Payments */}
          <TermsSection
            icon={CreditCard}
            title="Bookings & Payments"
            bgGradient="from-green-500/5 to-green-500/10"
          >
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <h3 className="font-semibold text-foreground text-lg flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    For Drivers
                  </h3>
                  <ul className="space-y-2 text-muted-foreground">
                    <li className="flex items-start gap-2">
                      <span className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></span>
                      <span>Pay securely through the app</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></span>
                      <span>Search and find location for safe parking</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></span>
                      <span>Receive booking confirmations instantly</span>
                    </li>
                  </ul>
                </div>
                <div className="space-y-3">
                  <h3 className="font-semibold text-foreground text-lg flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-blue-500" />
                    For Hosts
                  </h3>
                  <ul className="space-y-2 text-muted-foreground">
                    <li className="flex items-start gap-2">
                      <span className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></span>
                      <span>Set your own pricing and availability</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></span>
                      <span>Receive payments automatically</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></span>
                      <span>Manage listings through your dashboard</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </TermsSection>

          {/* User Responsibilities */}
          <TermsSection
            icon={Users}
            title="Your Responsibilities"
            bgGradient="from-purple-500/5 to-purple-500/10"
          >
            <div className="space-y-6">
              <p className="text-muted-foreground leading-relaxed text-lg">
                We believe in creating a respectful community. Here's what we
                expect from all users:
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h3 className="font-semibold text-foreground">✅ Do</h3>
                  <ul className="space-y-2 text-muted-foreground">
                    <li>• Provide accurate information</li>
                    <li>• Respect other users and properties</li>
                    <li>• Keep your account secure</li>
                    <li>• Follow local parking regulations</li>
                  </ul>
                </div>
                <div className="space-y-4">
                  <h3 className="font-semibold text-foreground">❌ Don't</h3>
                  <ul className="space-y-2 text-muted-foreground">
                    <li>• Share false or misleading information</li>
                    <li>• Harass or discriminate against others</li>
                    <li>• Attempt to bypass our payment system</li>
                    <li>• Use the service for illegal activities</li>
                  </ul>
                </div>
              </div>
            </div>
          </TermsSection>
        </motion.div>

        {/* Enhanced Footer */}
        <motion.div
          className="mt-20 space-y-8"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.6 }}
        >
          {/* Continue Button */}
          <motion.div
            className="text-center mb-8"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1.2, duration: 0.6 }}
          >
            <motion.button
              onClick={() => router.push("/login")}
              className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 text-primary-foreground font-semibold text-md rounded-xl shadow-lg hover:shadow-xl hover:shadow-primary/25 transition-all duration-300 transform hover:scale-105"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              <CheckCircle className="w-5 h-5" />
              <span>I Agree & Continue</span>
            </motion.button>
          </motion.div>

          {/* Agreement Acknowledgment */}
          <motion.div
            className="text-center p-6 bg-muted/10 backdrop-blur-sm rounded-xl border border-border/20"
            whileHover={{ scale: 1.02 }}
          >
            <p className="text-muted-foreground text-sm leading-relaxed">
              By continuing to use Parkify, you acknowledge that you have read,
              understood, and agree to be bound by these Terms and Conditions.
            </p>
            <div className="mt-3 flex items-center justify-center gap-2">
              <CheckCircle className="w-4 h-4 text-green-500" />
              <span className="text-xs text-muted-foreground">
                Effective as of {lastUpdated}
              </span>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default page;
