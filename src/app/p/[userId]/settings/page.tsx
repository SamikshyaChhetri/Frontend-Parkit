import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const page = () => {
  return (
    <div className="my-11 mx-20">
      <div className="flex flex-col gap-10">
        <div>
          <div className="text-2xl font-bold">Profile</div>
          <div className="text-gray-500">
            View and edit all your profile details here
          </div>
        </div>
        <div className="flex gap-5 ">
          <div className="flex justify-center items-center flex-col border w-[30%] border-gray-500 p-10 rounded-sm">
            <div>Samiksya Baniya</div>
            <div>samikshya@gmail.com</div>
            <img
              src="/bike.jpg"
              alt="userImage"
              className="w-[300px] h-[300px] rounded-full"
            />
          </div>
          <div className="grid grid-cols-2 gap-7 w-[70%] border border-gray-500 p-10 rounded-sm">
            <div className="flex flex-col gap-1">
              <Label htmlFor="username">Username</Label>
              <Input type="text" id="username" placeholder="username" />
            </div>
            <div>
              <Label htmlFor="email">Email</Label>
              <Input type="email" id="email" placeholder="Email" />
            </div>

            <div>
              <Label htmlFor="address">Address</Label>
              <Input type="text" id="address" placeholder="Address" />
            </div>
            <div>
              <Label htmlFor="phone">Phone</Label>
              <Input type="number" id="phone" placeholder="Phone" />
            </div>
            <div>
              <Label htmlFor="gender">Gender</Label>
              <Input type="text" id="gender" placeholder="Gender" />
            </div>
            <div>
              <Label htmlFor="zipcode">Zipcode</Label>
              <Input type="text" id="zipcode" placeholder="Zipcode" />
            </div>
            <div>
              <Label htmlFor="country">Country</Label>
              <Input type="text" id="country" placeholder="Country" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
