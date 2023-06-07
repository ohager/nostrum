import { ChildrenProps } from "@/types/childrenProps";
import { FC, forwardRef } from "react";

interface Props extends ChildrenProps {
  sign: string;
}

// eslint-disable-next-line react/display-name
export const BaseSection: FC<Props> = forwardRef<HTMLDivElement, Props>(
  (props, ref) => {
    return (
      <div ref={ref} className="relative">
        <div className="absolute left-4 top-[25%] md:text-hero text-mobile-hero text-white opacity-10">
          {props.sign}
        </div>
        {props.children}
      </div>
    );
  }
);
