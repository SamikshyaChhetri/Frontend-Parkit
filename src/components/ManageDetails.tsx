import { Button } from "./ui/button";
import { CardContent, CardFooter, CardHeader } from "./ui/card";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Textarea } from "./ui/textarea";

const ManageDetails = () => {
  return (
    <div className="px-14">
      <div className="flex flex-col  justify-center items-center ">
        <div className="flex flex-row pt-8  ">
          <div className="flex flex-col gap-5">
            <div className="text-xl font-bold">Manage Listings</div>
            <img
              src="/bike.jpg"
              alt=""
              className="h-[50%]    rounded-lg flex"
            />
            <Button>Change Image</Button>
          </div>
          <div className="md:w-[50%] sm:w-[70%] w-[100%] flex flex-col  ">
            <form>
              <CardHeader className="flex justify-center items-center"></CardHeader>
              <CardContent>
                {/* <form> */}
                <div className="md:gap-5 grid md:grid-cols-2  sm:grid-cols-1 sm:gap-5 gap-5 ">
                  <div className="sm:flex sm:flex-col gap-1 relative md:col-span-2 sm:col-span-1">
                    <Label
                      htmlFor="description"
                      className="absolute -top-2 left-3 bg-white px-2 text-gray-600"
                    >
                      Description
                    </Label>
                    <Textarea
                      id="description"
                      className="border  rounded-md p-2"
                      rows={4}
                    />
                  </div>
                  <div className="flex flex-col gap-1 relative">
                    <Label
                      htmlFor="type"
                      className="absolute -top-2 left-3 bg-white px-2 text-gray-600"
                    >
                      Type
                    </Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectLabel>Select the type</SelectLabel>
                          <SelectItem value="bus">Bus</SelectItem>
                          <SelectItem value="2-wheeler">2-wheeler</SelectItem>
                          <SelectItem value="car">Car</SelectItem>
                          <SelectItem value="truck">Truck</SelectItem>
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="flex flex-col gap-1 relative">
                    <Label
                      htmlFor="price"
                      className="absolute -top-2 left-3 bg-white px-2 text-gray-600"
                    >
                      Price
                    </Label>
                    <Input />
                  </div>
                  <div className="flex flex-col gap-1 relative">
                    <Label
                      htmlFor="vehicles"
                      className="absolute -top-2 left-3 bg-white px-2 text-gray-600"
                    >
                      Number of Vehicles
                    </Label>
                    <Input />
                  </div>
                  <div className="flex flex-col gap-1 relative">
                    <Label
                      htmlFor="city"
                      className="absolute -top-2 left-3 bg-white px-2 text-gray-600"
                    >
                      City
                    </Label>
                    <Input />
                  </div>
                  <div className="flex flex-col gap-1 relative">
                    <Label
                      htmlFor="street"
                      className="absolute -top-2 left-3 bg-white px-2 text-gray-600"
                    >
                      Street
                    </Label>
                    <Input />
                  </div>
                  <div className="flex flex-col gap-1 relative">
                    <Label
                      htmlFor="country"
                      className="absolute -top-2 left-3 bg-white px-2 text-gray-600"
                    >
                      Country
                    </Label>
                    <Input />
                  </div>
                  <div className="flex flex-col gap-1 relative">
                    <Label
                      htmlFor="zipcode"
                      className="absolute -top-2 left-3 bg-white px-2 text-gray-600"
                    >
                      Zip Code
                    </Label>
                    <Input />
                  </div>
                  <div className="flex flex-col gap-1 relative">
                    <Label
                      htmlFor="image"
                      className="absolute -top-2 left-3 bg-white px-2 text-gray-600"
                    >
                      Upload Image
                    </Label>
                    <Input type="file" />
                  </div>
                </div>
                {/* </form> */}
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline">Cancel</Button>
                <Button>Update</Button>
              </CardFooter>
            </form>
          </div>
        </div>
        <div className="flex justify-between w-[90%] pb-8">
          <div className="w-[40%] flex flex-col gap-2">
            <div className="font-bold">Reservations</div>
            <div className=" h-20 border border-black rounded-lg"></div>
          </div>
          <div className="w-[40%] flex flex-col gap-2">
            <div className="font-bold">Reviews</div>
            <div className=" h-20 border border-black rounded-lg"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManageDetails;
