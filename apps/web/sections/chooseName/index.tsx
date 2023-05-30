import React, {
  createRef,
  forwardRef,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { BaseSection } from "../baseSection";
import { NextProps } from "@/types/nextProps";
import { Hero } from "@/components/hero";
import { Zoom } from "react-reveal";
import { DenavasNameSearch, SearchResult } from "denavas-name-search/react";
import { useAppContext } from "@/hooks/useAppContext";
import { NameAvailableCard } from "./nameAvailableCard";
import { NameNotAvailableCard } from "./nameNotAvailableCard";
import { IdleCard } from "./idleCard";
import sample from "lodash.samplesize";
import { Names } from "./names";

interface Props {
  onName: (name: string) => void;
}

enum Status {
  Idle,
  Valid,
  Invalid,
}

// eslint-disable-next-line react/display-name
export const ChooseNameSection = forwardRef<HTMLDivElement, Props & NextProps>(
  ({ onName, onNext }, ref) => {
    const inputRef = useRef();
    const { Ledger } = useAppContext();
    const [status, setStatus] = useState(Status.Idle);
    const [name, setName] = useState("");
    const [funNames, setFunNames] = useState(sample(Names, 10));

    const handleSearchDone = (value: CustomEvent<SearchResult>) => {
      const data = value.detail;
      setStatus(Status.Invalid);
      setName(data.input);
      onName("");
      if (!data.exactMatch) {
        onName(data.input);
        setStatus(Status.Valid);
      }
    };

    const handleOnChange = (value: CustomEvent<string>) => {
      if (value.detail !== name) {
        onName("");
      }
      setStatus(Status.Idle);
    };

    return (
      // @ts-ignore
      <BaseSection ref={ref} sign="①">
        <Zoom>
          <Hero>
            <div className="flex lg:flex-row flex-col">
              <section className="flex-1 p-6">
                <h1 className="text-5xl font-bold">Choose your Name</h1>
                <p className="py-6 text-justify">
                  Get your very own and unique name now. Check if your cool name
                  is still available, then request it. Once selected, you can
                  use it throughout the Nostr and/or Signum space. Everyone will
                  be able to find you, regardless of what relays you or others
                  use - <u>a true global name.</u>
                </p>
                <DenavasNameSearch
                  ref={inputRef}
                  onSearchDone={handleSearchDone}
                  onChange={handleOnChange}
                  signumnodeurl={Ledger.DefaultNode}
                />
              </section>
              <section className="flex-shrink-0 m-6">
                {status === Status.Idle && <IdleCard words={funNames} />}
                {status === Status.Valid && (
                  <NameAvailableCard name={name} onClick={onNext} />
                )}
                {status === Status.Invalid && (
                  <NameNotAvailableCard name={name} />
                )}
              </section>
            </div>
          </Hero>
        </Zoom>
      </BaseSection>
    );
  }
);
