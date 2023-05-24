import {forwardRef} from 'react';
import {BaseSection} from '../baseSection';
import {NextProps} from '@/types/nextProps';
import {Hero} from '@/components/hero';

//  ② ③ ④ ⑤ ⑥ ⑦

// eslint-disable-next-line react/display-name
export const ChooseNameSection = forwardRef<HTMLDivElement, NextProps>(({onNext}, ref) => {

        return (
            // @ts-ignore
            <BaseSection ref={ref} sign="①">
                    <Hero>
                        <div className="flex lg:flex-row flex-col">
                            <div className="flex-1 p-6">
                                <h1 className="text-5xl font-bold">Choose your Name</h1>
                                <p className="py-6 text-justify">
                                    Here you can choose your name and check for its availabiltity.
                                </p>

                                <h1>TO DO - Search Component</h1>

                                <div className="text-center">
                                    <button className="btn btn-primary" onClick={onNext}>Continue</button>
                                </div>
                            </div>
                        </div>
                    </Hero>
            </BaseSection>
        )
    }
)
