import { motion } from 'framer-motion';
import {forwardRef} from 'react';
import {Zoom } from "react-reveal"
import {BaseSection} from '../baseSection';

interface Props {
    onNext: () => void
}

// eslint-disable-next-line react/display-name
export const ConnectWalletSection = forwardRef<HTMLDivElement, Props>(({onNext}, ref) => {
    return (
        <BaseSection ref={ref} sign="②">
            <Zoom>
                <div className="hero min-h-screen w-full">
                    <div className="hero-content text-center glass p-20 rounded-2xl w-3/4 drop-shadow-xl">
                        <div className="max-w-md">
                            <h1 className="text-5xl font-bold">Hello there</h1>
                            <p className="py-6">Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda
                                excepturi
                                exercitationem quasi. In deleniti eaque aut repudiandae et a id nisi.</p>
                            <button className="btn btn-primary" onClick={onNext}>Get Started</button>
                        </div>
                    </div>
                </div>
            </Zoom>
        </BaseSection>
    )
})
