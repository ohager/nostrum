import { ChildrenProps } from "@/types/childrenProps";
import { FC } from "react";

export const Hero: FC<ChildrenProps> = ({ children }) => {
  return (
    <div className="hero min-h-screen w-full">
      <div className="hero-content glass lg:p-20 p-6 rounded-2xl lg:w-3/4 m-4 drop-shadow-xl ">
        {children}
      </div>
    </div>
  );
};
