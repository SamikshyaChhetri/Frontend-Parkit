import Header from "@/components/Header";
import React, { FC, ReactNode } from "react";

const Layout: FC<{
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

export default Layout;
