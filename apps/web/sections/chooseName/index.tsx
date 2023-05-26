import React, { forwardRef, useRef, useState } from "react";
import { BaseSection } from "../baseSection";
import { NextProps } from "@/types/nextProps";
import { Hero } from "@/components/hero";
import { Zoom } from "react-reveal";
import { DenavasNameSearch, SearchResult } from "denavas-name-search/react";
import { useAppContext } from "@/hooks/useAppContext";

interface Props {
  onName: (name: string) => void;
}

// eslint-disable-next-line react/display-name
export const ChooseNameSection = forwardRef<HTMLDivElement, Props & NextProps>(
  ({ onName, onNext }, ref) => {
    const inputRef = useRef();
    const { Ledger } = useAppContext();
    const [isValid, setIsValid] = useState(false);

    const handleSearchDone = (value: CustomEvent<SearchResult>) => {
      const data = value.detail;
      setIsValid(false);
      if (!data.exactMatch) {
        onName(data.input);
        setIsValid(true);
      }
    };

    const handleOnChange = (value: CustomEvent<string>) => {
      setIsValid(false);
    };

    return (
      // @ts-ignore
      <BaseSection ref={ref} sign="①">
        <Zoom>
          <Hero>
            <div className="flex lg:flex-row flex-col">
              <div className="flex-1 p-6">
                <h1 className="text-5xl font-bold">Choose your Name</h1>
                <p className="py-6 text-justify">
                  Here you can choose your name and check for its availability,
                  for example <em>NostrKing</em>, <em>SignumChief</em>
                </p>

                <DenavasNameSearch
                  ref={inputRef}
                  onSearchDone={handleSearchDone}
                  onChange={handleOnChange}
                  signumnodeurl={Ledger.DefaultNode}
                />
                <div className="text-center">
                  <button
                    className="btn btn-accent btn-lg"
                    disabled={!isValid}
                    onClick={onNext}
                  >
                    Continue
                  </button>
                </div>
              </div>
            </div>
          </Hero>
        </Zoom>
      </BaseSection>
    );
  }
);
