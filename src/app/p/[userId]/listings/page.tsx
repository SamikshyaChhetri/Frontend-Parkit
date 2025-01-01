import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

const page = () => {
  return (
    <div className="flex justify-center items-center  h-screen">
      <Card className="w-[40%]">
        <CardHeader className="flex justify-center items-center">
          <CardTitle className="text-xl">Create Listing</CardTitle>
          <CardDescription></CardDescription>
        </CardHeader>
        <CardContent>
          <form>
            <div className="  gap-5 grid grid-cols-2 ">
              <div className="flex flex-col gap-1 relative col-span-2">
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
                      <SelectItem value="Bus">Bus</SelectItem>
                      <SelectItem value="2-wheeler">2-wheeler</SelectItem>
                      <SelectItem value="Car">Car</SelectItem>
                      <SelectItem value="Truck">Truck</SelectItem>
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
                <Input type="number" />
              </div>
              <div className="flex flex-col gap-1 relative">
                <Label
                  htmlFor="vehicles"
                  className="absolute -top-2 left-3 bg-white px-2 text-gray-600"
                >
                  Number of Vehicles
                </Label>
                <Input type="number" />
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
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline">Cancel</Button>
          <Button>Create</Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default page;
