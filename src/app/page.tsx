import Footer from "@/components/Footer";
import { MarqueeDemo } from "@/components/MarqueeDemo";
import Navbar from "@/components/Navbar";

const page = () => {
  return (
    <div>
      <Navbar></Navbar>
      <MarqueeDemo></MarqueeDemo>
      <Footer></Footer>
    </div>
  );
};

export default page;
