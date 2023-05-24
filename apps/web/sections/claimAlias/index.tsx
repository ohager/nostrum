import { Hero } from '@/components/hero';
import {forwardRef} from 'react';
import {BaseSection} from '../baseSection';
import {FiAlertCircle} from 'react-icons/fi';

// ① ② ③ ④ ⑤ ⑥ ⑦
interface Props {
    onNext: (ref) => void
}

// eslint-disable-next-line react/display-name
export const ClaimAliasSection = forwardRef<HTMLDivElement, Props>(({onNext}, ref) => {

        return (
            // @ts-ignore
            <BaseSection ref={ref} sign="③">
                <Hero>
                    <div className="flex lg:flex-row flex-col">
                        <div className="flex-1 flex flex-col justify-between s p-6">
                            <div>

                                <h1 className="text-5xl font-bold">I want it!</h1>
                                <p className="py-6 text-justify">
                                    When you can claim your name, you will get a so called <em>Alias</em>.
                                    This <em>Alias</em> is a small data container on the Signum Network and belongs exclusively to you.
                                    The data inside the <em>Alias</em> can be changed, e.g. with the
                                    <a className="link" href="https://signumswap.com" rel="noreferrer noopener" target="_blank">&nbsp;SignumSwap - DeFi Portal</a>  or the
                                    <a className="link" href="https://phoenix-wallet.rocks" rel="noreferrer noopener" target="_blank">&nbsp;Signum Phoenix Wallet</a>.
                                </p>
                                <div className="text-left text-xs flex flex-row items-center mb-6">
                                    <FiAlertCircle className="opacity-60 mr-2" size={28}/>
                                    Mind that it's necessary to have a small balance on your Signum Account. Maintaining an Alias costs you 12.5 SIGNA all three months and will be charged automatically.
                                    The first three months are free!
                                </div>
                            </div>
                            <div className="text-center">
                                <button className="btn btn-lg btn-accent" onClick={onNext}>Claim Now</button>
                            </div>
                        </div>
                        <div className="max-w-md mx-auto">
                            <div className="card bg-base-100 shadow-xl">
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
