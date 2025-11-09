"use client";
import AdminHeader from "./AdminHeader";

type AdminLayoutProps = {
  children: React.ReactNode;
  title?: string;
  subtitle?: string;
};

export default function AdminLayout({
  children,
  title,
  subtitle,
}: AdminLayoutProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50 dark:from-gray-900 dark:via-slate-900 dark:to-slate-800">
      <AdminHeader title={title} subtitle={subtitle} />
      <div className="p-6">{children}</div>
    </div>
  );
}
