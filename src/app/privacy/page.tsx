"use client";
import { motion } from "framer-motion";

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.3,
    },
  },
};

// Icons
const ShieldIcon = () => (
  <svg
    className="w-6 h-6"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
    />
  </svg>
);

const EyeIcon = () => (
  <svg
    className="w-6 h-6"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
    />
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
    />
  </svg>
);

const UserIcon = () => (
  <svg
    className="w-6 h-6"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
    />
  </svg>
);

const LockIcon = () => (
  <svg
    className="w-6 h-6"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
    />
  </svg>
);

const page = () => {
  return (
    <div className="min-h-screen bg-slate-800 py-12">
      <div className="max-w-5xl mx-auto px-4">
        <motion.div
          initial="hidden"
          animate="show"
          variants={fadeIn}
          className="text-center mb-16"
        >
          <div className="flex justify-center mb-6">
            <div className="p-4 bg-purple-600 rounded-full">
              <ShieldIcon />
            </div>
          </div>
          <h1 className="text-5xl font-bold text-slate-100 mb-4">
            Privacy Policy
          </h1>
          <p className="text-slate-400 text-xl max-w-2xl mx-auto">
            Your privacy matters. Here's how we protect and use your data.
          </p>
          <p className="text-slate-500 text-sm mt-4">
            Last updated: January 14, 2025
          </p>
        </motion.div>

        {/* Key Points Summary */}
        <motion.div
          initial="hidden"
          animate="show"
          variants={fadeIn}
          className="grid md:grid-cols-3 gap-6 mb-16"
        >
          <div className="bg-slate-700/50 backdrop-blur-sm border border-slate-600 rounded-xl p-6 text-center">
            <div className="text-blue-400 mb-3 flex justify-center">
              <EyeIcon />
            </div>
            <h3 className="text-lg font-semibold text-slate-100 mb-2">
              Transparency
            </h3>
            <p className="text-slate-300 text-sm">
              We're clear about what data we collect and why
            </p>
          </div>
          <div className="bg-slate-700/50 backdrop-blur-sm border border-slate-600 rounded-xl p-6 text-center">
            <div className="text-green-400 mb-3 flex justify-center">
              <LockIcon />
            </div>
            <h3 className="text-lg font-semibold text-slate-100 mb-2">
              Security
            </h3>
            <p className="text-slate-300 text-sm">
              Your data is encrypted and protected
            </p>
          </div>
          <div className="bg-slate-700/50 backdrop-blur-sm border border-slate-600 rounded-xl p-6 text-center">
            <div className="text-purple-400 mb-3 flex justify-center">
              <UserIcon />
            </div>
            <h3 className="text-lg font-semibold text-slate-100 mb-2">
              Control
            </h3>
            <p className="text-slate-300 text-sm">
              You control your data and privacy settings
            </p>
          </div>
        </motion.div>

        <motion.div
          initial="hidden"
          animate="show"
          variants={staggerContainer}
          className="grid md:grid-cols-2 gap-8"
        >
          <motion.section
            variants={fadeIn}
            className="bg-gradient-to-br from-slate-700/60 to-slate-800/60 backdrop-blur-sm border border-slate-600 rounded-xl p-8"
          >
            <h2 className="text-2xl font-bold text-slate-100 mb-6 flex items-center gap-3">
              <span className="text-blue-400">📊</span>
              What We Collect
            </h2>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <span className="text-blue-400 text-lg">•</span>
                <div>
                  <h4 className="text-slate-200 font-medium">Account Info</h4>
                  <p className="text-slate-400 text-sm">
                    Name, email, phone, and payment details
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-blue-400 text-lg">•</span>
                <div>
                  <h4 className="text-slate-200 font-medium">Usage Data</h4>
                  <p className="text-slate-400 text-sm">
                    Booking history, preferences, and app interactions
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-blue-400 text-lg">•</span>
                <div>
                  <h4 className="text-slate-200 font-medium">Location</h4>
                  <p className="text-slate-400 text-sm">
                    To show nearby parking and navigation
                  </p>
                </div>
              </div>
            </div>
          </motion.section>

          <motion.section
            variants={fadeIn}
            className="bg-gradient-to-br from-slate-700/60 to-slate-800/60 backdrop-blur-sm border border-slate-600 rounded-xl p-8"
          >
            <h2 className="text-2xl font-bold text-slate-100 mb-6 flex items-center gap-3">
              <span className="text-green-400">🎯</span>
              How We Use It
            </h2>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <span className="text-green-400 text-lg">•</span>
                <div>
                  <h4 className="text-slate-200 font-medium">Core Services</h4>
                  <p className="text-slate-400 text-sm">
                    Process bookings and provide customer support
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-green-400 text-lg">•</span>
                <div>
                  <h4 className="text-slate-200 font-medium">Improvements</h4>
                  <p className="text-slate-400 text-sm">
                    Enhance platform features and user experience
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-green-400 text-lg">•</span>
                <div>
                  <h4 className="text-slate-200 font-medium">Safety</h4>
                  <p className="text-slate-400 text-sm">
                    Prevent fraud and ensure platform security
                  </p>
                </div>
              </div>
            </div>
          </motion.section>

          <motion.section
            variants={fadeIn}
            className="bg-gradient-to-br from-slate-700/60 to-slate-800/60 backdrop-blur-sm border border-slate-600 rounded-xl p-8"
          >
            <h2 className="text-2xl font-bold text-slate-100 mb-6 flex items-center gap-3">
              <span className="text-purple-400">🔒</span>
              Your Rights
            </h2>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <span className="text-purple-400 text-lg">•</span>
                <div>
                  <h4 className="text-slate-200 font-medium">
                    Access & Download
                  </h4>
                  <p className="text-slate-400 text-sm">
                    Request a copy of your personal data
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-purple-400 text-lg">•</span>
                <div>
                  <h4 className="text-slate-200 font-medium">
                    Correct & Delete
                  </h4>
                  <p className="text-slate-400 text-sm">
                    Update or remove your information anytime
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-purple-400 text-lg">•</span>
                <div>
                  <h4 className="text-slate-200 font-medium">Opt-out</h4>
                  <p className="text-slate-400 text-sm">
                    Unsubscribe from marketing communications
                  </p>
                </div>
              </div>
            </div>
          </motion.section>

          <motion.section
            variants={fadeIn}
            className="bg-gradient-to-br from-slate-700/60 to-slate-800/60 backdrop-blur-sm border border-slate-600 rounded-xl p-8"
          >
            <h2 className="text-2xl font-bold text-slate-100 mb-6 flex items-center gap-3">
              <span className="text-yellow-400">🛡️</span>
              Data Protection
            </h2>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <span className="text-yellow-400 text-lg">•</span>
                <div>
                  <h4 className="text-slate-200 font-medium">Encryption</h4>
                  <p className="text-slate-400 text-sm">
                    All data encrypted in transit and at rest
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-yellow-400 text-lg">•</span>
                <div>
                  <h4 className="text-slate-200 font-medium">
                    Limited Sharing
                  </h4>
                  <p className="text-slate-400 text-sm">
                    We never sell your data to third parties
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-yellow-400 text-lg">•</span>
                <div>
                  <h4 className="text-slate-200 font-medium">
                    Secure Payments
                  </h4>
                  <p className="text-slate-400 text-sm">
                    Processing through certified payment providers
                  </p>
                </div>
              </div>
            </div>
          </motion.section>
        </motion.div>

        {/* Contact Section */}
        <motion.div
          variants={fadeIn}
          initial="hidden"
          animate="show"
          className="mt-16 bg-gradient-to-r from-blue-600/20 to-purple-600/20 border border-blue-500/30 rounded-xl p-8 text-center"
        >
          <h2 className="text-2xl font-bold text-slate-100 mb-4">
            Questions About Your Privacy?
          </h2>
          <p className="text-slate-300 mb-6">
            We're here to help. Contact our privacy team anytime.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <a
              href="mailto:privacy@parkify.com"
              className="inline-flex items-center gap-2 bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
            >
              📧 privacy@parkify.com
            </a>
            <a
              href="tel:+977 9800000"
              className="inline-flex items-center gap-2 bg-slate-700 hover:bg-slate-600 text-slate-200 px-6 py-3 rounded-lg font-medium transition-colors"
            >
              📞 +977 9800000
            </a>
          </div>
          <p className="text-slate-400 text-sm mt-4">
            We respond to all privacy inquiries within 48 hours.
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default page;
