import Header from "@/components/Header";
import React, { FC, ReactNode, Usable } from "react";

const layout: FC<{
  children: ReactNode;
  params: Usable<{ userId: string }>;
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
