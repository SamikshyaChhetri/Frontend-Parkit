import { FC, ReactNode } from "react";

const Features: FC<{
  title: string;
  description: string;
  icon: ReactNode;
  color: string;
}> = ({ title, description, icon, color }) => {
  return (
    <div className="flex gap-3 mt-10 ">
      <div
        className={`flex justify-center items-center rounded-full w-[60px] h-[60px] ${color}   `}
      >
        {icon}
      </div>
      <div className="flex flex-col ">
        <div className="text-lg font-bold">{title}</div>
        <div>{description}</div>
      </div>
    </div>
  );
};

export default Features;
