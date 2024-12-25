import { Button } from "./ui/button";
import { Input } from "./ui/input";

const Search = () => {
  return (
    <div>
      <div className="flex justify-center">
        <div className="flex gap-3 w-[50%]">
          <Input type="search" placeholder="Search for place..." />
          <Button>Create post</Button>
        </div>
      </div>
    </div>
  );
};

export default Search;
