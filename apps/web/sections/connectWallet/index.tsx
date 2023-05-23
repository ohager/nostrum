import {forwardRef, useMemo, useState} from 'react';
import {Zoom} from "react-reveal"
import {BaseSection} from '../baseSection';
import {useAppContext} from '@/hooks/useAppContext';
import {useModal} from '@/hooks/useModal';
import {GetWalletInstructions} from './getWalletInstructions';
import {WrongNetworkInstructions} from './wrongNetworkInstructions';


interface Props {
    onNext: () => void
}

// eslint-disable-next-line react/display-name
export const ConnectWalletSection = forwardRef<HTMLDivElement, Props>(({onNext}, ref) => {

    const {Ledger, Wallet, AppName} = useAppContext()
    const [errorName, setErrorName] = useState("")
    const {openModal} = useModal()



    const Instructions  = useMemo(() => {
        // switch (errorName) {
        //     case "NotFoundWalletError":
        //         return GetWalletInstructions
        //         break;
        //     case "InvalidNetworkError":
        //         break;
        //     case "NotGrantedWalletError":
        //         break;
        //     default:
        // }
       return WrongNetworkInstructions
    }, [errorName])

    const handleConnect = () => {

        Wallet.Extension.connect({
            appName: AppName,
            networkName: Ledger.NetworkName
        }).then(connection => {
            console.log('pk', connection.publicKey)

            if (window.nostr) {
                return window.nostr.getPublicKey();
            } else {
                return Promise.resolve("")
            }
        }).then((npub) => {
            console.log(npub)
            openModal({
                type: "info",
                text: `npub is [${npub}]`,
                title: "Connected"
            })
        }).catch(e => {
            setErrorName(e.name)
            openModal({
                type: "error",
                text: e.message,
                title: "Connection Failure"
            })
        })
    }

    return (
        // @ts-ignore
        <BaseSection ref={ref} sign="②">
            <Zoom>
                <div className="hero min-h-screen w-full">
                    <div className="hero-content text-center glass p-20 rounded-2xl w-3/4 drop-shadow-xl md:flex-row flex-col md:text-left">
                        <div className="max-w-md mr-8">
                            <h1 className="text-5xl font-bold">Your Public Keys</h1>
                            <p className="py-6 text-justify">
                                Now we need your <u>public</u> keys. Both your Nostr key and your Signum key.
                                The easiest way is to use the Signum XT Wallet.
                            </p>
                                <button className="btn mr-2 btn-ghost" onClick={handleConnect}>Enter Manually</button>
                                <button className="btn btn-primary" onClick={handleConnect}>Connect</button>
                        </div>
                        <div className="flex-shrink-0">
                            <Instructions />
                        </div>
                    </div>

                </div>
            </Zoom>
        </BaseSection>
    )
})
