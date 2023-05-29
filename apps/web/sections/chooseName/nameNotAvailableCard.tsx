import React, { FC } from "react";

interface Props {
  name: string;
}

export const NameNotAvailableCard: FC<Props> = ({ name }) => {
  return (
    <div className="card w-full max-w-sm mx-auto shadow-2xl bg-base-100">
      <figure className="">
        <div className="text-3xl bg-gradient-to-bl from-yellow-200 to-red-400 w-full text-center py-6">
          {name}
        </div>
      </figure>
      <div className="card-body">
        <div className="card-title">Snap!</div>
        <p className="text-justify">
          This name was taken already. Please choose another one
        </p>
      </div>
    </div>
  );
};
