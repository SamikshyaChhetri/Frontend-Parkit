import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const page = () => {
  return (
    <div>
      <div>
        <div>
          <div>Profile</div>
          <div>View and edit all your profile details here</div>
        </div>
        <div>
          <div>Samiksya Baniya</div>
          <div>samikshya@gmail.com</div>
          <img src="/bike.jpg" alt="userImage" />
        </div>
        <div>
          <div>
            <Label htmlFor="email">Email</Label>
            <Input type="email" id="email" placeholder="Email" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
