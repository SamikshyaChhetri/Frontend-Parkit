"use client";
import React, { FC } from "react";

const Page: FC<{
  params: Promise<{ userId: string }>;
}> = ({ params }) => {
  const resolvedParams = React.use(params);

  return <div>{/* <Header></Header> */}</div>;
};
export default Page;
