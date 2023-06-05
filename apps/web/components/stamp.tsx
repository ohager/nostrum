import { FC } from "react";

interface Props {
  label: string;
}
export const Stamp: FC<Props> = ({ label }) => {
  return (
    <div className="absolute top-1/2 flex justify-center">
      <div className="text-red-500 border-8 border-red-500 font-mono rounded-xl px-8 py-4 inline-block font-extrabold opacity-80 rotate-12 sm:text-6xl text-4xl drop-shadow-xl">
        {label}
      </div>
    </div>
  );
};
