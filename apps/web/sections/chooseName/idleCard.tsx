import { useTypewriter } from "react-simple-typewriter";
import { FC } from "react";

interface Props {
  words: string[];
}
export const IdleCard: FC<Props> = ({ words }) => {
  const [text] = useTypewriter({
    words,
    loop: 0,
  });

  return (
    <div className="card w-full max-w-sm mx-auto shadow-2xl bg-base-100">
      <figure className="">
        <div className="text-3xl bg-gradient-to-bl from-pink-300 to-blue-400 w-full text-center py-6">
          {text ? <div>{text}</div> : <div>&nbsp;</div>}
        </div>
      </figure>
      <div className="card-body">
        <div className="card-title">Choose Name</div>
        <p className="text-justify">
          Type the name you want to search for and hit <code>[Enter]</code> to
          check its availability.
        </p>
        <small className="text-sm text-gray-500">
          Case insensitive name consisting only of letters and numbers and
          underscore
        </small>
      </div>
    </div>
  );
};
