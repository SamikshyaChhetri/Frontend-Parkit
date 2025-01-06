"use client";
import Link from "next/link";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

const Search = () => {
  return (
    <div>
      <div className="flex justify-center ">
        <div className="flex gap-3 sm:w-[70%] md:[50%]">
          <Input type="search" placeholder="Search for place..." />
          <Link href={`listings`}>
            <Button>Create post</Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Search;
