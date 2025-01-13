"use client";
import React, { FC, Usable } from "react";

const page: FC<{
  params: Usable<{ userId: string }>;
}> = ({ params }) => {
  const resolvedParams = React.use(params);

  return <div>{/* <Header></Header> */}</div>;
};
export default page;
