import { FC } from "react";
import { Label } from "./ui/label";

const RequiredLabel: FC<{ children: string; className?: string }> = ({
  children,
  className,
}) => {
  return (
    <Label className={className}>
      {children} <span className="text-red-500">*</span>
    </Label>
  );
};

export default RequiredLabel;
