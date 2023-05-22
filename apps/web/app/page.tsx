"use client"

import {ChooseNameSection} from '../sections/chooseName';
import {ConnectWalletSection} from '../sections/connectWallet';
import {useEffect, useRef} from 'react';

const Steps = [
    "choose-name",
    "connect-wallet"
]

export default function Page() {

    const chooseNameSectionRef = useRef<HTMLDivElement>()
    const connectWalletNameSectionRef = useRef<HTMLDivElement>()

    const handleNextStep = () => {
        window.scrollTo({
            behavior: 'smooth',
            top : connectWalletNameSectionRef.current.offsetTop
        })
    }

    return (
        <div className="min-h-screen"
             style={{background: "url(./img/ostrich_wild.webp) no-repeat fixed", backgroundSize: "cover"}}>
            <div className="bg-gradient-to-bl from-indigo-500 via-purple-500 to-pink-500 opacity-90">
                <ChooseNameSection ref={chooseNameSectionRef} onNext={handleNextStep}/>
                <ConnectWalletSection ref={connectWalletNameSectionRef} onNext={handleNextStep}/>
            </div>
        </div>
    );
}
