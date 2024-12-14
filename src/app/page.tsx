import Footer from "@/components/Footer";
import { MarqueeDemo } from "@/components/MarqueeDemo";
import Navbar from "@/components/Navbar";
import b from "@/lib/utils";

const page = () => {
  console.log(b);

  return (
    <div>
      <Navbar></Navbar>
      <MarqueeDemo></MarqueeDemo>
      <Footer></Footer>
    </div>
  );
};

export default page;
