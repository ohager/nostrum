import React, { FC } from "react";
interface Props {
  name: string;
  onClick: () => void;
}

export const NameAvailableCard: FC<Props> = ({ name, onClick }) => {
  return (
    <div className="card w-full max-w-sm mx-auto shadow-2xl bg-base-100">
      <figure className="">
        <div className="text-3xl bg-gradient-to-bl from-yellow-200 to-green-400 w-full text-center py-6">
          {name}
        </div>
      </figure>
      <div className="card-body">
        <div className="card-title">Wohooo!</div>
        <p className="text-justify">
          This name is still available. Click CONTINUE to claim it now!
        </p>
      </div>
      <div className="card-actions justify-center pb-4">
        <button className="btn btn-accent btn-lg" onClick={onClick}>
          Continue
        </button>
      </div>
    </div>
  );
};
