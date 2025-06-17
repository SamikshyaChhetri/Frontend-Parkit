"use client";
import Footer from "@/components/Footer";
import { MarqueeDemo } from "@/components/MarqueeDemo";
import Navbar from "@/components/Navbar";

const Page = () => {
  return (
    <div className="bg-slate-800">
      <Navbar></Navbar>
      <MarqueeDemo></MarqueeDemo>
      <Footer></Footer>
    </div>
  );
};

export default Page;
