import {forwardRef} from 'react';
import {BaseSection} from '../baseSection';
import {NextProps} from '@/types/nextProps';
import {Hero} from '@/components/hero';

// ① ② ③ ④ ⑤ ⑥ ⑦

// eslint-disable-next-line react/display-name
export const WelcomeSection = forwardRef<HTMLDivElement, NextProps>(({onNext}, ref) => {

        return (
            // @ts-ignore
            <BaseSection ref={ref} sign="">
                <Hero>
                    <div className="flex lg:flex-row flex-col">
                        <div className="flex-1 flex flex-col justify-between s p-6">
                            <div>

                                <h1 className="text-5xl font-bold">Welcome, Nostrian!</h1>
                                <p className="py-6 text-justify text-2xl">
                                    With this app you can quickly get your NIP05
                                    verification in a truly decentralized manner.
                                    No need for your own internet domain.
                                </p>
                            </div>
                            <div className="text-center">
                                <button className="btn btn-lg btn-info" onClick={onNext}>Let's start</button>
                            </div>
                        </div>
                        <div className="max-w-md mx-auto">
                            <div className="card bg-base-100 shadow-xl">
                                <figure><img src="/img/signum-banner.jpg" width={480} alt="Signum Banner"/>
                                </figure>
                                <div className="card-body">
                                    <h2 className="card-title">Claim your Name</h2>
                                    <p>Within three simple step you can get your name
                                        <ul className="list-none text-justify mt-2">
                                            <li>① Choose your Name</li>
                                            <li>② Connect with XT Wallet</li>
                                            <li>③ Claim your Name</li>
                                        </ul>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </Hero>
            </BaseSection>
        )
    }
)
