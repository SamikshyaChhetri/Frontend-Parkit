import Header from "@/components/Header";
import React, { FC, Promise, ReactNode } from "react";

const layout: FC<{
  children: ReactNode;
  params: Promise<{ userId: string }>;
}> = ({ children, params }) => {
  const rparams = React.use(params);

  return (
    <div>
      <Header userId={rparams.userId}></Header>
      {children}
    </div>
  );
};

export default layout;
