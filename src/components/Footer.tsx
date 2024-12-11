import { Icon } from "@iconify/react/dist/iconify.js";

const Footer = () => {
  return (
    <div className="bg-gray-800 text-white pt-10 px-4 pb-5 flex flex-col gap-10">
      <div className="flex justify-between">
        <div className="flex flex-col w-[25%] gap-2">
          <div className="font-bold text-xl">Parking</div>
          <div>
            <div>Monthly Parking</div>
            <div>Long-term Parking</div>
            <div>Truck Parking</div>
          </div>
        </div>
        <div className="flex flex-col w-[25%] gap-2">
          <div className="font-bold text-xl">Support</div>
          <div>
            <div>Help Center</div>
            <div>Trust and Safety</div>
            <div>Product Feedback</div>
            <div>FAQs</div>
            <div>Blog</div>
          </div>
        </div>
        <div className="flex flex-col w-[25%] gap-2 ">
          <div className="font-bold text-xl">Company</div>
          <div>
            <div>About</div>
            <div>Become a Host</div>
            <div>Careers</div>
            <div>Reviews</div>
            <div>Affiliates Partner</div>
          </div>
        </div>
        <div className="flex flex-col w-[25%] gap-2">
          <div className="font-bold text-xl">Parkit</div>
          <div>
            Founded in 2025, Our platform offers real-time availability, secure
            booking, flexible pricing, and options tailored to your needs.
          </div>
        </div>
      </div>
      <div className="flex justify-between ">
        <div className="pl-10">Parkify,inc</div>
        <div className="flex justify-between gap-10">
          <div>Privacy</div>
          <div>Terms</div>
          <div>Contact</div>
        </div>
        <div className="flex justify-between gap-8 pr-10 ">
          <Icon icon="skill-icons:instagram" width="24" height="24" />
          <Icon icon="logos:facebook" width="24" height="24" />
          <Icon icon="logos:tiktok-icon" width="24" height="24" />
          <Icon icon="mingcute:threads-fill" width="24" height="24" />
        </div>
      </div>
    </div>
  );
};

export default Footer;
