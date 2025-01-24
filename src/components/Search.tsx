"use client";
import Link from "next/link";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

const Search = () => {
  return (
    <div>
      <div className="flex justify-center py-6">
        <div className="flex gap-3 w-full px-5">
          <Input
            type="search"
            className="text-white w-full"
            placeholder="Search for place..."
          />
          <Link href={`listings`}>
            <Button>Create post</Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Search;
