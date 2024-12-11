import Marquee from "@/components/ui/marquee";

const reviews = [
  {
    name: "Bike parking",
    img: "/bike.jpg",
  },
  {
    name: "Car parking",
    img: "./car.webp",
  },
  {
    name: "Scooter parking",
    img: "./scooter.webp",
  },
];

export function MarqueeDemo() {
  return (
    <div className="relative flex h-[500px] w-full flex-col items-center justify-center overflow-hidden rounded-lg border bg-background md:shadow-xl">
      <Marquee pauseOnHover className="[--duration:20s]">
        <div>
          <img
            src="./van.jpeg"
            alt=""
            className="h-80 w-64 rounded-3xl bg-pu"
          />
          <div className="flex justify-center items-center ">
            <div className="text-center font-bold bg-gray-500 rounded-lg w-[100%]  text-white p-2 mt-2 ">
              Van parking
            </div>
          </div>
        </div>

        <div>
          <img src="./car1.avif" alt="" className="h-80 w-64 rounded-3xl" />
          <div className="flex justify-center items-center ">
            <div className="text-center font-bold bg-gray-500 rounded-lg w-[100%] text-white p-2 mt-2  ">
              Car parking
            </div>
          </div>
        </div>
        <div>
          <img src="./bike.jpg" alt="" className="h-80 w-64 rounded-3xl" />
          <div className="flex justify-center items-center ">
            <div className="text-center font-bold bg-gray-500 rounded-lg w-[100%] text-white p-2 mt-2 ">
              Two wheeler parking
            </div>
          </div>
        </div>
      </Marquee>
      <div className="pointer-events-none absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-white dark:from-background"></div>
      <div className="pointer-events-none absolute inset-y-0 right-0 w-1/3 bg-gradient-to-l from-white dark:from-background"></div>
    </div>
  );
}
