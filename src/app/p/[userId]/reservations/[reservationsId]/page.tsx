import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

const Page = () => {
  return (
    <div className="bg-slate-800 min-h-screen text-white">
      <div className="p-10 w-[60%] ">
        <div className="flex justify-between">
          <div className="flex flex-col gap-5">
            <img src="/bike.jpg" alt="" className="w-[80%] rounded-md" />
            {/* <div className="flex justify-between w-[80%]"> */}
            <div>
              <Button className="w-[80%] bg-red-700 hover:bg-red-600">
                Cancel Reservation
              </Button>
              {/* <div className="border border-black text-center rounded-md p-2 bg-slate-100">
              Reserved for your date
            </div> */}
            </div>
          </div>

          <div className="flex flex-col w-[50%]">
            <div>Reserved for your date</div>
            <div>Gongabu Buspark</div>
            <div>
              Looking for a secure spot to park your scooter? Our online parking
              system offers hassle-free booking with real-time availability.
            </div>
            <div>2-wheeler</div>
            <div>3 star</div>
          </div>
        </div>
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-3">
            <div>Owner's Details</div>
            <div className="flex justify-between w-[15%] gap-3">
              <img src="/bike.jpg" className=" w-12 h-12 rounded-full" alt="" />
              <div>
                <div className="font-bold">Samikshya Chhetri</div>
                <div className="text-muted-foreground">samikshya@gmail.com</div>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <div>Add a review</div>
            <Textarea className="w-full h-28 border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-violet-800 resize-none"></Textarea>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Page;
