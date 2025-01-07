import { FC, Usable, use } from "react";

const page: FC<{ params: Usable<{ listingsId: string; userId: string }> }> = ({
  params,
}) => {
  const rparams = use(params);
  return (
    <div>
      {rparams.listingsId} {rparams.userId}
    </div>
  );
};

export default page;
